import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({ selector: 'app-transfers', standalone: true, imports: [CommonModule],
  template: `<div class="page"><h1 class="t">í´„ Transfers</h1><p class="s">Transfer windows open after Match 18.</p></div>`,
  styles: [`.page{padding:16px} .t{color:#C9A84C;font-size:22px;font-weight:800} .s{color:#666}`]
})
export class TransfersComponent {}
