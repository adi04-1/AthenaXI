import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-shell">

      <!-- Top Bar -->
      @if (auth.isLoggedIn()) {
        <header class="athena-topbar">
          <div class="brand-row">
            <span class="athena-brand">‚öîÔ∏è AthenaXI</span>
          </div>
          <div class="topbar-right">
            @if (auth.isImpersonating()) {
              <span class="impersonation-chip">Ì±Å Impersonating</span>
            }
            <div class="user-chip">
              <span class="user-name">{{ auth.profile()?.teamName ?? auth.profile()?.username }}</span>
              <span class="athena-badge athena-badge-gold">{{ auth.profile()?.role }}</span>
            </div>
            @if (auth.isAdmin()) {
              <a routerLink="/admin" class="topbar-icon-btn" title="Admin Panel">‚öôÔ∏è</a>
            }
            <button class="athena-btn athena-btn-secondary topbar-logout" (click)="auth.logout()">
              ‚Üí Logout
            </button>
          </div>
        </header>
      }

      <!-- Page -->
      <main class="page-content">
        <router-outlet />
      </main>

      <!-- Bottom Nav -->
      @if (auth.isLoggedIn()) {
        <nav class="athena-bottom-nav">
          <a routerLink="/leaderboard" routerLinkActive="active" class="athena-nav-item">
            <span>Ì≥ä</span>
            <span class="nav-label">Leaderboard</span>
          </a>
          <a routerLink="/auction" routerLinkActive="active" class="athena-nav-item">
            <span>Ì¥®</span>
            <span class="nav-label">Auction</span>
          </a>
          <a routerLink="/team" routerLinkActive="active" class="athena-nav-item">
            <span>Ìøè</span>
            <span class="nav-label">My Team</span>
          </a>
          <a routerLink="/transfers" routerLinkActive="active" class="athena-nav-item">
            <span>Ì¥Ñ</span>
            <span class="nav-label">Transfers</span>
          </a>
          <a routerLink="/notifications" routerLinkActive="active" class="athena-nav-item notif-item">
            <span>Ì¥î</span>
            @if (notifSvc.unreadCount() > 0) {
              <span class="notif-badge">{{ notifSvc.unreadCount() }}</span>
            }
            <span class="nav-label">Alerts</span>
          </a>
        </nav>
      }
    </div>
  `,
  styles: [`
    .app-shell {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding-bottom: 70px;
    }
    .page-content { flex: 1; }

    /* Topbar extras */
    .brand-row { display: flex; align-items: center; gap: 10px; }
    .topbar-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .user-chip { display: flex; align-items: center; gap: 8px; }
    .user-name { font-size: 13px; color: #ccc; font-weight: 600; }
    .topbar-icon-btn {
      font-size: 18px; text-decoration: none;
      opacity: 0.7; transition: opacity 0.15s;
    }
    .topbar-icon-btn:hover { opacity: 1; }
    .topbar-logout {
      font-size: 12px !important;
      padding: 5px 12px !important;
    }
    .impersonation-chip {
      font-size: 11px; font-weight: 700;
      color: var(--red-live);
      background: rgba(255,59,48,0.12);
      border: 1px solid rgba(255,59,48,0.3);
      border-radius: 20px;
      padding: 3px 10px;
      animation: pulse-dot 1.5s infinite;
    }

    /* Notification badge */
    .notif-item { position: relative; }
    .notif-badge {
      position: absolute; top: 2px; right: 4px;
      background: var(--red-live);
      color: #fff;
      border-radius: 10px;
      padding: 1px 5px;
      font-size: 10px;
      font-weight: 700;
      font-family: var(--font-body);
      min-width: 16px;
      text-align: center;
      line-height: 1.4;
    }

    @media (min-width: 1024px) {
      .athena-bottom-nav { display: none; }
      .app-shell { padding-bottom: 0; }
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService, public notifSvc: NotificationService) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.notifSvc.refreshUnreadCount().subscribe();
    }
  }
}
