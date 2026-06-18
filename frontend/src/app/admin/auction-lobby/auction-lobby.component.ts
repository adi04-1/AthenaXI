import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { SeasonService } from '../../core/services/season.service';
import { AuctionService } from '../../core/services/auction.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-auction-lobby',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="admin-page">
      <div class="admin-page-header">
        <div>
          <h1 class="athena-page-title" style="margin-bottom:4px">👨‍⚖💸🙋‍♂️ Auction Lobby</h1>
          <p class="athena-label">Manage auction day — invites, acceptance tracking, kickstart</p>
        </div>
        <button class="athena-btn athena-btn-secondary" (click)="refresh()">🔄 Refresh</button>
      </div>

      @if (error()) { <div class="athena-error animate-fade-in">{{ error() }}</div> }
      @if (success()) { <div class="athena-success animate-fade-in">{{ success() }}</div> }

      <!-- Today's Auctions Banner -->
      @if (todayAuctions().length > 0) {
        <div class="today-banner animate-fade-in">
          <div class="today-header">
            <span class="athena-live-dot" style="font-family:var(--font-body);font-size:13px;font-weight:700;color:var(--red-live)">Auction Day Today</span>
          </div>
          <div class="today-list">
            @for (s of todayAuctions(); track s.id) {
              <div class="today-card" (click)="selectSeason(s)" [class.selected]="selectedSeasonId() === s.id">
                <div class="today-card-main">
                  <span class="today-name">{{ s.name }}</span>
                  <span class="athena-badge" [ngClass]="statusBadge(s.status)">{{ s.status }}</span>
                </div>
                <div class="athena-label">🟢 Today · {{ s.mode }}</div>
              </div>
            }
          </div>
        </div>
      }

      <!-- Season Selector (non-today) -->
      <div class="athena-card section-card">
        <h2 class="section-title">Select Season for Auction</h2>
        @if (loadingSeasons()) {
          <p class="athena-label">Loading seasons...</p>
        } @else {
          <div class="season-pills">
            @for (s of auctionableSeasons(); track s.id) {
              <button class="season-pill"
                [class.active]="selectedSeasonId() === s.id"
                (click)="selectSeason(s)">
                <span>{{ s.name }}</span>
                <span class="athena-badge athena-badge-surface" style="font-size:10px">{{ modeLabel(s.mode) }}</span>
              </button>
            }
            @if (auctionableSeasons().length === 0) {
              <p class="athena-label">No seasons ready for auction. Create a season and upload players first.</p>
            }
          </div>
        }
      </div>

      <!-- Lobby Panel — shown when season selected -->
      @if (selectedSeasonId() && lobby()) {
        <div class="lobby-panel animate-fade-in">

          <!-- Acceptance board -->
          <div class="athena-card section-card">
            <div class="lobby-header">
              <h2 class="section-title">Team Acceptance Board</h2>
              <div class="acceptance-stats">
                <span class="stat-chip green">✅ {{ lobby().acceptedCount }} Accepted</span>
                <span class="stat-chip yellow">⏳ {{ lobby().pendingCount }} Pending</span>
                <span class="stat-chip red">❌ {{ lobby().declinedCount }} Declined</span>
              </div>
            </div>

            <!-- Invite list -->
            @if (lobby().invites?.length > 0) {
              <div class="invite-list">
                @for (inv of lobby().invites; track inv.inviteId) {
                  <div class="invite-row" [class.accepted]="inv.status === 'Accepted'" [class.declined]="inv.status === 'Declined'"
                    [style.border-left-color]="inv.themeColour">
                    <div class="invite-team">
                      <span class="inv-code" [style.color]="inv.themeColour">{{ inv.shortCode }}</span>
                      <span class="inv-name">{{ inv.teamName }}</span>
                    </div>
                    <div class="invite-right">
                      <span class="invite-status-badge" [ngClass]="invStatusClass(inv.status)">
                        {{ invStatusLabel(inv.status) }}
                      </span>
                      @if (inv.respondedAt) {
                        <span class="athena-label">{{ inv.respondedAt | date:'shortTime' }}</span>
                      }
                    </div>
                  </div>
                }
              </div>
            } @else {
              <p class="athena-label" style="margin-top:12px">No invites sent yet. Send invites below.</p>
            }

            <!-- Invite actions -->
            <div class="lobby-actions">
              <button class="athena-btn athena-btn-secondary" (click)="sendInvites()" [disabled]="saving()">
                {{ saving() ? 'Sending...' : '🔄 Send / Resend Invites' }}
              </button>
              <button class="athena-btn athena-btn-primary kickstart-btn"
                [disabled]="lobby().acceptedCount < 1 || saving() || lobby().auctionStatus === 'InProgress'"
                (click)="startAuction()">
                @if (lobby().auctionStatus === 'InProgress') {
                  🟢 Auction Live
                } @else {
                  ▶️ Kickstart Auction ({{ lobby().acceptedCount }} ready)
                }
              </button>
            </div>
          </div>

          <!-- Go to auction room -->
          @if (lobby().auctionStatus === 'InProgress') {
            <div class="athena-card live-banner animate-fade-in">
              <div style="display:flex;align-items:center;gap:12px">
                <span style="font-size:32px">🟢</span>
                <div>
                  <div class="athena-heading" style="font-size:18px">Auction is LIVE</div>
                  <p class="athena-label">{{ lobby().acceptedCount }} teams are in the room</p>
                </div>
                <a routerLink="/auction" class="athena-btn athena-btn-primary" style="margin-left:auto;text-decoration:none">
                  Enter Auction Room →
                </a>
              </div>
            </div>
          }

          <!-- Player Sets â€” Shuffle within set, sets stay in fixed order -->
          <div class="athena-card section-card">
            <h2 class="section-title">Player Sets</h2>
            <p class="athena-label" style="margin-bottom:12px">
              Sets stay in fixed order. Shuffle re-randomizes only the players within a set that haven't been auctioned yet.
            </p>
            @if (loadingSets()) {
              <p class="athena-label">Loading sets...</p>
            } @else if (sets().length === 0) {
              <p class="athena-label">No auction order uploaded yet.</p>
            } @else {
              <div class="sets-list">
                @for (set of sets(); track set.auctionSet) {
                  <div class="set-row">
                    <div class="set-info">
                      <span class="set-name">{{ set.setDisplayName }}</span>
                      <span class="set-counts">
                        {{ set.pendingCount }} pending ⌛  {{ set.soldCount }} sold 💵 {{ set.unsoldCount }} unsold ❌
                      </span>
                    </div>
                    <button class="shuffle-btn" (click)="shuffleSet(set.auctionSet)"
                      [disabled]="!set.canShuffle || saving()">
                      {{ set.canShuffle ? 'Shuffle Set' : 'Locked' }}
                    </button>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Reminder sender -->
          <div class="athena-card section-card">
            <h2 class="section-title">Send Reminder</h2>
            <p class="athena-label" style="margin-bottom:12px">Send a custom reminder to pending teams</p>
            <div class="athena-field" style="margin-bottom:12px">
              <label class="athena-field-label">Message</label>
              <input class="athena-input" [(ngModel)]="reminderMsg"
                placeholder="Auction starts in 30 minutes! Please accept the invite." />
            </div>
            <button class="athena-btn athena-btn-secondary" (click)="sendReminder()" [disabled]="!reminderMsg || saving()">
              🕒 Send to Pending Teams
            </button>
          </div>

        </div>
      } @else if (selectedSeasonId() && !lobby() && loadingLobby()) {
        <div class="athena-card section-card">
          <p class="athena-label">Loading lobby...</p>
        </div>
      } @else if (selectedSeasonId() && !lobby() && !loadingLobby()) {
        <!-- No auction session yet -->
        <div class="athena-card section-card no-session-card animate-fade-in">
          <span style="font-size:40px">❌</span>
          <h3 style="color:#fff;font-family:var(--font-body);font-weight:700;margin:12px 0 6px">No Auction Session Yet</h3>
          <p class="athena-label">Upload the player pool and auction order first from the Player Upload section.</p>
          <a routerLink="/admin/players" class="athena-btn athena-btn-secondary" style="margin-top:16px;text-decoration:none;display:inline-block">
            → Go to Player Upload
          </a>
        </div>
      }

    </div>
  `,
  styles: [`
    .admin-page { padding: 28px 24px; max-width: 800px; }
    .admin-page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
    .section-card { padding: 20px; margin-bottom: 16px; }
    .section-title { font-family: var(--font-body); font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 14px; }

    .today-banner {
      background: linear-gradient(135deg, rgba(255,59,48,0.08), rgba(30,58,95,0.4));
      border: 1px solid rgba(255,59,48,0.25);
      border-radius: var(--radius-lg);
      padding: 16px 20px;
      margin-bottom: 16px;
    }
    .today-header { margin-bottom: 12px; }
    .today-list { display: flex; flex-direction: column; gap: 8px; }
    .today-card { background: rgba(10,31,47,0.6); border-radius: var(--radius-md); padding: 12px 16px; cursor: pointer; border: 1px solid rgba(255,59,48,0.15); transition: all 0.15s; }
    .today-card:hover, .today-card.selected { border-color: var(--red-live); background: rgba(255,59,48,0.08); }
    .today-card-main { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
    .today-name { font-family: var(--font-body); font-size: 14px; font-weight: 700; color: #fff; }

    .season-pills { display: flex; gap: 8px; flex-wrap: wrap; }
    .season-pill { background: rgba(10,31,47,0.6); border: 1px solid rgba(212,175,55,0.1); border-radius: var(--radius-xl); padding: 8px 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: var(--font-body); font-size: 13px; font-weight: 600; color: #aaa; transition: all 0.15s; }
    .season-pill:hover { border-color: rgba(212,175,55,0.3); color: #fff; }
    .season-pill.active { background: rgba(212,175,55,0.1); border-color: var(--gold); color: var(--gold); }

    .lobby-panel { display: flex; flex-direction: column; gap: 0; }
    .lobby-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
    .acceptance-stats { display: flex; gap: 8px; flex-wrap: wrap; }
    .stat-chip { font-family: var(--font-body); font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 20px; }
    .stat-chip.green { background: rgba(0,200,83,0.12); color: var(--green-cricket); }
    .stat-chip.yellow { background: rgba(212,175,55,0.12); color: var(--gold); }
    .stat-chip.red { background: rgba(255,59,48,0.12); color: var(--red-live); }

    .invite-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
    .invite-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(10,31,47,0.6); border-left: 3px solid #333; border-radius: 0 var(--radius-md) var(--radius-md) 0; transition: all 0.2s; }
    .invite-row.accepted { background: rgba(0,200,83,0.06); border-left-color: var(--green-cricket) !important; }
    .invite-row.declined { background: rgba(255,59,48,0.06); border-left-color: var(--red-live) !important; }
    .invite-team { display: flex; align-items: center; gap: 10px; }
    .inv-code { font-size: 13px; font-weight: 800; min-width: 28px; }
    .inv-name { font-family: var(--font-body); font-size: 14px; font-weight: 600; color: #fff; }
    .invite-right { display: flex; align-items: center; gap: 10px; }
    .invite-status-badge { font-family: var(--font-body); font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 10px; }
    .invite-status-badge.accepted { background: rgba(0,200,83,0.15); color: var(--green-cricket); }
    .invite-status-badge.pending { background: rgba(212,175,55,0.12); color: var(--gold); }
    .invite-status-badge.declined { background: rgba(255,59,48,0.12); color: var(--red-live); }

    .lobby-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .kickstart-btn { min-width: 200px; }
    .sets-list { display:flex; flex-direction:column; gap:8px; }
    .set-row { display:flex; align-items:center; justify-content:space-between; gap:12px; background:rgba(10,31,47,0.6); border-radius:var(--radius-md); padding:12px 16px; border:1px solid rgba(212,175,55,0.08); }
    .set-info { display:flex; flex-direction:column; gap:3px; }
    .set-name { font-size:14px; font-weight:700; color:#fff; font-family:var(--font-body); }
    .set-counts { font-size:11px; color:#777; }
    .shuffle-btn { font-size:12px; font-weight:700; color:var(--green-soft); background:rgba(45,156,219,0.1); border:1px solid rgba(45,156,219,0.25); border-radius:8px; padding:7px 16px; cursor:pointer; flex-shrink:0; white-space:nowrap; transition:background 0.15s; }
    .shuffle-btn:hover:not(:disabled) { background:rgba(45,156,219,0.22); }
    .shuffle-btn:disabled { opacity:0.4; cursor:not-allowed; color:#666; background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.08); }
    .live-banner { background: linear-gradient(135deg, rgba(255,59,48,0.1), rgba(30,58,95,0.5)) !important; border: 1px solid rgba(255,59,48,0.3) !important; padding: 20px; margin-bottom: 16px; }
    .no-session-card { text-align: center; padding: 40px; display: flex; flex-direction: column; align-items: center; }
  `]
})
export class AuctionLobbyComponent implements OnInit, OnDestroy {
  seasons          = signal<any[]>([]);
  auctionableSeasons = signal<any[]>([]);
  todayAuctions    = signal<any[]>([]);
  selectedSeasonId = signal<string|null>(null);
  lobby            = signal<any>(null);
  loadingSeasons   = signal(true);
  loadingLobby     = signal(false);
  saving           = signal(false);
  error            = signal('');
  success          = signal('');
  reminderMsg      = '';
  sets             = signal<any[]>([]);
  loadingSets      = signal(false);
  private sessionId = signal<string|null>(null);
  private pollSub?: Subscription;

  constructor(
    private seasonSvc: SeasonService,
    private auctionSvc: AuctionService,
    private notifSvc: NotificationService
  ) {}

  ngOnInit() { this.loadSeasons(); }
  ngOnDestroy() { this.pollSub?.unsubscribe(); }

  loadSeasons() {
    this.seasonSvc.getAll().subscribe({
      next: (d: any[]) => {
        this.seasons.set(d);
        const today = new Date().toDateString();
        this.todayAuctions.set(d.filter((s: any) => s.auctionDate && new Date(s.auctionDate).toDateString() === today));
        this.auctionableSeasons.set(d.filter((s: any) => ['Upcoming','ReadyForAuction','AuctionPhase'].includes(s.status)));
        this.loadingSeasons.set(false);
      },
      error: () => this.loadingSeasons.set(false)
    });
  }

  selectSeason(s: any) {
    this.selectedSeasonId.set(s.id);
    this.lobby.set(null);
    this.loadingLobby.set(true);
    this.pollSub?.unsubscribe();
    // Try to get auction session
    this.auctionSvc.getSession(s.id).subscribe({
      next: (session: any) => {
        this.sessionId.set(session.id);
        this.loadLobby(session.id);
        this.loadSets(session.id);
        // Poll every 5s
        this.pollSub = interval(5000).subscribe(() => {
          this.loadLobby(session.id);
          this.loadSets(session.id);
        });
      },
      error: () => { this.lobby.set(null); this.loadingLobby.set(false); }
    });
  }

  loadLobby(sessionId: string) {
    this.auctionSvc.getLobby(sessionId).subscribe({
      next: (d: any) => { this.lobby.set(d); this.loadingLobby.set(false); },
      error: () => this.loadingLobby.set(false)
    });
  }

  loadSets(sessionId: string) {
    this.loadingSets.set(true);
    this.auctionSvc.getSets(sessionId).subscribe({
      next: (d: any[]) => { this.sets.set(d); this.loadingSets.set(false); },
      error: () => this.loadingSets.set(false)
    });
  }

  shuffleSet(auctionSet: string) {
    const sid = this.sessionId();
    if (!sid) return;
    this.saving.set(true);
    this.auctionSvc.shuffleSet(sid, auctionSet).subscribe({
      next: (r: any) => {
        this.saving.set(false);
        this.success.set(r?.message ?? 'Set shuffled!');
        setTimeout(() => this.success.set(''), 3000);
        this.loadSets(sid);
      },
      error: (e: any) => {
        this.error.set(e?.error?.error ?? 'Failed to shuffle set.');
        this.saving.set(false);
      }
    });
  }

  refresh() {
    const sid = this.sessionId();
    if (sid) { this.loadLobby(sid); this.loadSets(sid); }
    else this.loadSeasons();
  }

  sendInvites() {
    const sid = this.sessionId();
    if (!sid) return;
    this.saving.set(true); this.error.set('');
    this.auctionSvc.sendInvites(sid).subscribe({
      next: (r: any) => {
        this.success.set(`✅ Invites sent to ${r.count} teams!`);
        this.saving.set(false);
        this.loadLobby(sid);
        setTimeout(() => this.success.set(''), 4000);
      },
      error: (e: any) => { this.error.set(e?.error?.error ?? 'Failed to send invites.'); this.saving.set(false); }
    });
  }

  sendReminder() {
    if (!this.reminderMsg) return;
    this.saving.set(true);
    // Send to pending teams only
    const pending = this.lobby()?.invites?.filter((i: any) => i.status === 'Pending') ?? [];
    const sends = pending.map((i: any) =>
      this.notifSvc.sendNotification({ userId: i.userId, title: '⏰ Auction Reminder', body: this.reminderMsg, type: 'AuctionStartingSoon' })
    );
    if (sends.length === 0) { this.success.set('No pending teams to remind.'); this.saving.set(false); return; }
    this.notifSvc.sendNotification({ userId: null, title: '⏰ Auction Reminder', body: this.reminderMsg, type: 'AuctionStartingSoon' }).subscribe({
      next: () => { this.success.set(`Reminder sent to ${pending.length} pending teams!`); this.reminderMsg = ''; this.saving.set(false); setTimeout(() => this.success.set(''), 4000); },
      error: () => { this.error.set('Failed to send reminder.'); this.saving.set(false); }
    });
  }

  startAuction() {
    const sid = this.sessionId();
    if (!sid) return;
    this.saving.set(true);
    this.auctionSvc.startAuction(sid).subscribe({
      next: () => { this.success.set('✅ Auction started!'); this.saving.set(false); this.loadLobby(sid); },
      error: (e: any) => { this.error.set(e?.error?.error ?? 'Failed to start.'); this.saving.set(false); }
    });
  }

  invStatusClass(s: string) { return s?.toLowerCase() ?? 'pending'; }
  invStatusLabel(s: string) { return { Accepted:'✅ Accepted', Pending:'🕒 Pending', Declined:'❌ Declined' }[s] ?? s; }
  statusBadge(s: string) { const m: any = { Upcoming:'athena-badge-surface', ReadyForAuction:'athena-badge-blue', AuctionPhase:'athena-badge-red', InProgress:'athena-badge-green' }; return m[s] ?? 'athena-badge-surface'; }
  modeLabel(m: string) { return { FreshAuction:'Fresh', AuctionWithRetentions:'Retention', DirectAllocation:'Direct' }[m] ?? m; }
}
