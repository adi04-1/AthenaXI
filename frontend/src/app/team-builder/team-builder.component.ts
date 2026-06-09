import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({ selector: 'app-team-builder', standalone: true, imports: [CommonModule],
  template: `<div class="page"><h1 class="t">👥👥 My Team</h1><p class="s">Team management coming after auction.</p></div>`,
  styles: [`.page{padding:16px} .t{color:#C9A84C;font-size:22px;font-weight:800} .s{color:#666}`]
})
export class TeamBuilderComponent {}
