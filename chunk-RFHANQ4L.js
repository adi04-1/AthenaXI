import {
  TeamService
} from "./chunk-OLMNDMN6.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-FZZPELYY.js";
import {
  NotificationService
} from "./chunk-GC4QY3GN.js";
import {
  SeasonService
} from "./chunk-V7UAWJAK.js";
import "./chunk-STS7VQLQ.js";
import {
  CommonModule,
  SlicePipe,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6BYAOC4F.js";

// src/app/admin/notifications-admin/notifications-admin.component.ts
var _forTrack0 = ($index, $item) => $item.label;
var _forTrack1 = ($index, $item) => $item.id;
function NotificationsAdminComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function NotificationsAdminComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.success());
  }
}
function NotificationsAdminComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function NotificationsAdminComponent_For_14_Template_button_click_0_listener() {
      const t_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.applyTemplate(t_r3));
    });
    \u0275\u0275elementStart(1, "span", 26);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "div", 27);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 28);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "slice");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r3.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind3(8, 3, t_r3.body, 0, 50), "...");
  }
}
function NotificationsAdminComponent_Conditional_29_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    \u0275\u0275property("value", s_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r5.name);
  }
}
function NotificationsAdminComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "label", 12);
    \u0275\u0275text(2, "Season");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 15);
    \u0275\u0275twoWayListener("ngModelChange", function NotificationsAdminComponent_Conditional_29_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.selectedSeasonId, $event) || (ctx_r0.selectedSeasonId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function NotificationsAdminComponent_Conditional_29_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadTeams($event));
    });
    \u0275\u0275elementStart(4, "option", 29);
    \u0275\u0275text(5, "Select season...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, NotificationsAdminComponent_Conditional_29_For_7_Template, 2, 2, "option", 30, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.selectedSeasonId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.seasons());
  }
}
function NotificationsAdminComponent_Conditional_30_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    \u0275\u0275property("value", s_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r7.name);
  }
}
function NotificationsAdminComponent_Conditional_30_Conditional_8_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const t_r9 = ctx.$implicit;
    \u0275\u0275property("value", (tmp_12_0 = t_r9.user == null ? null : t_r9.user.id) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : t_r9.userId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", t_r9.teamName, " (", "@" + t_r9.username, ")");
  }
}
function NotificationsAdminComponent_Conditional_30_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "label", 12);
    \u0275\u0275text(2, "Team");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 15);
    \u0275\u0275twoWayListener("ngModelChange", function NotificationsAdminComponent_Conditional_30_Conditional_8_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.selectedUserId, $event) || (ctx_r0.selectedUserId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 29);
    \u0275\u0275text(5, "Select team...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, NotificationsAdminComponent_Conditional_30_Conditional_8_For_7_Template, 2, 3, "option", 30, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.selectedUserId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.teams());
  }
}
function NotificationsAdminComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "label", 12);
    \u0275\u0275text(2, "Season");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 15);
    \u0275\u0275twoWayListener("ngModelChange", function NotificationsAdminComponent_Conditional_30_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.selectedSeasonId, $event) || (ctx_r0.selectedSeasonId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function NotificationsAdminComponent_Conditional_30_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadTeams($event));
    });
    \u0275\u0275elementStart(4, "option", 29);
    \u0275\u0275text(5, "Select season...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, NotificationsAdminComponent_Conditional_30_For_7_Template, 2, 2, "option", 30, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, NotificationsAdminComponent_Conditional_30_Conditional_8_Template, 8, 1, "div", 11);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.selectedSeasonId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.seasons());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(8, ctx_r0.teams().length > 0 ? 8 : -1);
  }
}
function NotificationsAdminComponent_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "span", 31);
    \u0275\u0275text(2, "Preview");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 32)(4, "div", 33);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 35);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.notifTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.notifBody);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.notifType);
  }
}
var NotificationsAdminComponent = class _NotificationsAdminComponent {
  constructor(seasonSvc, teamSvc, notifSvc) {
    this.seasonSvc = seasonSvc;
    this.teamSvc = teamSvc;
    this.notifSvc = notifSvc;
    this.seasons = signal([]);
    this.teams = signal([]);
    this.target = signal("all");
    this.saving = signal(false);
    this.error = signal("");
    this.success = signal("");
    this.selectedSeasonId = "";
    this.selectedUserId = "";
    this.notifTitle = "";
    this.notifBody = "";
    this.notifType = "GeneralAlert";
    this.templates = [
      { icon: "\u{1F468}\u{1F3FB}\u200D\u2696\uFE0F", label: "Auction Invite", title: "\u{1F514} Auction Invite", body: "Your team has been invited to join the auction! Open AthenaXI and accept the invite to participate." },
      { icon: "\u23F0", label: "Auction Reminder", title: "\u23F0 Reminder", body: "Auction starts soon! Please accept your invite and join the auction room." },
      { icon: "\u{1F465}", label: "Players Uploaded", title: "\u{1F465} Player Pool Ready", body: "The player pool and auction order have been uploaded. Browse players before auction day!" },
      { icon: "\u{1F4CB}", label: "Auction Order Set", title: "\u{1F4CB} Auction Order Published", body: "The auction order for upcoming season is ready. Check the player list and prepare your strategy!" },
      { icon: "\u2705", label: "Season Created", title: "\u2705 Season Created", body: "A new fantasy cricket season has been created and your team has been registered. Stay tuned for auction details!" },
      { icon: "\u{1F4CA}", label: "Auction Summary", title: "\u{1F4CA} Auction Complete", body: "The auction is complete! Check your squad and start assigning Captain, Vice-Captain, and Impact Player." }
    ];
  }
  ngOnInit() {
    this.seasonSvc.getAll().subscribe({ next: (d) => this.seasons.set(d), error: () => {
    } });
  }
  loadTeams(seasonId) {
    if (!seasonId)
      return;
    this.teamSvc.getTeamsBySeason(seasonId).subscribe({ next: (d) => this.teams.set(d), error: () => {
    } });
  }
  applyTemplate(t) {
    this.notifTitle = t.title;
    this.notifBody = t.body;
    this.notifType = t.type ?? "GeneralAlert";
  }
  send() {
    this.saving.set(true);
    this.error.set("");
    const userId = this.target() === "specific" ? this.selectedUserId || null : null;
    this.notifSvc.sendNotification({ userId, title: this.notifTitle, body: this.notifBody, type: this.notifType }).subscribe({
      next: (r) => {
        this.success.set(`\xE2\u0153\u2026 Notification sent to ${r.message}`);
        this.notifTitle = "";
        this.notifBody = "";
        this.saving.set(false);
        setTimeout(() => this.success.set(""), 4e3);
      },
      error: (e) => {
        this.error.set(e?.error?.error ?? "Failed to send.");
        this.saving.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function NotificationsAdminComponent_Factory(t) {
      return new (t || _NotificationsAdminComponent)(\u0275\u0275directiveInject(SeasonService), \u0275\u0275directiveInject(TeamService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationsAdminComponent, selectors: [["app-notifications-admin"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 56, vars: 16, consts: [[1, "admin-page"], [1, "admin-page-header"], [1, "athena-page-title", 2, "margin-bottom", "4px"], [1, "athena-label"], [1, "athena-error", "animate-fade-in"], [1, "athena-success", "animate-fade-in"], [1, "athena-card", "section-card"], [1, "section-title"], [1, "template-grid"], [1, "template-btn"], [1, "athena-fields"], [1, "athena-field"], [1, "athena-field-label"], [1, "target-options"], [1, "target-btn", 3, "click"], [1, "athena-input", 3, "ngModelChange", "ngModel"], ["value", "GeneralAlert"], ["value", "AuctionStartingSoon"], ["value", "MatchPointsUpdated"], ["value", "TransferWindowOpen"], ["value", "TransferWindowClosing"], ["placeholder", "Notification title...", 1, "athena-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Write your message here...", 1, "athena-input", 2, "height", "100px", "resize", "vertical", 3, "ngModelChange", "ngModel"], [1, "notif-preview"], [1, "athena-btn", "athena-btn-primary", 2, "width", "100%", 3, "click", "disabled"], [1, "template-btn", 3, "click"], [1, "t-icon"], [1, "t-label"], [1, "t-preview"], ["value", ""], [3, "value"], [1, "athena-label", 2, "display", "block", "margin-bottom", "8px"], [1, "preview-card"], [1, "preview-title"], [1, "preview-body"], [1, "preview-type", "athena-badge", "athena-badge-gold"]], template: function NotificationsAdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "\u{1F514} Notifications");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Send announcements and alerts to teams");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(7, NotificationsAdminComponent_Conditional_7_Template, 2, 1, "div", 4)(8, NotificationsAdminComponent_Conditional_8_Template, 2, 1, "div", 5);
        \u0275\u0275elementStart(9, "div", 6)(10, "h2", 7);
        \u0275\u0275text(11, "Quick Templates");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 8);
        \u0275\u0275repeaterCreate(13, NotificationsAdminComponent_For_14_Template, 9, 7, "button", 9, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 6)(16, "h2", 7);
        \u0275\u0275text(17, "Compose Notification");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 10)(19, "div", 11)(20, "label", 12);
        \u0275\u0275text(21, "Send To");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "div", 13)(23, "button", 14);
        \u0275\u0275listener("click", function NotificationsAdminComponent_Template_button_click_23_listener() {
          return ctx.target.set("all");
        });
        \u0275\u0275text(24, " \u{1F4E2} All Teams ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "button", 14);
        \u0275\u0275listener("click", function NotificationsAdminComponent_Template_button_click_25_listener() {
          return ctx.target.set("season");
        });
        \u0275\u0275text(26, " \u{1F5D3}\uFE0F Season Teams ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "button", 14);
        \u0275\u0275listener("click", function NotificationsAdminComponent_Template_button_click_27_listener() {
          return ctx.target.set("specific");
        });
        \u0275\u0275text(28, " \u{1F465} Specific Team ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(29, NotificationsAdminComponent_Conditional_29_Template, 8, 1, "div", 11)(30, NotificationsAdminComponent_Conditional_30_Template, 9, 2);
        \u0275\u0275elementStart(31, "div", 11)(32, "label", 12);
        \u0275\u0275text(33, "Notification Type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "select", 15);
        \u0275\u0275twoWayListener("ngModelChange", function NotificationsAdminComponent_Template_select_ngModelChange_34_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.notifType, $event) || (ctx.notifType = $event);
          return $event;
        });
        \u0275\u0275elementStart(35, "option", 16);
        \u0275\u0275text(36, "\u{1F514} General Alert");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "option", 17);
        \u0275\u0275text(38, "\u23F0 Auction Starting Soon");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "option", 18);
        \u0275\u0275text(40, "\u{1F4CA} Match Points Updated");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "option", 19);
        \u0275\u0275text(42, "\u{1F513} Transfer Window Open");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "option", 20);
        \u0275\u0275text(44, "\u26A0\uFE0F Transfer Window Closing");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(45, "div", 11)(46, "label", 12);
        \u0275\u0275text(47, "Title");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "input", 21);
        \u0275\u0275twoWayListener("ngModelChange", function NotificationsAdminComponent_Template_input_ngModelChange_48_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.notifTitle, $event) || (ctx.notifTitle = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "div", 11)(50, "label", 12);
        \u0275\u0275text(51, "Message");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "textarea", 22);
        \u0275\u0275twoWayListener("ngModelChange", function NotificationsAdminComponent_Template_textarea_ngModelChange_52_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.notifBody, $event) || (ctx.notifBody = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(53, NotificationsAdminComponent_Conditional_53_Template, 10, 3, "div", 23);
        \u0275\u0275elementStart(54, "button", 24);
        \u0275\u0275listener("click", function NotificationsAdminComponent_Template_button_click_54_listener() {
          return ctx.send();
        });
        \u0275\u0275text(55);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275conditional(7, ctx.error() ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(8, ctx.success() ? 8 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.templates);
        \u0275\u0275advance(10);
        \u0275\u0275classProp("active", ctx.target() === "all");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.target() === "season");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("active", ctx.target() === "specific");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(29, ctx.target() === "season" ? 29 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(30, ctx.target() === "specific" ? 30 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.notifType);
        \u0275\u0275advance(14);
        \u0275\u0275twoWayProperty("ngModel", ctx.notifTitle);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.notifBody);
        \u0275\u0275advance();
        \u0275\u0275conditional(53, ctx.notifTitle && ctx.notifBody ? 53 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", !ctx.notifTitle || !ctx.notifBody || ctx.saving());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.saving() ? "Sending..." : " \u{1F514} Send Notification", " ");
      }
    }, dependencies: [CommonModule, SlicePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.admin-page[_ngcontent-%COMP%] {\n  padding: 28px 24px;\n  max-width: 700px;\n}\n.admin-page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.section-card[_ngcontent-%COMP%] {\n  padding: 20px;\n  margin-bottom: 16px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 15px;\n  font-weight: 700;\n  color: #fff;\n  margin-bottom: 14px;\n}\n.template-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.template-btn[_ngcontent-%COMP%] {\n  background: rgba(10, 31, 47, 0.6);\n  border: 1px solid rgba(212, 175, 55, 0.1);\n  border-radius: var(--radius-md);\n  padding: 12px;\n  cursor: pointer;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  text-align: left;\n  transition: all 0.15s;\n}\n.template-btn[_ngcontent-%COMP%]:hover {\n  border-color: rgba(212, 175, 55, 0.3);\n  background: rgba(30, 58, 95, 0.4);\n}\n.t-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.t-label[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 13px;\n  font-weight: 700;\n  color: #fff;\n  margin-bottom: 3px;\n}\n.t-preview[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #666;\n  line-height: 1.4;\n}\n.target-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.target-btn[_ngcontent-%COMP%] {\n  background: rgba(10, 31, 47, 0.6);\n  border: 1px solid rgba(212, 175, 55, 0.1);\n  border-radius: var(--radius-xl);\n  padding: 8px 14px;\n  cursor: pointer;\n  font-family: var(--font-body);\n  font-size: 13px;\n  font-weight: 600;\n  color: #888;\n  transition: all 0.15s;\n}\n.target-btn.active[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.1);\n  border-color: var(--gold);\n  color: var(--gold);\n}\n.target-btn[_ngcontent-%COMP%]:hover:not(.active) {\n  color: #ccc;\n  border-color: rgba(212, 175, 55, 0.25);\n}\ntextarea.athena-input[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  line-height: 1.5;\n}\n.notif-preview[_ngcontent-%COMP%] {\n  background: rgba(10, 31, 47, 0.5);\n  border-radius: var(--radius-md);\n  padding: 14px;\n  border: 1px solid rgba(212, 175, 55, 0.1);\n}\n.preview-card[_ngcontent-%COMP%] {\n  background: rgba(30, 58, 95, 0.4);\n  border-radius: var(--radius-md);\n  padding: 14px;\n  border-left: 3px solid var(--gold);\n}\n.preview-title[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 14px;\n  font-weight: 700;\n  color: #fff;\n  margin-bottom: 6px;\n}\n.preview-body[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #aaa;\n  margin-bottom: 10px;\n  line-height: 1.4;\n}\nselect.athena-input[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background: var(--navy-deep);\n}\n/*# sourceMappingURL=notifications-admin.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationsAdminComponent, { className: "NotificationsAdminComponent", filePath: "app\\admin\\notifications-admin\\notifications-admin.component.ts", lineNumber: 169 });
})();
export {
  NotificationsAdminComponent
};
//# sourceMappingURL=chunk-RFHANQ4L.js.map
