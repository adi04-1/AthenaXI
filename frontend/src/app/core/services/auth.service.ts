import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, UserProfile, UserRole } from '../models/auth.models';

const TOKEN_KEY   = 'athenaxi_token';
const PROFILE_KEY = 'athenaxi_profile';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _profile = signal<UserProfile | null>(this.loadProfile());
  private _token   = signal<string | null>(this.loadToken());

  // Public readable signals
  profile  = this._profile.asReadonly();
  token    = this._token.asReadonly();
  isLoggedIn = computed(() => !!this._token());
  role       = computed(() => this._profile()?.role ?? null);

  // Role helpers
  isAppOwner    = computed(() => this.role() === 'AppOwner');
  isAdmin       = computed(() => ['AppOwner','LeagueAdmin'].includes(this.role() ?? ''));
  isTeamOwner   = computed(() => this.role() === 'TeamOwner');
  isImpersonating = computed(() => this._profile()?.isImpersonating ?? false);

  constructor(private http: HttpClient, private router: Router) {}

  login(req: LoginRequest) {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, req)
      .pipe(tap(res => this.saveSession(res)));
  }

  me() {
    return this.http
      .get<UserProfile>(`${environment.apiUrl}/auth/me`)
      .pipe(tap(profile => {
        this._profile.set(profile);
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      }));
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(PROFILE_KEY);
    this._token.set(null);
    this._profile.set(null);
    this.router.navigate(['/login']);
  }

  private saveSession(res: AuthResponse) {
    localStorage.setItem(TOKEN_KEY, res.token);
    const profile: UserProfile = {
      id:              res.userId,
      username:        res.username,
      email:           '',
      role:            res.role,
      teamName:        res.teamName,
      isImpersonating: false,
      impersonatedBy:  null,
      createdAt:       new Date().toISOString(),
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    this._token.set(res.token);
    this._profile.set(profile);
  }

  private loadToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private loadProfile(): UserProfile | null {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
