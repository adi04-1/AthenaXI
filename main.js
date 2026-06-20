import {
  NotificationService
} from "./chunk-GC4QY3GN.js";
import {
  SeasonService
} from "./chunk-V7UAWJAK.js";
import {
  AuthService
} from "./chunk-26VBKVEF.js";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  bootstrapApplication,
  provideRouter,
  withHashLocation
} from "./chunk-LNJWB5JP.js";
import {
  provideHttpClient,
  withInterceptors
} from "./chunk-STS7VQLQ.js";
import {
  CommonModule,
  filter,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-6BYAOC4F.js";

// src/app/core/guards/auth.guard.ts
var authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn())
    return true;
  return router.createUrlTree(["/login"]);
};
var adminGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAdmin())
    return true;
  return router.createUrlTree(["/"]);
};

// src/app/app.routes.ts
var routes = [
  { path: "", redirectTo: "leaderboard", pathMatch: "full" },
  { path: "login", loadComponent: () => import("./chunk-MPK3G3F4.js").then((m) => m.LoginComponent) },
  { path: "leaderboard", loadComponent: () => import("./chunk-3FHTTQFK.js").then((m) => m.LeaderboardComponent) },
  { path: "team", loadComponent: () => import("./chunk-QPHKEJZ2.js").then((m) => m.TeamBuilderComponent), canActivate: [authGuard] },
  { path: "auction", loadComponent: () => import("./chunk-JGTGHKLZ.js").then((m) => m.AuctionRoomComponent), canActivate: [authGuard] },
  { path: "transfers", loadComponent: () => import("./chunk-JQALSXTQ.js").then((m) => m.TransfersComponent), canActivate: [authGuard] },
  { path: "notifications", loadComponent: () => import("./chunk-HJF7QM2Z.js").then((m) => m.NotificationsComponent), canActivate: [authGuard] },
  // ── Admin — full-screen layout with child routes ──────────────────────────
  {
    path: "admin",
    loadComponent: () => import("./chunk-P2RO6LS4.js").then((m) => m.AdminComponent),
    canActivate: [adminGuard],
    children: [
      { path: "", redirectTo: "seasons", pathMatch: "full" },
      { path: "seasons", loadComponent: () => import("./chunk-S27UVO6P.js").then((m) => m.SeasonsAdminComponent) },
      { path: "players", loadComponent: () => import("./chunk-4GJBLJMZ.js").then((m) => m.PlayersAdminComponent) },
      { path: "auction", loadComponent: () => import("./chunk-P2YETTY4.js").then((m) => m.AuctionLobbyComponent) },
      { path: "notifications", loadComponent: () => import("./chunk-RFHANQ4L.js").then((m) => m.NotificationsAdminComponent) }
    ]
  },
  // Keep old /season-setup as redirect
  { path: "season-setup", redirectTo: "admin/seasons", pathMatch: "full" },
  { path: "**", redirectTo: "leaderboard" }
];

// src/app/core/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.token();
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};

