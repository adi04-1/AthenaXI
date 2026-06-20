import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="admin-shell">
      <aside class="admin-sidebar">
        <div class="sidebar-brand">
          <span class="sidebar-helm">⚔️</span>
          <div>
            <div class="athena-brand" style="font-size:16px">AthenaXI</div>
            <div style="font-size:10px;color:var(--gold-dark);letter-spacing:0.1em;text-transform:uppercase">Admin Panel</div>
          </div>
        </div>
        <nav class="sidebar-nav">
          @for (item of navItems; track item.route) {
            <a [routerLink]="item.route" routerLinkActive="active" class="sidebar-nav-item">
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-text">{{ item.label }}</span>
            </a>
          }
        </nav>
        <div class="sidebar-footer">
          <a routerLink="/" class="sidebar-nav-item" style="opacity:0.6">
            <span class="nav-icon">←</span><span class="nav-text">Back to App</span>
          </a>
          <button class="sidebar-nav-item logout-btn" (click)="auth.logout()">
            <span class="nav-icon">➜]</span><span class="nav-text">Logout</span>
          </button>
        </div>
      </aside>

      <div class="admin-mobile-header">
        <span class="athena-brand" style="font-size:15px">⚔️ Admin</span>
        <div style="display:flex;gap:4px">
          @for (item of navItems; track item.route) {
            <a [routerLink]="item.route" routerLinkActive="active" class="mobile-pill" [title]="item.label">{{ item.icon }}</a>
          }
        </div>
      </div>

      <main class="admin-content"><router-outlet /></main>
    </div>
  `,
  styles: [`
    .admin-shell { display:flex; min-height:100vh; background:var(--navy-deep); }
    .admin-sidebar { width:220px; flex-shrink:0; background:rgba(10,31,47,0.98); border-right:1px solid rgba(212,175,55,0.15); display:flex; flex-direction:column; position:sticky; top:0; height:100vh; overflow-y:auto; }
    .sidebar-brand { display:flex; align-items:center; gap:10px; padding:20px 16px; border-bottom:1px solid rgba(212,175,55,0.12); margin-bottom:8px; }
    .sidebar-helm { font-size:28px; filter:drop-shadow(0 0 8px rgba(212,175,55,0.4)); }
    .sidebar-nav { flex:1; padding:0 8px; display:flex; flex-direction:column; gap:2px; }
    .sidebar-footer { padding:8px; border-top:1px solid rgba(212,175,55,0.1); margin-top:8px; display:flex; flex-direction:column; gap:2px; }
    .sidebar-nav-item { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:var(--radius-md); color:#666; text-decoration:none; font-family:var(--font-body); font-size:13px; font-weight:600; transition:all 0.15s; cursor:pointer; border:none; background:none; width:100%; text-align:left; }
    .sidebar-nav-item:hover { background:rgba(212,175,55,0.08); color:#ccc; }
    .sidebar-nav-item.active { background:rgba(212,175,55,0.12); color:var(--gold); border-left:2px solid var(--gold); }
    .nav-icon { font-size:16px; width:20px; text-align:center; flex-shrink:0; }
    .logout-btn { color:#555; }
    .logout-btn:hover { color:var(--red-live); background:rgba(255,59,48,0.08); }
    .admin-content { flex:1; overflow-y:auto; min-height:100vh; }
    .admin-mobile-header { display:none; position:sticky; top:0; z-index:50; background:rgba(10,31,47,0.97); border-bottom:1px solid rgba(212,175,55,0.15); padding:10px 16px; align-items:center; justify-content:space-between; backdrop-filter:blur(12px); }
    .mobile-pill { width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:var(--radius-md); color:#666; text-decoration:none; font-size:16px; border:1px solid transparent; transition:all 0.15s; }
    .mobile-pill.active { background:rgba(212,175,55,0.12); border-color:rgba(212,175,55,0.3); color:var(--gold); }
    @media (max-width:768px) { .admin-sidebar { display:none; } .admin-mobile-header { display:flex; } .admin-shell { flex-direction:column; } }
  `]
})
export class AdminComponent {
  navItems = [
    { route: 'seasons',       icon: '📆', label: 'Seasons' },
    { route: 'auction',       icon: '👨‍⚖', label: 'Auction Lobby' },
    { route: 'players',       icon: '📤', label: 'Player Upload' },
    { route: 'notifications', icon: '🔔', label: 'Notifications' },
  ];
  constructor(public auth: AuthService) {}
}
