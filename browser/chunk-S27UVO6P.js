import {
  TeamService
} from "./chunk-OLMNDMN6.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-FZZPELYY.js";
import {
  SeasonService
} from "./chunk-V7UAWJAK.js";
import "./chunk-LNJWB5JP.js";
import "./chunk-STS7VQLQ.js";
import {
  CommonModule,
  DatePipe,
  NgClass,
  __spreadProps,
  __spreadValues,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6BYAOC4F.js";

// src/app/admin/seasons/seasons.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
function SeasonsAdminComponent_Conditional_9_Template(rf, ctx) {
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
function SeasonsAdminComponent_Conditional_10_Template(rf, ctx) {
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
function SeasonsAdminComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "h2", 9);
    \u0275\u0275text(2, "New Season");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 10)(4, "div", 11)(5, "label", 12);
    \u0275\u0275text(6, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_11_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.name, $event) || (ctx_r0.form.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 11)(9, "label", 12);
    \u0275\u0275text(10, "Year");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_11_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.year, $event) || (ctx_r0.form.year = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 11)(13, "label", 12);
    \u0275\u0275text(14, "Mode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 15);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_11_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.mode, $event) || (ctx_r0.form.mode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(16, "option", 16);
    \u0275\u0275text(17, "Select mode...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 17);
    \u0275\u0275text(19, "\xF0\u0178\u2020\u2022 Fresh Auction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 18);
    \u0275\u0275text(21, "\xF0\u0178\u0178\xA1 Auction with Retentions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 19);
    \u0275\u0275text(23, "\xF0\u0178\u201D\xB5 Direct Allocation");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 11)(25, "label", 12);
    \u0275\u0275text(26, "Auction Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_11_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.auctionDate, $event) || (ctx_r0.form.auctionDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 11)(29, "label", 12);
    \u0275\u0275text(30, "Season Start");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_11_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.seasonStartDate, $event) || (ctx_r0.form.seasonStartDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 11)(33, "label", 12);
    \u0275\u0275text(34, "Season End");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_11_Template_input_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.form.seasonEndDate, $event) || (ctx_r0.form.seasonEndDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 21)(37, "button", 22);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_11_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showCreate.set(false));
    });
    \u0275\u0275text(38, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 23);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_11_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.createSeason());
    });
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.year);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.mode);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.auctionDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.seasonStartDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.form.seasonEndDate);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.saving() || !ctx_r0.form.name || !ctx_r0.form.mode);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? "Creating..." : "Create Season", " ");
  }
}
function SeasonsAdminComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, "Loading seasons...");
    \u0275\u0275elementEnd();
  }
}
function SeasonsAdminComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 25);
    \u0275\u0275text(2, "\u{1F4C5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No seasons yet. Create your first above.");
    \u0275\u0275elementEnd()();
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F468}\u200D\u2696\u{1F3F7}\uFE0F Auction: ", \u0275\u0275pipeBind2(2, 1, s_r4.auctionDate, "mediumDate"), "");
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F4C5} Starts: ", \u0275\u0275pipeBind2(2, 1, s_r4.seasonStartDate, "mediumDate"), "");
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 39)(1, "div", 10)(2, "div", 11)(3, "label", 12);
    \u0275\u0275text(4, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 15);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_20_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.editForm.status, $event) || (ctx_r0.editForm.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(6, "option", 41);
    \u0275\u0275text(7, "Upcoming");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 42);
    \u0275\u0275text(9, "Ready For Auction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 43);
    \u0275\u0275text(11, "Auction Phase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "option", 44);
    \u0275\u0275text(13, "Team Selection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 45);
    \u0275\u0275text(15, "In Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 46);
    \u0275\u0275text(17, "Completed");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 11)(19, "label", 12);
    \u0275\u0275text(20, "Auction Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_20_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.editForm.auctionDate, $event) || (ctx_r0.editForm.auctionDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 11)(23, "label", 12);
    \u0275\u0275text(24, "Season Start");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_20_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.editForm.seasonStartDate, $event) || (ctx_r0.editForm.seasonStartDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 11)(27, "label", 12);
    \u0275\u0275text(28, "Season End");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_20_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r0.editForm.seasonEndDate, $event) || (ctx_r0.editForm.seasonEndDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 21)(31, "button", 22);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_20_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.editingId.set(null));
    });
    \u0275\u0275text(32, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 23);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_20_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r5);
      const s_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.saveEdit(s_r4.id));
    });
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.editForm.status);
    \u0275\u0275advance(16);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.editForm.auctionDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.editForm.seasonStartDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.editForm.seasonEndDate);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.saving() ? "Saving..." : "Save", " ");
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_4_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 65);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_4_For_5_Template_button_click_0_listener() {
      const pt_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r0.cloneTeam(pt_r9));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pt_r9 = ctx.$implicit;
    \u0275\u0275styleProp("border-color", pt_r9.themeColour);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", pt_r9.themeColour);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(pt_r9.shortCode);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pt_r9.teamName, " ");
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "span", 62);
    \u0275\u0275text(2, "Clone from previous season:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 63);
    \u0275\u0275repeaterCreate(4, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_4_For_5_Template, 4, 6, "button", 64, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.previousTeams());
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_For_2_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_For_2_Conditional_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "span", 75);
    \u0275\u0275text(2, "Current password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 76);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 77);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_For_2_Conditional_12_Conditional_2_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(8);
      return \u0275\u0275resetView(ctx_r0.showPlain.set(!ctx_r0.showPlain()));
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 74)(8, "input", 78);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_For_2_Conditional_12_Conditional_2_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(8);
      \u0275\u0275twoWayBindingSet(ctx_r0.resetPasswordValue, $event) || (ctx_r0.resetPasswordValue = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 79);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_For_2_Conditional_12_Conditional_2_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r12);
      const t_r11 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r0.resetTeamPassword(t_r11.id));
    });
    \u0275\u0275text(10, " Reset ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_26_0;
    const ctx_r0 = \u0275\u0275nextContext(8);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.showPlain() ? (tmp_26_0 = (tmp_26_0 = ctx_r0.currentCreds()) == null ? null : tmp_26_0.plainPassword) !== null && tmp_26_0 !== void 0 ? tmp_26_0 : "\xE2\u20AC\u201D not recorded \xE2\u20AC\u201D" : "\xE2\u20AC\xA2\xE2\u20AC\xA2\xE2\u20AC\xA2\xE2\u20AC\xA2\xE2\u20AC\xA2\xE2\u20AC\xA2\xE2\u20AC\xA2\xE2\u20AC\xA2", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.showPlain() ? "Hide" : "Reveal", " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.resetPasswordValue);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.resetPasswordValue || ctx_r0.saving());
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275template(1, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_For_2_Conditional_12_Conditional_1_Template, 2, 0, "span", 3)(2, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_For_2_Conditional_12_Conditional_2_Template, 11, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(7);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r0.loadingCreds() ? 1 : 2);
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 66)(1, "span", 67);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 68)(4, "div", 69);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 70);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 71);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 72);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_For_2_Template_button_click_10_listener() {
      const t_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r0.toggleCredentials(t_r11.id));
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_For_2_Conditional_12_Template, 3, 1, "div", 73);
  }
  if (rf & 2) {
    const t_r11 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(6);
    \u0275\u0275styleProp("border-left-color", t_r11.themeColour);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", t_r11.themeColour);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r11.shortCode);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r11.teamName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate("@" + t_r11.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u{1F4B0}", t_r11.budgetRemainingCr, "Cr");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.credentialsOpenId() === t_r11.id ? "Hide" : "Password", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(12, ctx_r0.credentialsOpenId() === t_r11.id ? 12 : -1);
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275repeaterCreate(1, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_For_2_Template, 13, 10, null, null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.seasonTeams());
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 80);
    \u0275\u0275text(1, "No teams added yet.");
    \u0275\u0275elementEnd();
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 51)(2, "h3", 52);
    \u0275\u0275text(3, "Add Team");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_4_Template, 6, 0, "div", 53);
    \u0275\u0275elementStart(5, "div", 10)(6, "div", 11)(7, "label", 12);
    \u0275\u0275text(8, "Team Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.teamForm.teamName, $event) || (ctx_r0.teamForm.teamName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 11)(11, "label", 12);
    \u0275\u0275text(12, "Short Code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 55);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.teamForm.shortCode, $event) || (ctx_r0.teamForm.shortCode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 11)(15, "label", 12);
    \u0275\u0275text(16, "Colour");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.teamForm.themeColour, $event) || (ctx_r0.teamForm.themeColour = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 11)(19, "label", 12);
    \u0275\u0275text(20, "Owner Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 57);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.teamForm.ownerDisplayName, $event) || (ctx_r0.teamForm.ownerDisplayName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 11)(23, "label", 12);
    \u0275\u0275text(24, "Username");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 58);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.teamForm.username, $event) || (ctx_r0.teamForm.username = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 11)(27, "label", 12);
    \u0275\u0275text(28, "Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r0.teamForm.password, $event) || (ctx_r0.teamForm.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "button", 60);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r7);
      const s_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.addTeam(s_r4.id));
    });
    \u0275\u0275text(31, " + Add Team ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(32, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_32_Template, 3, 0, "div", 61)(33, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Conditional_33_Template, 2, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(4, ctx_r0.previousTeams().length > 0 ? 4 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.teamForm.teamName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.teamForm.shortCode);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.teamForm.themeColour);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.teamForm.ownerDisplayName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.teamForm.username);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.teamForm.password);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(32, ctx_r0.seasonTeams().length > 0 ? 32 : 33);
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Loading...");
    \u0275\u0275elementEnd();
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_7_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "span", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 83);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.value);
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81);
    \u0275\u0275repeaterCreate(1, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_7_Conditional_2_For_2_Template, 5, 2, "div", 82, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.configItems());
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275template(1, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_7_Conditional_1_Template, 2, 0, "p", 3)(2, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_7_Conditional_2_Template, 3, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r0.loadingConfig() ? 1 : ctx_r0.seasonConfig() ? 2 : -1);
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 47)(2, "button", 48);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const s_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      ctx_r0.activeTab.set("teams");
      return \u0275\u0275resetView(ctx_r0.loadTeams(s_r4.id));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 48);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const s_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.loadConfig(s_r4.id));
    });
    \u0275\u0275text(5, "\u2699\uFE0F Config");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_6_Template, 34, 9, "div", 49)(7, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Conditional_7_Template, 3, 1, "div", 50);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r0.activeTab() === "teams");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u{1F465}Teams (", ctx_r0.seasonTeams().length, ")");
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r0.activeTab() === "config");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(6, ctx_r0.activeTab() === "teams" ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, ctx_r0.activeTab() === "config" ? 7 : -1);
  }
}
function SeasonsAdminComponent_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Template_div_click_1_listener() {
      const s_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggle(s_r4.id));
    });
    \u0275\u0275elementStart(2, "div", 29)(3, "div", 30)(4, "span", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 33);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 34);
    \u0275\u0275template(11, SeasonsAdminComponent_Conditional_14_For_2_Conditional_11_Template, 3, 4, "span")(12, SeasonsAdminComponent_Conditional_14_For_2_Conditional_12_Template, 3, 4, "span");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 35);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Template_div_click_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(14, "button", 36);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Template_button_click_14_listener() {
      const s_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.startEdit(s_r4));
    });
    \u0275\u0275text(15, "\u270F\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 37);
    \u0275\u0275listener("click", function SeasonsAdminComponent_Conditional_14_For_2_Template_button_click_16_listener() {
      const s_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.deleteSeason(s_r4.id));
    });
    \u0275\u0275text(17, "\u{1F5D1}\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 38);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(20, SeasonsAdminComponent_Conditional_14_For_2_Conditional_20_Template, 35, 6, "div", 39)(21, SeasonsAdminComponent_Conditional_14_For_2_Conditional_21_Template, 8, 7, "div", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(s_r4.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.statusBadge(s_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r4.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.modeLabel(s_r4.mode));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(11, s_r4.auctionDate ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(12, s_r4.seasonStartDate ? 12 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.expandedId() === s_r4.id ? "\u25B2" : "\u25BC");
    \u0275\u0275advance();
    \u0275\u0275conditional(20, ctx_r0.editingId() === s_r4.id ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(21, ctx_r0.expandedId() === s_r4.id && ctx_r0.editingId() !== s_r4.id ? 21 : -1);
  }
}
function SeasonsAdminComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275repeaterCreate(1, SeasonsAdminComponent_Conditional_14_For_2_Template, 22, 9, "div", 27, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.seasons());
  }
}
var SeasonsAdminComponent = class _SeasonsAdminComponent {
  configItems() {
    const c = this.seasonConfig();
    if (!c)
      return [];
    return [
      { label: "Budget", value: `\u{1F4B0}${c.budgetPerTeamCr}Cr` },
      { label: "Squad", value: c.minSquadSize },
      { label: "Overseas", value: c.maxOverseasPlayers },
      { label: "RTM Slots", value: c.rtmSlotsPerTeam },
      { label: "C Mult.", value: `${c.captainMultiplier}x` },
      { label: "VC Mult.", value: `${c.viceCaptainMultiplier}x` }
    ];
  }
  constructor(seasonSvc, teamSvc) {
    this.seasonSvc = seasonSvc;
    this.teamSvc = teamSvc;
    this.seasons = signal([]);
    this.seasonTeams = signal([]);
    this.previousTeams = signal([]);
    this.seasonConfig = signal(null);
    this.loading = signal(true);
    this.loadingConfig = signal(false);
    this.saving = signal(false);
    this.error = signal("");
    this.success = signal("");
    this.showCreate = signal(false);
    this.expandedId = signal(null);
    this.editingId = signal(null);
    this.activeTab = signal("teams");
    this.credentialsOpenId = signal(null);
    this.loadingCreds = signal(false);
    this.currentCreds = signal(null);
    this.showPlain = signal(false);
    this.resetPasswordValue = "";
    this.form = { name: "", year: (/* @__PURE__ */ new Date()).getFullYear(), mode: "", auctionDate: "", seasonStartDate: "", seasonEndDate: "" };
    this.editForm = { name: "", status: "", auctionDate: "", seasonStartDate: "", seasonEndDate: "" };
    this.teamForm = { teamName: "", shortCode: "", themeColour: "#D4AF37", ownerDisplayName: "", username: "", password: "" };
  }
  ngOnInit() {
    this.loadSeasons();
  }
  loadSeasons() {
    this.seasonSvc.getAll().subscribe({ next: (d) => {
      this.seasons.set(d);
      this.loading.set(false);
    }, error: () => this.loading.set(false) });
  }
  toggle(id) {
    if (this.expandedId() === id) {
      this.expandedId.set(null);
      return;
    }
    this.expandedId.set(id);
    this.activeTab.set("teams");
    this.loadTeams(id);
    this.loadPreviousTeams(id);
  }
  loadTeams(sid) {
    this.teamSvc.getTeamsBySeason(sid).subscribe({ next: (d) => this.seasonTeams.set(d), error: () => {
    } });
  }
  toggleCredentials(teamId) {
    if (this.credentialsOpenId() === teamId) {
      this.credentialsOpenId.set(null);
      this.currentCreds.set(null);
      this.showPlain.set(false);
      this.resetPasswordValue = "";
      return;
    }
    this.credentialsOpenId.set(teamId);
    this.showPlain.set(false);
    this.resetPasswordValue = "";
    this.loadingCreds.set(true);
    this.teamSvc.getCredentials(teamId).subscribe({
      next: (c) => {
        this.currentCreds.set(c);
        this.loadingCreds.set(false);
      },
      error: () => {
        this.currentCreds.set(null);
        this.loadingCreds.set(false);
      }
    });
  }
  resetTeamPassword(teamId) {
    const team = this.seasonTeams().find((t) => t.id === teamId);
    if (!team || !this.resetPasswordValue)
      return;
    this.saving.set(true);
    this.teamSvc.updateTeam(teamId, {
      teamName: team.teamName,
      shortCode: team.shortCode,
      themeColour: team.themeColour,
      ownerDisplayName: team.ownerDisplayName,
      newPassword: this.resetPasswordValue
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.success.set("Password reset!");
        setTimeout(() => this.success.set(""), 3e3);
        this.teamSvc.getCredentials(teamId).subscribe({ next: (c) => this.currentCreds.set(c) });
        this.resetPasswordValue = "";
      },
      error: (e) => {
        this.error.set(e?.error?.error ?? "Failed to reset password.");
        this.saving.set(false);
      }
    });
  }
  loadPreviousTeams(currentId) {
    const prev = this.seasons().find((s) => s.id !== currentId);
    if (!prev)
      return;
    this.teamSvc.getTeamsBySeason(prev.id).subscribe({ next: (d) => this.previousTeams.set(d), error: () => {
    } });
  }
  loadConfig(sid) {
    this.activeTab.set("config");
    this.loadingConfig.set(true);
    this.seasonSvc.getById(sid).subscribe({ next: (d) => {
      this.seasonConfig.set(d.config);
      this.loadingConfig.set(false);
    }, error: () => this.loadingConfig.set(false) });
  }
  createSeason() {
    this.saving.set(true);
    this.error.set("");
    this.seasonSvc.create(__spreadProps(__spreadValues({}, this.form), { numberOfTeams: 10, allowGuests: true })).subscribe({
      next: (s) => {
        this.seasons.update((l) => [s, ...l]);
        this.showCreate.set(false);
        this.success.set(`"${s.name}" created!`);
        this.saving.set(false);
        setTimeout(() => this.success.set(""), 3e3);
      },
      error: (e) => {
        this.error.set(e?.error?.error ?? "Failed to create.");
        this.saving.set(false);
      }
    });
  }
  startEdit(s) {
    this.editingId.set(s.id);
    this.editForm = {
      name: s.name,
      status: s.status,
      auctionDate: s.auctionDate?.split("T")[0] ?? "",
      seasonStartDate: s.seasonStartDate?.split("T")[0] ?? "",
      seasonEndDate: s.seasonEndDate?.split("T")[0] ?? ""
    };
  }
  saveEdit(id) {
    this.saving.set(true);
    this.seasonSvc.updateStatus(id, this.editForm.status, {
      auctionDate: this.editForm.auctionDate || void 0,
      seasonStartDate: this.editForm.seasonStartDate || void 0,
      seasonEndDate: this.editForm.seasonEndDate || void 0
    }).subscribe({
      next: () => {
        this.seasons.update((l) => l.map((s) => s.id === id ? __spreadProps(__spreadValues({}, s), {
          status: this.editForm.status,
          auctionDate: this.editForm.auctionDate || s.auctionDate,
          seasonStartDate: this.editForm.seasonStartDate || s.seasonStartDate,
          seasonEndDate: this.editForm.seasonEndDate || s.seasonEndDate
        }) : s));
        this.editingId.set(null);
        this.saving.set(false);
        this.success.set("Updated!");
        setTimeout(() => this.success.set(""), 3e3);
      },
      error: () => {
        this.error.set("Failed to update.");
        this.saving.set(false);
      }
    });
  }
  deleteSeason(id) {
    if (!confirm("Delete this season? Cannot be undone."))
      return;
    this.seasonSvc.delete(id).subscribe({
      next: () => {
        this.seasons.update((l) => l.filter((s) => s.id !== id));
        this.success.set("Deleted.");
      },
      error: (e) => this.error.set(e?.error?.error ?? "Cannot delete \xE2\u20AC\u201D may have teams.")
    });
  }
  addTeam(seasonId) {
    this.saving.set(true);
    this.error.set("");
    this.teamSvc.createTeam(__spreadProps(__spreadValues({}, this.teamForm), { seasonId })).subscribe({
      next: (t) => {
        this.seasonTeams.update((l) => [...l, __spreadProps(__spreadValues({}, t), { username: this.teamForm.username })]);
        this.teamForm = { teamName: "", shortCode: "", themeColour: "#D4AF37", ownerDisplayName: "", username: "", password: "" };
        this.success.set("Team added!");
        this.saving.set(false);
        setTimeout(() => this.success.set(""), 3e3);
      },
      error: (e) => {
        this.error.set(e?.error?.error ?? "Failed.");
        this.saving.set(false);
      }
    });
  }
  cloneTeam(pt) {
    this.teamForm = __spreadProps(__spreadValues({}, this.teamForm), { teamName: pt.teamName, shortCode: pt.shortCode, themeColour: pt.themeColour, ownerDisplayName: pt.ownerDisplayName, username: pt.username + "_26" });
  }
  statusBadge(s) {
    const m = { Upcoming: "athena-badge-surface", ReadyForAuction: "athena-badge-blue", AuctionPhase: "athena-badge-red", TeamSelectionPhase: "athena-badge-gold", InProgress: "athena-badge-green", Completed: "athena-badge-surface" };
    return m[s] ?? "athena-badge-surface";
  }
  modeLabel(m) {
    return { FreshAuction: "\u{1F7E2} Fresh", AuctionWithRetentions: "\u{1F7E1} Retention", DirectAllocation: "\u{1F535} Direct" }[m] ?? m;
  }
  static {
    this.\u0275fac = function SeasonsAdminComponent_Factory(t) {
      return new (t || _SeasonsAdminComponent)(\u0275\u0275directiveInject(SeasonService), \u0275\u0275directiveInject(TeamService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SeasonsAdminComponent, selectors: [["app-admin-seasons"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 15, vars: 5, consts: [[1, "admin-page"], [1, "admin-page-header"], [1, "athena-page-title", 2, "margin-bottom", "4px"], [1, "athena-label"], [1, "athena-btn", "athena-btn-primary", 3, "click"], [1, "athena-error", "animate-fade-in"], [1, "athena-success", "animate-fade-in"], [1, "athena-card", "create-panel", "animate-fade-in"], [1, "loading-state"], [1, "panel-title"], [1, "athena-grid-2"], [1, "athena-field"], [1, "athena-field-label"], ["placeholder", "IPL 2026", 1, "athena-input", 3, "ngModelChange", "ngModel"], ["type", "number", 1, "athena-input", 3, "ngModelChange", "ngModel"], [1, "athena-input", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "FreshAuction"], ["value", "AuctionWithRetentions"], ["value", "DirectAllocation"], ["type", "date", 1, "athena-input", 3, "ngModelChange", "ngModel"], [1, "panel-actions"], [1, "athena-btn", "athena-btn-secondary", 3, "click"], [1, "athena-btn", "athena-btn-primary", 3, "click", "disabled"], [1, "empty-state", "athena-card"], [2, "font-size", "40px"], [1, "seasons-list"], [1, "season-card", "athena-card"], [1, "season-row", 3, "click"], [1, "season-main"], [1, "season-name-row"], [1, "season-name"], [1, "athena-badge", 3, "ngClass"], [1, "athena-badge", "athena-badge-surface"], [1, "season-meta"], [1, "season-actions", 3, "click"], ["title", "Edit", 1, "icon-btn", 3, "click"], ["title", "Delete", 1, "icon-btn", 3, "click"], [1, "expand-icon"], [1, "edit-panel", "animate-fade-in"], [1, "season-detail", "animate-fade-in"], ["value", "Upcoming"], ["value", "ReadyForAuction"], ["value", "AuctionPhase"], ["value", "TeamSelectionPhase"], ["value", "InProgress"], ["value", "Completed"], [1, "detail-tabs"], [1, "detail-tab", 3, "click"], [1, "teams-section"], [1, "config-section"], [1, "add-team-form"], [1, "athena-subheading", 2, "margin-bottom", "12px"], [2, "margin-bottom", "12px"], ["placeholder", "Chennai Strikers", 1, "athena-input", 3, "ngModelChange", "ngModel"], ["placeholder", "CS", "maxlength", "4", 1, "athena-input", 3, "ngModelChange", "ngModel"], ["type", "color", 1, "athena-input", 2, "height", "42px", "padding", "4px", 3, "ngModelChange", "ngModel"], ["placeholder", "Karthik", 1, "athena-input", 3, "ngModelChange", "ngModel"], ["placeholder", "cs_team", 1, "athena-input", 3, "ngModelChange", "ngModel"], ["type", "password", 1, "athena-input", 3, "ngModelChange", "ngModel"], [1, "athena-btn", "athena-btn-primary", 2, "margin-top", "12px", "width", "100%", 3, "click", "disabled"], [2, "display", "flex", "flex-direction", "column", "gap", "8px", "margin-top", "4px"], [1, "athena-label", 2, "display", "block", "margin-bottom", "8px"], [2, "display", "flex", "gap", "8px", "flex-wrap", "wrap"], [1, "clone-chip", 3, "border-color"], [1, "clone-chip", 3, "click"], [1, "team-row-inner"], [2, "font-size", "13px", "font-weight", "800", "min-width", "32px"], [2, "flex", "1"], [2, "font-size", "14px", "font-weight", "700", "color", "#fff"], [2, "font-size", "11px", "color", "#666"], [2, "font-family", "var(--font-timer)", "font-size", "14px", "color", "var(--gold)", "font-weight", "700"], [1, "cred-toggle-btn", 3, "click"], [1, "cred-panel", "animate-fade-in"], [1, "cred-row"], [1, "cred-label"], [1, "cred-value"], [1, "cred-eye-btn", 3, "click"], ["type", "text", "placeholder", "Set new password...", 1, "athena-input", "cred-reset-input", 3, "ngModelChange", "ngModel"], [1, "cred-reset-btn", 3, "click", "disabled"], [2, "color", "#555", "font-size", "13px", "margin-top", "8px"], [1, "config-grid"], [1, "config-item"], [2, "font-family", "var(--font-timer)", "font-size", "18px", "color", "var(--gold)", "font-weight", "700"]], template: function SeasonsAdminComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
        \u0275\u0275text(4, "\u{1F5D3}\uFE0F Seasons");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 3);
        \u0275\u0275text(6, "Create, configure and manage all seasons");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "button", 4);
        \u0275\u0275listener("click", function SeasonsAdminComponent_Template_button_click_7_listener() {
          return ctx.showCreate.set(!ctx.showCreate());
        });
        \u0275\u0275text(8);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, SeasonsAdminComponent_Conditional_9_Template, 2, 1, "div", 5)(10, SeasonsAdminComponent_Conditional_10_Template, 2, 1, "div", 6)(11, SeasonsAdminComponent_Conditional_11_Template, 41, 8, "div", 7)(12, SeasonsAdminComponent_Conditional_12_Template, 2, 0, "div", 8)(13, SeasonsAdminComponent_Conditional_13_Template, 5, 0)(14, SeasonsAdminComponent_Conditional_14_Template, 3, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate1(" ", ctx.showCreate() ? "\xE2\u0153\u2022 Cancel" : "+ New Season", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(9, ctx.error() ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(10, ctx.success() ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(11, ctx.showCreate() ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(12, ctx.loading() ? 12 : ctx.seasons().length === 0 && !ctx.showCreate() ? 13 : 14);
      }
    }, dependencies: [CommonModule, NgClass, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel], styles: ["\n\n.admin-page[_ngcontent-%COMP%] {\n  padding: 28px 24px;\n  max-width: 900px;\n}\n.admin-page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.loading-state[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%] {\n  color: #666;\n  padding: 40px;\n  text-align: center;\n  font-family: var(--font-body);\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n}\n.create-panel[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  padding: 24px;\n}\n.panel-title[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 16px;\n  font-weight: 700;\n  color: #fff;\n  margin-bottom: 20px;\n}\n.panel-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  margin-top: 20px;\n}\n.seasons-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.season-card[_ngcontent-%COMP%] {\n  padding: 0;\n  overflow: hidden;\n}\n.season-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 16px 20px;\n  cursor: pointer;\n  transition: background 0.15s;\n}\n.season-row[_ngcontent-%COMP%]:hover {\n  background: rgba(212, 175, 55, 0.03);\n}\n.season-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.season-name-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-bottom: 6px;\n}\n.season-name[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 16px;\n  font-weight: 700;\n  color: #fff;\n}\n.season-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  font-family: var(--font-body);\n  font-size: 12px;\n  color: #666;\n  flex-wrap: wrap;\n}\n.season-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 16px;\n  cursor: pointer;\n  opacity: 0.6;\n  padding: 4px 6px;\n  transition: opacity 0.15s;\n  border-radius: 6px;\n}\n.icon-btn[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  background: rgba(255, 255, 255, 0.05);\n}\n.expand-icon[_ngcontent-%COMP%] {\n  color: #555;\n  font-size: 11px;\n  padding: 4px 6px;\n  cursor: pointer;\n}\n.edit-panel[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-top: 1px solid rgba(212, 175, 55, 0.1);\n  background: rgba(10, 31, 47, 0.6);\n}\n.season-detail[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(212, 175, 55, 0.1);\n}\n.detail-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  border-bottom: 1px solid rgba(212, 175, 55, 0.1);\n}\n.detail-tab[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 12px 20px;\n  font-family: var(--font-body);\n  font-size: 13px;\n  font-weight: 600;\n  color: #666;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  transition: all 0.15s;\n}\n.detail-tab.active[_ngcontent-%COMP%] {\n  color: var(--gold);\n  border-bottom-color: var(--gold);\n}\n.teams-section[_ngcontent-%COMP%], .config-section[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.add-team-form[_ngcontent-%COMP%] {\n  background: rgba(10, 31, 47, 0.5);\n  border-radius: var(--radius-md);\n  padding: 16px;\n  margin-bottom: 16px;\n  border: 1px solid rgba(212, 175, 55, 0.08);\n}\n.clone-chip[_ngcontent-%COMP%] {\n  background: rgba(30, 58, 95, 0.4);\n  border: 1px solid;\n  border-radius: 20px;\n  padding: 4px 12px;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  color: #ccc;\n  display: flex;\n  gap: 6px;\n  align-items: center;\n  transition: background 0.15s;\n}\n.clone-chip[_ngcontent-%COMP%]:hover {\n  background: rgba(30, 58, 95, 0.8);\n}\n.team-row-inner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 14px;\n  background: rgba(10, 31, 47, 0.6);\n  border-left: 3px solid;\n  border-radius: 0 var(--radius-md) var(--radius-md) 0;\n}\n.cred-toggle-btn[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--gold-dark);\n  background: rgba(212, 175, 55, 0.08);\n  border: 1px solid rgba(212, 175, 55, 0.18);\n  border-radius: 8px;\n  padding: 5px 10px;\n  cursor: pointer;\n  flex-shrink: 0;\n  white-space: nowrap;\n}\n.cred-toggle-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(212, 175, 55, 0.18);\n  color: var(--gold);\n}\n.cred-panel[_ngcontent-%COMP%] {\n  background: rgba(8, 20, 36, 0.7);\n  border: 1px solid rgba(212, 175, 55, 0.15);\n  border-radius: var(--radius-md);\n  padding: 12px 14px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  margin-top: -4px;\n  margin-bottom: 4px;\n}\n.cred-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.cred-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #888;\n  min-width: 110px;\n}\n.cred-value[_ngcontent-%COMP%] {\n  font-family: var(--font-timer);\n  font-size: 13px;\n  color: #fff;\n  letter-spacing: 0.04em;\n  flex: 1;\n}\n.cred-eye-btn[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--green-soft);\n  background: rgba(45, 156, 219, 0.1);\n  border: 1px solid rgba(45, 156, 219, 0.25);\n  border-radius: 8px;\n  padding: 4px 10px;\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.cred-reset-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 140px;\n  font-size: 12px !important;\n  padding: 7px 10px !important;\n}\n.cred-reset-btn[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--red-live);\n  background: rgba(255, 59, 48, 0.08);\n  border: 1px solid rgba(255, 59, 48, 0.2);\n  border-radius: 8px;\n  padding: 7px 14px;\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.cred-reset-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.config-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.config-item[_ngcontent-%COMP%] {\n  background: rgba(10, 31, 47, 0.6);\n  border-radius: var(--radius-md);\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\nselect.athena-input[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\nselect.athena-input[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background: var(--navy-deep);\n}\n/*# sourceMappingURL=seasons.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SeasonsAdminComponent, { className: "SeasonsAdminComponent", filePath: "app\\admin\\seasons\\seasons.component.ts", lineNumber: 274 });
})();
export {
  SeasonsAdminComponent
};
//# sourceMappingURL=chunk-S27UVO6P.js.map
