import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';
import { SeasonService } from './core/services/season.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-shell" [class.with-sidebar]="auth.isLoggedIn() && !isAdminRoute()">

      <!-- â”€â”€ Desktop sidebar (TeamOwner/Guest/Admin-as-user view) â”€â”€ -->
      @if (auth.isLoggedIn() && !isAdminRoute()) {
        <aside class="app-sidebar">
          <div class="sidebar-brand">
            <!-- <span class="athena-brand" style="font-size:16px">AthenaXI</span> -->
             <img src="assets/Athena_header_logo.png" alt="AthenaXI" style="height:60px;width:auto">
          </div>

          <div class="sidebar-user">
            <span class="user-name">{{ auth.profile()?.teamName ?? auth.profile()?.username }}</span>
            <span class="athena-badge athena-badge-gold">{{ auth.profile()?.role }}</span>
          </div>

          <nav class="sidebar-nav">
            <a routerLink="/leaderboard" routerLinkActive="active" class="sidebar-nav-item">
              <span class="nav-icon-text">🏆</span><span class="nav-text">Leaderboard</span>
            </a>
            @if (auth.isAdmin()) {
              <a routerLink="/admin" class="sidebar-nav-item">
                <span class="nav-icon-text">👮</span><span class="nav-text">Admin Panel</span>
              </a>
            } @else {
              <a routerLink="/auction" routerLinkActive="active" class="sidebar-nav-item">
                <span class="nav-icon-text">👨‍⚖</span><span class="nav-text">Auction</span>
              </a>
              <a routerLink="/team" routerLinkActive="active" class="sidebar-nav-item">
                <span class="nav-icon-text">👥</span><span class="nav-text">My Team</span>
              </a>
              <a routerLink="/transfers" routerLinkActive="active" class="sidebar-nav-item">
                <span class="nav-icon-text">🔄</span><span class="nav-text">Transfers</span>
              </a>
            }
            <a routerLink="/notifications" routerLinkActive="active" class="sidebar-nav-item">
              <span class="nav-icon-text notif-wrap">
                🔔
                @if (notifSvc.unreadCount() > 0) { <span class="notif-dot"></span> }
              </span>
              <span class="nav-text">Alerts</span>
            </a>
          </nav>

          <div class="sidebar-footer">
            <button class="sidebar-nav-item logout-btn" (click)="auth.logout()">
              <span class="nav-icon-text">🚪</span><span class="nav-text">Logout</span>
            </button>
          </div>
        </aside>
      }

      <!-- â”€â”€ Mobile topbar â”€â”€ -->
      @if (auth.isLoggedIn() && !isAdminRoute()) {
        <header class="mobile-topbar">
          <span class="athena-brand" style="font-size:16px">AthenaXI</span>
          <div class="mobile-topbar-right">
            <span class="athena-badge athena-badge-gold mobile-role-badge">{{ auth.profile()?.role }}</span>
            @if (auth.isAdmin()) {
              <a routerLink="/admin" class="mobile-admin-link">Admin</a>
            }
            <button class="mobile-logout-btn" (click)="auth.logout()">Logout</button>
          </div>
        </header>
      }

      <main class="page-content">
        <router-outlet />
      </main>

      <!-- â”€â”€ Mobile bottom nav â”€â”€ -->
      @if (auth.isLoggedIn() && !isAdminRoute()) {
        <nav class="athena-bottom-nav">
          <a routerLink="/leaderboard" routerLinkActive="active" class="athena-nav-item">
            <span class="nav-icon-text">🏆</span>
            <span class="nav-label">Leaderboard</span>
          </a>
          @if (auth.isAdmin()) {
            <a routerLink="/admin" class="athena-nav-item">
              <span class="nav-icon-text">👮</span>
              <span class="nav-label">Admin</span>
            </a>
          } @else {
            <a routerLink="/auction" routerLinkActive="active" class="athena-nav-item">
              <span class="nav-icon-text">👨‍⚖</span>
              <span class="nav-label">Auction</span>
            </a>
            <a routerLink="/team" routerLinkActive="active" class="athena-nav-item">
              <span class="nav-icon-text">👥</span>
              <span class="nav-label">My Team</span>
            </a>
            <a routerLink="/transfers" routerLinkActive="active" class="athena-nav-item">
              <span class="nav-icon-text">🔄</span>
              <span class="nav-label">Transfers</span>
            </a>
          }
          <a routerLink="/notifications" routerLinkActive="active" class="athena-nav-item notif-item">
            <span class="nav-icon-text">
              🔔
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
    /* â”€â”€ Shell layout â”€â”€ */
    .app-shell { min-height:100vh; display:flex; flex-direction:column; }
    .app-shell.with-sidebar { padding-bottom:70px; } /* mobile bottom-nav clearance */
    .page-content { flex:1; min-width:0; }

    /* â”€â”€ Desktop sidebar (hidden by default, shown >=768px) â”€â”€ */
    .app-sidebar { display:none; }
    .sidebar-brand { padding:20px 18px 16px; border-bottom:1px solid rgba(212,175,55,0.1); }
    .sidebar-user { display:flex; flex-direction:column; gap:6px; padding:14px 18px; border-bottom:1px solid rgba(212,175,55,0.08); }
    .user-name { font-size:13px; color:#ccc; font-weight:700; font-family:var(--font-body); }
    .sidebar-nav { flex:1; padding:10px 8px; display:flex; flex-direction:column; gap:2px; }
    .sidebar-nav-item { display:flex; align-items:center; gap:12px; padding:11px 14px; border-radius:var(--radius-md); color:#777; text-decoration:none; font-family:var(--font-body); font-size:13px; font-weight:600; transition:all 0.15s; cursor:pointer; border:none; background:none; width:100%; text-align:left; }
    .sidebar-nav-item:hover { background:rgba(212,175,55,0.08); color:#ccc; }
    .sidebar-nav-item.active { background:rgba(212,175,55,0.12); color:var(--gold); border-left:2px solid var(--gold); }
    .sidebar-footer { padding:10px 8px 16px; border-top:1px solid rgba(212,175,55,0.08); }
    .logout-btn { color:#777; }
    .logout-btn:hover { color:var(--red-live); background:rgba(255,59,48,0.06); }
    .nav-icon-text { font-family:var(--font-timer); font-size:10px; font-weight:900; letter-spacing:0.06em; flex-shrink:0; position:relative; }
    .notif-wrap { position:relative; }
    .notif-dot { position:absolute; top:-3px; right:-7px; width:7px; height:7px; border-radius:50%; background:var(--red-live); }

    /* â”€â”€ Mobile topbar (shown by default, hidden >=768px) â”€â”€ */
    .mobile-topbar { background:rgba(10,31,47,0.97); border-bottom:1px solid rgba(212,175,55,0.18); padding:10px 16px; display:flex; align-items:center; justify-content:space-between; gap:10px; position:sticky; top:0; z-index:50; backdrop-filter:blur(12px); }
    .mobile-topbar-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }
    .mobile-role-badge { font-size:10px !important; padding:2px 8px !important; }
    .mobile-admin-link { font-size:11px; font-weight:700; color:var(--gold); text-decoration:none; border:1px solid rgba(212,175,55,0.3); border-radius:6px; padding:4px 9px; white-space:nowrap; }
    .mobile-logout-btn { font-size:11px; color:#666; background:none; border:1px solid #333; border-radius:6px; padding:4px 9px; cursor:pointer; white-space:nowrap; }
    .mobile-logout-btn:hover { color:#fff; border-color:#555; }

    /* â”€â”€ Mobile bottom nav â”€â”€ */
    .athena-bottom-nav { display:flex; }
    .notif-item { position:relative; }

    /* â”€â”€ Breakpoint: switch to desktop sidebar layout â”€â”€ */
    @media (min-width:768px) {
      .app-shell.with-sidebar { display:flex; flex-direction:row; padding-bottom:0; }
      .app-sidebar { display:flex; flex-direction:column; width:220px; flex-shrink:0; background:rgba(10,31,47,0.98); border-right:1px solid rgba(212,175,55,0.15); position:sticky; top:0; height:100vh; overflow-y:auto; }
      .mobile-topbar { display:none; }
      .athena-bottom-nav { display:none; }
      .page-content { flex:1; min-width:0; }
    }
  `]
})
export class AppComponent implements OnInit {
  private url = '';

  constructor(
    public auth: AuthService,
    public notifSvc: NotificationService,
    private seasonSvc: SeasonService,
    private router: Router
  ) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.url = e.urlAfterRedirects);
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.notifSvc.refreshUnreadCount().subscribe();
      this.seasonSvc.loadAndCacheActive();
    }
  }

  isAdminRoute() { return this.url.startsWith('/admin'); }
}
