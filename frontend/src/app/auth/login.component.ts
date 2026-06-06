import { Component, signal } from '@angular/core';
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
      <div class="login-card">

        <!-- Logo -->
        <div class="logo">
          <span class="logo-icon">���️</span>
          <h1 class="logo-text">AthenaXI</h1>
          <p class="logo-sub">Fantasy IPL — Strategy of the Gods</p>
        </div>

        <!-- Error -->
        <div *ngIf="error()" class="error-banner">{{ error() }}</div>

        <!-- Form -->
        <div class="form">
          <div class="field">
            <label>Username</label>
            <input
              type="text"
              [(ngModel)]="username"
              placeholder="your_team"
              autocomplete="username"
              [disabled]="loading()" />
          </div>

          <div class="field">
            <label>Password</label>
            <input
              type="password"
              [(ngModel)]="password"
              placeholder="••••••••"
              autocomplete="current-password"
              [disabled]="loading()"
              (keyup.enter)="login()" />
          </div>

          <button
            class="btn-login"
            (click)="login()"
            [disabled]="loading() || !username || !password">
            {{ loading() ? 'Signing in...' : 'Sign In' }}
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
      background: #0f0f1a;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .login-card {
      background: #1a1a2e;
      border: 1px solid #C9A84C33;
      border-radius: 16px;
      padding: 40px 32px;
      width: 100%;
      max-width: 380px;
    }
    .logo { text-align: center; margin-bottom: 32px; }
    .logo-icon { font-size: 48px; }
    .logo-text {
      font-size: 28px; font-weight: 800;
      color: #C9A84C; margin: 8px 0 4px;
      letter-spacing: 1px;
    }
    .logo-sub { color: #888; font-size: 13px; }
    .error-banner {
      background: #3a0a0a; border: 1px solid #C0392B;
      color: #ff6b6b; border-radius: 8px;
      padding: 10px 14px; font-size: 13px;
      margin-bottom: 16px;
    }
    .form { display: flex; flex-direction: column; gap: 16px; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    label { color: #aaa; font-size: 13px; font-weight: 600; }
    input {
      background: #0f0f1a; border: 1px solid #333;
      border-radius: 8px; padding: 12px 14px;
      color: #fff; font-size: 15px; outline: none;
      transition: border-color 0.2s;
    }
    input:focus { border-color: #C9A84C; }
    input:disabled { opacity: 0.5; }
    .btn-login {
      background: #C9A84C; color: #0f0f1a;
      border: none; border-radius: 8px;
      padding: 14px; font-size: 15px;
      font-weight: 700; cursor: pointer;
      transition: opacity 0.2s; margin-top: 8px;
    }
    .btn-login:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-login:not(:disabled):hover { opacity: 0.9; }
    .guest-link {
      text-align: center; margin-top: 20px;
      color: #666; font-size: 13px;
    }
    .guest-link a { color: #C9A84C; text-decoration: none; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading  = signal(false);
  error    = signal('');

  constructor(private auth: AuthService, private router: Router) {
    // Redirect if already logged in
    if (this.auth.isLoggedIn()) this.router.navigate(['/']);
  }

  login() {
    if (!this.username || !this.password) return;
    this.loading.set(true);
    this.error.set('');

    this.auth.login({ username: this.username, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => {
          this.error.set('Invalid username or password. Please try again.');
          this.loading.set(false);
        }
      });
  }
}
