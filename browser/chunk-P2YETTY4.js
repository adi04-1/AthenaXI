import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-FZZPELYY.js";
import {
  NotificationService
} from "./chunk-GC4QY3GN.js";
import {
  AuctionService
} from "./chunk-HGMYO4ZI.js";
import {
  SeasonService
} from "./chunk-V7UAWJAK.js";
import {
  RouterLink
} from "./chunk-LNJWB5JP.js";
import "./chunk-STS7VQLQ.js";
import {
  CommonModule,
  DatePipe,
  NgClass,
  interval,
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
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6BYAOC4F.js";

// src/app/admin/auction-lobby/auction-lobby.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.inviteId;
var _forTrack2 = ($index, $item) => $item.auctionSet;
var _forTrack3 = ($index, $item) => $item.teamId;
var _forTrack4 = ($index, $item) => $item.playerId;
function AuctionLobbyComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function AuctionLobbyComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.success());
  }
}
function AuctionLobbyComponent_Conditional_11_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275listener("click", function AuctionLobbyComponent_Conditional_11_For_6_Template_div_click_0_listener() {
      const s_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectSeason(s_r3));
    });
    \u0275\u0275elementStart(1, "div", 17)(2, "span", 18);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 19);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 3);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r0.selectedSeasonId() === s_r3.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r3.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.statusBadge(s_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r3.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F7E2} Today \xB7 ", s_r3.mode, "");
  }
}
function AuctionLobbyComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 12)(2, "span", 13);
    \u0275\u0275text(3, "Auction Day Today");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 14);
    \u0275\u0275repeaterCreate(5, AuctionLobbyComponent_Conditional_11_For_6_Template, 8, 6, "div", 15, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r0.todayAuctions());
  }
}
function AuctionLobbyComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Loading seasons...");
    \u0275\u0275elementEnd();
  }
}
function AuctionLobbyComponent_Conditional_16_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function AuctionLobbyComponent_Conditional_16_For_2_Template_button_click_0_listener() {
      const s_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectSeason(s_r5));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 23);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const s_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r0.selectedSeasonId() === s_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.modeLabel(s_r5.mode));
  }
}
function AuctionLobbyComponent_Conditional_16_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, " No seasons ready for auction. Create a season and upload players first. ");
    \u0275\u0275elementEnd();
  }
}
function AuctionLobbyComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275repeaterCreate(1, AuctionLobbyComponent_Conditional_16_For_2_Template, 5, 4, "button", 21, _forTrack0);
    \u0275\u0275template(3, AuctionLobbyComponent_Conditional_16_Conditional_3_Template, 2, 0, "p", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.auctionableSeasons());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(3, ctx_r0.auctionableSeasons().length === 0 ? 3 : -1);
  }
}
function AuctionLobbyComponent_Conditional_17_Conditional_12_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const inv_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, inv_r7.respondedAt, "shortTime"));
  }
}
function AuctionLobbyComponent_Conditional_17_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "div", 39)(2, "span", 40);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 41);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 42)(7, "span", 43);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, AuctionLobbyComponent_Conditional_17_Conditional_12_For_2_Conditional_9_Template, 3, 4, "span", 3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const inv_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("border-left-color", inv_r7.themeColour);
    \u0275\u0275classProp("accepted", inv_r7.status === "Accepted")("declined", inv_r7.status === "Declined");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", inv_r7.themeColour);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(inv_r7.shortCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(inv_r7.teamName);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r0.invStatusClass(inv_r7.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.invStatusLabel(inv_r7.status), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(9, inv_r7.respondedAt ? 9 : -1);
  }
}
function AuctionLobbyComponent_Conditional_17_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275repeaterCreate(1, AuctionLobbyComponent_Conditional_17_Conditional_12_For_2_Template, 10, 13, "div", 37, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.lobby().invites);
  }
}
function AuctionLobbyComponent_Conditional_17_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 44);
    \u0275\u0275text(1, " No invites sent yet. Send invites below. ");
    \u0275\u0275elementEnd();
  }
}
function AuctionLobbyComponent_Conditional_17_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u{1F7E2} Auction Live ");
  }
}
function AuctionLobbyComponent_Conditional_17_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" \u25B6\uFE0F Kickstart Auction (", ctx_r0.lobby().acceptedCount, " ready) ");
  }
}
function AuctionLobbyComponent_Conditional_17_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 45)(2, "span", 46);
    \u0275\u0275text(3, "\u{1F7E2}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 47);
    \u0275\u0275text(6, "Auction is LIVE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 3);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "a", 48);
    \u0275\u0275text(10, " Enter Auction Room \u2192 ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", ctx_r0.lobby().acceptedCount, " teams are in the room");
  }
}
function AuctionLobbyComponent_Conditional_17_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Loading sets...");
    \u0275\u0275elementEnd();
  }
}
function AuctionLobbyComponent_Conditional_17_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "No auction order uploaded yet.");
    \u0275\u0275elementEnd();
  }
}
function AuctionLobbyComponent_Conditional_17_Conditional_28_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50)(1, "div", 51)(2, "span", 52);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 53);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 54);
    \u0275\u0275listener("click", function AuctionLobbyComponent_Conditional_17_Conditional_28_For_2_Template_button_click_6_listener() {
      const set_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.shuffleSet(set_r9.auctionSet));
    });
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const set_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(set_r9.setDisplayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", set_r9.pendingCount, " pending \u231B ", set_r9.soldCount, " sold \u{1F4B5} ", set_r9.unsoldCount, " unsold \u274C ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !set_r9.canShuffle || ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", set_r9.canShuffle ? "Shuffle Set" : "Locked", " ");
  }
}
function AuctionLobbyComponent_Conditional_17_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275repeaterCreate(1, AuctionLobbyComponent_Conditional_17_Conditional_28_For_2_Template, 8, 6, "div", 50, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.sets());
  }
}
function AuctionLobbyComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 8)(2, "div", 24)(3, "h2", 9);
    \u0275\u0275text(4, "Team Acceptance Board");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 25)(6, "span", 26);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 27);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 28);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(12, AuctionLobbyComponent_Conditional_17_Conditional_12_Template, 3, 0, "div", 29)(13, AuctionLobbyComponent_Conditional_17_Conditional_13_Template, 2, 0);
    \u0275\u0275elementStart(14, "div", 30)(15, "button", 31);
    \u0275\u0275listener("click", function AuctionLobbyComponent_Conditional_17_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.sendInvites());
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 32);
    \u0275\u0275listener("click", function AuctionLobbyComponent_Conditional_17_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.startAuction());
    });
    \u0275\u0275template(18, AuctionLobbyComponent_Conditional_17_Conditional_18_Template, 1, 0)(19, AuctionLobbyComponent_Conditional_17_Conditional_19_Template, 1, 1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(20, AuctionLobbyComponent_Conditional_17_Conditional_20_Template, 11, 1, "div", 33);
    \u0275\u0275elementStart(21, "div", 8)(22, "h2", 9);
    \u0275\u0275text(23, "Player Sets");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p", 11);
    \u0275\u0275text(25, " Sets stay in fixed order. Shuffle re-randomizes only the players within a set that haven't been auctioned yet. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, AuctionLobbyComponent_Conditional_17_Conditional_26_Template, 2, 0, "p", 3)(27, AuctionLobbyComponent_Conditional_17_Conditional_27_Template, 2, 0)(28, AuctionLobbyComponent_Conditional_17_Conditional_28_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 8)(30, "h2", 9);
    \u0275\u0275text(31, "Send Reminder");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p", 11);
    \u0275\u0275text(33, " Send a custom reminder to pending teams ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 34)(35, "label", 35);
    \u0275\u0275text(36, "Message");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "input", 36);
    \u0275\u0275twoWayListener("ngModelChange", function AuctionLobbyComponent_Conditional_17_Template_input_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.reminderMsg, $event) || (ctx_r0.reminderMsg = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "button", 31);
    \u0275\u0275listener("click", function AuctionLobbyComponent_Conditional_17_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.sendReminder());
    });
    \u0275\u0275text(39, " \u{1F552} Send to Pending Teams ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("\u2705 ", ctx_r0.lobby().acceptedCount, " Accepted");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u23F3 ", ctx_r0.lobby().pendingCount, " Pending");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u274C ", ctx_r0.lobby().declinedCount, " Declined");
    \u0275\u0275advance();
    \u0275\u0275conditional(12, ((tmp_4_0 = ctx_r0.lobby().invites) == null ? null : tmp_4_0.length) > 0 ? 12 : 13);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? "Sending..." : "\u{1F504} Send / Resend Invites", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.lobby().acceptedCount < 1 || ctx_r0.saving() || ctx_r0.lobby().auctionStatus === "InProgress");
    \u0275\u0275advance();
    \u0275\u0275conditional(18, ctx_r0.lobby().auctionStatus === "InProgress" ? 18 : 19);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(20, ctx_r0.lobby().auctionStatus === "InProgress" ? 20 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(26, ctx_r0.loadingSets() ? 26 : ctx_r0.sets().length === 0 ? 27 : 28);
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.reminderMsg);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.reminderMsg || ctx_r0.saving());
  }
}
function AuctionLobbyComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "p", 3);
    \u0275\u0275text(2, "Loading lobby...");
    \u0275\u0275elementEnd()();
  }
}
function AuctionLobbyComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "span", 56);
    \u0275\u0275text(2, "\u274C");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 57);
    \u0275\u0275text(4, " No Auction Session Yet ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6, " Upload the player pool and auction order first from the Player Upload section. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 58);
    \u0275\u0275text(8, " \u2192 Go to Player Upload ");
    \u0275\u0275elementEnd()();
  }
}
function AuctionLobbyComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Loading summary...");
    \u0275\u0275elementEnd();
  }
}
function AuctionLobbyComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "No teams to summarize yet.");
    \u0275\u0275elementEnd();
  }
}
function AuctionLobbyComponent_Conditional_27_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "span", 69);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 70);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 71);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 72);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r10 = ctx.$implicit;
    \u0275\u0275styleProp("border-left-color", t_r10.themeColour);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", t_r10.themeColour);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r10.shortCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r10.teamName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", t_r10.playersAcquired, " players");
    \u0275\u0275advance();
    \u0275\u0275classProp("low", t_r10.budgetRemainingCr < 10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Rs. ", t_r10.budgetRemainingCr, "Cr left");
  }
}
function AuctionLobbyComponent_Conditional_27_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 67);
    \u0275\u0275text(1, "No players resolved yet.");
    \u0275\u0275elementEnd();
  }
}
function AuctionLobbyComponent_Conditional_27_Conditional_28_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1, "RTM");
    \u0275\u0275elementEnd();
  }
}
function AuctionLobbyComponent_Conditional_27_Conditional_28_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275text(1, " Sold to ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(r_r11.winningTeamName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", r_r11.winningTeamCode, ") ");
  }
}
function AuctionLobbyComponent_Conditional_27_Conditional_28_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 85);
    \u0275\u0275text(1, "Went unsold");
    \u0275\u0275elementEnd();
  }
}
function AuctionLobbyComponent_Conditional_27_Conditional_28_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "span", 76);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 77)(4, "div", 78)(5, "span", 79);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 80);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 81);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, AuctionLobbyComponent_Conditional_27_Conditional_28_For_2_Conditional_11_Template, 2, 0, "span", 82);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, AuctionLobbyComponent_Conditional_27_Conditional_28_For_2_Conditional_12_Template, 5, 2, "div", 83)(13, AuctionLobbyComponent_Conditional_27_Conditional_28_For_2_Conditional_13_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 84);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const r_r11 = ctx.$implicit;
    const i_r12 = ctx.$index;
    \u0275\u0275classProp("aol-unsold", r_r11.wentUnsold);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r12 + 1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(r_r11.playerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r11.iplTeam);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r11.role);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, r_r11.wasRtm ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(12, !r_r11.wentUnsold ? 12 : 13);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("aol-price-unsold", r_r11.wentUnsold);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", r_r11.wentUnsold ? "\xE2\u20AC\u201D" : "Rs. " + r_r11.finalPriceCr + "Cr", " ");
  }
}
function AuctionLobbyComponent_Conditional_27_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275repeaterCreate(1, AuctionLobbyComponent_Conditional_27_Conditional_28_For_2_Template, 16, 11, "div", 74, _forTrack4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.results());
  }
}
function AuctionLobbyComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "div", 60)(2, "span", 61);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 62);
    \u0275\u0275text(5, "Sold");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 60)(7, "span", 61);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 62);
    \u0275\u0275text(10, "Unsold");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 60)(12, "span", 61);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 62);
    \u0275\u0275text(15, "Pending");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 60)(17, "span", 61);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 62);
    \u0275\u0275text(20, "Total Spent");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 63);
    \u0275\u0275repeaterCreate(22, AuctionLobbyComponent_Conditional_27_For_23_Template, 9, 10, "div", 64, _forTrack3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 65)(25, "div", 66);
    \u0275\u0275text(26, "Players Auctioned (In Order)");
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, AuctionLobbyComponent_Conditional_27_Conditional_27_Template, 2, 0, "p", 67)(28, AuctionLobbyComponent_Conditional_27_Conditional_28_Template, 3, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.summaryTotals().sold);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.summaryTotals().unsold);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.summaryTotals().pending);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Rs. ", ctx_r0.summaryTotals().totalSpent, "Cr");
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.standings());
    \u0275\u0275advance(5);
    \u0275\u0275conditional(27, ctx_r0.results().length === 0 ? 27 : 28);
  }
}
var AuctionLobbyComponent = class _AuctionLobbyComponent {
  constructor(seasonSvc, auctionSvc, notifSvc) {
    this.seasonSvc = seasonSvc;
    this.auctionSvc = auctionSvc;
    this.notifSvc = notifSvc;
    this.seasons = signal([]);
    this.auctionableSeasons = signal([]);
    this.todayAuctions = signal([]);
    this.selectedSeasonId = signal(null);
    this.lobby = signal(null);
    this.loadingSeasons = signal(true);
    this.loadingLobby = signal(false);
    this.saving = signal(false);
    this.error = signal("");
    this.success = signal("");
    this.reminderMsg = "";
    this.sets = signal([]);
    this.loadingSets = signal(false);
    this.standings = signal([]);
    this.results = signal([]);
    this.loadingSummary = signal(false);
    this.sessionId = signal(null);
  }
  ngOnInit() {
    this.loadSeasons();
  }
  ngOnDestroy() {
    this.pollSub?.unsubscribe();
  }
  loadSeasons() {
    this.seasonSvc.getAll().subscribe({
      next: (d) => {
        this.seasons.set(d);
        const today = (/* @__PURE__ */ new Date()).toDateString();
        this.todayAuctions.set(d.filter((s) => s.auctionDate && new Date(s.auctionDate).toDateString() === today));
        this.auctionableSeasons.set(d.filter((s) => ["Upcoming", "ReadyForAuction", "AuctionPhase"].includes(s.status)));
        this.loadingSeasons.set(false);
      },
      error: () => this.loadingSeasons.set(false)
    });
  }
  selectSeason(s) {
    this.selectedSeasonId.set(s.id);
    this.lobby.set(null);
    this.loadingLobby.set(true);
    this.pollSub?.unsubscribe();
    this.auctionSvc.getSessionAny(s.id).subscribe({
      next: (anySession) => {
        if (anySession?.id) {
          this.loadSummary(s.id, anySession.id);
        }
      },
      error: () => {
      }
    });
    this.auctionSvc.getSession(s.id).subscribe({
      next: (session) => {
        this.sessionId.set(session.id);
        this.loadLobby(session.id);
        this.loadSets(session.id);
        if (session.id != null) {
          this.pollSub = interval(5e3).subscribe(() => {
            this.loadLobby(session.id);
            this.loadSets(session.id);
            this.loadSummary(s.id, session.id);
          });
        }
      },
      error: () => {
        this.lobby.set(null);
        this.loadingLobby.set(false);
      }
    });
  }
  loadLobby(sessionId) {
    this.auctionSvc.getLobby(sessionId).subscribe({
      next: (d) => {
        this.lobby.set(d);
        this.loadingLobby.set(false);
      },
      error: () => this.loadingLobby.set(false)
    });
  }
  loadSets(sessionId) {
    this.loadingSets.set(true);
    this.auctionSvc.getSets(sessionId).subscribe({
      next: (d) => {
        this.sets.set(d);
        this.loadingSets.set(false);
      },
      error: () => this.loadingSets.set(false)
    });
  }
  loadSummary(seasonId, sessionId) {
    this.loadingSummary.set(true);
    this.auctionSvc.getStandings(seasonId).subscribe({
      next: (d) => {
        this.standings.set(d);
        this.loadingSummary.set(false);
      },
      error: () => this.loadingSummary.set(false)
    });
    this.auctionSvc.getResults(sessionId).subscribe({
      next: (d) => this.results.set(d),
      error: () => {
      }
    });
  }
  summaryTotals() {
    const sold = this.results().filter((r) => !r.wentUnsold).length;
    const unsold = this.results().filter((r) => r.wentUnsold).length;
    const pending = this.sets().reduce((sum, s) => sum + (s.pendingCount ?? 0), 0);
    const totalSpent = this.results().filter((r) => !r.wentUnsold).reduce((sum, r) => sum + (r.finalPriceCr ?? 0), 0);
    return { sold, unsold, pending, totalSpent };
  }
  shuffleSet(auctionSet) {
    const sid = this.sessionId();
    if (!sid)
      return;
    this.saving.set(true);
    this.auctionSvc.shuffleSet(sid, auctionSet).subscribe({
      next: (r) => {
        this.saving.set(false);
        this.success.set(r?.message ?? "Set shuffled!");
        setTimeout(() => this.success.set(""), 3e3);
        this.loadSets(sid);
      },
      error: (e) => {
        this.error.set(e?.error?.error ?? "Failed to shuffle set.");
        this.saving.set(false);
      }
    });
  }
  refresh() {
    const sid = this.sessionId();
    const seasonId = this.selectedSeasonId();
    if (sid && seasonId) {
      this.loadLobby(sid);
      this.loadSets(sid);
      this.loadSummary(seasonId, sid);
    } else
      this.loadSeasons();
  }
  sendInvites() {
    const sid = this.sessionId();
    if (!sid)
      return;
    this.saving.set(true);
    this.error.set("");
    this.auctionSvc.sendInvites(sid).subscribe({
      next: (r) => {
        this.success.set(`\u2705 Invites sent to ${r.count} teams!`);
        this.saving.set(false);
        this.loadLobby(sid);
        setTimeout(() => this.success.set(""), 4e3);
      },
      error: (e) => {
        this.error.set(e?.error?.error ?? "Failed to send invites.");
        this.saving.set(false);
      }
    });
  }
  sendReminder() {
    if (!this.reminderMsg)
      return;
    this.saving.set(true);
    const pending = this.lobby()?.invites?.filter((i) => i.status === "Pending") ?? [];
    const sends = pending.map((i) => this.notifSvc.sendNotification({
      userId: i.userId,
      title: "\u23F0 Auction Reminder",
      body: this.reminderMsg,
      type: "AuctionStartingSoon"
    }));
    if (sends.length === 0) {
      this.success.set("No pending teams to remind.");
      this.saving.set(false);
      return;
    }
    this.notifSvc.sendNotification({
      userId: null,
      title: "\u23F0 Auction Reminder",
      body: this.reminderMsg,
      type: "AuctionStartingSoon"
    }).subscribe({
      next: () => {
        this.success.set(`Reminder sent to ${pending.length} pending teams!`);
        this.reminderMsg = "";
        this.saving.set(false);
        setTimeout(() => this.success.set(""), 4e3);
      },
      error: () => {
        this.error.set("Failed to send reminder.");
        this.saving.set(false);
      }
    });
  }
  startAuction() {
    const sid = this.sessionId();
    if (!sid)
      return;
    this.saving.set(true);
    this.auctionSvc.startAuction(sid).subscribe({
      next: () => {
        this.success.set("\u2705 Auction started!");
        this.saving.set(false);
        this.loadLobby(sid);
      },
      error: (e) => {
        this.error.set(e?.error?.error ?? "Failed to start.");
        this.saving.set(false);
      }
    });
  }
  invStatusClass(s) {
    return s?.toLowerCase() ?? "pending";
  }
  invStatusLabel(s) {
    return { Accepted: "\u2705 Accepted", Pending: "\u{1F552} Pending", Declined: "\u274C Declined" }[s] ?? s;
  }
  statusBadge(s) {
    const m = {
      Upcoming: "athena-badge-surface",
      ReadyForAuction: "athena-badge-blue",
      AuctionPhase: "athena-badge-red",
      InProgress: "athena-badge-green"
    };
    return m[s] ?? "athena-badge-surface";
  }
  modeLabel(m) {
    return { FreshAuction: "Fresh", AuctionWithRetentions: "Retention", DirectAllocation: "Direct" }[m] ?? m;
  }
  static {
    this.\u0275fac = function AuctionLobbyComponent_Factory(t) {
      return new (t || _AuctionLobbyComponent)(\u0275\u0275directiveInject(SeasonService), \u0275\u0275directiveInject(AuctionService), \u0275\u0275directiveInject(NotificationService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuctionLobbyComponent, selectors: [["app-auction-lobby"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 28, vars: 6, consts: [[1, "admin-page"], [1, "admin-page-header"], [1, "athena-page-title", 2, "margin-bottom", "4px"], [1, "athena-label"], [1, "athena-btn", "athena-btn-secondary", 3, "click"], [1, "athena-error", "animate-fade-in"], [1, "athena-success", "animate-fade-in"], [1, "today-banner", "animate-fade-in"], [1, "athena-card", "section-card"], [1, "section-title"], [1, "lobby-panel", "animate-fade-in"], [1, "athena-label", 2, "margin-bottom", "12px"], [1, "today-header"], [1, "athena-live-dot", 2, "font-family", "var(--font-body)", "font-size", "13px", "font-weight", "700", "color", "var(--red-live)"], [1, "today-list"], [1, "today-card", 3, "selected"], [1, "today-card", 3, "click"], [1, "today-card-main"], [1, "today-name"], [1, "athena-badge", 3, "ngClass"], [1, "season-pills"], [1, "season-pill", 3, "active"], [1, "season-pill", 3, "click"], [1, "athena-badge", "athena-badge-surface", 2, "font-size", "10px"], [1, "lobby-header"], [1, "acceptance-stats"], [1, "stat-chip", "green"], [1, "stat-chip", "yellow"], [1, "stat-chip", "red"], [1, "invite-list"], [1, "lobby-actions"], [1, "athena-btn", "athena-btn-secondary", 3, "click", "disabled"], [1, "athena-btn", "athena-btn-primary", "kickstart-btn", 3, "click", "disabled"], [1, "athena-card", "live-banner", "animate-fade-in"], [1, "athena-field", 2, "margin-bottom", "12px"], [1, "athena-field-label"], ["placeholder", "Auction starts in 30 minutes! Please accept the invite.", 1, "athena-input", 3, "ngModelChange", "ngModel"], [1, "invite-row", 3, "accepted", "declined", "border-left-color"], [1, "invite-row"], [1, "invite-team"], [1, "inv-code"], [1, "inv-name"], [1, "invite-right"], [1, "invite-status-badge", 3, "ngClass"], [1, "athena-label", 2, "margin-top", "12px"], [2, "display", "flex", "align-items", "center", "gap", "12px"], [2, "font-size", "32px"], [1, "athena-heading", 2, "font-size", "18px"], ["routerLink", "/auction", 1, "athena-btn", "athena-btn-primary", 2, "margin-left", "auto", "text-decoration", "none"], [1, "sets-list"], [1, "set-row"], [1, "set-info"], [1, "set-name"], [1, "set-counts"], [1, "shuffle-btn", 3, "click", "disabled"], [1, "athena-card", "section-card", "no-session-card", "animate-fade-in"], [2, "font-size", "40px"], [2, "color", "#fff", "font-family", "var(--font-body)", "font-weight", "700", "margin", "12px 0 6px"], ["routerLink", "/admin/players", 1, "athena-btn", "athena-btn-secondary", 2, "margin-top", "16px", "text-decoration", "none", "display", "inline-block"], [1, "summary-totals-row"], [1, "summary-stat"], [1, "ss-val"], [1, "ss-lbl"], [1, "summary-team-list"], [1, "summary-team-row", 3, "border-left-color"], [1, "auctioned-order-block"], [1, "aob-title"], [1, "athena-label", 2, "margin-top", "6px"], [1, "summary-team-row"], [1, "st-code"], [1, "st-name"], [1, "st-players"], [1, "st-budget"], [1, "auctioned-order-list"], [1, "aol-row", 3, "aol-unsold"], [1, "aol-row"], [1, "aol-num"], [1, "aol-info"], [1, "aol-name-row"], [1, "aol-name"], [1, "aol-tag"], [1, "aol-tag", "aol-role"], [1, "aol-tag", "aol-rtm"], [1, "aol-sold-to"], [1, "aol-price"], [1, "aol-sold-to", "aol-unsold-text"]], template: function AuctionLobbyComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "\u{1F468}\u200D\u2696\u{1F4B8}\u{1F64B}\u200D\u2642\uFE0F Auction Lobby");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Manage auction day \u2014 invites, acceptance tracking, kickstart");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 4);
        \u0275\u0275listener("click", function AuctionLobbyComponent_Template_button_click_7_listener() {
          return ctx.refresh();
        });
        \u0275\u0275text(8, "\u{1F504} Refresh");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, AuctionLobbyComponent_Conditional_9_Template, 2, 1, "div", 5)(10, AuctionLobbyComponent_Conditional_10_Template, 2, 1, "div", 6)(11, AuctionLobbyComponent_Conditional_11_Template, 7, 0, "div", 7);
        \u0275\u0275elementStart(12, "div", 8)(13, "h2", 9);
        \u0275\u0275text(14, "Select Season for Auction");
        \u0275\u0275elementEnd();
        \u0275\u0275template(15, AuctionLobbyComponent_Conditional_15_Template, 2, 0, "p", 3)(16, AuctionLobbyComponent_Conditional_16_Template, 4, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275template(17, AuctionLobbyComponent_Conditional_17_Template, 40, 12, "div", 10)(18, AuctionLobbyComponent_Conditional_18_Template, 3, 0)(19, AuctionLobbyComponent_Conditional_19_Template, 9, 0);
        \u0275\u0275elementStart(20, "div", 8)(21, "h2", 9);
        \u0275\u0275text(22, "Auction Summary");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "p", 11);
        \u0275\u0275text(24, " Live totals updates automatically while the auction runs. ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(25, AuctionLobbyComponent_Conditional_25_Template, 2, 0, "p", 3)(26, AuctionLobbyComponent_Conditional_26_Template, 2, 0)(27, AuctionLobbyComponent_Conditional_27_Template, 29, 5);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275conditional(9, ctx.error() ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(10, ctx.success() ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(11, ctx.todayAuctions().length > 0 ? 11 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(15, ctx.loadingSeasons() ? 15 : 16);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(17, ctx.selectedSeasonId() && ctx.lobby() ? 17 : ctx.selectedSeasonId() && !ctx.lobby() && ctx.loadingLobby() ? 18 : ctx.selectedSeasonId() && !ctx.lobby() && !ctx.loadingLobby() ? 19 : -1);
        \u0275\u0275advance(8);
        \u0275\u0275conditional(25, ctx.loadingSummary() ? 25 : ctx.standings().length === 0 ? 26 : 27);
      }
    }, dependencies: [CommonModule, NgClass, DatePipe, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink], styles: ["\n\n.admin-page[_ngcontent-%COMP%] {\n  padding: 28px 24px;\n  max-width: 800px;\n}\n.admin-page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.section-card[_ngcontent-%COMP%] {\n  padding: 20px;\n  margin-bottom: 16px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 15px;\n  font-weight: 700;\n  color: #fff;\n  margin-bottom: 14px;\n}\n.today-banner[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(255, 59, 48, 0.08),\n      rgba(30, 58, 95, 0.4));\n  border: 1px solid rgba(255, 59, 48, 0.25);\n  border-radius: var(--radius-lg);\n  padding: 16px 20px;\n  margin-bottom: 16px;\n}\n.today-header[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.today-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.today-card[_ngcontent-%COMP%] {\n  background: rgba(10, 31, 47, 0.6);\n  border-radius: var(--radius-md);\n  padding: 12px 16px;\n  cursor: pointer;\n  border: 1px solid rgba(255, 59, 48, 0.15);\n  transition: all 0.15s;\n}\n.today-card[_ngcontent-%COMP%]:hover, .today-card.selected[_ngcontent-%COMP%] {\n  border-color: var(--red-live);\n  background: rgba(255, 59, 48, 0.08);\n}\n.today-card-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 4px;\n}\n.today-name[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 14px;\n  font-weight: 700;\n  color: #fff;\n}\n.season-pills[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.season-pill[_ngcontent-%COMP%] {\n  background: rgba(10, 31, 47, 0.6);\n  border: 1px solid rgba(212, 175, 55, 0.1);\n  border-radius: var(--radius-xl);\n  padding: 8px 14px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: var(--font-body);\n  font-size: 13px;\n  font-weight: 600;\n  color: #aaa;\n  transition: all 0.15s;\n}\n.season-pill[_ngcontent-%COMP%]:hover {\n  border-color: rgba(212, 175, 55, 0.3);\n  color: #fff;\n}\n.season-pill.active[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.1);\n  border-color: var(--gold);\n  color: var(--gold);\n}\n.lobby-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.lobby-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-bottom: 14px;\n}\n.acceptance-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.stat-chip[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 20px;\n}\n.stat-chip.green[_ngcontent-%COMP%] {\n  background: rgba(0, 200, 83, 0.12);\n  color: var(--green-cricket);\n}\n.stat-chip.yellow[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.12);\n  color: var(--gold);\n}\n.stat-chip.red[_ngcontent-%COMP%] {\n  background: rgba(255, 59, 48, 0.12);\n  color: var(--red-live);\n}\n.invite-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.invite-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 14px;\n  background: rgba(10, 31, 47, 0.6);\n  border-left: 3px solid #333;\n  border-radius: 0 var(--radius-md) var(--radius-md) 0;\n  transition: all 0.2s;\n}\n.invite-row.accepted[_ngcontent-%COMP%] {\n  background: rgba(0, 200, 83, 0.06);\n  border-left-color: var(--green-cricket) !important;\n}\n.invite-row.declined[_ngcontent-%COMP%] {\n  background: rgba(255, 59, 48, 0.06);\n  border-left-color: var(--red-live) !important;\n}\n.invite-team[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.inv-code[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 800;\n  min-width: 28px;\n}\n.inv-name[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 14px;\n  font-weight: 600;\n  color: #fff;\n}\n.invite-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.invite-status-badge[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 11px;\n  font-weight: 700;\n  padding: 3px 10px;\n  border-radius: 10px;\n}\n.invite-status-badge.accepted[_ngcontent-%COMP%] {\n  background: rgba(0, 200, 83, 0.15);\n  color: var(--green-cricket);\n}\n.invite-status-badge.pending[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.12);\n  color: var(--gold);\n}\n.invite-status-badge.declined[_ngcontent-%COMP%] {\n  background: rgba(255, 59, 48, 0.12);\n  color: var(--red-live);\n}\n.lobby-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.kickstart-btn[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n.sets-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.summary-totals-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-bottom: 14px;\n}\n.summary-stat[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 90px;\n  background: rgba(10, 31, 47, 0.6);\n  border-radius: var(--radius-md);\n  padding: 12px;\n  text-align: center;\n  border: 1px solid rgba(212, 175, 55, 0.08);\n}\n.ss-val[_ngcontent-%COMP%] {\n  display: block;\n  font-family: var(--font-timer);\n  font-size: 20px;\n  font-weight: 900;\n  color: var(--gold);\n}\n.ss-lbl[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n  color: #777;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  margin-top: 2px;\n}\n.summary-team-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.summary-team-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: rgba(10, 31, 47, 0.5);\n  border-left: 3px solid;\n  border-radius: 0 var(--radius-md) var(--radius-md) 0;\n  padding: 9px 14px;\n}\n.st-code[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 900;\n  flex-shrink: 0;\n}\n.st-name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 13px;\n  font-weight: 600;\n  color: #fff;\n}\n.st-players[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #888;\n}\n.st-budget[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--green-cricket);\n}\n.st-budget.low[_ngcontent-%COMP%] {\n  color: var(--red-live);\n}\n.auctioned-order-block[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding-top: 14px;\n  border-top: 1px solid rgba(212, 175, 55, 0.1);\n}\n.aob-title[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 11px;\n  font-weight: 900;\n  letter-spacing: 0.1em;\n  color: var(--gold-dark);\n  text-transform: uppercase;\n  margin-bottom: 10px;\n}\n.auctioned-order-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  max-height: 420px;\n  overflow-y: auto;\n}\n.aol-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: rgba(10, 31, 47, 0.5);\n  border-radius: var(--radius-md);\n  padding: 9px 12px;\n  border: 1px solid rgba(212, 175, 55, 0.06);\n}\n.aol-row.aol-unsold[_ngcontent-%COMP%] {\n  background: rgba(255, 59, 48, 0.04);\n  border-color: rgba(255, 59, 48, 0.1);\n}\n.aol-num[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 12px;\n  font-weight: 900;\n  color: var(--gold-dark);\n  width: 22px;\n  flex-shrink: 0;\n  text-align: center;\n}\n.aol-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.aol-name-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-bottom: 2px;\n}\n.aol-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: #fff;\n}\n.aol-tag[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  color: #888;\n  background: rgba(255, 255, 255, 0.05);\n  padding: 1px 7px;\n  border-radius: 8px;\n}\n.aol-role[_ngcontent-%COMP%] {\n  color: var(--green-soft);\n}\n.aol-rtm[_ngcontent-%COMP%] {\n  color: var(--red-live);\n  background: rgba(255, 59, 48, 0.1);\n}\n.aol-sold-to[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #777;\n}\n.aol-sold-to[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ccc;\n}\n.aol-unsold-text[_ngcontent-%COMP%] {\n  color: var(--red-live);\n}\n.aol-price[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 14px;\n  font-weight: 900;\n  color: var(--gold);\n  flex-shrink: 0;\n}\n.aol-price-unsold[_ngcontent-%COMP%] {\n  color: #555;\n  font-size: 13px;\n  font-weight: 600;\n}\n.set-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  background: rgba(10, 31, 47, 0.6);\n  border-radius: var(--radius-md);\n  padding: 12px 16px;\n  border: 1px solid rgba(212, 175, 55, 0.08);\n}\n.set-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.set-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #fff;\n  font-family: var(--font-body);\n}\n.set-counts[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #777;\n}\n.shuffle-btn[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--green-soft);\n  background: rgba(45, 156, 219, 0.1);\n  border: 1px solid rgba(45, 156, 219, 0.25);\n  border-radius: 8px;\n  padding: 7px 16px;\n  cursor: pointer;\n  flex-shrink: 0;\n  white-space: nowrap;\n  transition: background 0.15s;\n}\n.shuffle-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(45, 156, 219, 0.22);\n}\n.shuffle-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n  color: #666;\n  background: rgba(255, 255, 255, 0.04);\n  border-color: rgba(255, 255, 255, 0.08);\n}\n.live-banner[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgba(255, 59, 48, 0.1),\n      rgba(30, 58, 95, 0.5)) !important;\n  border: 1px solid rgba(255, 59, 48, 0.3) !important;\n  padding: 20px;\n  margin-bottom: 16px;\n}\n.no-session-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n/*# sourceMappingURL=auction-lobby.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuctionLobbyComponent, { className: "AuctionLobbyComponent", filePath: "app\\admin\\auction-lobby\\auction-lobby.component.ts", lineNumber: 787 });
})();
export {
  AuctionLobbyComponent
};
//# sourceMappingURL=chunk-P2YETTY4.js.map
