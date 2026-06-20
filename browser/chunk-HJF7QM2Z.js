import {
  NotificationService
} from "./chunk-GC4QY3GN.js";
import {
  AuctionService
} from "./chunk-HGMYO4ZI.js";
import {
  SeasonService
} from "./chunk-V7UAWJAK.js";
import "./chunk-STS7VQLQ.js";
import {
  CommonModule,
  DatePipe,
  NgClass,
  __spreadProps,
  __spreadValues,
  interval,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-6BYAOC4F.js";

// src/app/notifications/notifications.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function NotificationsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function NotificationsComponent_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markAllRead());
    });
    \u0275\u0275text(1, "Mark all read");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 9)(2, "div", 10);
    \u0275\u0275text(3, "Auction Invite Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 11);
    \u0275\u0275text(5, "You have been invited to join the auction. Accept to participate in live bidding.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 12)(7, "button", 13);
    \u0275\u0275listener("click", function NotificationsComponent_Conditional_8_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.respond(true));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 14);
    \u0275\u0275listener("click", function NotificationsComponent_Conditional_8_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.respond(false));
    });
    \u0275\u0275text(10, " Decline ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.responding());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.responding() ? "..." : "Accept", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.responding());
  }
}
function NotificationsComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.inviteResponse() === "accepted" ? "athena-success" : "athena-error");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.inviteResponse() === "accepted" ? "You have joined the auction! Head to the Auction room." : "You have declined the auction invite.", " ");
  }
}
function NotificationsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, "Loading alerts...");
    \u0275\u0275elementEnd();
  }
}
function NotificationsComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17);
    \u0275\u0275text(2, "BELL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No notifications yet.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 18);
    \u0275\u0275text(6, "Auction invites, match updates and alerts appear here.");
    \u0275\u0275elementEnd()();
  }
}
function NotificationsComponent_Conditional_12_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 27);
  }
}
function NotificationsComponent_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275listener("click", function NotificationsComponent_Conditional_12_For_2_Template_div_click_0_listener() {
      const n_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.markRead(n_r5));
    });
    \u0275\u0275elementStart(1, "div", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 23)(4, "div", 24);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 25);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 26);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, NotificationsComponent_Conditional_12_For_2_Conditional_11_Template, 1, 0, "div", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("unread", !n_r5.isRead);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.typeBadge(n_r5.type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.typeLabel(n_r5.type), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(n_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(n_r5.body);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 8, n_r5.createdAt, "MMM d \xB7 h:mm a"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(11, !n_r5.isRead ? 11 : -1);
  }
}
function NotificationsComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275repeaterCreate(1, NotificationsComponent_Conditional_12_For_2_Template, 12, 11, "div", 20, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.notifs());
  }
}
var NotificationsComponent = class _NotificationsComponent {
  constructor(notifSvc, auctionSvc, seasonSvc) {
    this.notifSvc = notifSvc;
    this.auctionSvc = auctionSvc;
    this.seasonSvc = seasonSvc;
    this.notifs = signal([]);
    this.pendingInvite = signal(null);
    this.inviteResponse = signal("");
    this.loading = signal(true);
    this.responding = signal(false);
    this.unread = signal(0);
  }
  ngOnInit() {
    this.load();
    this.checkPendingInvite();
    this.pollSub = interval(3e4).subscribe(() => {
      this.load();
      this.checkPendingInvite();
    });
  }
  ngOnDestroy() {
    this.pollSub?.unsubscribe();
  }
  load() {
    this.notifSvc.getMyNotifications().subscribe({
      next: (d) => {
        this.notifs.set(d);
        this.loading.set(false);
        const u = d.filter((n) => !n.isRead).length;
        this.unread.set(u);
        this.notifSvc.unreadCount.set(u);
      },
      error: () => this.loading.set(false)
    });
  }
  checkPendingInvite() {
    const seasonId = this.seasonSvc.activeSeason()?.id;
    if (!seasonId) {
      this.seasonSvc.getActive().subscribe({
        next: () => this.fetchInvite(),
        error: () => {
        }
      });
      return;
    }
    this.fetchInvite();
  }
  fetchInvite() {
    const seasonId = this.seasonSvc.activeSeason()?.id;
    if (!seasonId)
      return;
    this.auctionSvc.getMyInvite(seasonId).subscribe({
      next: (inv) => {
        if (inv?.status === "Pending")
          this.pendingInvite.set(inv);
        else
          this.pendingInvite.set(null);
      },
      error: () => this.pendingInvite.set(null)
    });
  }
  respond(accept) {
    const inv = this.pendingInvite();
    if (!inv)
      return;
    this.responding.set(true);
    this.auctionSvc.respondToInvite({ inviteId: inv.inviteId, accept }).subscribe({
      next: () => {
        this.responding.set(false);
        this.pendingInvite.set(null);
        this.inviteResponse.set(accept ? "accepted" : "declined");
        setTimeout(() => this.inviteResponse.set(""), 5e3);
      },
      error: () => this.responding.set(false)
    });
  }
  markRead(n) {
    if (n.isRead)
      return;
    this.notifSvc.markRead(n.id).subscribe(() => {
      this.notifs.update((l) => l.map((x) => x.id === n.id ? __spreadProps(__spreadValues({}, x), { isRead: true }) : x));
      this.unread.update((c) => Math.max(0, c - 1));
      this.notifSvc.unreadCount.update((c) => Math.max(0, c - 1));
    });
  }
  markAllRead() {
    this.notifSvc.markAllRead().subscribe(() => {
      this.notifs.update((l) => l.map((x) => __spreadProps(__spreadValues({}, x), { isRead: true })));
      this.unread.set(0);
      this.notifSvc.unreadCount.set(0);
    });
  }
  typeBadge(t) {
    if (t?.includes("Auction") || t?.includes("Starting"))
      return "badge-auction";
    if (t?.includes("Points") || t?.includes("Match") || t?.includes("Milestone"))
      return "badge-points";
    if (t?.includes("Transfer"))
      return "badge-transfer";
    return "badge-general";
  }
  typeLabel(t) {
    const m = { AuctionStartingSoon: "AUCTION", MatchPointsUpdated: "POINTS", PlayerMilestone: "MILESTONE", TransferWindowOpen: "TRANSFER", TransferWindowClosing: "TRANSFER", ReserveSwapDecision: "SQUAD", PointsManuallyEdited: "EDIT", GeneralAlert: "ALERT" };
    return m[t] ?? "ALERT";
  }
  static {
    this.\u0275fac = function NotificationsComponent_Factory(t) {
      return new (t || _NotificationsComponent)(\u0275\u0275directiveInject(NotificationService), \u0275\u0275directiveInject(AuctionService), \u0275\u0275directiveInject(SeasonService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotificationsComponent, selectors: [["app-notifications"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 13, vars: 4, consts: [[1, "athena-page"], [1, "notif-header"], [1, "athena-page-title", 2, "margin-bottom", "0"], [2, "display", "flex", "gap", "8px"], [1, "athena-btn", "athena-btn-secondary", "mark-btn"], [1, "athena-btn", "athena-btn-secondary", "mark-btn", 3, "click"], [1, "invite-banner", "animate-fade-in"], [1, "animate-fade-in", 3, "class"], [1, "notif-loading"], [1, "invite-banner-left"], [1, "invite-banner-title"], [1, "invite-banner-sub"], [1, "invite-actions"], [1, "invite-btn", "accept", 3, "click", "disabled"], [1, "invite-btn", "decline", 3, "click", "disabled"], [1, "animate-fade-in"], [1, "notif-empty", "athena-card"], [1, "empty-label"], [2, "color", "#555", "font-size", "13px"], [1, "notif-list"], [1, "notif-item", "athena-card-sm", 3, "unread"], [1, "notif-item", "athena-card-sm", 3, "click"], [1, "notif-type-badge", 3, "ngClass"], [1, "notif-content"], [1, "notif-title"], [1, "notif-body"], [1, "notif-time"], [1, "unread-dot"]], template: function NotificationsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Alerts");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 3);
        \u0275\u0275template(5, NotificationsComponent_Conditional_5_Template, 2, 0, "button", 4);
        \u0275\u0275elementStart(6, "button", 5);
        \u0275\u0275listener("click", function NotificationsComponent_Template_button_click_6_listener() {
          return ctx.load();
        });
        \u0275\u0275text(7, "Refresh");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(8, NotificationsComponent_Conditional_8_Template, 11, 3, "div", 6)(9, NotificationsComponent_Conditional_9_Template, 2, 3, "div", 7)(10, NotificationsComponent_Conditional_10_Template, 2, 0, "div", 8)(11, NotificationsComponent_Conditional_11_Template, 7, 0)(12, NotificationsComponent_Conditional_12_Template, 3, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275conditional(5, ctx.unread() > 0 ? 5 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(8, ctx.pendingInvite() ? 8 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(9, ctx.inviteResponse() ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(10, ctx.loading() ? 10 : ctx.notifs().length === 0 ? 11 : 12);
      }
    }, dependencies: [CommonModule, NgClass, DatePipe], styles: ["\n\n.notif-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.mark-btn[_ngcontent-%COMP%] {\n  font-size: 12px !important;\n  padding: 6px 12px !important;\n}\n.notif-loading[_ngcontent-%COMP%] {\n  color: #666;\n  padding: 40px;\n  text-align: center;\n  font-family: var(--font-body);\n}\n.notif-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 24px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\n.empty-label[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 11px;\n  font-weight: 900;\n  letter-spacing: 0.15em;\n  color: var(--gold);\n  background: rgba(212, 175, 55, 0.1);\n  border: 1px solid rgba(212, 175, 55, 0.2);\n  border-radius: 20px;\n  padding: 5px 14px;\n}\n.notif-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  margin: 0;\n}\n.invite-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  flex-wrap: wrap;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(212, 175, 55, 0.12),\n      rgba(30, 58, 95, 0.4));\n  border: 1px solid rgba(212, 175, 55, 0.35);\n  border-radius: var(--radius-lg);\n  padding: 18px 20px;\n  margin-bottom: 16px;\n}\n.invite-banner-left[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.invite-banner-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 800;\n  color: var(--gold);\n  margin-bottom: 4px;\n  font-family: var(--font-body);\n}\n.invite-banner-sub[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #aaa;\n  font-family: var(--font-body);\n}\n.invite-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.invite-btn[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  border-radius: 8px;\n  padding: 8px 18px;\n  cursor: pointer;\n  border: none;\n  transition: all 0.15s;\n}\n.invite-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.invite-btn.accept[_ngcontent-%COMP%] {\n  background: var(--green-cricket);\n  color: var(--navy-deep);\n}\n.invite-btn.accept[_ngcontent-%COMP%]:hover:not(:disabled) {\n  filter: brightness(1.1);\n}\n.invite-btn.decline[_ngcontent-%COMP%] {\n  background: rgba(255, 59, 48, 0.15);\n  color: var(--red-live);\n  border: 1px solid rgba(255, 59, 48, 0.3);\n}\n.invite-btn.decline[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(255, 59, 48, 0.25);\n}\n.notif-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.notif-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 14px 16px;\n  border-left: 3px solid transparent;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.notif-item.unread[_ngcontent-%COMP%] {\n  border-left-color: var(--gold);\n  background: rgba(212, 175, 55, 0.04) !important;\n}\n.notif-item[_ngcontent-%COMP%]:hover {\n  background: rgba(30, 58, 95, 0.5) !important;\n}\n.notif-type-badge[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 9px;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n  padding: 3px 8px;\n  border-radius: 8px;\n  white-space: nowrap;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.badge-auction[_ngcontent-%COMP%] {\n  background: rgba(255, 59, 48, 0.15);\n  color: var(--red-live);\n}\n.badge-points[_ngcontent-%COMP%] {\n  background: rgba(0, 200, 83, 0.12);\n  color: var(--green-cricket);\n}\n.badge-transfer[_ngcontent-%COMP%] {\n  background: rgba(45, 156, 219, 0.12);\n  color: var(--green-soft);\n}\n.badge-general[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.1);\n  color: var(--gold);\n}\n.notif-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.notif-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #fff;\n  margin-bottom: 4px;\n  font-family: var(--font-body);\n}\n.notif-body[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #aaa;\n  line-height: 1.4;\n  margin-bottom: 5px;\n}\n.notif-time[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #555;\n}\n.unread-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--gold);\n  box-shadow: 0 0 6px var(--gold);\n  flex-shrink: 0;\n  margin-top: 4px;\n}\n/*# sourceMappingURL=notifications.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotificationsComponent, { className: "NotificationsComponent", filePath: "app\\notifications\\notifications.component.ts", lineNumber: 123 });
})();
export {
  NotificationsComponent
};
//# sourceMappingURL=chunk-HJF7QM2Z.js.map
