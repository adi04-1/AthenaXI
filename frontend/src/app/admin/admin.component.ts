import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({ selector: 'app-admin', standalone: true, imports: [CommonModule, RouterLink],
  template: `
    <div class="page">
      <h1 class="t">⚙️ Admin Panel</h1>
      <div class="grid">
        <a routerLink="/season-setup" class="card">📅 Season Setup</a>
        <a routerLink="/auction" class="card">🔨 Auction Control</a>
        <div class="card muted">🔄 Score Sync</div>
        <div class="card muted">👥 Users</div>
      </div>
    </div>`,
  styles: [`.page{padding:16px} .t{color:#C9A84C;font-size:22px;font-weight:800;margin-bottom:20px} .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px} .card{background:#1a1a2e;border:1px solid #C9A84C33;border-radius:12px;padding:20px;color:#fff;text-decoration:none;font-weight:700;display:block} .card.muted{color:#555;border-color:#333}`]
})
export class AdminComponent {}
