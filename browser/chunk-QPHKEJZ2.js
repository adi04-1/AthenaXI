import {
  TeamService
} from "./chunk-OLMNDMN6.js";
import {
  FormsModule
} from "./chunk-FZZPELYY.js";
import {
  SeasonService
} from "./chunk-V7UAWJAK.js";
import {
  AuthService
} from "./chunk-26VBKVEF.js";
import "./chunk-LNJWB5JP.js";
import "./chunk-STS7VQLQ.js";
import {
  CommonModule,
  NgClass,
  __spreadProps,
  __spreadValues,
  computed,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-6BYAOC4F.js";

// src/app/team-builder/team-builder.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function TeamBuilderComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275text(1, "Loading your squad...");
    \u0275\u0275elementEnd();
  }
}
function TeamBuilderComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275text(2, "SQUAD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No squad found for the active season.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 5);
    \u0275\u0275text(6, "Your team will appear here after the auction.");
    \u0275\u0275elementEnd()();
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.success());
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Assign a Captain (2x points). ");
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Assign a Vice-Captain (1.5x). ");
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Assign an Impact Player (1.25x). ");
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "strong");
    \u0275\u0275text(2, "Setup required:");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, TeamBuilderComponent_Conditional_5_Conditional_24_Conditional_0_Conditional_3_Template, 1, 0)(4, TeamBuilderComponent_Conditional_5_Conditional_24_Conditional_0_Conditional_4_Template, 1, 0)(5, TeamBuilderComponent_Conditional_5_Conditional_24_Conditional_0_Conditional_5_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(3, !ctx_r1.hasCaptain() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, !ctx_r1.hasVC() ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, !ctx_r1.hasImpact() ? 5 : -1);
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, "C");
    \u0275\u0275elementEnd();
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "VC");
    \u0275\u0275elementEnd();
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "IP");
    \u0275\u0275elementEnd();
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "OS");
    \u0275\u0275elementEnd();
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 43);
    \u0275\u0275listener("click", function TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const p_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.assign(p_r4, "captain"));
    });
    \u0275\u0275text(1, "C");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const p_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.assign(p_r4, "vc"));
    });
    \u0275\u0275text(1, "VC");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const p_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.assign(p_r4, "impact"));
    });
    \u0275\u0275text(1, "IP");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29)(2, "div", 30)(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_5_Template, 2, 0, "span", 32)(6, TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_6_Template, 2, 0, "span", 33)(7, TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_7_Template, 2, 0, "span", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 35)(9, "span", 36);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_13_Template, 2, 0, "span", 37);
    \u0275\u0275elementStart(14, "span", 38);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 39);
    \u0275\u0275template(17, TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_17_Template, 2, 1, "button", 40)(18, TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_18_Template, 2, 1, "button", 41)(19, TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Conditional_19_Template, 2, 1, "button", 42);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    \u0275\u0275classProp("captain", p_r4.isCaptain)("vc", p_r4.isViceCaptain)("impact", p_r4.isImpactPlayer);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r4.player.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, p_r4.isCaptain ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, p_r4.isViceCaptain ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, p_r4.isImpactPlayer ? 7 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r4.player.iplTeam);
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("meta-tag role-", p_r4.player.role.toLowerCase(), "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r4.player.role);
    \u0275\u0275advance();
    \u0275\u0275conditional(13, p_r4.player.isOverseas ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Rs. ", p_r4.purchasedPriceCr, "Cr");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(17, !p_r4.isCaptain ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(18, !p_r4.isViceCaptain ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(19, !p_r4.isImpactPlayer ? 19 : -1);
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_Conditional_10_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 29)(2, "span", 31);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 35)(5, "span", 36);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "span", 47);
    \u0275\u0275text(10, "Reserve");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r7.player.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r7.player.iplTeam);
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("meta-tag role-", p_r7.player.role.toLowerCase(), "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r7.player.role);
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "span", 20);
    \u0275\u0275text(3, "Reserves");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 21);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 22);
    \u0275\u0275repeaterCreate(7, TeamBuilderComponent_Conditional_5_Conditional_24_Conditional_10_For_8_Template, 11, 6, "div", 46, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.reserves().length);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.reserves());
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "span", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 50);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("highlighted", p_r8.isCaptain || p_r8.isViceCaptain || p_r8.isImpactPlayer);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r8.player.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.multClass(p_r8));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.multLabel(p_r8));
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TeamBuilderComponent_Conditional_5_Conditional_24_Conditional_0_Template, 6, 3, "div", 17);
    \u0275\u0275elementStart(1, "div", 18)(2, "div", 19)(3, "span", 20);
    \u0275\u0275text(4, "Playing XI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 21);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 22);
    \u0275\u0275repeaterCreate(8, TeamBuilderComponent_Conditional_5_Conditional_24_For_9_Template, 20, 20, "div", 23, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(10, TeamBuilderComponent_Conditional_5_Conditional_24_Conditional_10_Template, 9, 1, "div", 18);
    \u0275\u0275elementStart(11, "div", 24)(12, "div", 25);
    \u0275\u0275text(13, "Points Multipliers");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 26);
    \u0275\u0275repeaterCreate(15, TeamBuilderComponent_Conditional_5_Conditional_24_For_16_Template, 5, 5, "div", 27, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(0, !ctx_r1.hasCaptain() || !ctx_r1.hasVC() || !ctx_r1.hasImpact() ? 0 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r1.xi().length, "/11");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.xi());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(10, ctx_r1.reserves().length > 0 ? 10 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.xi());
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "p");
    \u0275\u0275text(2, "No players acquired yet.");
    \u0275\u0275elementEnd()();
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_7_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, "C");
    \u0275\u0275elementEnd();
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_7_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "VC");
    \u0275\u0275elementEnd();
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_7_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "IP");
    \u0275\u0275elementEnd();
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_7_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "OS");
    \u0275\u0275elementEnd();
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "span", 56);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 57)(4, "div", 58)(5, "span", 59);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_7_For_2_Conditional_7_Template, 2, 0, "span", 32)(8, TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_7_For_2_Conditional_8_Template, 2, 0, "span", 33)(9, TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_7_For_2_Conditional_9_Template, 2, 0, "span", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 60)(11, "span", 36);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_7_For_2_Conditional_15_Template, 2, 0, "span", 37);
    \u0275\u0275elementStart(16, "span", 36);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "span", 61);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r9 = ctx.$implicit;
    const i_r10 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r10 + 1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r9.player.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, p_r9.isCaptain ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(8, p_r9.isViceCaptain ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, p_r9.isImpactPlayer ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r9.player.iplTeam);
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("meta-tag role-", p_r9.player.role.toLowerCase(), "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r9.player.role);
    \u0275\u0275advance();
    \u0275\u0275conditional(15, p_r9.player.isOverseas ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("reserve-tag", p_r9.slot === "Reserve");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r9.slot === "Reserve" ? "Reserve" : "Playing XI", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Rs. ", p_r9.purchasedPriceCr, "Cr");
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275repeaterCreate(1, TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_7_For_2_Template, 20, 15, "div", 52, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 53)(4, "span", 54);
    \u0275\u0275text(5, "Total Spent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 55);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.sortedByPrice());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Rs. ", ctx_r1.totalSpent(), "Cr");
  }
}
function TeamBuilderComponent_Conditional_5_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 19)(2, "span", 20);
    \u0275\u0275text(3, "Auctioned Players");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 21);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_6_Template, 3, 0, "div", 3)(7, TeamBuilderComponent_Conditional_5_Conditional_25_Conditional_7_Template, 8, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.players().length);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, ctx_r1.players().length === 0 ? 6 : 7);
  }
}
function TeamBuilderComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "div", 8)(3, "span", 9);
    \u0275\u0275text(4, "Team");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 10);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 8)(8, "span", 9);
    \u0275\u0275text(9, "Budget Remaining");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 11);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 8)(13, "span", 9);
    \u0275\u0275text(14, "Squad Size");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 11);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(17, TeamBuilderComponent_Conditional_5_Conditional_17_Template, 2, 1, "div", 12)(18, TeamBuilderComponent_Conditional_5_Conditional_18_Template, 2, 1, "div", 13);
    \u0275\u0275elementStart(19, "div", 14)(20, "button", 15);
    \u0275\u0275listener("click", function TeamBuilderComponent_Conditional_5_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTab.set("squad"));
    });
    \u0275\u0275text(21, " Squad ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 15);
    \u0275\u0275listener("click", function TeamBuilderComponent_Conditional_5_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTab.set("auctioned"));
    });
    \u0275\u0275text(23, " Auctioned Players ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(24, TeamBuilderComponent_Conditional_5_Conditional_24_Template, 17, 3)(25, TeamBuilderComponent_Conditional_5_Conditional_25_Template, 8, 2, "div", 16);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275styleProp("color", ctx_r1.team().themeColour);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.team().teamName);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("low", ctx_r1.team().budgetRemainingCr < 10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Rs. ", ctx_r1.team().budgetRemainingCr, "Cr ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.players().length);
    \u0275\u0275advance();
    \u0275\u0275conditional(17, ctx_r1.success() ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(18, ctx_r1.error() ? 18 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "squad");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "auctioned");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(24, ctx_r1.activeTab() === "squad" ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(25, ctx_r1.activeTab() === "auctioned" ? 25 : -1);
  }
}
var TeamBuilderComponent = class _TeamBuilderComponent {
  constructor(teamSvc, seasonSvc, auth) {
    this.teamSvc = teamSvc;
    this.seasonSvc = seasonSvc;
    this.auth = auth;
    this.team = signal(null);
    this.players = signal([]);
    this.loading = signal(true);
    this.activeTab = signal("squad");
    this.saving = signal(false);
    this.success = signal("");
    this.error = signal("");
    this.xi = computed(() => this.players().filter((p) => p.slot === "PlayingXI"));
    this.reserves = computed(() => this.players().filter((p) => p.slot === "Reserve"));
    this.hasCaptain = computed(() => this.players().some((p) => p.isCaptain));
    this.hasVC = computed(() => this.players().some((p) => p.isViceCaptain));
    this.hasImpact = computed(() => this.players().some((p) => p.isImpactPlayer));
    this.sortedByPrice = computed(() => [...this.players()].sort((a, b) => (b.purchasedPriceCr ?? 0) - (a.purchasedPriceCr ?? 0)));
    this.totalSpent = computed(() => this.players().reduce((sum, p) => sum + (p.purchasedPriceCr ?? 0), 0));
  }
  ngOnInit() {
    const seasonId = this.seasonSvc.activeSeason()?.id;
    if (!seasonId) {
      this.seasonSvc.getActive().subscribe({
        next: () => this.loadTeam(),
        error: () => this.loading.set(false)
      });
    } else {
      this.loadTeam();
    }
  }
  loadTeam() {
    const seasonId = this.seasonSvc.activeSeason()?.id;
    if (!seasonId) {
      this.loading.set(false);
      return;
    }
    this.teamSvc.getMyTeam(seasonId).subscribe({
      next: (t) => {
        this.team.set(t);
        this.players.set(t.players ?? []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  assign(player, role) {
    const teamId = this.team()?.id;
    if (!teamId)
      return;
    this.saving.set(true);
    this.error.set("");
    this.players.update((list) => list.map((p) => {
      if (role === "captain")
        return __spreadProps(__spreadValues({}, p), { isCaptain: p.id === player.id });
      if (role === "vc")
        return __spreadProps(__spreadValues({}, p), { isViceCaptain: p.id === player.id });
      if (role === "impact")
        return __spreadProps(__spreadValues({}, p), { isImpactPlayer: p.id === player.id });
      return p;
    }));
    const updatedPlayers = this.players();
    this.teamSvc.updateTeam(teamId, { players: updatedPlayers }).subscribe({
      next: () => {
        this.success.set(`${player.player.name} assigned as ${role === "captain" ? "Captain" : role === "vc" ? "Vice-Captain" : "Impact Player"}!`);
        this.saving.set(false);
        setTimeout(() => this.success.set(""), 3e3);
      },
      error: (e) => {
        this.error.set(e?.error?.error ?? "Failed to update.");
        this.saving.set(false);
        this.loadTeam();
      }
    });
  }
  multLabel(p) {
    if (p.isCaptain)
      return "2.0x";
    if (p.isViceCaptain)
      return "1.5x";
    if (p.isImpactPlayer)
      return "1.25x";
    return "1.0x";
  }
  multClass(p) {
    if (p.isCaptain)
      return "mult-captain";
    if (p.isViceCaptain)
      return "mult-vc";
    if (p.isImpactPlayer)
      return "mult-impact";
    return "mult-normal";
  }
  static {
    this.\u0275fac = function TeamBuilderComponent_Factory(t) {
      return new (t || _TeamBuilderComponent)(\u0275\u0275directiveInject(TeamService), \u0275\u0275directiveInject(SeasonService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TeamBuilderComponent, selectors: [["app-team-builder"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 1, consts: [[1, "athena-page"], [1, "athena-page-title"], [1, "loading-state"], [1, "athena-card", "empty-state"], [1, "empty-icon-text"], [1, "empty-sub"], [1, "budget-card", "athena-card"], [1, "budget-row"], [1, "budget-item"], [1, "budget-label"], [1, "budget-team"], [1, "budget-val"], [1, "athena-success", "animate-fade-in"], [1, "athena-error", "animate-fade-in"], [1, "tb-tabs"], [1, "tb-tab", 3, "click"], [1, "auctioned-section"], [1, "athena-info"], [1, "squad-section"], [1, "section-hdr"], [1, "athena-subheading"], [1, "athena-badge", "athena-badge-surface"], [1, "player-list"], [1, "player-row", "athena-card-sm", 3, "captain", "vc", "impact"], [1, "athena-card", "multiplier-card"], [1, "athena-subheading", 2, "margin-bottom", "12px"], [1, "mult-grid"], [1, "mult-row", 3, "highlighted"], [1, "player-row", "athena-card-sm"], [1, "player-info"], [1, "player-name-row"], [1, "player-nm"], [1, "role-pill", "captain-pill"], [1, "role-pill", "vc-pill"], [1, "role-pill", "impact-pill"], [1, "player-meta"], [1, "meta-tag"], [1, "meta-tag", "overseas"], [1, "meta-price"], [1, "player-actions"], [1, "assign-btn", "c-btn", 3, "disabled"], [1, "assign-btn", "vc-btn", 3, "disabled"], [1, "assign-btn", "ip-btn", 3, "disabled"], [1, "assign-btn", "c-btn", 3, "click", "disabled"], [1, "assign-btn", "vc-btn", 3, "click", "disabled"], [1, "assign-btn", "ip-btn", 3, "click", "disabled"], [1, "player-row", "athena-card-sm", "reserve-row"], [1, "reserve-badge"], [1, "mult-row"], [1, "mult-name"], [1, "mult-val", 3, "ngClass"], [1, "auctioned-list"], [1, "auctioned-row", "athena-card-sm"], [1, "athena-card", "auctioned-total-card"], [1, "atc-label"], [1, "atc-val"], [1, "auc-rank"], [1, "auc-info"], [1, "auc-name-row"], [1, "auc-name"], [1, "auc-meta"], [1, "auc-price"]], template: function TeamBuilderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1", 1);
        \u0275\u0275text(2, "My Team");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, TeamBuilderComponent_Conditional_3_Template, 2, 0, "div", 2)(4, TeamBuilderComponent_Conditional_4_Template, 7, 0)(5, TeamBuilderComponent_Conditional_5_Template, 26, 15);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(3, ctx.loading() ? 3 : !ctx.team() ? 4 : 5);
      }
    }, dependencies: [CommonModule, NgClass, FormsModule], styles: ["\n\n.loading-state[_ngcontent-%COMP%] {\n  color: #666;\n  padding: 40px;\n  text-align: center;\n  font-family: var(--font-body);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\n.empty-icon-text[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 11px;\n  font-weight: 900;\n  letter-spacing: 0.15em;\n  color: var(--gold);\n  background: rgba(212, 175, 55, 0.1);\n  border: 1px solid rgba(212, 175, 55, 0.2);\n  border-radius: 20px;\n  padding: 5px 14px;\n}\n.empty-sub[_ngcontent-%COMP%] {\n  color: #555;\n  font-size: 13px;\n}\n.tb-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid rgba(212, 175, 55, 0.1);\n}\n.tb-tab[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 10px 18px;\n  font-family: var(--font-body);\n  font-size: 13px;\n  font-weight: 700;\n  color: #666;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  transition: all 0.15s;\n}\n.tb-tab.active[_ngcontent-%COMP%] {\n  color: var(--gold);\n  border-bottom-color: var(--gold);\n}\n.tb-tab[_ngcontent-%COMP%]:hover:not(.active) {\n  color: #aaa;\n}\n.auctioned-section[_ngcontent-%COMP%] {\n  margin-top: 4px;\n}\n.auctioned-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-top: 10px;\n}\n.auctioned-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 14px;\n}\n.auc-rank[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 13px;\n  font-weight: 900;\n  color: var(--gold-dark);\n  width: 22px;\n  flex-shrink: 0;\n  text-align: center;\n}\n.auc-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.auc-name-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 4px;\n}\n.auc-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #fff;\n  font-family: var(--font-body);\n}\n.auc-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.reserve-tag[_ngcontent-%COMP%] {\n  color: #777 !important;\n}\n.auc-price[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 16px;\n  font-weight: 900;\n  color: var(--gold);\n  flex-shrink: 0;\n}\n.auctioned-total-card[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 18px;\n}\n.atc-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #888;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n.atc-val[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--gold);\n}\n.budget-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.budget-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  flex-wrap: wrap;\n}\n.budget-item[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 100px;\n  padding: 12px 16px;\n  border-right: 1px solid rgba(212, 175, 55, 0.1);\n}\n.budget-item[_ngcontent-%COMP%]:last-child {\n  border-right: none;\n}\n.budget-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: #888;\n  font-family: var(--font-body);\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  margin-bottom: 4px;\n}\n.budget-team[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  font-family: var(--font-body);\n}\n.budget-val[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--green-cricket);\n}\n.budget-val.low[_ngcontent-%COMP%] {\n  color: var(--red-live);\n}\n.squad-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.section-hdr[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 10px;\n}\n.player-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.player-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 14px;\n  border-left: 3px solid rgba(212, 175, 55, 0.2);\n  transition: all 0.15s;\n}\n.player-row.captain[_ngcontent-%COMP%] {\n  border-left-color: var(--gold);\n  background: rgba(212, 175, 55, 0.06) !important;\n}\n.player-row.vc[_ngcontent-%COMP%] {\n  border-left-color: var(--green-soft);\n  background: rgba(45, 156, 219, 0.05) !important;\n}\n.player-row.impact[_ngcontent-%COMP%] {\n  border-left-color: var(--green-cricket);\n  background: rgba(0, 200, 83, 0.05) !important;\n}\n.reserve-row[_ngcontent-%COMP%] {\n  border-left-color: #333;\n  opacity: 0.7;\n}\n.player-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.player-name-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 4px;\n}\n.player-nm[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #fff;\n  font-family: var(--font-body);\n}\n.role-pill[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 900;\n  padding: 2px 7px;\n  border-radius: 8px;\n  letter-spacing: 0.06em;\n}\n.captain-pill[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.2);\n  color: var(--gold);\n  border: 1px solid rgba(212, 175, 55, 0.4);\n}\n.vc-pill[_ngcontent-%COMP%] {\n  background: rgba(45, 156, 219, 0.15);\n  color: var(--green-soft);\n}\n.impact-pill[_ngcontent-%COMP%] {\n  background: rgba(0, 200, 83, 0.15);\n  color: var(--green-cricket);\n}\n.player-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.meta-tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: 10px;\n  background: rgba(255, 255, 255, 0.06);\n  color: #aaa;\n}\n.meta-tag.role-batsman[_ngcontent-%COMP%] {\n  color: var(--green-cricket);\n}\n.meta-tag.role-bowler[_ngcontent-%COMP%] {\n  color: var(--red-live);\n}\n.meta-tag.role-allrounder[_ngcontent-%COMP%] {\n  color: var(--gold);\n}\n.meta-tag.role-wicketkeeper[_ngcontent-%COMP%] {\n  color: var(--green-soft);\n}\n.meta-tag.overseas[_ngcontent-%COMP%] {\n  color: var(--green-soft);\n}\n.meta-price[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 12px;\n  color: #666;\n}\n.player-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  flex-shrink: 0;\n}\n.assign-btn[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 900;\n  padding: 4px 9px;\n  border-radius: 8px;\n  cursor: pointer;\n  border: 1px solid;\n  letter-spacing: 0.04em;\n  transition: all 0.15s;\n}\n.assign-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.c-btn[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.1);\n  color: var(--gold);\n  border-color: rgba(212, 175, 55, 0.3);\n}\n.vc-btn[_ngcontent-%COMP%] {\n  background: rgba(45, 156, 219, 0.1);\n  color: var(--green-soft);\n  border-color: rgba(45, 156, 219, 0.3);\n}\n.ip-btn[_ngcontent-%COMP%] {\n  background: rgba(0, 200, 83, 0.1);\n  color: var(--green-cricket);\n  border-color: rgba(0, 200, 83, 0.3);\n}\n.c-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(212, 175, 55, 0.25);\n}\n.vc-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(45, 156, 219, 0.2);\n}\n.ip-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(0, 200, 83, 0.2);\n}\n.reserve-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  color: #555;\n  border: 1px solid #333;\n  border-radius: 8px;\n  padding: 3px 8px;\n  flex-shrink: 0;\n}\n.multiplier-card[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.mult-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.mult-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 6px 10px;\n  border-radius: var(--radius-sm);\n}\n.mult-row.highlighted[_ngcontent-%COMP%] {\n  background: rgba(212, 175, 55, 0.06);\n}\n.mult-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #ccc;\n  font-family: var(--font-body);\n}\n.mult-val[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 13px;\n  font-weight: 900;\n}\n.mult-captain[_ngcontent-%COMP%] {\n  color: var(--gold);\n}\n.mult-vc[_ngcontent-%COMP%] {\n  color: var(--green-soft);\n}\n.mult-impact[_ngcontent-%COMP%] {\n  color: var(--green-cricket);\n}\n.mult-normal[_ngcontent-%COMP%] {\n  color: #555;\n}\n/*# sourceMappingURL=team-builder.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TeamBuilderComponent, { className: "TeamBuilderComponent", filePath: "app\\team-builder\\team-builder.component.ts", lineNumber: 285 });
})();
export {
  TeamBuilderComponent
};
//# sourceMappingURL=chunk-QPHKEJZ2.js.map
