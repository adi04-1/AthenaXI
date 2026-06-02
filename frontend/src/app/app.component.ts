import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-shell">
      <!-- Navbar will go here (Day 4) -->
      <router-outlet />
    </div>
  `,
  styles: [`
    .app-shell {
      min-height: 100vh;
      background: #0a0a0a;
      color: #fff;
      font-family: 'Inter', sans-serif;
    }
  `]
})
export class AppComponent {
  title = 'AthenaXI';
}
