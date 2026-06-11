import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="login-shell">
      <div class="login-card athena-card athena-player-card">

        <!-- Logo -->
        <div class="login-logo">
          <div class="logo-helmet">⚔️</div>
          <h1 class="athena-heading login-title">AthenaXI</h1>
          <p class="login-tagline">Strategy. Auction. Glory.</p>
        </div>

        @if (error()) {
          <div class="athena-error animate-fade-in">{{ error() }}</div>
        }

        <div class="athena-fields">
          <div class="athena-field">
            <label class="athena-field-label">Username</label>
            <input class="athena-input" type="text" [(ngModel)]="username"
              placeholder="your_team" autocomplete="username"
              [disabled]="loading()" />
          </div>
          <div class="athena-field">
            <label class="athena-field-label">Password</label>
            <input class="athena-input" type="password" [(ngModel)]="password"
              placeholder="••••••••" autocomplete="current-password"
              [disabled]="loading()" (keyup.enter)="login()" />
          </div>
          <button class="athena-btn athena-btn-primary login-btn"
            (click)="login()"
            [disabled]="loading() || !username || !password">
            @if (loading()) { <span>Entering the arena...</span> }
            @else { <span>⚔️ Enter the Arena</span> }
          </button>
        </div>

        <p class="guest-link">
          Just watching? <a routerLink="/leaderboard">View Leaderboard →</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login-shell {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 40px 32px;
    }
    .login-logo {
      text-align: center;
      margin-bottom: 36px;
    }
    .logo-helmet {
      font-size: 52px;
      margin-bottom: 8px;
      filter: drop-shadow(0 0 16px rgba(212,175,55,0.4));
    }
    .login-title {
      font-size: 32px;
      letter-spacing: 0.2em;
      display: block;
      margin-bottom: 6px;
    }
    .login-tagline {
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--gold-dark);
      letter-spacing: 0.25em;
      text-transform: uppercase;
    }
    .login-btn {
      width: 100%;
      padding: 14px !important;
      font-size: 15px !important;
      margin-top: 4px;
      letter-spacing: 0.06em;
    }
    .guest-link {
      text-align: center;
      margin-top: 24px;
      font-size: 13px;
      color: #555;
      font-family: var(--font-body);
    }
    .guest-link a { color: var(--gold-dark); text-decoration: none; }
    .guest-link a:hover { color: var(--gold); }
  `]
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  loading  = signal(false);
  error    = signal('');

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) this.router.navigate(['/']);
  }

  login() {
    if (!this.username || !this.password) return;
    this.loading.set(true);
    this.error.set('');
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.error.set('Invalid credentials. Check your username and password.');
        this.loading.set(false);
      }
    });
  }
}
