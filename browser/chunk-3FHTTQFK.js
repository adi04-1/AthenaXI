import {
  RouterLink
} from "./chunk-LNJWB5JP.js";
import {
  HttpClient,
  environment
} from "./chunk-STS7VQLQ.js";
import {
  CommonModule,
  NgClass,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-6BYAOC4F.js";

// src/app/core/services/leaderboard.service.ts
var LeaderboardService = class _LeaderboardService {
  constructor(http) {
    this.http = http;
    this.api = environment.apiUrl;
  }
  getLeaderboard(seasonId) {
    return this.http.get(`${this.api}/leaderboard/${seasonId}`);
  }
  getTeamBreakdown(seasonId, teamId) {
    return this.http.get(`${this.api}/leaderboard/${seasonId}/team/${teamId}`);
  }
  overridePoints(body) {
    return this.http.post(`${this.api}/leaderboard/points/override`, body);
  }
  static {
    this.\u0275fac = function LeaderboardService_Factory(t) {
      return new (t || _LeaderboardService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LeaderboardService, factory: _LeaderboardService.\u0275fac, providedIn: "root" });
  }
};

// src/app/leaderboard/leaderboard.component.ts
var _forTrack0 = ($index, $item) => $item.teamId;
var _c0 = (a0) => ["/leaderboard", a0];
function LeaderboardComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5);
    \u0275\u0275text(2, "\u2694\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Summoning the standings...");
    \u0275\u0275elementEnd()();
  }
}
function LeaderboardComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 7);
    \u0275\u0275text(2, "\u{1F622}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No teams yet. Season hasn't started.");
    \u0275\u0275elementEnd()();
  }
}
function LeaderboardComponent_Conditional_8_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F947}\u{1F451} ");
  }
}
function LeaderboardComponent_Conditional_8_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F948} ");
  }
}
function LeaderboardComponent_Conditional_8_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F949} ");
  }
}
function LeaderboardComponent_Conditional_8_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const row_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" #", row_r1.rank, " ");
  }
}
function LeaderboardComponent_Conditional_8_For_2_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", row_r1.pointsLastMatch, " last match");
  }
}
function LeaderboardComponent_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 10)(1, "div", 11);
    \u0275\u0275template(2, LeaderboardComponent_Conditional_8_For_2_Conditional_2_Template, 1, 0)(3, LeaderboardComponent_Conditional_8_For_2_Conditional_3_Template, 1, 0)(4, LeaderboardComponent_Conditional_8_For_2_Conditional_4_Template, 1, 0)(5, LeaderboardComponent_Conditional_8_For_2_Conditional_5_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 12)(7, "span", 13);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 14);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 15);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 16)(14, "span", 17);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 18);
    \u0275\u0275text(17, "pts");
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, LeaderboardComponent_Conditional_8_For_2_Conditional_18_Template, 2, 1, "span", 19);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r1 = ctx.$implicit;
    \u0275\u0275styleProp("border-left-color", row_r1.themeColour);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(12, _c0, row_r1.teamId));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "rank-" + row_r1.rank);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, row_r1.rank === 1 ? 2 : row_r1.rank === 2 ? 3 : row_r1.rank === 3 ? 4 : 5);
    \u0275\u0275advance(5);
    \u0275\u0275styleProp("color", row_r1.themeColour);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r1.shortCode, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r1.teamName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r1.ownerDisplayName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r1.totalPoints);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(18, row_r1.pointsLastMatch > 0 ? 18 : -1);
  }
}
function LeaderboardComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275repeaterCreate(1, LeaderboardComponent_Conditional_8_For_2_Template, 19, 14, "a", 9, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.rows());
  }
}
var LeaderboardComponent = class _LeaderboardComponent {
  constructor(svc) {
    this.svc = svc;
    this.rows = signal([]);
    this.loading = signal(true);
    this.seasonId = "00000000-0000-0000-0000-000000000001";
  }
  ngOnInit() {
    this.svc.getLeaderboard(this.seasonId).subscribe({
      next: (d) => {
        this.rows.set(d);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  static {
    this.\u0275fac = function LeaderboardComponent_Factory(t) {
      return new (t || _LeaderboardComponent)(\u0275\u0275directiveInject(LeaderboardService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeaderboardComponent, selectors: [["app-leaderboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 9, vars: 1, consts: [[1, "athena-page"], [1, "lb-header"], [1, "athena-page-title"], [1, "athena-badge", "athena-badge-gold"], [1, "lb-loading"], [1, "loading-helm"], [1, "lb-empty", "athena-card"], [2, "font-size", "40px"], [1, "lb-list"], [1, "lb-row", "athena-card", "animate-fade-in", 2, "border-left-width", "4px", "border-radius", "0 14px 14px 0", "text-decoration", "none", "display", "flex", "align-items", "center", "gap", "16px", "padding", "16px 20px", "margin-bottom", "10px", 3, "routerLink", "border-left-color"], [1, "lb-row", "athena-card", "animate-fade-in", 2, "border-left-width", "4px", "border-radius", "0 14px 14px 0", "text-decoration", "none", "display", "flex", "align-items", "center", "gap", "16px", "padding", "16px 20px", "margin-bottom", "10px", 3, "routerLink"], [1, "lb-rank", 3, "ngClass"], [1, "lb-team-info"], [1, "lb-team-code"], [1, "lb-team-name"], [1, "lb-owner"], [1, "lb-points-col"], [1, "athena-amount", "lb-points"], [1, "athena-label"], [1, "lb-last"]], template: function LeaderboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "\u{1F3C6} Leaderboard");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5, "GLORY");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, LeaderboardComponent_Conditional_6_Template, 5, 0, "div", 4)(7, LeaderboardComponent_Conditional_7_Template, 5, 0)(8, LeaderboardComponent_Conditional_8_Template, 3, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(6, ctx.loading() ? 6 : ctx.rows().length === 0 ? 7 : 8);
      }
    }, dependencies: [CommonModule, NgClass, RouterLink], styles: ["\n\n.lb-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n}\n.lb-loading[_ngcontent-%COMP%], .lb-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #555;\n  font-family: var(--font-body);\n}\n.loading-helm[_ngcontent-%COMP%] {\n  font-size: 40px;\n  margin-bottom: 12px;\n  animation: _ngcontent-%COMP%_spin 2s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.lb-rank[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 22px;\n  font-weight: 900;\n  min-width: 44px;\n  text-align: center;\n}\n.lb-team-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.lb-team-code[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 800;\n  letter-spacing: 0.06em;\n}\n.lb-team-name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: #fff;\n}\n.lb-owner[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n}\n.lb-points-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n}\n.lb-points[_ngcontent-%COMP%] {\n  font-size: 26px !important;\n}\n.lb-last[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--green-cricket);\n  font-weight: 600;\n}\n/*# sourceMappingURL=leaderboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeaderboardComponent, { className: "LeaderboardComponent", filePath: "app\\leaderboard\\leaderboard.component.ts", lineNumber: 100 });
})();
export {
  LeaderboardComponent
};
//# sourceMappingURL=chunk-3FHTTQFK.js.map
