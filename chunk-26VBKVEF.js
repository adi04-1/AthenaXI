import {
  Router
} from "./chunk-LNJWB5JP.js";
import {
  HttpClient,
  environment
} from "./chunk-STS7VQLQ.js";
import {
  computed,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6BYAOC4F.js";

// src/app/core/services/auth.service.ts
var TOKEN_KEY = "athenaxi_token";
var PROFILE_KEY = "athenaxi_profile";
var AuthService = class _AuthService {
  constructor(http, router) {
    this.http = http;
    this.router = router;
    this._profile = signal(this.loadProfile());
    this._token = signal(this.loadToken());
    this.profile = this._profile.asReadonly();
    this.token = this._token.asReadonly();
    this.isLoggedIn = computed(() => !!this._token());
    this.role = computed(() => this._profile()?.role ?? null);
    this.isAppOwner = computed(() => this.role() === "AppOwner");
    this.isAdmin = computed(() => ["AppOwner", "LeagueAdmin"].includes(this.role() ?? ""));
    this.isTeamOwner = computed(() => this.role() === "TeamOwner");
    this.isImpersonating = computed(() => this._profile()?.isImpersonating ?? false);
  }
  login(req) {
    return this.http.post(`${environment.apiUrl}/auth/login`, req).pipe(tap((res) => this.saveSession(res)));
  }
  me() {
    return this.http.get(`${environment.apiUrl}/auth/me`).pipe(tap((profile) => {
      this._profile.set(profile);
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }));
  }
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(PROFILE_KEY);
    this._token.set(null);
    this._profile.set(null);
    this.router.navigate(["/login"]);
  }
  saveSession(res) {
    localStorage.setItem(TOKEN_KEY, res.token);
    const profile = {
      id: res.userId,
      username: res.username,
      email: "",
      role: res.role,
      teamName: res.teamName,
      isImpersonating: false,
      impersonatedBy: null,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    this._token.set(res.token);
    this._profile.set(profile);
  }
  loadToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  loadProfile() {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-26VBKVEF.js.map
