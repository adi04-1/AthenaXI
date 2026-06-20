import {
  TeamService
} from "./chunk-OLMNDMN6.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-FZZPELYY.js";
import {
  AuctionService
} from "./chunk-HGMYO4ZI.js";
import {
  SeasonService
} from "./chunk-V7UAWJAK.js";
import {
  AuthService
} from "./chunk-26VBKVEF.js";
import {
  RouterLink
} from "./chunk-LNJWB5JP.js";
import "./chunk-STS7VQLQ.js";
import {
  CommonModule,
  DatePipe,
  NgClass,
  computed,
  effect,
  interval,
  signal,
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
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6BYAOC4F.js";

// src/app/auction/room/auction-room.component.ts
var _forTrack0 = ($index, $item) => $item.teamId;
var _forTrack1 = ($index, $item) => $item.slotId;
var _forTrack2 = ($index, $item) => $item.bidId;
function AuctionRoomComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 10);
    \u0275\u0275text(1, "\u2190 Lobby");
    \u0275\u0275elementEnd();
  }
}
function AuctionRoomComponent_Conditional_25_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_25_Conditional_4_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.startAuction());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Starting..." : "Start Auction", " ");
  }
}
function AuctionRoomComponent_Conditional_25_Conditional_4_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, "Waiting for the auctioneer to begin...");
    \u0275\u0275elementEnd();
  }
}
function AuctionRoomComponent_Conditional_25_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "All teams notified. Start when everyone is ready.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AuctionRoomComponent_Conditional_25_Conditional_4_Conditional_4_Template, 2, 2, "button", 16)(5, AuctionRoomComponent_Conditional_25_Conditional_4_Conditional_5_Template, 2, 0);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", (tmp_2_0 = (tmp_2_0 = ctx_r1.session()) == null ? null : tmp_2_0.totalPlayers) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : 0, " Players Loaded");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(4, ctx_r1.isAdmin() ? 4 : 5);
  }
}
function AuctionRoomComponent_Conditional_25_Conditional_5_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 19);
    \u0275\u0275text(1, "Go to Lobby");
    \u0275\u0275elementEnd();
  }
}
function AuctionRoomComponent_Conditional_25_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1, "No Active Auction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Upload players and set the auction order from Admin, then return here.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AuctionRoomComponent_Conditional_25_Conditional_5_Conditional_4_Template, 2, 0, "a", 19);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(4, ctx_r1.isAdmin() ? 4 : -1);
  }
}
function AuctionRoomComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 14)(2, "div", 15);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AuctionRoomComponent_Conditional_25_Conditional_4_Template, 6, 2)(5, AuctionRoomComponent_Conditional_25_Conditional_5_Template, 5, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(((tmp_1_0 = ctx_r1.session()) == null ? null : tmp_1_0.status) === "NotStarted" ? "READY" : "STANDBY");
    \u0275\u0275advance();
    \u0275\u0275conditional(4, ((tmp_2_0 = ctx_r1.session()) == null ? null : tmp_2_0.status) === "NotStarted" ? 4 : 5);
  }
}
function AuctionRoomComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 14)(2, "div", 20);
    \u0275\u0275text(3, "COMPLETE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5, "Auction Finished");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "All squads are locked. Teams can now assign Captain, VC and Impact Player.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "a", 21);
    \u0275\u0275text(9, "View Leaderboard");
    \u0275\u0275elementEnd()()();
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_2_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.reauctionMode.set(true));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Start Unsold Round (", ctx_r1.unsoldList().length, " players) ");
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 30);
    \u0275\u0275text(2, "MAIN ORDER COMPLETE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Primary Auction Round Finished");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, AuctionRoomComponent_Conditional_27_Conditional_2_Conditional_7_Template, 2, 1, "button", 31);
    \u0275\u0275elementStart(8, "button", 32);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_2_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.completeAuction());
    });
    \u0275\u0275text(9, " Complete Auction & Lock All Squads ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2(" ", (tmp_2_0 = (tmp_2_0 = ctx_r1.session()) == null ? null : tmp_2_0.soldCount) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : 0, " sold \xB7 ", ctx_r1.unsoldList().length, " unsold remaining ");
    \u0275\u0275advance();
    \u0275\u0275conditional(7, ctx_r1.unsoldList().length > 0 ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 37);
    \u0275\u0275text(1, "No unsold players remaining.");
    \u0275\u0275elementEnd();
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_3_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "span", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 41);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_3_Conditional_7_For_2_Template_button_click_3_listener() {
      const u_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.recall(u_r7.slotId));
    });
    \u0275\u0275text(4, " Re-auction ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const u_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r7.playerName);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_3_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275repeaterCreate(1, AuctionRoomComponent_Conditional_27_Conditional_3_Conditional_7_For_2_Template, 5, 2, "div", 39, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.unsoldList());
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 34)(2, "span", 35);
    \u0275\u0275text(3, "UNSOLD ROUND \u2014 Pick a player to re-auction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 36);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_3_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.reauctionMode.set(false));
    });
    \u0275\u0275text(5, "\u2190 Back");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, AuctionRoomComponent_Conditional_27_Conditional_3_Conditional_6_Template, 2, 0, "p", 37)(7, AuctionRoomComponent_Conditional_27_Conditional_3_Conditional_7_Template, 3, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(6, ctx_r1.unsoldList().length === 0 ? 6 : 7);
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 30);
    \u0275\u0275text(2, "ROUND COMPLETE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Waiting for Auctioneer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "The auctioneer is reviewing unsold players or completing the auction.");
    \u0275\u0275elementEnd()();
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "span", 60);
    \u0275\u0275text(2, "RTM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " holds Right to Match on this player");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.cp().rtmTeam);
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1, "Overseas");
    \u0275\u0275elementEnd();
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1, "Uncapped");
    \u0275\u0275elementEnd();
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275element(1, "div", 62);
    \u0275\u0275elementStart(2, "div", 63);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("urgent", ctx_r1.timerSecs() <= 5);
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r1.timerSecs() / 10 * 100 + "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.timerSecs(), "s");
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_25_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 74);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_25_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.teamBid(true));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Exercise RTM \u2014 Match Rs. ", ctx_r1.currentBid(), "Cr (", ctx_r1.myTeam().rtmSlotsRemaining, " slot left) ");
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_25_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.bidErr());
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57)(1, "div", 64)(2, "span", 65);
    \u0275\u0275text(3, "My Budget");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 66);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 67)(7, "button", 68);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_25_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setAmt(ctx_r1.minBid()));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 68);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_25_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setAmt(ctx_r1.minBid() + ctx_r1.cp().bidIncrementCr));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 68);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_25_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setAmt(ctx_r1.minBid() + ctx_r1.cp().bidIncrementCr * 2));
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 69)(14, "input", 70);
    \u0275\u0275twoWayListener("ngModelChange", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_25_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.bidAmt, $event) || (ctx_r1.bidAmt = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 71);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_25_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.teamBid());
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_25_Conditional_17_Template, 2, 3, "button", 72)(18, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_25_Conditional_18_Template, 2, 1, "div", 73);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("low", ctx_r1.myTeam().budgetRemainingCr < 10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Rs. ", ctx_r1.myTeam().budgetRemainingCr, "Cr ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Rs. ", ctx_r1.minBid(), "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Rs. ", ctx_r1.minBid() + ctx_r1.cp().bidIncrementCr, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Rs. ", ctx_r1.minBid() + ctx_r1.cp().bidIncrementCr * 2, "");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.bidAmt);
    \u0275\u0275property("min", ctx_r1.minBid());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving() || ctx_r1.bidAmt < ctx_r1.minBid());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "..." : "BID", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(17, ((tmp_12_0 = ctx_r1.cp()) == null ? null : tmp_12_0.rtmTeam) === ctx_r1.myTeam().shortCode && ctx_r1.myTeam().rtmSlotsRemaining > 0 ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(18, ctx_r1.bidErr() ? 18 : -1);
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 81);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r11 = ctx.$implicit;
    \u0275\u0275property("value", t_r11.userId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", t_r11.shortCode, " \u2014 ", t_r11.teamName, " (Rs. ", t_r11.budgetRemainingCr, "Cr)");
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.bidErr());
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1, "\u2014 place at least one bid first");
    \u0275\u0275elementEnd();
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86)(1, "span", 94);
    \u0275\u0275text(2, "Current leader:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 95);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 96);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("color", ctx_r1.leaderColour());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.leaderName());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("=> Rs. ", ctx_r1.currentBid(), "Cr");
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 81);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r12 = ctx.$implicit;
    \u0275\u0275property("value", t_r12.userId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", t_r12.shortCode, " \u2014 ", t_r12.teamName, "");
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 89);
    \u0275\u0275text(1, "Place at least one bid before marking sold.");
    \u0275\u0275elementEnd();
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 97);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Conditional_42_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.completeAuction());
    });
    \u0275\u0275text(1, " Complete Auction & Lock All Squads ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58)(1, "div", 75);
    \u0275\u0275text(2, "AUCTIONEER CONTROLS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 76)(4, "div", 77);
    \u0275\u0275text(5, "Raise bid on behalf of team");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 78)(7, "select", 79);
    \u0275\u0275twoWayListener("ngModelChange", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Template_select_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.raiseBidUserId, $event) || (ctx_r1.raiseBidUserId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(8, "option", 80);
    \u0275\u0275text(9, "Select team...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(10, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_For_11_Template, 2, 4, "option", 81, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 78)(13, "button", 68);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setAmt(ctx_r1.minBid()));
    });
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 68);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setAmt(ctx_r1.minBid() + ctx_r1.cp().bidIncrementCr));
    });
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 82);
    \u0275\u0275twoWayListener("ngModelChange", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.bidAmt, $event) || (ctx_r1.bidAmt = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 83);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.adminRaise());
    });
    \u0275\u0275text(19, "RAISE");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(20, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Conditional_20_Template, 2, 1, "div", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 84)(22, "div", 77);
    \u0275\u0275text(23, " Mark as SOLD ");
    \u0275\u0275template(24, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Conditional_24_Template, 2, 0, "span", 85);
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Conditional_25_Template, 7, 4, "div", 86);
    \u0275\u0275elementStart(26, "div", 78)(27, "select", 79);
    \u0275\u0275twoWayListener("ngModelChange", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Template_select_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.soldUserId, $event) || (ctx_r1.soldUserId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(28, "option", 80);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(30, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_For_31_Template, 2, 3, "option", 81, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 87);
    \u0275\u0275twoWayListener("ngModelChange", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.soldAmt, $event) || (ctx_r1.soldAmt = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 88);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.markSold());
    });
    \u0275\u0275text(34, " SOLD ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(35, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Conditional_35_Template, 2, 0, "div", 89);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 76)(37, "div", 90)(38, "button", 91);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleTimer());
    });
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 92);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.markUnsold());
    });
    \u0275\u0275text(41, "UNSOLD");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(42, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Conditional_42_Template, 2, 1, "button", 93);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_24_0;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.raiseBidUserId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.standings());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Rs. ", ctx_r1.minBid(), "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Rs. ", ctx_r1.minBid() + ctx_r1.cp().bidIncrementCr, "");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.bidAmt);
    \u0275\u0275property("min", ctx_r1.minBid());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.raiseBidUserId || ctx_r1.saving());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(20, ctx_r1.bidErr() ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("ready", ctx_r1.hasBid());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(24, !ctx_r1.hasBid() ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(25, ctx_r1.hasBid() ? 25 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.soldUserId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.hasBid() ? "Confirm: " + ctx_r1.leaderName() + " (or override)" : "Select team...", " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.standings());
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.soldAmt);
    \u0275\u0275property("placeholder", "Rs." + ctx_r1.currentBid());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.hasBid() || ctx_r1.saving());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(35, !ctx_r1.hasBid() ? 35 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("on", ctx_r1.timerOn());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.timerOn() ? "Stop Timer (" + ctx_r1.timerSecs() + "s)" : "Start 10s Timer", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(42, ((tmp_24_0 = (tmp_24_0 = ctx_r1.session()) == null ? null : tmp_24_0.pendingCount) !== null && tmp_24_0 !== void 0 ? tmp_24_0 : 1) === 0 ? 42 : -1);
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_27_For_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 103);
    \u0275\u0275text(1, "RTM");
    \u0275\u0275elementEnd();
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_27_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 100)(1, "div", 101);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 102);
    \u0275\u0275template(4, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_27_For_4_Conditional_4_Template, 2, 0, "span", 103);
    \u0275\u0275elementStart(5, "span", 104);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 105);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const b_r14 = ctx.$implicit;
    const i_r15 = ctx.$index;
    \u0275\u0275classProp("bh-top", i_r15 === 0);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", b_r14.biddingTeamColour);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r14.biddingTeam);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(4, b_r14.isRtm ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 8, b_r14.placedAt, "HH:mm:ss"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Rs. ", b_r14.amountCr, "Cr");
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "div", 98);
    \u0275\u0275text(2, "BID HISTORY");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_27_For_4_Template, 10, 11, "div", 99, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.recentBids());
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_3_Template, 7, 1, "div", 44);
    \u0275\u0275elementStart(4, "div", 45);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 46)(7, "span", 47);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 48);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_11_Template, 2, 0, "span", 49)(12, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_12_Template, 2, 0, "span", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 51);
    \u0275\u0275text(14, "Base Price: ");
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 52);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 53)(20, "div", 54);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 55);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(24, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_24_Template, 4, 5, "div", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275template(25, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_25_Template, 19, 12, "div", 57)(26, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_26_Template, 43, 22, "div", 58)(27, AuctionRoomComponent_Conditional_27_Conditional_5_Conditional_27_Template, 5, 0, "div", 59);
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_2_0 = (tmp_2_0 = ctx_r1.cp()) == null ? null : tmp_2_0.setDisplayName) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : (tmp_2_0 = ctx_r1.cp()) == null ? null : tmp_2_0.auctionSet);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, ((tmp_3_0 = ctx_r1.cp()) == null ? null : tmp_3_0.rtmTeam) ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_4_0 = ctx_r1.cp()) == null ? null : tmp_4_0.playerName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_5_0 = ctx_r1.cp()) == null ? null : tmp_5_0.iplTeam);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "r-" + ((tmp_6_0 = (tmp_6_0 = ctx_r1.cp()) == null ? null : tmp_6_0.role == null ? null : tmp_6_0.role.toLowerCase()) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((tmp_7_0 = ctx_r1.cp()) == null ? null : tmp_7_0.role);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, ((tmp_8_0 = ctx_r1.cp()) == null ? null : tmp_8_0.isOverseas) ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(12, ((tmp_9_0 = ctx_r1.cp()) == null ? null : tmp_9_0.isUncapped) ? 12 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Rs. ", (tmp_10_0 = ctx_r1.cp()) == null ? null : tmp_10_0.basePriceCr, "Cr");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \xB7 Increment: Rs. ", (tmp_11_0 = ctx_r1.cp()) == null ? null : tmp_11_0.bidIncrementCr, "Cr");
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.hasBid());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Rs. ", ctx_r1.currentBid(), "Cr");
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r1.leaderColour());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.hasBid() ? ctx_r1.leaderName() + " leads" : "No bids yet \u2014 opens at base price", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(24, ctx_r1.timerOn() ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(25, !ctx_r1.isAdmin() && ctx_r1.myTeam() ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(26, ctx_r1.isAdmin() ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(27, ctx_r1.recentBids().length > 0 ? 27 : -1);
  }
}
function AuctionRoomComponent_Conditional_27_For_10_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 114);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("RTM:", t_r16.rtmSlotsRemaining, "");
  }
}
function AuctionRoomComponent_Conditional_27_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106)(1, "div", 107)(2, "span", 108);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 109)(5, "span", 110);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 111);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 112)(10, "span", 113);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, AuctionRoomComponent_Conditional_27_For_10_Conditional_12_Template, 2, 1, "span", 114);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r16 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("border-left-color", t_r16.themeColour);
    \u0275\u0275classProp("leading", t_r16.userId === ctx_r1.leadingUserId());
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", t_r16.themeColour);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r16.shortCode);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r16.teamName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", t_r16.playersAcquired, " players");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("low", t_r16.budgetRemainingCr < 10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Rs. ", t_r16.budgetRemainingCr, "Cr");
    \u0275\u0275advance();
    \u0275\u0275conditional(12, t_r16.rtmSlotsRemaining > 0 ? 12 : -1);
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_11_For_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 119);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_11_For_4_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const u_r18 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.recall(u_r18.slotId));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r1.saving() || !!ctx_r1.cp());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.cp() ? "In Progress" : "Recall", " ");
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_11_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 116)(1, "span", 117);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AuctionRoomComponent_Conditional_27_Conditional_11_For_4_Conditional_3_Template, 2, 2, "button", 118);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const u_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(u_r18.playerName);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, ctx_r1.isAdmin() ? 3 : -1);
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 115);
    \u0275\u0275text(2, "UNSOLD POOL");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, AuctionRoomComponent_Conditional_27_Conditional_11_For_4_Template, 4, 2, "div", 116, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.unsoldList());
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 121)(1, "span", 122);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 123);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 124);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Conditional_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r19);
      const r_r20 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openCorrect(r_r20));
    });
    \u0275\u0275text(6, "Correct");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r20 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(r_r20.playerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", r_r20.winningTeamCode, " \xB7 Rs. ", r_r20.finalPriceCr, "Cr");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Conditional_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 81);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r22 = ctx.$implicit;
    \u0275\u0275property("value", t_r22.userId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", t_r22.shortCode, " \u2014 ", t_r22.teamName, "");
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 125)(1, "div", 126);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 127);
    \u0275\u0275twoWayListener("ngModelChange", function AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Conditional_2_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.correctUserId, $event) || (ctx_r1.correctUserId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 80);
    \u0275\u0275text(5, "Select team...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Conditional_2_For_7_Template, 2, 3, "option", 81, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 128);
    \u0275\u0275twoWayListener("ngModelChange", function AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Conditional_2_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.correctPrice, $event) || (ctx_r1.correctPrice = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 129);
    \u0275\u0275twoWayListener("ngModelChange", function AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Conditional_2_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.correctReason, $event) || (ctx_r1.correctReason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 130)(11, "button", 131);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Conditional_2_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.closeCorrect());
    });
    \u0275\u0275text(12, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 132);
    \u0275\u0275listener("click", function AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Conditional_2_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r21);
      const r_r20 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.submitCorrect(r_r20.playerId));
    });
    \u0275\u0275text(14, "Save Fix");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r20 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", r_r20.playerName, " \u2014 fix assignment");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.correctUserId);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.standings());
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.correctPrice);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.correctReason);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.correctUserId || ctx_r1.saving());
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 120);
    \u0275\u0275template(1, AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Conditional_1_Template, 7, 4)(2, AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Conditional_2_Template, 15, 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r20 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r1.correctingSlotId() !== r_r20.slotId ? 1 : 2);
  }
}
function AuctionRoomComponent_Conditional_27_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 115);
    \u0275\u0275text(2, "RECENTLY SOLD");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, AuctionRoomComponent_Conditional_27_Conditional_12_For_4_Template, 3, 1, "div", 120, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.soldHistory());
  }
}
function AuctionRoomComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 22);
    \u0275\u0275template(2, AuctionRoomComponent_Conditional_27_Conditional_2_Template, 10, 4, "div", 23)(3, AuctionRoomComponent_Conditional_27_Conditional_3_Template, 8, 1, "div", 24)(4, AuctionRoomComponent_Conditional_27_Conditional_4_Template, 7, 0, "div", 23)(5, AuctionRoomComponent_Conditional_27_Conditional_5_Template, 28, 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 25)(7, "div", 26);
    \u0275\u0275text(8, "TEAM BUDGETS");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, AuctionRoomComponent_Conditional_27_For_10_Template, 13, 13, "div", 27, _forTrack0);
    \u0275\u0275template(11, AuctionRoomComponent_Conditional_27_Conditional_11_Template, 5, 0, "div", 28)(12, AuctionRoomComponent_Conditional_27_Conditional_12_Template, 5, 0, "div", 29);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, !ctx_r1.cp() && ctx_r1.isAdmin() && !ctx_r1.reauctionMode() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, !ctx_r1.cp() && ctx_r1.isAdmin() && ctx_r1.reauctionMode() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, !ctx_r1.cp() && !ctx_r1.isAdmin() ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, ctx_r1.cp() ? 5 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.standings());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(11, ctx_r1.unsoldList().length > 0 ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(12, ctx_r1.isAdmin() && ctx_r1.soldHistory().length > 0 ? 12 : -1);
  }
}
function AuctionRoomComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 133);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("toast-err", ctx_r1.toastIsErr());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.toastMsg());
  }
}
var AuctionRoomComponent = class _AuctionRoomComponent {
  get sid() {
    return this.seasonSvc.activeSeason()?.id ?? "00000000-0000-0000-0000-000000000001";
  }
  constructor(auctionSvc, teamSvc, seasonSvc, auth) {
    this.auctionSvc = auctionSvc;
    this.teamSvc = teamSvc;
    this.seasonSvc = seasonSvc;
    this.auth = auth;
    this.session = signal(null);
    this.standings = signal([]);
    this.recentBids = signal([]);
    this.unsoldList = signal([]);
    this.soldHistory = signal([]);
    this.correctingSlotId = signal(null);
    this.correctUserId = "";
    this.correctPrice = 0;
    this.correctReason = "";
    this.myTeam = signal(null);
    this.saving = signal(false);
    this.toastMsg = signal("");
    this.toastIsErr = signal(false);
    this.timerOn = signal(false);
    this.timerSecs = signal(10);
    this.bidErr = signal("");
    this.reauctionMode = signal(false);
    this.bidAmt = 0;
    this.raiseBidUserId = "";
    this.soldUserId = "";
    this.soldAmt = 0;
    this.isLive = computed(() => this.session()?.status === "InProgress");
    this.cp = computed(() => this.session()?.currentPlayer ?? null);
    this.currentBid = computed(() => this.cp()?.currentBidCr ?? this.cp()?.basePriceCr ?? 0);
    this.hasBid = computed(() => !!this.cp()?.currentLeaderTeam);
    this.leaderName = computed(() => this.cp()?.currentLeaderTeam ?? "");
    this.leaderColour = computed(() => this.cp()?.currentLeaderColour ?? "#fff");
    this.leadingUserId = computed(() => {
      const id = this.cp()?.currentLeaderUserId;
      if (id)
        return id;
      const name = this.leaderName();
      return this.standings().find((t) => t.teamName === name || t.shortCode === name)?.userId ?? null;
    });
    this.minBid = computed(() => {
      const p = this.cp();
      if (!p)
        return 0;
      return this.hasBid() ? this.currentBid() + p.bidIncrementCr : p.basePriceCr;
    });
    effect(() => {
      const uid = this.leadingUserId();
      if (uid && !this.soldUserId)
        this.soldUserId = uid;
    });
    effect(() => {
      if (this.cp())
        this.reauctionMode.set(false);
    });
  }
  ngOnInit() {
    if (!this.seasonSvc.activeSeason()) {
      this.seasonSvc.getActive().subscribe({ next: () => this.boot(), error: () => this.boot() });
    } else {
      this.boot();
    }
  }
  boot() {
    this.loadAll();
    if (!this.isAdmin())
      this.loadMyTeam();
    this.pollSub = interval(3e3).subscribe(() => this.loadAll());
  }
  ngOnDestroy() {
    this.pollSub?.unsubscribe();
    this.timerSub?.unsubscribe();
  }
  loadAll() {
    this.auctionSvc.getSession(this.sid).subscribe({
      next: (s) => {
        this.session.set(s);
        if (s?.id && s.status !== "NoSession") {
          this.loadStandings();
          if (s.currentPlayer?.slotId)
            this.loadBids(s.currentPlayer.slotId);
          this.loadUnsold(s.id);
        }
      },
      error: () => {
      }
    });
  }
  loadStandings() {
    this.auctionSvc.getStandings(this.sid).subscribe({ next: (d) => this.standings.set(d), error: () => {
    } });
  }
  loadBids(slotId) {
    this.auctionSvc.getBids(slotId).subscribe({ next: (d) => this.recentBids.set(d.slice(0, 10)), error: () => {
    } });
  }
  loadUnsold(sessionId) {
    this.auctionSvc.getResults(sessionId).subscribe({
      next: (res) => {
        this.unsoldList.set(res.filter((r) => r.wentUnsold).map((r) => ({
          slotId: r.slotId,
          playerName: r.playerName
        })));
        this.soldHistory.set(res.filter((r) => !r.wentUnsold && r.winningTeamId).slice(-8).reverse());
      },
      error: () => {
      }
    });
  }
  loadMyTeam() {
    this.teamSvc.getMyTeam(this.sid).subscribe({ next: (t) => this.myTeam.set(t), error: () => {
    } });
  }
  setAmt(v) {
    this.bidAmt = v;
  }
  teamBid(isRtm = false) {
    const s = this.session();
    const p = this.cp();
    if (!s || !p)
      return;
    this.bidErr.set("");
    if (this.bidAmt < this.minBid()) {
      this.bidErr.set(`Minimum Rs. ${this.minBid()}Cr`);
      return;
    }
    this.saving.set(true);
    this.auctionSvc.placeBid({ auctionSessionId: s.id, auctionPlayerSlotId: p.slotId, amountCr: this.bidAmt, isRtm }).subscribe({
      next: () => {
        this.saving.set(false);
        this.showToast("Bid placed!");
        this.loadAll();
      },
      error: (e) => {
        this.bidErr.set(e?.error?.error ?? "Bid failed.");
        this.saving.set(false);
      }
    });
  }
  adminRaise() {
    const s = this.session();
    const p = this.cp();
    if (!s || !p || !this.raiseBidUserId)
      return;
    this.bidErr.set("");
    if (this.bidAmt < this.minBid()) {
      this.bidErr.set(`Minimum Rs. ${this.minBid()}Cr`);
      return;
    }
    this.saving.set(true);
    this.auctionSvc.placeBid({
      auctionSessionId: s.id,
      auctionPlayerSlotId: p.slotId,
      amountCr: this.bidAmt,
      isRtm: false,
      teamUserId: this.raiseBidUserId
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.showToast("Bid raised!");
        this.raiseBidUserId = "";
        this.loadAll();
      },
      error: (e) => {
        this.bidErr.set(e?.error?.error ?? "Bid failed \u2014 check API logs.");
        this.saving.set(false);
      }
    });
  }
  markSold() {
    const s = this.session();
    const p = this.cp();
    if (!s || !p || !this.hasBid())
      return;
    const winUserId = this.soldUserId || this.leadingUserId();
    const finalPrice = this.soldAmt || this.currentBid();
    if (!winUserId) {
      this.showToast("Select a team to sell to.", true);
      return;
    }
    this.saving.set(true);
    this.auctionSvc.markSold({ auctionSessionId: s.id, auctionPlayerSlotId: p.slotId, winningUserId: winUserId, finalPriceCr: finalPrice, wasRtm: false }).subscribe({
      next: (r) => {
        this.saving.set(false);
        this.showToast(r?.message ?? "Sold!");
        this.soldUserId = "";
        this.soldAmt = 0;
        this.timerSub?.unsubscribe();
        this.timerOn.set(false);
        this.timerSecs.set(10);
        this.loadAll();
      },
      error: (e) => {
        this.showToast(e?.error?.error ?? "Sold failed.", true);
        this.saving.set(false);
      }
    });
  }
  markUnsold() {
    const s = this.session();
    const p = this.cp();
    if (!s || !p)
      return;
    this.saving.set(true);
    this.auctionSvc.markUnsold({ auctionSessionId: s.id, auctionPlayerSlotId: p.slotId }).subscribe({
      next: (r) => {
        this.saving.set(false);
        this.showToast(r?.message ?? "Marked unsold.");
        this.loadAll();
      },
      error: (e) => {
        this.showToast(e?.error?.error ?? "Failed.", true);
        this.saving.set(false);
      }
    });
  }
  recall(slotId) {
    if (!slotId) {
      this.showToast("No slot ID for this player.", true);
      return;
    }
    this.saving.set(true);
    this.auctionSvc.recallUnsold(slotId).subscribe({
      next: () => {
        this.saving.set(false);
        this.showToast("Player recalled!");
        this.loadAll();
      },
      error: (e) => {
        this.showToast(e?.error?.error ?? "Recall failed.", true);
        this.saving.set(false);
      }
    });
  }
  openCorrect(result) {
    this.correctingSlotId.set(result.slotId);
    this.correctUserId = result.winningTeamId ? this.standings().find((t) => t.teamId === result.winningTeamId)?.userId ?? "" : "";
    this.correctPrice = result.finalPriceCr ?? 0;
    this.correctReason = "";
  }
  closeCorrect() {
    this.correctingSlotId.set(null);
  }
  submitCorrect(playerId) {
    const sid = this.session()?.id;
    if (!sid || !this.correctUserId) {
      this.showToast("Select a team.", true);
      return;
    }
    this.saving.set(true);
    this.auctionSvc.adminCorrect({
      auctionSessionId: sid,
      playerId,
      newWinningUserId: this.correctUserId,
      newPriceCr: this.correctPrice,
      reason: this.correctReason || "Manual correction"
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.showToast("Correction applied.");
        this.correctingSlotId.set(null);
        this.loadAll();
      },
      error: (e) => {
        this.showToast(e?.error?.error ?? "Correction failed.", true);
        this.saving.set(false);
      }
    });
  }
  startAuction() {
    const sid = this.session()?.id;
    if (!sid)
      return;
    this.saving.set(true);
    this.auctionSvc.startAuction(sid).subscribe({
      next: () => {
        this.saving.set(false);
        this.loadAll();
      },
      error: (e) => {
        this.showToast(e?.error?.error ?? "Failed.", true);
        this.saving.set(false);
      }
    });
  }
  completeAuction() {
    const sid = this.session()?.id;
    if (!sid || !confirm("Complete auction? Squads will be locked."))
      return;
    this.saving.set(true);
    this.auctionSvc.completeAuction(sid).subscribe({
      next: () => {
        this.saving.set(false);
        this.loadAll();
      },
      error: (e) => {
        this.showToast(e?.error?.error ?? "Failed.", true);
        this.saving.set(false);
      }
    });
  }
  toggleTimer() {
    if (this.timerOn()) {
      this.timerSub?.unsubscribe();
      this.timerOn.set(false);
      this.timerSecs.set(10);
    } else {
      let s = 10;
      this.timerSecs.set(s);
      this.timerOn.set(true);
      this.timerSub = interval(1e3).subscribe(() => {
        s--;
        this.timerSecs.set(s);
        if (s <= 0) {
          this.timerSub?.unsubscribe();
          this.timerOn.set(false);
          this.timerSecs.set(10);
        }
      });
    }
  }
  isAdmin() {
    return this.auth.isAdmin();
  }
  showToast(msg, err = false) {
    this.toastMsg.set(msg);
    this.toastIsErr.set(err);
    setTimeout(() => this.toastMsg.set(""), 3e3);
  }
  static {
    this.\u0275fac = function AuctionRoomComponent_Factory(t) {
      return new (t || _AuctionRoomComponent)(\u0275\u0275directiveInject(AuctionService), \u0275\u0275directiveInject(TeamService), \u0275\u0275directiveInject(SeasonService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuctionRoomComponent, selectors: [["app-auction-room"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 29, vars: 13, consts: [[1, "room"], [1, "room-header"], [1, "rh-left"], [1, "rh-brand"], [1, "live-chip"], [1, "rh-stats"], [1, "rh-stat"], [1, "rs-val"], [1, "rs-lbl"], [1, "rh-right"], ["routerLink", "/admin/auction", 1, "rh-link"], [1, "idle-wrap"], [1, "auction-grid"], [1, "toast", 3, "toast-err"], [1, "idle-card"], [1, "idle-badge"], [1, "start-btn", 3, "disabled"], [1, "start-btn", 3, "click", "disabled"], [1, "idle-wait"], ["routerLink", "/admin/auction", 1, "start-btn", 2, "text-decoration", "none", "display", "inline-block"], [1, "idle-badge", "done"], ["routerLink", "/leaderboard", 1, "start-btn", 2, "text-decoration", "none", "display", "inline-block"], [1, "left-col"], [1, "round-end-card"], [1, "unsold-round-card"], [1, "right-col"], [1, "rc-title"], [1, "team-row", 3, "border-left-color", "leading"], [1, "unsold-section"], [1, "sold-history-section"], [1, "rec-badge"], [1, "reauction-btn"], [1, "complete-btn-lg", 3, "click", "disabled"], [1, "reauction-btn", 3, "click"], [1, "urc-header"], [1, "urc-title"], [1, "urc-back", 3, "click"], [1, "urc-empty"], [1, "urc-list"], [1, "urc-row"], [1, "urc-name"], [1, "urc-pick-btn", 3, "click", "disabled"], [1, "player-card"], [1, "pc-set"], [1, "rtm-notice"], [1, "pc-name"], [1, "pc-tags"], [1, "ptag", "ipl"], [1, "ptag", 3, "ngClass"], [1, "ptag", "os"], [1, "ptag", "unc"], [1, "pc-base"], [1, "pc-incr"], [1, "bid-ticker"], [1, "bt-amount"], [1, "bt-leader"], [1, "timer-bar", 3, "urgent"], [1, "bid-panel"], [1, "admin-panel"], [1, "bid-history"], [1, "rtm-icon"], [1, "timer-bar"], [1, "tb-track"], [1, "tb-num"], [1, "bp-budget"], [1, "bp-lbl"], [1, "bp-val"], [1, "bp-quick"], [1, "qbtn", 3, "click"], [1, "bp-row"], ["type", "number", "step", "0.25", "placeholder", "Enter amount", 1, "athena-input", 3, "ngModelChange", "ngModel", "min"], [1, "bid-btn", 3, "click", "disabled"], [1, "rtm-btn", 3, "disabled"], [1, "inline-err"], [1, "rtm-btn", 3, "click", "disabled"], [1, "ap-title"], [1, "ap-section"], [1, "ap-section-lbl"], [1, "ap-row"], [1, "athena-input", "ap-select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], ["type", "number", "step", "0.25", "placeholder", "Amount", 1, "athena-input", "ap-inp", 3, "ngModelChange", "ngModel", "min"], [1, "raise-btn", 3, "click", "disabled"], [1, "ap-section", "sold-zone"], [1, "ap-hint"], [1, "current-leader-row"], ["type", "number", "step", "0.25", 1, "athena-input", "ap-inp-sm", 3, "ngModelChange", "ngModel", "placeholder"], [1, "sold-btn", 3, "click", "disabled"], [1, "ap-hint-row"], [1, "ap-bottom-row"], [1, "timer-btn", 3, "click"], [1, "unsold-btn", 3, "click", "disabled"], [1, "complete-btn", 3, "disabled"], [1, "cl-label"], [1, "cl-team"], [1, "cl-price"], [1, "complete-btn", 3, "click", "disabled"], [1, "bh-title"], [1, "bh-row", 3, "bh-top"], [1, "bh-row"], [1, "bh-team"], [1, "bh-meta"], [1, "rtm-pill"], [1, "bh-time"], [1, "bh-amt"], [1, "team-row"], [1, "tr-left"], [1, "tr-code"], [1, "tr-info"], [1, "tr-name"], [1, "tr-players"], [1, "tr-right"], [1, "tr-budget"], [1, "rtm-pill", "sm"], [1, "rc-title", 2, "margin-top", "16px"], [1, "unsold-row"], [1, "un-name"], [1, "recall-btn", 3, "disabled"], [1, "recall-btn", 3, "click", "disabled"], [1, "sold-hist-row"], [1, "shr-main"], [1, "shr-name"], [1, "shr-team"], [1, "correct-btn", 3, "click", "disabled"], [1, "correct-form"], [1, "cf-name"], [1, "athena-input", "cf-sel", 3, "ngModelChange", "ngModel"], ["type", "number", "step", "0.25", "placeholder", "Price", 1, "athena-input", "cf-price", 3, "ngModelChange", "ngModel"], ["placeholder", "Reason (optional)", 1, "athena-input", "cf-reason", 3, "ngModelChange", "ngModel"], [1, "cf-actions"], [1, "cf-cancel", 3, "click"], [1, "cf-save", 3, "click", "disabled"], [1, "toast"]], template: function AuctionRoomComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "span", 3);
        \u0275\u0275text(4, "AthenaXI");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "span", 7);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "span", 8);
        \u0275\u0275text(12, "Sold");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 6)(14, "span", 7);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 8);
        \u0275\u0275text(17, "Unsold");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 6)(19, "span", 7);
        \u0275\u0275text(20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span", 8);
        \u0275\u0275text(22, "Remaining");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(23, "div", 9);
        \u0275\u0275template(24, AuctionRoomComponent_Conditional_24_Template, 2, 0, "a", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(25, AuctionRoomComponent_Conditional_25_Template, 6, 2, "div", 11)(26, AuctionRoomComponent_Conditional_26_Template, 10, 0, "div", 11)(27, AuctionRoomComponent_Conditional_27_Template, 13, 6, "div", 12)(28, AuctionRoomComponent_Conditional_28_Template, 2, 3, "div", 13);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_3_0;
        let tmp_4_0;
        let tmp_5_0;
        let tmp_7_0;
        let tmp_8_0;
        \u0275\u0275advance(5);
        \u0275\u0275classProp("live", ctx.isLive())("idle", !ctx.isLive());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isLive() ? "LIVE" : (tmp_2_0 = (tmp_2_0 = ctx.session()) == null ? null : tmp_2_0.status) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "LOADING", " ");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate((tmp_3_0 = (tmp_3_0 = ctx.session()) == null ? null : tmp_3_0.soldCount) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : 0);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate((tmp_4_0 = (tmp_4_0 = ctx.session()) == null ? null : tmp_4_0.unsoldCount) !== null && tmp_4_0 !== void 0 ? tmp_4_0 : 0);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate((tmp_5_0 = (tmp_5_0 = ctx.session()) == null ? null : tmp_5_0.pendingCount) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : 0);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(24, ctx.isAdmin() ? 24 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(25, !ctx.session() || ((tmp_7_0 = ctx.session()) == null ? null : tmp_7_0.status) === "NoSession" || ((tmp_7_0 = ctx.session()) == null ? null : tmp_7_0.status) === "NotStarted" ? 25 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(26, ((tmp_8_0 = ctx.session()) == null ? null : tmp_8_0.status) === "Completed" ? 26 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(27, ctx.isLive() ? 27 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(28, ctx.toastMsg() ? 28 : -1);
      }
    }, dependencies: [CommonModule, NgClass, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, RouterLink], styles: [`

.room[_ngcontent-%COMP%] {
  min-height: 100vh;
  background: var(--navy-deep);
  display: flex;
  flex-direction: column;
  font-family: var(--font-body);
  color: #fff;
}
.room-header[_ngcontent-%COMP%] {
  background: rgba(10, 31, 47, 0.97);
  border-bottom: 1px solid rgba(212, 175, 55, 0.18);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 50;
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
.rh-brand[_ngcontent-%COMP%] {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.15em;
  background:
    linear-gradient(
      180deg,
      #fff 0%,
      var(--gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.rh-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.live-chip[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.12em;
  padding: 3px 10px;
  border-radius: 20px;
  text-transform: uppercase;
}
.live-chip.live[_ngcontent-%COMP%] {
  background: rgba(255, 59, 48, 0.15);
  color: var(--red-live);
  border: 1px solid rgba(255, 59, 48, 0.3);
  animation: pulse-dot 1.5s ease infinite;
}
.live-chip.idle[_ngcontent-%COMP%] {
  background: rgba(212, 175, 55, 0.1);
  color: var(--gold);
  border: 1px solid rgba(212, 175, 55, 0.2);
}
.rh-stats[_ngcontent-%COMP%] {
  display: flex;
  gap: 20px;
}
.rh-stat[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}
.rs-val[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 18px;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}
.rs-lbl[_ngcontent-%COMP%] {
  font-size: 9px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.rh-link[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 700;
  color: var(--gold-dark);
  text-decoration: none;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 6px;
  padding: 5px 12px;
}
.idle-wrap[_ngcontent-%COMP%] {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}
.idle-card[_ngcontent-%COMP%] {
  text-align: center;
  max-width: 420px;
  background:
    linear-gradient(
      135deg,
      rgba(30, 58, 95, 0.7),
      rgba(10, 31, 47, 0.9));
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 16px;
  padding: 48px 32px;
}
.idle-badge[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.18em;
  color: var(--gold);
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 20px;
  padding: 5px 16px;
  display: inline-block;
  margin-bottom: 20px;
}
.idle-badge.done[_ngcontent-%COMP%] {
  color: var(--green-cricket);
  background: rgba(0, 200, 83, 0.1);
  border-color: rgba(0, 200, 83, 0.25);
}
.idle-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 10px;
}
.idle-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #888;
  font-size: 14px;
  margin: 0 0 20px;
  line-height: 1.5;
}
.idle-wait[_ngcontent-%COMP%] {
  color: #555 !important;
  font-size: 13px !important;
  margin-top: 16px !important;
}
.start-btn[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      var(--gold-dark),
      var(--gold));
  color: var(--navy-deep);
  border: none;
  border-radius: 10px;
  padding: 13px 32px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  letter-spacing: 0.04em;
}
.start-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.auction-grid[_ngcontent-%COMP%] {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 270px;
  min-height: 0;
}
@media (max-width:860px) {
  .auction-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.left-col[_ngcontent-%COMP%] {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}
.right-col[_ngcontent-%COMP%] {
  background: rgba(8, 24, 40, 0.8);
  border-left: 1px solid rgba(212, 175, 55, 0.1);
  padding: 14px 12px;
  overflow-y: auto;
}
.player-card[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      rgba(30, 58, 95, 0.75),
      rgba(10, 31, 47, 0.95));
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 14px;
  padding: 22px;
  position: relative;
  overflow: hidden;
}
.player-card[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
}
.pc-set[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-dark);
  margin-bottom: 10px;
}
.rtm-notice[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 59, 48, 0.08);
  border: 1px solid rgba(255, 59, 48, 0.22);
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #ccc;
}
.rtm-icon[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.08em;
  background: rgba(255, 59, 48, 0.15);
  color: var(--red-live);
  padding: 2px 7px;
  border-radius: 6px;
  flex-shrink: 0;
}
.pc-name[_ngcontent-%COMP%] {
  font-family: var(--font-heading);
  font-size: clamp(26px, 4vw, 44px);
  font-weight: 900;
  letter-spacing: 0.03em;
  background:
    linear-gradient(
      180deg,
      #fff 0%,
      var(--gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  margin-bottom: 12px;
}
.pc-tags[_ngcontent-%COMP%] {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.ptag[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
}
.ptag.ipl[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.07);
  color: #ccc;
}
.ptag.r-batsman[_ngcontent-%COMP%] {
  background: rgba(0, 200, 83, 0.1);
  color: var(--green-cricket);
}
.ptag.r-bowler[_ngcontent-%COMP%] {
  background: rgba(255, 59, 48, 0.1);
  color: var(--red-live);
}
.ptag.r-allrounder[_ngcontent-%COMP%] {
  background: rgba(212, 175, 55, 0.1);
  color: var(--gold);
}
.ptag.r-wicketkeeper[_ngcontent-%COMP%] {
  background: rgba(45, 156, 219, 0.1);
  color: var(--green-soft);
}
.ptag.os[_ngcontent-%COMP%] {
  background: rgba(45, 156, 219, 0.1);
  color: var(--green-soft);
}
.ptag.unc[_ngcontent-%COMP%] {
  background: rgba(212, 175, 55, 0.08);
  color: var(--gold-dark);
}
.pc-base[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #666;
  margin-bottom: 14px;
}
.pc-incr[_ngcontent-%COMP%] {
  color: #555;
}
.bid-ticker[_ngcontent-%COMP%] {
  background: rgba(5, 15, 30, 0.9);
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 12px;
  padding: 18px 20px;
  text-align: center;
  margin-bottom: 12px;
  transition: border-color 0.4s;
}
.bid-ticker.active[_ngcontent-%COMP%] {
  border-color: rgba(212, 175, 55, 0.35);
}
.bt-amount[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: clamp(36px, 5vw, 54px);
  font-weight: 900;
  background:
    linear-gradient(
      90deg,
      var(--gold-dark),
      var(--gold),
      var(--gold-light),
      var(--gold),
      var(--gold-dark));
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
  line-height: 1;
}
.bt-leader[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  margin-top: 6px;
}
.bt-leader.muted[_ngcontent-%COMP%], .bt-leader[_ngcontent-%COMP%]:not([style]) {
  color: #555;
  font-size: 13px;
}
.timer-bar[_ngcontent-%COMP%] {
  position: relative;
  background: rgba(10, 31, 47, 0.8);
  border-radius: 8px;
  padding: 10px 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(0, 200, 83, 0.2);
  overflow: hidden;
}
.tb-track[_ngcontent-%COMP%] {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 200, 83, 0.12);
  border-radius: 8px;
  transition: width 0.9s linear;
}
.timer-bar.urgent[_ngcontent-%COMP%] {
  border-color: rgba(255, 59, 48, 0.4);
}
.timer-bar.urgent[_ngcontent-%COMP%]   .tb-track[_ngcontent-%COMP%] {
  background: rgba(255, 59, 48, 0.15);
}
.tb-num[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 28px;
  font-weight: 900;
  color: var(--green-cricket);
  position: relative;
  z-index: 1;
}
.timer-bar.urgent[_ngcontent-%COMP%]   .tb-num[_ngcontent-%COMP%] {
  color: var(--red-live);
}
.bid-panel[_ngcontent-%COMP%] {
  background: rgba(15, 25, 45, 0.8);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 14px;
  padding: 16px;
}
.bp-budget[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
}
.bp-lbl[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}
.bp-val[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 24px;
  font-weight: 900;
  color: var(--green-cricket);
}
.bp-val.low[_ngcontent-%COMP%] {
  color: var(--red-live);
}
.bp-quick[_ngcontent-%COMP%] {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.qbtn[_ngcontent-%COMP%] {
  background: rgba(212, 175, 55, 0.1);
  color: var(--gold);
  border: 1px solid rgba(212, 175, 55, 0.22);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}
.qbtn[_ngcontent-%COMP%]:hover {
  background: rgba(212, 175, 55, 0.22);
}
.bp-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.bp-row[_ngcontent-%COMP%]   .athena-input[_ngcontent-%COMP%] {
  flex: 1;
}
.bid-btn[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      var(--gold-dark),
      var(--gold));
  color: var(--navy-deep);
  border: none;
  border-radius: 8px;
  padding: 10px 22px;
  font-weight: 900;
  font-size: 15px;
  cursor: pointer;
  flex-shrink: 0;
  letter-spacing: 0.04em;
  transition: filter 0.15s;
}
.bid-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.bid-btn[_ngcontent-%COMP%]:not(:disabled):hover {
  filter: brightness(1.1);
}
.rtm-btn[_ngcontent-%COMP%] {
  width: 100%;
  margin-top: 10px;
  background: rgba(255, 59, 48, 0.1);
  color: var(--red-live);
  border: 1px solid rgba(255, 59, 48, 0.3);
  border-radius: 8px;
  padding: 10px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
}
.rtm-btn[_ngcontent-%COMP%]:hover {
  background: rgba(255, 59, 48, 0.2);
}
.admin-panel[_ngcontent-%COMP%] {
  background: rgba(8, 20, 36, 0.9);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.ap-title[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.14em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: 14px;
}
.ap-section[_ngcontent-%COMP%] {
  padding: 14px 0;
  border-bottom: 1px solid rgba(212, 175, 55, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ap-section[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.ap-section-lbl[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.ap-hint[_ngcontent-%COMP%] {
  font-weight: 400;
  color: #555;
  font-size: 10px;
}
.ap-hint-row[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #555;
  margin-top: 4px;
}
.ap-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.ap-select[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 140px;
  font-size: 13px !important;
}
.ap-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {
  background: var(--navy-deep);
}
.ap-inp[_ngcontent-%COMP%] {
  width: 90px;
  flex-shrink: 0;
}
.ap-inp-sm[_ngcontent-%COMP%] {
  width: 80px;
  flex-shrink: 0;
}
.raise-btn[_ngcontent-%COMP%] {
  background: rgba(45, 156, 219, 0.15);
  color: var(--green-soft);
  border: 1px solid rgba(45, 156, 219, 0.3);
  border-radius: 8px;
  padding: 9px 16px;
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s;
}
.raise-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.raise-btn[_ngcontent-%COMP%]:not(:disabled):hover {
  background: rgba(45, 156, 219, 0.28);
}
.sold-zone[_ngcontent-%COMP%] {
  background: rgba(0, 200, 83, 0.03);
  border-radius: 10px;
  padding: 14px !important;
  border: 1px solid rgba(0, 200, 83, 0.1);
}
.sold-zone.ready[_ngcontent-%COMP%] {
  border-color: rgba(0, 200, 83, 0.25);
  background: rgba(0, 200, 83, 0.06);
}
.current-leader-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(10, 31, 47, 0.6);
  border-radius: 8px;
  padding: 8px 12px;
}
.cl-label[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #888;
  font-weight: 600;
}
.cl-team[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 800;
}
.cl-price[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 14px;
  font-weight: 900;
  color: var(--gold);
  margin-left: auto;
}
.sold-btn[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #0a3d1a,
      var(--green-cricket));
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 0.06em;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s;
}
.sold-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  filter: grayscale(0.5);
}
.sold-btn[_ngcontent-%COMP%]:not(:disabled):hover {
  filter: brightness(1.12);
}
.ap-bottom-row[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
}
.timer-btn[_ngcontent-%COMP%] {
  flex: 1;
  background: rgba(30, 58, 95, 0.5);
  color: #aaa;
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 8px;
  padding: 10px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}
.timer-btn.on[_ngcontent-%COMP%] {
  background: rgba(212, 175, 55, 0.1);
  color: var(--gold);
  border-color: rgba(212, 175, 55, 0.35);
}
.unsold-btn[_ngcontent-%COMP%] {
  flex: 1;
  background:
    linear-gradient(
      135deg,
      #2a0808,
      var(--red-pressure));
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
}
.unsold-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.complete-btn[_ngcontent-%COMP%] {
  width: 100%;
  margin-top: 8px;
  background: rgba(212, 175, 55, 0.08);
  color: var(--gold);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 8px;
  padding: 10px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
}
.complete-btn[_ngcontent-%COMP%]:hover {
  background: rgba(212, 175, 55, 0.16);
}
.inline-err[_ngcontent-%COMP%] {
  font-size: 12px;
  color: var(--red-live);
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.2);
  border-radius: 6px;
  padding: 6px 10px;
}
.bid-history[_ngcontent-%COMP%] {
  background: rgba(8, 20, 36, 0.7);
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 12px;
  padding: 14px;
}
.bh-title[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.14em;
  color: var(--gold-dark);
  margin-bottom: 10px;
}
.bh-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(10, 31, 47, 0.4);
  margin-bottom: 6px;
  transition: all 0.2s;
}
.bh-row.bh-top[_ngcontent-%COMP%] {
  background: rgba(212, 175, 55, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.18);
}
.bh-team[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 700;
  flex: 1;
}
.bh-meta[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
}
.bh-time[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #555;
}
.bh-amt[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 15px;
  font-weight: 900;
  color: var(--gold);
}
.rtm-pill[_ngcontent-%COMP%] {
  font-size: 9px;
  font-weight: 800;
  background: rgba(255, 59, 48, 0.12);
  color: var(--red-live);
  border: 1px solid rgba(255, 59, 48, 0.25);
  padding: 2px 6px;
  border-radius: 6px;
}
.rtm-pill.sm[_ngcontent-%COMP%] {
  font-size: 8px;
}
.rc-title[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.16em;
  color: var(--gold-dark);
  text-transform: uppercase;
  margin-bottom: 10px;
}
.team-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-left: 3px solid;
  border-radius: 0 8px 8px 0;
  padding: 9px 11px;
  margin-bottom: 7px;
  background: rgba(30, 58, 95, 0.25);
  transition: all 0.2s;
}
.team-row.leading[_ngcontent-%COMP%] {
  background: rgba(212, 175, 55, 0.08) !important;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.08);
}
.tr-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.tr-code[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}
.tr-info[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.tr-name[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}
.tr-players[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #666;
}
.tr-right[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
}
.tr-budget[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 13px;
  font-weight: 900;
  color: var(--green-cricket);
}
.tr-budget.low[_ngcontent-%COMP%] {
  color: var(--red-live);
}
.unsold-section[_ngcontent-%COMP%] {
  margin-top: 4px;
}
.unsold-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 59, 48, 0.05);
  border: 1px solid rgba(255, 59, 48, 0.12);
  border-radius: 8px;
  padding: 7px 10px;
  margin-bottom: 6px;
}
.un-name[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #ccc;
}
.recall-btn[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: var(--gold);
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 8px;
  padding: 3px 9px;
  cursor: pointer;
}
.recall-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.round-end-card[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      rgba(30, 58, 95, 0.7),
      rgba(10, 31, 47, 0.9));
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 14px;
  padding: 36px 28px;
  text-align: center;
}
.rec-badge[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.16em;
  color: var(--gold);
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 20px;
  padding: 4px 14px;
  display: inline-block;
  margin-bottom: 16px;
}
.round-end-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 8px;
}
.round-end-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  color: #888;
  font-size: 13px;
  margin: 0 0 18px;
}
.reauction-btn[_ngcontent-%COMP%] {
  display: block;
  width: 100%;
  background: rgba(45, 156, 219, 0.15);
  color: var(--green-soft);
  border: 1px solid rgba(45, 156, 219, 0.3);
  border-radius: 10px;
  padding: 12px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background 0.15s;
}
.reauction-btn[_ngcontent-%COMP%]:hover {
  background: rgba(45, 156, 219, 0.26);
}
.complete-btn-lg[_ngcontent-%COMP%] {
  display: block;
  width: 100%;
  background:
    linear-gradient(
      135deg,
      var(--gold-dark),
      var(--gold));
  color: var(--navy-deep);
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-weight: 900;
  font-size: 14px;
  cursor: pointer;
  letter-spacing: 0.03em;
}
.complete-btn-lg[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.unsold-round-card[_ngcontent-%COMP%] {
  background: rgba(8, 20, 36, 0.9);
  border: 1px solid rgba(45, 156, 219, 0.25);
  border-radius: 14px;
  padding: 18px;
}
.urc-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.urc-title[_ngcontent-%COMP%] {
  font-family: var(--font-timer);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: var(--green-soft);
}
.urc-back[_ngcontent-%COMP%] {
  background: none;
  border: 1px solid rgba(212, 175, 55, 0.2);
  color: #aaa;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 11px;
  cursor: pointer;
}
.urc-empty[_ngcontent-%COMP%] {
  color: #555;
  font-size: 13px;
  text-align: center;
  padding: 20px 0;
}
.urc-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.urc-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(30, 58, 95, 0.3);
  border-radius: 8px;
  padding: 10px 14px;
}
.urc-name[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}
.urc-pick-btn[_ngcontent-%COMP%] {
  background: rgba(45, 156, 219, 0.15);
  color: var(--green-soft);
  border: 1px solid rgba(45, 156, 219, 0.3);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}
.urc-pick-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: rgba(45, 156, 219, 0.28);
}
.urc-pick-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.sold-hist-row[_ngcontent-%COMP%] {
  background: rgba(0, 200, 83, 0.04);
  border: 1px solid rgba(0, 200, 83, 0.1);
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.shr-main[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.shr-name[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}
.shr-team[_ngcontent-%COMP%] {
  font-size: 10px;
  color: #666;
}
.correct-btn[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 700;
  color: var(--gold-dark);
  background: rgba(212, 175, 55, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.18);
  border-radius: 8px;
  padding: 4px 10px;
  cursor: pointer;
  flex-shrink: 0;
}
.correct-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: rgba(212, 175, 55, 0.18);
  color: var(--gold);
}
.correct-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.correct-form[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}
.cf-name[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 2px;
}
.cf-sel[_ngcontent-%COMP%], .cf-price[_ngcontent-%COMP%], .cf-reason[_ngcontent-%COMP%] {
  font-size: 12px !important;
  padding: 6px 10px !important;
}
.cf-sel[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {
  background: var(--navy-deep);
}
.cf-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
}
.cf-cancel[_ngcontent-%COMP%] {
  background: none;
  border: 1px solid #444;
  color: #888;
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 11px;
  cursor: pointer;
}
.cf-save[_ngcontent-%COMP%] {
  background: rgba(0, 200, 83, 0.15);
  color: var(--green-cricket);
  border: 1px solid rgba(0, 200, 83, 0.3);
  border-radius: 6px;
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}
.cf-save[_ngcontent-%COMP%]:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.toast[_ngcontent-%COMP%] {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--green-cricket);
  color: var(--navy-deep);
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 800;
  z-index: 300;
  animation: fade-in 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}
.toast.toast-err[_ngcontent-%COMP%] {
  background: var(--red-pressure);
  color: #fff;
}
@media (min-width:1024px) {
  .room[_ngcontent-%COMP%] {
    padding-bottom: 0;
  }
}
/*# sourceMappingURL=auction-room.component.css.map */`] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuctionRoomComponent, { className: "AuctionRoomComponent", filePath: "app\\auction\\room\\auction-room.component.ts", lineNumber: 588 });
})();
export {
  AuctionRoomComponent
};
//# sourceMappingURL=chunk-JGTGHKLZ.js.map
