import { Component, Inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="app-shell">
      @if (auth.isLoggedIn()) {
        <!-- Top bar -->
        <div class="topbar">
          <span class="brand">���️ AthenaXI</span>
          <div class="topbar-right">
            <span class="user-chip">
              {{ auth.profile()?.teamName ?? auth.profile()?.username }}
              <span class="role-tag">{{ auth.profile()?.role }}</span>
            </span>
            @if (auth.isAdmin()) {
              <a routerLink="/admin" class="topbar-link">⚙️ Admin</a>
            }
            <button class="btn-logout" (click)="auth.logout()">Logout</button>
          </div>
        </div>
      }

      <!-- Page content -->
      <div class="page-content">
        <router-outlet />
      </div>

      <!-- Bottom nav — only when logged in -->
      @if (auth.isLoggedIn()) {
        <nav class="bottom-nav">
          <a routerLink="/leaderboard" class="nav-item">
            <span>���</span><span class="nav-label">Leaderboard</span>
          </a>
          <a routerLink="/auction" class="nav-item">
            <span>���</span><span class="nav-label">Auction</span>
          </a>
          <a routerLink="/team" class="nav-item">
            <span>���</span><span class="nav-label">My Team</span>
          </a>
          <a routerLink="/transfers" class="nav-item">
            <span>���</span><span class="nav-label">Transfers</span>
          </a>
          <a routerLink="/notifications" class="nav-item">
            <span>���</span>
            @if (notifSvc.unreadCount() > 0) {
              <span class="badge">{{ notifSvc.unreadCount() }}</span>
            }
            <span class="nav-label">Alerts</span>
          </a>
        </nav>
      }
    </div>
  `,
  styles: [`
    .app-shell {
      min-height: 100vh; background: #0a0a14;
      color: #fff; font-family: 'Inter', 'Arial', sans-serif;
      display: flex; flex-direction: column;
      padding-bottom: 70px;
    }
    .topbar {
      background: #1a1a2e; border-bottom: 1px solid #C9A84C22;
      padding: 10px 20px;
      display: flex; justify-content: space-between;
      align-items: center; position: sticky; top: 0; z-index: 100;
    }
    .brand { font-size: 18px; font-weight: 800; color: #C9A84C; }
    .topbar-right { display: flex; align-items: center; gap: 12px; }
    .user-chip {
      font-size: 13px; color: #ccc;
      display: flex; align-items: center; gap: 6px;
    }
    .role-tag {
      background: #C9A84C22; color: #C9A84C;
      border-radius: 10px; padding: 2px 8px;
      font-size: 11px; font-weight: 700;
    }
    .topbar-link { color: #aaa; text-decoration: none; font-size: 13px; }
    .btn-logout {
      background: transparent; border: 1px solid #444;
      color: #888; border-radius: 8px;
      padding: 4px 12px; font-size: 12px; cursor: pointer;
    }
    .page-content { flex: 1; }
    .bottom-nav {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: #1a1a2e; border-top: 1px solid #C9A84C22;
      display: flex; justify-content: space-around;
      padding: 8px 0; z-index: 100;
    }
    .nav-item {
      display: flex; flex-direction: column;
      align-items: center; gap: 2px;
      text-decoration: none; color: #666;
      font-size: 20px; position: relative;
      min-width: 44px; min-height: 44px;
      justify-content: center;
    }
    .nav-item:hover, .nav-item.active { color: #C9A84C; }
    .nav-label { font-size: 10px; color: inherit; }
    .badge {
      position: absolute; top: 0; right: 0;
      background: #C0392B; color: #fff;
      border-radius: 10px; padding: 1px 5px;
      font-size: 10px; font-weight: 700;
    }
  `]
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    @Inject(NotificationService) public notifSvc: NotificationService,
    private router: Router
  ) {}
}
