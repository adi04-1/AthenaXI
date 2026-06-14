import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { NotificationService } from '../core/services/notification.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="athena-page">

      <div class="notif-header">
        <h1 class="athena-page-title" style="margin-bottom:0">Alerts</h1>
        <div class="notif-header-actions">
          @if (notifs().length > 0) {
            <button class="athena-btn athena-btn-secondary mark-btn" (click)="markAllRead()">
              Mark all read
            </button>
          }
          <button class="athena-btn athena-btn-secondary mark-btn" (click)="refresh()">
            Refresh
          </button>
        </div>
      </div>

      @if (loading()) {
        <div class="notif-loading">Loading alerts...</div>
      } @else if (notifs().length === 0) {
        <div class="notif-empty athena-card">
          <div class="empty-icon">BELL</div>
          <p>No notifications yet.</p>
          <p class="empty-sub">Auction invites, match updates and alerts will appear here.</p>
        </div>
      } @else {
        <div class="notif-list">
          @for (n of notifs(); track n.id) {
            <div class="notif-item athena-card-sm" [class.unread]="!n.isRead">
              <div class="notif-icon-col">
                <div class="notif-type-badge" [ngClass]="typeBadge(n.type)">
                  {{ typeLabel(n.type) }}
                </div>
              </div>
              <div class="notif-content" (click)="markRead(n)">
                <div class="notif-title">{{ n.title }}</div>
                <div class="notif-body">{{ n.body }}</div>
                <div class="notif-time">{{ n.createdAt | date:'MMM d, h:mm a' }}</div>
              </div>
              <div class="notif-right">
                @if (!n.isRead) {
                  <div class="unread-dot"></div>
                }
                <!-- Accept/Decline for auction invites -->
                @if (n.type === 'AuctionStartingSoon' && !n.responded) {
                  <div class="invite-actions">
                    <button class="invite-btn accept" (click)="respondToInvite(n, true)">Accept</button>
                    <button class="invite-btn decline" (click)="respondToInvite(n, false)">Decline</button>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .notif-header {
      display: flex; align-items: center;
      justify-content: space-between;
      margin-bottom: 20px; gap: 12px; flex-wrap: wrap;
    }
    .notif-header-actions { display: flex; gap: 8px; }
    .mark-btn { font-size: 12px !important; padding: 6px 12px !important; }
    .notif-loading { color: #666; padding: 40px; text-align: center; font-family: var(--font-body); }

    .notif-empty {
      text-align: center; padding: 48px 24px;
      display: flex; flex-direction: column; align-items: center; gap: 10px;
    }
    .empty-icon {
      font-family: var(--font-timer); font-size: 11px; font-weight: 900;
      letter-spacing: 0.15em; color: var(--gold);
      background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.2);
      border-radius: 20px; padding: 5px 14px; margin-bottom: 8px;
    }
    .notif-empty p { color: #666; font-size: 15px; margin: 0; }
    .empty-sub { font-size: 13px; color: #444 !important; }

    .notif-list { display: flex; flex-direction: column; gap: 10px; }
    .notif-item {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 14px 16px;
      border-left: 3px solid transparent;
      transition: all 0.15s; cursor: pointer;
    }
    .notif-item.unread {
      border-left-color: var(--gold);
      background: rgba(212,175,55,0.04) !important;
    }
    .notif-item:hover { background: rgba(30,58,95,0.5) !important; }

    .notif-icon-col { flex-shrink: 0; padding-top: 2px; }
    .notif-type-badge {
      font-family: var(--font-timer); font-size: 9px; font-weight: 900;
      letter-spacing: 0.08em; padding: 3px 7px; border-radius: 8px;
      white-space: nowrap;
    }
    .badge-auction { background: rgba(255,59,48,0.15); color: var(--red-live); }
    .badge-points  { background: rgba(0,200,83,0.12);  color: var(--green-cricket); }
    .badge-transfer{ background: rgba(45,156,219,0.12); color: var(--green-soft); }
    .badge-general { background: rgba(212,175,55,0.1);  color: var(--gold); }

    .notif-content { flex: 1; min-width: 0; }
    .notif-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 4px; }
    .notif-body  { font-size: 13px; color: #aaa; line-height: 1.4; margin-bottom: 6px; }
    .notif-time  { font-size: 11px; color: #555; }

    .notif-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex-shrink: 0; }
    .unread-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--gold);
      box-shadow: 0 0 6px var(--gold);
    }

    /* Invite response buttons */
    .invite-actions { display: flex; flex-direction: column; gap: 5px; }
    .invite-btn {
      font-size: 11px; font-weight: 700; border-radius: 6px;
      padding: 4px 10px; cursor: pointer; border: none;
      white-space: nowrap;
    }
    .invite-btn.accept { background: rgba(0,200,83,0.2); color: var(--green-cricket); border: 1px solid rgba(0,200,83,0.3); }
    .invite-btn.accept:hover { background: rgba(0,200,83,0.35); }
    .invite-btn.decline { background: rgba(255,59,48,0.15); color: var(--red-live); border: 1px solid rgba(255,59,48,0.25); }
    .invite-btn.decline:hover { background: rgba(255,59,48,0.25); }
  `]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifs  = signal<any[]>([]);
  loading = signal(true);
  private pollSub?: Subscription;

  constructor(
    private svc: NotificationService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.refresh();
    // Poll every 30s for new notifications
    this.pollSub = interval(30000).subscribe(() => this.refresh());
  }

  ngOnDestroy() { this.pollSub?.unsubscribe(); }

  refresh() {
    this.svc.getMyNotifications().subscribe({
      next: d => { this.notifs.set(d); this.loading.set(false); this.svc.unreadCount.set(d.filter((n:any)=>!n.isRead).length); },
      error: () => this.loading.set(false)
    });
  }

  markRead(n: any) {
    if (n.isRead) return;
    this.svc.markRead(n.id).subscribe(() => {
      this.notifs.update(l => l.map(x => x.id === n.id ? { ...x, isRead: true } : x));
      this.svc.unreadCount.update(c => Math.max(0, c - 1));
    });
  }

  markAllRead() {
    this.svc.markAllRead().subscribe(() => {
      this.notifs.update(l => l.map(x => ({ ...x, isRead: true })));
      this.svc.unreadCount.set(0);
    });
  }

  respondToInvite(n: any, accept: boolean) {
    // Find invite ID from notification body or metadata
    // We call the auction invite respond endpoint
    // For now navigate to auction page to respond
    this.svc.respondToAuctionInvite(n.id, accept).subscribe({
      next: () => {
        this.notifs.update(l => l.map(x => x.id === n.id ? { ...x, responded: true } : x));
      },
      error: () => {}
    });
  }

  typeBadge(type: string) {
    if (type?.includes('Auction')) return 'badge-auction';
    if (type?.includes('Points') || type?.includes('Match')) return 'badge-points';
    if (type?.includes('Transfer')) return 'badge-transfer';
    return 'badge-general';
  }

  typeLabel(type: string) {
    const map: any = {
      AuctionStartingSoon: 'AUCTION',
      MatchPointsUpdated: 'POINTS',
      PlayerMilestone: 'MILESTONE',
      TransferWindowOpen: 'TRANSFER',
      TransferWindowClosing: 'TRANSFER',
      ReserveSwapDecision: 'SQUAD',
      PointsManuallyEdited: 'EDIT',
      GeneralAlert: 'ALERT',
    };
    return map[type] ?? 'ALERT';
  }
}
