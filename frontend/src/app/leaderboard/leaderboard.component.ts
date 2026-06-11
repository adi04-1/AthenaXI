import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LeaderboardService } from '../core/services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="athena-page">

      <!-- Header -->
      <div class="lb-header">
        <h1 class="athena-page-title">Ì≥ä Leaderboard</h1>
        <span class="athena-badge athena-badge-gold">IPL 2025</span>
      </div>

      @if (loading()) {
        <div class="lb-loading">
          <div class="loading-helm">‚öîÔ∏è</div>
          <p>Summoning the standings...</p>
        </div>
      } @else if (rows().length === 0) {
        <div class="lb-empty athena-card">
          <span style="font-size:40px">ÌøüÔ∏è</span>
          <p>No teams yet. Season hasn't started.</p>
        </div>
      } @else {
        <div class="lb-list">
          @for (row of rows(); track row.teamId) {
            <a [routerLink]="['/leaderboard', row.teamId]"
               class="lb-row athena-card animate-fade-in"
               [style.border-left-color]="row.themeColour"
               style="border-left-width:4px; border-radius: 0 14px 14px 0; text-decoration:none; display:flex; align-items:center; gap:16px; padding:16px 20px; margin-bottom:10px;">

              <!-- Rank -->
              <div class="lb-rank" [ngClass]="'rank-' + row.rank">
                @if (row.rank === 1) { Ìµá }
                @else if (row.rank === 2) { Ìµà }
                @else if (row.rank === 3) { Ìµâ }
                @else { #{{ row.rank }} }
              </div>

              <!-- Team info -->
              <div class="lb-team-info">
                <span class="lb-team-code" [style.color]="row.themeColour">
                  {{ row.shortCode }}
                </span>
                <span class="lb-team-name">{{ row.teamName }}</span>
                <span class="lb-owner">{{ row.ownerDisplayName }}</span>
              </div>

              <!-- Points -->
              <div class="lb-points-col">
                <span class="athena-amount lb-points">{{ row.totalPoints }}</span>
                <span class="athena-label">pts</span>
                @if (row.pointsLastMatch > 0) {
                  <span class="lb-last">+{{ row.pointsLastMatch }} last match</span>
                }
              </div>
            </a>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .lb-header {
      display: flex; align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }
    .lb-loading, .lb-empty {
      text-align: center; padding: 60px 20px;
      color: #555; font-family: var(--font-body);
    }
    .loading-helm { font-size: 40px; margin-bottom: 12px; animation: spin 2s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .lb-rank {
      font-family: var(--font-timer);
      font-size: 22px; font-weight: 900;
      min-width: 44px; text-align: center;
    }
    .lb-team-info {
      flex: 1; display: flex;
      flex-direction: column; gap: 3px;
    }
    .lb-team-code { font-size: 12px; font-weight: 800; letter-spacing: 0.06em; }
    .lb-team-name { font-size: 16px; font-weight: 700; color: #fff; }
    .lb-owner { font-size: 12px; color: #666; }
    .lb-points-col {
      display: flex; flex-direction: column;
      align-items: flex-end; gap: 2px;
    }
    .lb-points { font-size: 26px !important; }
    .lb-last { font-size: 11px; color: var(--green-cricket); font-weight: 600; }
  `]
})
export class LeaderboardComponent implements OnInit {
  rows    = signal<any[]>([]);
  loading = signal(true);
  private seasonId = '00000000-0000-0000-0000-000000000001';

  constructor(private svc: LeaderboardService) {}

  ngOnInit() {
    this.svc.getLeaderboard(this.seasonId).subscribe({
      next: d => { this.rows.set(d); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}
