import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-FZZPELYY.js";
import {
  AuthService
} from "./chunk-26VBKVEF.js";
import {
  Router,
  RouterLink
} from "./chunk-LNJWB5JP.js";
import "./chunk-STS7VQLQ.js";
import {
  CommonModule,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6BYAOC4F.js";

// src/app/auth/login.component.ts
function LoginComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function LoginComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Entering the arena...");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u2694\uFE0F Enter the Arena");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
    this.username = "";
    this.password = "";
    this.loading = signal(false);
    this.error = signal("");
  }
  ngOnInit() {
    if (this.auth.isLoggedIn())
      this.router.navigate(["/"]);
  }
  login() {
    if (!this.username || !this.password)
      return;
    this.loading.set(true);
    this.error.set("");
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(["/"]),
      error: () => {
        this.error.set("Invalid credentials. Check your username and password.");
        this.loading.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 26, vars: 7, consts: [[1, "login-shell"], [1, "login-card", "athena-card", "athena-player-card"], [1, "login-logo"], [1, "logo-helmet"], [1, "athena-heading", "login-title"], [1, "login-tagline"], [1, "athena-error", "animate-fade-in"], [1, "athena-fields"], [1, "athena-field"], [1, "athena-field-label"], ["type", "text", "placeholder", "your_team", "autocomplete", "username", 1, "athena-input", 3, "ngModelChange", "ngModel", "disabled"], ["type", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "current-password", 1, "athena-input", 3, "ngModelChange", "keyup.enter", "ngModel", "disabled"], [1, "athena-btn", "athena-btn-primary", "login-btn", 3, "click", "disabled"], [1, "guest-link"], ["routerLink", "/leaderboard"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4, "\u2694\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1", 4);
        \u0275\u0275text(6, "AthenaXI");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p", 5);
        \u0275\u0275text(8, "Strategy. Auction. Glory.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, LoginComponent_Conditional_9_Template, 2, 1, "div", 6);
        \u0275\u0275elementStart(10, "div", 7)(11, "div", 8)(12, "label", 9);
        \u0275\u0275text(13, "Username");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_14_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.username, $event) || (ctx.username = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 8)(16, "label", 9);
        \u0275\u0275text(17, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "input", 11);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_18_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275listener("keyup.enter", function LoginComponent_Template_input_keyup_enter_18_listener() {
          return ctx.login();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "button", 12);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_19_listener() {
          return ctx.login();
        });
        \u0275\u0275template(20, LoginComponent_Conditional_20_Template, 2, 0, "span")(21, LoginComponent_Conditional_21_Template, 2, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "p", 13);
        \u0275\u0275text(23, " Just watching? ");
        \u0275\u0275elementStart(24, "a", 14);
        \u0275\u0275text(25, "View Leaderboard \u2192");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275conditional(9, ctx.error() ? 9 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.username);
        \u0275\u0275property("disabled", ctx.loading());
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275property("disabled", ctx.loading());
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading() || !ctx.username || !ctx.password);
        \u0275\u0275advance();
        \u0275\u0275conditional(20, ctx.loading() ? 20 : 21);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, CommonModule, RouterLink], styles: ["\n\n.login-shell[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n}\n.login-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  padding: 40px 32px;\n}\n.login-logo[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 36px;\n}\n.logo-helmet[_ngcontent-%COMP%] {\n  font-size: 52px;\n  margin-bottom: 8px;\n  filter: drop-shadow(0 0 16px rgba(212, 175, 55, 0.4));\n}\n.login-title[_ngcontent-%COMP%] {\n  font-size: 32px;\n  letter-spacing: 0.2em;\n  display: block;\n  margin-bottom: 6px;\n}\n.login-tagline[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 12px;\n  color: var(--gold-dark);\n  letter-spacing: 0.25em;\n  text-transform: uppercase;\n}\n.login-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px !important;\n  font-size: 15px !important;\n  margin-top: 4px;\n  letter-spacing: 0.06em;\n}\n.guest-link[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n  font-size: 13px;\n  color: #555;\n  font-family: var(--font-body);\n}\n.guest-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--gold-dark);\n  text-decoration: none;\n}\n.guest-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--gold);\n}\n/*# sourceMappingURL=login.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "app\\auth\\login.component.ts", lineNumber: 106 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-MPK3G3F4.js.map
