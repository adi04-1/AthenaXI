import { Component, OnInit, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">��� Notifications</h1>
        @if (notifs().length > 0) {
          <button class="btn-mark" (click)="markAllRead()">Mark all read</button>
        }
      </div>
      @for (n of notifs(); track n.id) {
        <div class="notif-row" [class.unread]="!n.isRead" (click)="markRead(n)">
          <div>
            <p class="notif-title">{{ n.title }}</p>
            <p class="notif-body">{{ n.body }}</p>
          </div>
          <span class="time">{{ n.createdAt | date:'shortTime' }}</span>
        </div>
      }
      @if (notifs().length === 0) {
        <div class="empty">No notifications yet.</div>
      }
    </div>
  `,
  styles: [`
    .page { padding: 16px; max-width: 600px; margin: 0 auto; }
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
    .page-title { font-size: 22px; font-weight: 800; color: #C9A84C; margin: 0; }
    .btn-mark { background: transparent; border: 1px solid #444; color: #888; border-radius: 8px; padding: 6px 12px; font-size: 12px; cursor: pointer; }
    .notif-row { background: #1a1a2e; border-radius: 10px; padding: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; border-left: 3px solid transparent; cursor: pointer; }
    .notif-row.unread { border-left-color: #C9A84C; }
    .notif-title { font-size: 14px; font-weight: 700; color: #fff; margin: 0 0 4px; }
    .notif-body { font-size: 13px; color: #aaa; margin: 0; }
    .time { font-size: 11px; color: #555; white-space: nowrap; }
    .empty { text-align: center; color: #555; padding: 40px; }
  `]
})
export class NotificationsComponent implements OnInit {
  notifs = signal<any[]>([]);
  constructor(@Inject(NotificationService) private svc: NotificationService) {}
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
