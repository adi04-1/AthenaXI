import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeasonService } from '../../core/services/season.service';
import { TeamService } from '../../core/services/team.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notifications-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <div class="admin-page-header">
        <div>
          <h1 class="athena-page-title" style="margin-bottom:4px">🔔 Notifications</h1>
          <p class="athena-label">Send announcements and alerts to teams</p>
        </div>
      </div>

      @if (error()) { <div class="athena-error animate-fade-in">{{ error() }}</div> }
      @if (success()) { <div class="athena-success animate-fade-in">{{ success() }}</div> }

      <!-- Quick Templates -->
      <div class="athena-card section-card">
        <h2 class="section-title">Quick Templates</h2>
        <div class="template-grid">
          @for (t of templates; track t.label) {
            <button class="template-btn" (click)="applyTemplate(t)">
              <span class="t-icon">{{ t.icon }}</span>
              <div>
                <div class="t-label">{{ t.label }}</div>
                <div class="t-preview">{{ t.body | slice:0:50 }}...</div>
              </div>
            </button>
          }
        </div>
      </div>

      <!-- Compose -->
      <div class="athena-card section-card">
        <h2 class="section-title">Compose Notification</h2>
        <div class="athena-fields">

          <!-- Target -->
          <div class="athena-field">
            <label class="athena-field-label">Send To</label>
            <div class="target-options">
              <button class="target-btn" [class.active]="target() === 'all'" (click)="target.set('all')">
                📢 All Teams
              </button>
              <button class="target-btn" [class.active]="target() === 'season'" (click)="target.set('season')">
                🗓️ Season Teams
              </button>
              <button class="target-btn" [class.active]="target() === 'specific'" (click)="target.set('specific')">
                👥 Specific Team
              </button>
            </div>
          </div>

          @if (target() === 'season') {
            <div class="athena-field">
              <label class="athena-field-label">Season</label>
              <select class="athena-input" [(ngModel)]="selectedSeasonId" (ngModelChange)="loadTeams($event)">
                <option value="">Select season...</option>
                @for (s of seasons(); track s.id) {
                  <option [value]="s.id">{{ s.name }}</option>
                }
              </select>
            </div>
          }

          @if (target() === 'specific') {
            <div class="athena-field">
              <label class="athena-field-label">Season</label>
              <select class="athena-input" [(ngModel)]="selectedSeasonId" (ngModelChange)="loadTeams($event)">
                <option value="">Select season...</option>
                @for (s of seasons(); track s.id) {
                  <option [value]="s.id">{{ s.name }}</option>
                }
              </select>
            </div>
            @if (teams().length > 0) {
              <div class="athena-field">
                <label class="athena-field-label">Team</label>
                <select class="athena-input" [(ngModel)]="selectedUserId">
                  <option value="">Select team...</option>
                  @for (t of teams(); track t.id) {
                    <option [value]="t.user?.id ?? t.userId">{{ t.teamName }} ({{ '@' + t.username }})</option>
                  }
                </select>
              </div>
            }
          }

          <!-- Type -->
          <div class="athena-field">
            <label class="athena-field-label">Notification Type</label>
            <select class="athena-input" [(ngModel)]="notifType">
              <option value="GeneralAlert">🔔 General Alert</option>
              <option value="AuctionStartingSoon">⏰ Auction Starting Soon</option>
              <option value="MatchPointsUpdated">📊 Match Points Updated</option>
              <option value="TransferWindowOpen">🔓 Transfer Window Open</option>
              <option value="TransferWindowClosing">⚠️ Transfer Window Closing</option>
            </select>
          </div>

          <div class="athena-field">
            <label class="athena-field-label">Title</label>
            <input class="athena-input" [(ngModel)]="notifTitle" placeholder="Notification title..." />
          </div>

          <div class="athena-field">
            <label class="athena-field-label">Message</label>
            <textarea class="athena-input" [(ngModel)]="notifBody" placeholder="Write your message here..."
              style="height:100px;resize:vertical"></textarea>
          </div>

          <!-- Preview -->
          @if (notifTitle && notifBody) {
            <div class="notif-preview">
              <span class="athena-label" style="display:block;margin-bottom:8px">Preview</span>
              <div class="preview-card">
                <div class="preview-title">{{ notifTitle }}</div>
                <div class="preview-body">{{ notifBody }}</div>
                <div class="preview-type athena-badge athena-badge-gold">{{ notifType }}</div>
              </div>
            </div>
          }

          <button class="athena-btn athena-btn-primary" style="width:100%"
            [disabled]="!notifTitle || !notifBody || saving()"
            (click)="send()">
            {{ saving() ? 'Sending...' : ' 🔔 Send Notification' }}
          </button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .admin-page { padding: 28px 24px; max-width: 700px; }
    .admin-page-header { margin-bottom: 24px; }
    .section-card { padding: 20px; margin-bottom: 16px; }
    .section-title { font-family: var(--font-body); font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 14px; }

    .template-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .template-btn { background: rgba(10,31,47,0.6); border: 1px solid rgba(212,175,55,0.1); border-radius: var(--radius-md); padding: 12px; cursor: pointer; display: flex; align-items: flex-start; gap: 10px; text-align: left; transition: all 0.15s; }
    .template-btn:hover { border-color: rgba(212,175,55,0.3); background: rgba(30,58,95,0.4); }
    .t-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
    .t-label { font-family: var(--font-body); font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 3px; }
    .t-preview { font-size: 11px; color: #666; line-height: 1.4; }

    .target-options { display: flex; gap: 8px; flex-wrap: wrap; }
    .target-btn { background: rgba(10,31,47,0.6); border: 1px solid rgba(212,175,55,0.1); border-radius: var(--radius-xl); padding: 8px 14px; cursor: pointer; font-family: var(--font-body); font-size: 13px; font-weight: 600; color: #888; transition: all 0.15s; }
    .target-btn.active { background: rgba(212,175,55,0.1); border-color: var(--gold); color: var(--gold); }
    .target-btn:hover:not(.active) { color: #ccc; border-color: rgba(212,175,55,0.25); }

    textarea.athena-input { font-family: var(--font-body); line-height: 1.5; }

    .notif-preview { background: rgba(10,31,47,0.5); border-radius: var(--radius-md); padding: 14px; border: 1px solid rgba(212,175,55,0.1); }
    .preview-card { background: rgba(30,58,95,0.4); border-radius: var(--radius-md); padding: 14px; border-left: 3px solid var(--gold); }
    .preview-title { font-family: var(--font-body); font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 6px; }
    .preview-body { font-size: 13px; color: #aaa; margin-bottom: 10px; line-height: 1.4; }

    select.athena-input option { background: var(--navy-deep); }
  `]
})
export class NotificationsAdminComponent implements OnInit {
  seasons        = signal<any[]>([]);
  teams          = signal<any[]>([]);
  target         = signal<'all'|'season'|'specific'>('all');
  saving         = signal(false);
  error          = signal('');
  success        = signal('');
  selectedSeasonId = '';
  selectedUserId   = '';
  notifTitle       = '';
  notifBody        = '';
  notifType        = 'GeneralAlert';

  templates = [
    { icon: '👨🏻‍⚖️', label: 'Auction Invite',    title: '🔔 Auction Invite', body: 'Your team has been invited to join the auction! Open AthenaXI and accept the invite to participate.' },
    { icon: '⏰', label: 'Auction Reminder',  title: '⏰ Reminder', body: 'Auction starts soon! Please accept your invite and join the auction room.' },
    { icon: '👥', label: 'Players Uploaded',  title: '👥 Player Pool Ready', body: 'The player pool and auction order have been uploaded. Browse players before auction day!' },
    { icon: '📋', label: 'Auction Order Set', title: '📋 Auction Order Published', body: 'The auction order for upcoming season is ready. Check the player list and prepare your strategy!' },
    { icon: '✅', label: 'Season Created',    title: '✅ Season Created', body: 'A new fantasy cricket season has been created and your team has been registered. Stay tuned for auction details!' },
    { icon: '📊', label: 'Auction Summary',   title: '📊 Auction Complete', body: 'The auction is complete! Check your squad and start assigning Captain, Vice-Captain, and Impact Player.' },
  ];

  constructor(
    private seasonSvc: SeasonService,
    private teamSvc: TeamService,
    private notifSvc: NotificationService
  ) {}

  ngOnInit() {
    this.seasonSvc.getAll().subscribe({ next: d => this.seasons.set(d), error: () => {} });
  }

  loadTeams(seasonId: string) {
    if (!seasonId) return;
    this.teamSvc.getTeamsBySeason(seasonId).subscribe({ next: d => this.teams.set(d), error: () => {} });
  }

  applyTemplate(t: any) {
    this.notifTitle = t.title;
    this.notifBody  = t.body;
    this.notifType  = t.type ?? 'GeneralAlert';
  }

  send() {
    this.saving.set(true); this.error.set('');
    const userId = this.target() === 'specific' ? this.selectedUserId || null : null;
    this.notifSvc.sendNotification({ userId, title: this.notifTitle, body: this.notifBody, type: this.notifType }).subscribe({
      next: (r: any) => {
        this.success.set(`âœ… Notification sent to ${r.message}`);
        this.notifTitle = ''; this.notifBody = '';
        this.saving.set(false);
        setTimeout(() => this.success.set(''), 4000);
      },
      error: (e: any) => { this.error.set(e?.error?.error ?? 'Failed to send.'); this.saving.set(false); }
    });
  }
}
