import {
  AuthService
} from "./chunk-26VBKVEF.js";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-LNJWB5JP.js";
import "./chunk-STS7VQLQ.js";
import {
  CommonModule,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-6BYAOC4F.js";

// src/app/admin/admin.component.ts
var _forTrack0 = ($index, $item) => $item.route;
function AdminComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 7)(1, "span", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 11);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r1.route);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
function AdminComponent_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275property("routerLink", item_r2.route)("title", item_r2.label);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.icon);
  }
}
var AdminComponent = class _AdminComponent {
  constructor(auth) {
    this.auth = auth;
    this.navItems = [
      { route: "seasons", icon: "\u{1F4C6}", label: "Seasons" },
      { route: "auction", icon: "\u{1F468}\u200D\u2696", label: "Auction Lobby" },
      { route: "players", icon: "\u{1F4E4}", label: "Player Upload" },
      { route: "notifications", icon: "\u{1F514}", label: "Notifications" }
    ];
  }
  static {
    this.\u0275fac = function AdminComponent_Factory(t) {
      return new (t || _AdminComponent)(\u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminComponent, selectors: [["app-admin"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 32, vars: 0, consts: [[1, "admin-shell"], [1, "admin-sidebar"], [1, "sidebar-brand"], [1, "sidebar-helm"], [1, "athena-brand", 2, "font-size", "16px"], [2, "font-size", "10px", "color", "var(--gold-dark)", "letter-spacing", "0.1em", "text-transform", "uppercase"], [1, "sidebar-nav"], ["routerLinkActive", "active", 1, "sidebar-nav-item", 3, "routerLink"], [1, "sidebar-footer"], ["routerLink", "/", 1, "sidebar-nav-item", 2, "opacity", "0.6"], [1, "nav-icon"], [1, "nav-text"], [1, "sidebar-nav-item", "logout-btn", 3, "click"], [1, "admin-mobile-header"], [1, "athena-brand", 2, "font-size", "15px"], [2, "display", "flex", "gap", "4px"], ["routerLinkActive", "active", 1, "mobile-pill", 3, "routerLink", "title"], [1, "admin-content"]], template: function AdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2)(3, "span", 3);
        \u0275\u0275text(4, "\u2694\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div")(6, "div", 4);
        \u0275\u0275text(7, "AthenaXI");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 5);
        \u0275\u0275text(9, "Admin Panel");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "nav", 6);
        \u0275\u0275repeaterCreate(11, AdminComponent_For_12_Template, 5, 3, "a", 7, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 8)(14, "a", 9)(15, "span", 10);
        \u0275\u0275text(16, "\u2190");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "span", 11);
        \u0275\u0275text(18, "Back to App");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "button", 12);
        \u0275\u0275listener("click", function AdminComponent_Template_button_click_19_listener() {
          return ctx.auth.logout();
        });
        \u0275\u0275elementStart(20, "span", 10);
        \u0275\u0275text(21, "\u279C]");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "span", 11);
        \u0275\u0275text(23, "Logout");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(24, "div", 13)(25, "span", 14);
        \u0275\u0275text(26, "\u2694\uFE0F Admin");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "div", 15);
        \u0275\u0275repeaterCreate(28, AdminComponent_For_29_Template, 2, 3, "a", 16, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "main", 17);
        \u0275\u0275element(31, "router-outlet");
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275repeater(ctx.navItems);
        \u0275\u0275advance(17);
        \u0275\u0275repeater(ctx.navItems);
      }
    }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule], styles: ["\n\n.admin-shell[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background: var(--navy-deep);\n}\n.admin-sidebar[_ngcontent-%COMP%] {\n  width: 220px;\n  flex-shrink: 0;\n  background: rgba(10, 31, 47, 0.98);\n  border-right: 1px solid rgba(212, 175, 55, 0.15);\n  display: flex;\n  flex-direction: column;\n  position: sticky;\n  top: 0;\n  height: 100vh;\n  overflow-y: auto;\n}\n.sidebar-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 20px 16px;\n  border-bottom: 1px solid rgba(212, 175, 55, 0.12);\n  margin-bottom: 8px;\n}\n.sidebar-helm[_ngcontent-%COMP%] {\n  font-size: 28px;\n  filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.4));\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  padding: 8px;\n  border-top: 1px solid rgba(212, 175, 55, 0.1);\n  margin-top: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.sidebar-nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 12px;\n  border-radius: var(--radius-md);\n  color: #666;\n  text-decoration: none;\n  font-family: var(--font-body);\n  font-size: 13px;\n  font-weight: 600;\n  transition: all 0.15s;\n  cursor: pointer;\n  border: none;\n  background: none;\n  width: 100%;\n  text-align: left;\n}\n.sidebar-nav-item[_ngcontent-%COMP%]:hover {\n  background: rgba(212, 175, 55, 0.08);\n  color: #ccc;\n}\n.sidebar-nav-item.active[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.12);\n  color: var(--gold);\n  border-left: 2px solid var(--gold);\n}\n.nav-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 20px;\n  text-align: center;\n  flex-shrink: 0;\n}\n.logout-btn[_ngcontent-%COMP%] {\n  color: #555;\n}\n.logout-btn[_ngcontent-%COMP%]:hover {\n  color: var(--red-live);\n  background: rgba(255, 59, 48, 0.08);\n}\n.admin-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  min-height: 100vh;\n}\n.admin-mobile-header[_ngcontent-%COMP%] {\n  display: none;\n  position: sticky;\n  top: 0;\n  z-index: 50;\n  background: rgba(10, 31, 47, 0.97);\n  border-bottom: 1px solid rgba(212, 175, 55, 0.15);\n  padding: 10px 16px;\n  align-items: center;\n  justify-content: space-between;\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n}\n.mobile-pill[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: var(--radius-md);\n  color: #666;\n  text-decoration: none;\n  font-size: 16px;\n  border: 1px solid transparent;\n  transition: all 0.15s;\n}\n.mobile-pill.active[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.12);\n  border-color: rgba(212, 175, 55, 0.3);\n  color: var(--gold);\n}\n@media (max-width:768px) {\n  .admin-sidebar[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .admin-mobile-header[_ngcontent-%COMP%] {\n    display: flex;\n  }\n  .admin-shell[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=admin.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminComponent, { className: "AdminComponent", filePath: "app\\admin\\admin.component.ts", lineNumber: 70 });
})();
export {
  AdminComponent
};
//# sourceMappingURL=chunk-P2RO6LS4.js.map
