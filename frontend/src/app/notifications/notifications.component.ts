import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="athena-page">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
        <h1 class="athena-page-title" style="margin-bottom:0">🚨 Alerts</h1>
        @if (notifs().length > 0) {
          <button class="athena-btn athena-btn-secondary" style="padding:6px 14px;font-size:12px" (click)="markAllRead()">
            ✅ Mark all read
          </button>
        }
      </div>

      @if (notifs().length === 0) {
        <div class="athena-card" style="text-align:center;padding:48px;color:#555">
          <span style="font-size:36px;display:block;margin-bottom:12px">🔔</span>
          No notifications yet.
        </div>
      }

      @for (n of notifs(); track n.id) {
        <div class="notif-row athena-card-sm" [class.unread]="!n.isRead" (click)="markRead(n)" style="margin-bottom:10px;cursor:pointer">
          <div style="flex:1">
            <p style="font-family:var(--font-body);font-size:14px;font-weight:700;color:#fff;margin:0 0 4px">{{ n.title }}</p>
            <p style="font-size:13px;color:#aaa;margin:0">{{ n.body }}</p>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">
            <span style="font-size:11px;color:#555">{{ n.createdAt | date:'shortTime' }}</span>
            @if (!n.isRead) {
              <span style="width:8px;height:8px;border-radius:50%;background:var(--gold);display:block"></span>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .notif-row {
      display: flex; align-items: flex-start; gap: 14px;
      border-left: 3px solid transparent;
      transition: all 0.15s;
    }
    .notif-row.unread { border-left-color: var(--gold); }
    .notif-row:hover { background: rgba(30,58,95,0.6) !important; }
  `]
})
export class NotificationsComponent implements OnInit {
  notifs = signal<any[]>([]);
  constructor(private svc: NotificationService) {}
  ngOnInit() { this.svc.getMyNotifications().subscribe(d => this.notifs.set(d)); }
  markRead(n: any) {
    if (n.isRead) return;
    this.svc.markRead(n.id).subscribe(() => {
      this.notifs.update(l => l.map(x => x.id === n.id ? { ...x, isRead: true } : x));
      this.svc.refreshUnreadCount().subscribe();
    });
  }
  markAllRead() {
    this.svc.markAllRead().subscribe(() => {
      this.notifs.update(l => l.map(x => ({ ...x, isRead: true })));
      this.svc.unreadCount.set(0);
    });
  }
}
