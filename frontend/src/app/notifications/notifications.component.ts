import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { NotificationService } from '../core/services/notification.service';
import { AuctionService } from '../core/services/auction.service';
import { SeasonService } from '../core/services/season.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="athena-page">
      <div class="notif-header">
        <h1 class="athena-page-title" style="margin-bottom:0">Alerts</h1>
        <div style="display:flex;gap:8px">
          @if (unread() > 0) {
            <button class="athena-btn athena-btn-secondary mark-btn" (click)="markAllRead()">Mark all read</button>
          }
          <button class="athena-btn athena-btn-secondary mark-btn" (click)="load()">Refresh</button>
        </div>
      </div>

      <!-- Pending invite banner -->
      @if (pendingInvite()) {
        <div class="invite-banner animate-fade-in">
          <div class="invite-banner-left">
            <div class="invite-banner-title">Auction Invite Pending</div>
            <div class="invite-banner-sub">You have been invited to join the auction. Accept to participate in live bidding.</div>
          </div>
          <div class="invite-actions">
            <button class="invite-btn accept" (click)="respond(true)" [disabled]="responding()">
              {{ responding() ? '...' : 'Accept' }}
            </button>
            <button class="invite-btn decline" (click)="respond(false)" [disabled]="responding()">
              Decline
            </button>
          </div>
        </div>
      }
      @if (inviteResponse()) {
        <div [class]="inviteResponse() === 'accepted' ? 'athena-success' : 'athena-error'" class="animate-fade-in">
          {{ inviteResponse() === 'accepted' ? 'You have joined the auction! Head to the Auction room.' : 'You have declined the auction invite.' }}
        </div>
      }

      @if (loading()) {
        <div class="notif-loading">Loading alerts...</div>
      } @else if (notifs().length === 0) {
        <div class="notif-empty athena-card">
          <div class="empty-label">BELL</div>
          <p>No notifications yet.</p>
          <p style="color:#555;font-size:13px">Auction invites, match updates and alerts appear here.</p>
        </div>
      } @else {
        <div class="notif-list">
          @for (n of notifs(); track n.id) {
            <div class="notif-item athena-card-sm" [class.unread]="!n.isRead" (click)="markRead(n)">
              <div class="notif-type-badge" [ngClass]="typeBadge(n.type)">
                {{ typeLabel(n.type) }}
              </div>
              <div class="notif-content">
                <div class="notif-title">{{ n.title }}</div>
                <div class="notif-body">{{ n.body }}</div>
                <div class="notif-time">{{ n.createdAt | date:'MMM d · h:mm a' }}</div>
              </div>
              @if (!n.isRead) {
                <div class="unread-dot"></div>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .notif-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; gap:12px; flex-wrap:wrap; }
    .mark-btn { font-size:12px !important; padding:6px 12px !important; }
    .notif-loading { color:#666; padding:40px; text-align:center; font-family:var(--font-body); }
    .notif-empty { text-align:center; padding:48px 24px; display:flex; flex-direction:column; align-items:center; gap:10px; }
    .empty-label { font-family:var(--font-timer); font-size:11px; font-weight:900; letter-spacing:0.15em; color:var(--gold); background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.2); border-radius:20px; padding:5px 14px; }
    .notif-empty p { color:#666; margin:0; }

    /* Invite banner */
    .invite-banner {
      display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;
      background:linear-gradient(135deg,rgba(212,175,55,0.12),rgba(30,58,95,0.4));
      border:1px solid rgba(212,175,55,0.35);
      border-radius:var(--radius-lg); padding:18px 20px; margin-bottom:16px;
    }
    .invite-banner-left { flex:1; min-width:0; }
    .invite-banner-title { font-size:15px; font-weight:800; color:var(--gold); margin-bottom:4px; font-family:var(--font-body); }
    .invite-banner-sub { font-size:13px; color:#aaa; font-family:var(--font-body); }
    .invite-actions { display:flex; gap:8px; flex-shrink:0; }
    .invite-btn { font-size:13px; font-weight:700; border-radius:8px; padding:8px 18px; cursor:pointer; border:none; transition:all 0.15s; }
    .invite-btn:disabled { opacity:0.5; cursor:not-allowed; }
    .invite-btn.accept { background:var(--green-cricket); color:var(--navy-deep); }
    .invite-btn.accept:hover:not(:disabled) { filter:brightness(1.1); }
    .invite-btn.decline { background:rgba(255,59,48,0.15); color:var(--red-live); border:1px solid rgba(255,59,48,0.3); }
    .invite-btn.decline:hover:not(:disabled) { background:rgba(255,59,48,0.25); }

    .notif-list { display:flex; flex-direction:column; gap:10px; }
    .notif-item {
      display:flex; align-items:flex-start; gap:12px; padding:14px 16px;
      border-left:3px solid transparent; cursor:pointer; transition:all 0.15s;
    }
    .notif-item.unread { border-left-color:var(--gold); background:rgba(212,175,55,0.04) !important; }
    .notif-item:hover { background:rgba(30,58,95,0.5) !important; }

    .notif-type-badge { font-family:var(--font-timer); font-size:9px; font-weight:900; letter-spacing:0.08em; padding:3px 8px; border-radius:8px; white-space:nowrap; flex-shrink:0; margin-top:2px; }
    .badge-auction { background:rgba(255,59,48,0.15); color:var(--red-live); }
    .badge-points  { background:rgba(0,200,83,0.12); color:var(--green-cricket); }
    .badge-transfer{ background:rgba(45,156,219,0.12); color:var(--green-soft); }
    .badge-general { background:rgba(212,175,55,0.1); color:var(--gold); }

    .notif-content { flex:1; min-width:0; }
    .notif-title { font-size:14px; font-weight:700; color:#fff; margin-bottom:4px; font-family:var(--font-body); }
    .notif-body { font-size:13px; color:#aaa; line-height:1.4; margin-bottom:5px; }
    .notif-time { font-size:11px; color:#555; }
    .unread-dot { width:8px; height:8px; border-radius:50%; background:var(--gold); box-shadow:0 0 6px var(--gold); flex-shrink:0; margin-top:4px; }
  `]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifs         = signal<any[]>([]);
  pendingInvite  = signal<any>(null);
  inviteResponse = signal<string>('');
  loading        = signal(true);
  responding     = signal(false);
  unread         = signal(0);
  private pollSub?: Subscription;

  constructor(
    private notifSvc: NotificationService,
    private auctionSvc: AuctionService,
    private seasonSvc: SeasonService,
  ) {}

  ngOnInit() {
    this.load();
    this.checkPendingInvite();
    this.pollSub = interval(30000).subscribe(() => {
      this.load();
      this.checkPendingInvite();
    });
  }
  ngOnDestroy() { this.pollSub?.unsubscribe(); }

  load() {
    this.notifSvc.getMyNotifications().subscribe({
      next: d => {
        this.notifs.set(d);
        this.loading.set(false);
        const u = d.filter((n:any) => !n.isRead).length;
        this.unread.set(u);
        this.notifSvc.unreadCount.set(u);
      },
      error: () => this.loading.set(false)
    });
  }

  checkPendingInvite() {
    const seasonId = this.seasonSvc.activeSeason()?.id;
    if (!seasonId) {
      // Try loading active season first
      this.seasonSvc.getActive().subscribe({
        next: () => this.fetchInvite(),
        error: () => {}
      });
      return;
    }
    this.fetchInvite();
  }

  fetchInvite() {
    const seasonId = this.seasonSvc.activeSeason()?.id;
    if (!seasonId) return;
    this.auctionSvc.getMyInvite(seasonId).subscribe({
      next: (inv: any) => {
        if (inv?.status === 'Pending') this.pendingInvite.set(inv);
        else this.pendingInvite.set(null);
      },
      error: () => this.pendingInvite.set(null)
    });
  }

  respond(accept: boolean) {
    const inv = this.pendingInvite();
    if (!inv) return;
    this.responding.set(true);
    this.auctionSvc.respondToInvite({ inviteId: inv.inviteId, accept }).subscribe({
      next: () => {
        this.responding.set(false);
        this.pendingInvite.set(null);
        this.inviteResponse.set(accept ? 'accepted' : 'declined');
        setTimeout(() => this.inviteResponse.set(''), 5000);
      },
      error: () => this.responding.set(false)
    });
  }

  markRead(n: any) {
    if (n.isRead) return;
    this.notifSvc.markRead(n.id).subscribe(() => {
      this.notifs.update(l => l.map(x => x.id === n.id ? {...x, isRead:true} : x));
      this.unread.update(c => Math.max(0, c-1));
      this.notifSvc.unreadCount.update(c => Math.max(0, c-1));
    });
  }

  markAllRead() {
    this.notifSvc.markAllRead().subscribe(() => {
      this.notifs.update(l => l.map(x => ({...x, isRead:true})));
      this.unread.set(0);
      this.notifSvc.unreadCount.set(0);
    });
  }

  typeBadge(t: string) {
    if (t?.includes('Auction') || t?.includes('Starting')) return 'badge-auction';
    if (t?.includes('Points') || t?.includes('Match') || t?.includes('Milestone')) return 'badge-points';
    if (t?.includes('Transfer')) return 'badge-transfer';
    return 'badge-general';
  }
  typeLabel(t: string) {
    const m:any = { AuctionStartingSoon:'AUCTION', MatchPointsUpdated:'POINTS', PlayerMilestone:'MILESTONE', TransferWindowOpen:'TRANSFER', TransferWindowClosing:'TRANSFER', ReserveSwapDecision:'SQUAD', PointsManuallyEdited:'EDIT', GeneralAlert:'ALERT' };
    return m[t] ?? 'ALERT';
  }
}
