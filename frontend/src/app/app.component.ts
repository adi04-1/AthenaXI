import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-shell">

      <!-- Top Bar â€” hidden inside /admin -->
      @if (auth.isLoggedIn()) {
        <header class="athena-topbar">
          <span class="athena-brand">AthenaXI</span>
          <div class="topbar-right">
            <div class="user-info">
              <span class="user-name">{{ auth.profile()?.teamName ?? auth.profile()?.username }}</span>
              <span class="athena-badge athena-badge-gold">{{ auth.profile()?.role }}</span>
            </div>
            @if (auth.isAdmin()) {
              <a routerLink="/admin" class="topbar-admin-btn">Admin</a>
            }
            <button class="topbar-logout-btn" (click)="auth.logout()">Logout</button>
          </div>
        </header>
      }



      <main class="page-content">
        <router-outlet />
      </main>

      <!-- Bottom Nav â€” ONLY on non-admin routes, only for logged in users -->
      @if (auth.isLoggedIn() && !isAdminRoute()) {
        <nav class="athena-bottom-nav">
          <a routerLink="/leaderboard" routerLinkActive="active" class="athena-nav-item">
            <span class="nav-icon-text">LB</span>
            <span class="nav-label">Leaderboard</span>
          </a>
          @if (auth.isAdmin()) {
            <a routerLink="/admin" class="athena-nav-item">
              <span class="nav-icon-text">ADM</span>
              <span class="nav-label">Admin</span>
            </a>
          }
          @if (!auth.isAdmin()) {
            <a routerLink="/auction" routerLinkActive="active" class="athena-nav-item">
              <span class="nav-icon-text">AUC</span>
              <span class="nav-label">Auction</span>
            </a>
            <a routerLink="/team" routerLinkActive="active" class="athena-nav-item">
              <span class="nav-icon-text">TEAM</span>
              <span class="nav-label">My Team</span>
            </a>
            <a routerLink="/transfers" routerLinkActive="active" class="athena-nav-item">
              <span class="nav-icon-text">TRF</span>
              <span class="nav-label">Transfers</span>
            </a>
          }
          <a routerLink="/notifications" routerLinkActive="active" class="athena-nav-item notif-wrap">
            <span class="nav-icon-text">
              BELL
              @if (notifSvc.unreadCount() > 0) {
                <span class="notif-dot"></span>
              }
            </span>
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
    }
    .page-content { flex: 1; }

    /* Topbar */
    .topbar-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .user-info { display: flex; align-items: center; gap: 8px; }
    .user-name { font-size: 13px; color: #ccc; font-weight: 600; font-family: var(--font-body); }
    .topbar-admin-btn {
      font-family: var(--font-body); font-size: 12px; font-weight: 700;
      color: var(--gold); text-decoration: none;
      border: 1px solid rgba(212,175,55,0.3); border-radius: 6px;
      padding: 4px 10px; transition: all 0.15s;
    }
    .topbar-admin-btn:hover { background: rgba(212,175,55,0.1); }
    .topbar-logout-btn {
      font-family: var(--font-body); font-size: 12px; color: #666;
      background: none; border: 1px solid #333; border-radius: 6px;
      padding: 4px 10px; cursor: pointer; transition: all 0.15s;
    }
    .topbar-logout-btn:hover { color: #fff; border-color: #555; }

    /* Bottom nav â€” text labels instead of emojis */
    .app-shell { padding-bottom: 70px; }
    .nav-icon-text {
      font-family: var(--font-timer);
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 0.06em;
      color: inherit;
      position: relative;
      display: block;
    }
    .notif-wrap { position: relative; }
    .notif-dot {
      position: absolute;
      top: -2px; right: -4px;
      width: 7px; height: 7px;
      border-radius: 50%;
      background: var(--red-live);
      box-shadow: 0 0 4px var(--red-live);
    }

    /* Hide bottom padding in admin */
    @media (min-width: 1024px) {
      .athena-bottom-nav { display: none; }
      .app-shell { padding-bottom: 0; }
    }
  `]
})
export class AppComponent implements OnInit {
  private currentUrl = '';

  constructor(
    public auth: AuthService,
    public notifSvc: NotificationService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => this.currentUrl = e.urlAfterRedirects);
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.notifSvc.refreshUnreadCount().subscribe();
    }
  }

  isAdminRoute() { return this.currentUrl.startsWith('/admin'); }
  isAdmin() { return this.auth.isAdmin(); }
}