// src/app/app.component.ts
function AppComponent_Conditional_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 14)(1, "span", 12);
    \u0275\u0275text(2, "\u{1F46E}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 13);
    \u0275\u0275text(4, "Admin Panel");
    \u0275\u0275elementEnd()();
  }
}
function AppComponent_Conditional_1_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 20)(1, "span", 12);
    \u0275\u0275text(2, "\u{1F468}\u200D\u2696");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 13);
    \u0275\u0275text(4, "Auction");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "a", 21)(6, "span", 12);
    \u0275\u0275text(7, "\u{1F465}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 13);
    \u0275\u0275text(9, "My Team");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "a", 22)(11, "span", 12);
    \u0275\u0275text(12, "\u{1F504}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 13);
    \u0275\u0275text(14, "Transfers");
    \u0275\u0275elementEnd()();
  }
}
function AppComponent_Conditional_1_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 17);
  }
}
function AppComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 1)(1, "div", 5);
    \u0275\u0275element(2, "img", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 7)(4, "span", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 9);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "nav", 10)(9, "a", 11)(10, "span", 12);
    \u0275\u0275text(11, "\u{1F3C6}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 13);
    \u0275\u0275text(13, "Leaderboard");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, AppComponent_Conditional_1_Conditional_14_Template, 5, 0, "a", 14)(15, AppComponent_Conditional_1_Conditional_15_Template, 15, 0);
    \u0275\u0275elementStart(16, "a", 15)(17, "span", 16);
    \u0275\u0275text(18, " \u{1F514} ");
    \u0275\u0275template(19, AppComponent_Conditional_1_Conditional_19_Template, 1, 0, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 13);
    \u0275\u0275text(21, "Alerts");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 18)(23, "button", 19);
    \u0275\u0275listener("click", function AppComponent_Conditional_1_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.auth.logout());
    });
    \u0275\u0275elementStart(24, "span", 12);
    \u0275\u0275text(25, "\u{1F6AA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 13);
    \u0275\u0275text(27, "Logout");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((tmp_1_0 = (tmp_1_0 = ctx_r1.auth.profile()) == null ? null : tmp_1_0.teamName) !== null && tmp_1_0 !== void 0 ? tmp_1_0 : (tmp_1_0 = ctx_r1.auth.profile()) == null ? null : tmp_1_0.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r1.auth.profile()) == null ? null : tmp_2_0.role);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(14, ctx_r1.auth.isAdmin() ? 14 : 15);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(19, ctx_r1.notifSvc.unreadCount() > 0 ? 19 : -1);
  }
}
function AppComponent_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 26);
    \u0275\u0275text(1, "Admin");
    \u0275\u0275elementEnd();
  }
}
function AppComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 2)(1, "span", 23);
    \u0275\u0275text(2, "AthenaXI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 24)(4, "span", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, AppComponent_Conditional_2_Conditional_6_Template, 2, 0, "a", 26);
    \u0275\u0275elementStart(7, "button", 27);
    \u0275\u0275listener("click", function AppComponent_Conditional_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.auth.logout());
    });
    \u0275\u0275text(8, "Logout");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r1.auth.profile()) == null ? null : tmp_1_0.role);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, ctx_r1.auth.isAdmin() ? 6 : -1);
  }
}
function AppComponent_Conditional_5_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 30)(1, "span", 12);
    \u0275\u0275text(2, "\u{1F46E}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 29);
    \u0275\u0275text(4, "Admin");
    \u0275\u0275elementEnd()();
  }
}
function AppComponent_Conditional_5_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 32)(1, "span", 12);
    \u0275\u0275text(2, "\u{1F468}\u200D\u2696");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 29);
    \u0275\u0275text(4, "Auction");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "a", 33)(6, "span", 12);
    \u0275\u0275text(7, "\u{1F465}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 29);
    \u0275\u0275text(9, "My Team");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "a", 34)(11, "span", 12);
    \u0275\u0275text(12, "\u{1F504}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 29);
    \u0275\u0275text(14, "Transfers");
    \u0275\u0275elementEnd()();
  }
}
function AppComponent_Conditional_5_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 17);
  }
}
function AppComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nav", 4)(1, "a", 28)(2, "span", 12);
    \u0275\u0275text(3, "\u{1F3C6}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 29);
    \u0275\u0275text(5, "Leaderboard");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, AppComponent_Conditional_5_Conditional_6_Template, 5, 0, "a", 30)(7, AppComponent_Conditional_5_Conditional_7_Template, 15, 0);
    \u0275\u0275elementStart(8, "a", 31)(9, "span", 12);
    \u0275\u0275text(10, " \u{1F514} ");
    \u0275\u0275template(11, AppComponent_Conditional_5_Conditional_11_Template, 1, 0, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 29);
    \u0275\u0275text(13, "Alerts");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275conditional(6, ctx_r1.auth.isAdmin() ? 6 : 7);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(11, ctx_r1.notifSvc.unreadCount() > 0 ? 11 : -1);
  }
}
var AppComponent = class _AppComponent {
  constructor(auth, notifSvc, seasonSvc, router) {
    this.auth = auth;
    this.notifSvc = notifSvc;
    this.seasonSvc = seasonSvc;
    this.router = router;
    this.url = "";
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => this.url = e.urlAfterRedirects);
  }
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.notifSvc.refreshUnreadCount().subscribe();
      this.seasonSvc.loadAndCacheActive();
    }
  }
  isAdminRoute() {
    return this.url.startsWith("/admin");
  }
  static {
    this.\u0275fac = function AppComponent_Factory(t) {
      return new (t || _AppComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(SeasonService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 5, consts: [[1, "app-shell"], [1, "app-sidebar"], [1, "mobile-topbar"], [1, "page-content"], [1, "athena-bottom-nav"], [1, "sidebar-brand"], ["src", "assets/Athena_header_logo.png", "alt", "AthenaXI", 2, "height", "60px", "width", "auto"], [1, "sidebar-user"], [1, "user-name"], [1, "athena-badge", "athena-badge-gold"], [1, "sidebar-nav"], ["routerLink", "/leaderboard", "routerLinkActive", "active", 1, "sidebar-nav-item"], [1, "nav-icon-text"], [1, "nav-text"], ["routerLink", "/admin", 1, "sidebar-nav-item"], ["routerLink", "/notifications", "routerLinkActive", "active", 1, "sidebar-nav-item"], [1, "nav-icon-text", "notif-wrap"], [1, "notif-dot"], [1, "sidebar-footer"], [1, "sidebar-nav-item", "logout-btn", 3, "click"], ["routerLink", "/auction", "routerLinkActive", "active", 1, "sidebar-nav-item"], ["routerLink", "/team", "routerLinkActive", "active", 1, "sidebar-nav-item"], ["routerLink", "/transfers", "routerLinkActive", "active", 1, "sidebar-nav-item"], [1, "athena-brand", 2, "font-size", "16px"], [1, "mobile-topbar-right"], [1, "athena-badge", "athena-badge-gold", "mobile-role-badge"], ["routerLink", "/admin", 1, "mobile-admin-link"], [1, "mobile-logout-btn", 3, "click"], ["routerLink", "/leaderboard", "routerLinkActive", "active", 1, "athena-nav-item"], [1, "nav-label"], ["routerLink", "/admin", 1, "athena-nav-item"], ["routerLink", "/notifications", "routerLinkActive", "active", 1, "athena-nav-item", "notif-item"], ["routerLink", "/auction", "routerLinkActive", "active", 1, "athena-nav-item"], ["routerLink", "/team", "routerLinkActive", "active", 1, "athena-nav-item"], ["routerLink", "/transfers", "routerLinkActive", "active", 1, "athena-nav-item"]], template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, AppComponent_Conditional_1_Template, 28, 4, "aside", 1)(2, AppComponent_Conditional_2_Template, 9, 2, "header", 2);
        \u0275\u0275elementStart(3, "main", 3);
        \u0275\u0275element(4, "router-outlet");
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, AppComponent_Conditional_5_Template, 14, 2, "nav", 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("with-sidebar", ctx.auth.isLoggedIn() && !ctx.isAdminRoute());
        \u0275\u0275advance();
        \u0275\u0275conditional(1, ctx.auth.isLoggedIn() && !ctx.isAdminRoute() ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(2, ctx.auth.isLoggedIn() && !ctx.isAdminRoute() ? 2 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(5, ctx.auth.isLoggedIn() && !ctx.isAdminRoute() ? 5 : -1);
      }
    }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule], styles: ["\n\n.app-shell[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n.app-shell.with-sidebar[_ngcontent-%COMP%] {\n  padding-bottom: 70px;\n}\n.page-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.app-sidebar[_ngcontent-%COMP%] {\n  display: none;\n}\n.sidebar-brand[_ngcontent-%COMP%] {\n  padding: 20px 18px 16px;\n  border-bottom: 1px solid rgba(212, 175, 55, 0.1);\n}\n.sidebar-user[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: 14px 18px;\n  border-bottom: 1px solid rgba(212, 175, 55, 0.08);\n}\n.user-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #ccc;\n  font-weight: 700;\n  font-family: var(--font-body);\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 10px 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.sidebar-nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 11px 14px;\n  border-radius: var(--radius-md);\n  color: #777;\n  text-decoration: none;\n  font-family: var(--font-body);\n  font-size: 13px;\n  font-weight: 600;\n  transition: all 0.15s;\n  cursor: pointer;\n  border: none;\n  background: none;\n  width: 100%;\n  text-align: left;\n}\n.sidebar-nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(212, 175, 55, 0.08);\n  color: #ccc;\n}\n.sidebar-nav-item.active[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.12);\n  color: var(--gold);\n  border-left: 2px solid var(--gold);\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  padding: 10px 8px 16px;\n  border-top: 1px solid rgba(212, 175, 55, 0.08);\n}\n.logout-btn[_ngcontent-%COMP%] {\n  color: #777;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  color: var(--red-live);\n  background: rgba(255, 59, 48, 0.06);\n}\n.nav-icon-text[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 10px;\n  font-weight: 900;\n  letter-spacing: 0.06em;\n  flex-shrink: 0;\n  position: relative;\n}\n.notif-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.notif-dot[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -3px;\n  right: -7px;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--red-live);\n}\n.mobile-topbar[_ngcontent-%COMP%] {\n  background: rgba(10, 31, 47, 0.97);\n  border-bottom: 1px solid rgba(212, 175, 55, 0.18);\n  padding: 10px 16px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  position: sticky;\n  top: 0;\n  z-index: 50;\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n}\n.mobile-topbar-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.mobile-role-badge[_ngcontent-%COMP%] {\n  font-size: 10px !important;\n  padding: 2px 8px !important;\n}\n.mobile-admin-link[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--gold);\n  text-decoration: none;\n  border: 1px solid rgba(212, 175, 55, 0.3);\n  border-radius: 6px;\n  padding: 4px 9px;\n  white-space: nowrap;\n}\n.mobile-logout-btn[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #666;\n  background: none;\n  border: 1px solid #333;\n  border-radius: 6px;\n  padding: 4px 9px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.mobile-logout-btn[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  border-color: #555;\n}\n.athena-bottom-nav[_ngcontent-%COMP%] {\n  display: flex;\n}\n.notif-item[_ngcontent-%COMP%] {\n  position: relative;\n}\n@media (min-width:768px) {\n  .app-shell.with-sidebar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: row;\n    padding-bottom: 0;\n  }\n  .app-sidebar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    width: 220px;\n    flex-shrink: 0;\n    background: rgba(10, 31, 47, 0.98);\n    border-right: 1px solid rgba(212, 175, 55, 0.15);\n    position: sticky;\n    top: 0;\n    height: 100vh;\n    overflow-y: auto;\n  }\n  .mobile-topbar[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .athena-bottom-nav[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .page-content[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: 0;\n  }\n}\n/*# sourceMappingURL=app.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "app\\app.component.ts", lineNumber: 166 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch(console.error);
//# sourceMappingURL=main.js.map
