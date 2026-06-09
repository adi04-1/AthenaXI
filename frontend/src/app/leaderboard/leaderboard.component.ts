import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LeaderboardService } from '../core/services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page">
      <div class="page-header">
        <h1 class="page-title">��� Leaderboard</h1>
        <span class="season-tag">IPL 2025</span>
      </div>
      @if (loading()) {
        <div class="loading">Loading standings...</div>
      } @else {
        <div class="table-wrap">
          @for (row of rows(); track row.teamId) {
            <div class="team-row" [style.border-left-color]="row.themeColour">
              <div class="rank">
                {{ row.rank === 1 ? '���' : row.rank === 2 ? '���' : row.rank === 3 ? '���' : '#' + row.rank }}
              </div>
              <div class="team-info">
                <span class="team-code" [style.color]="row.themeColour">{{ row.shortCode }}</span>
                <span class="team-name">{{ row.teamName }}</span>
                <span class="owner">{{ row.ownerDisplayName }}</span>
              </div>
              <div class="points-col">
                <span class="total-pts">{{ row.totalPoints }}</span>
                <span class="pts-label">pts</span>
              </div>
            </div>
          }
          @if (rows().length === 0) {
            <div class="empty">No teams yet. Season hasn't started.</div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page { padding: 16px; max-width: 600px; margin: 0 auto; }
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
    .page-title { font-size: 22px; font-weight: 800; color: #C9A84C; margin: 0; }
    .season-tag { background: #C9A84C22; color: #C9A84C; border-radius: 20px; padding: 4px 12px; font-size: 12px; }
    .loading, .empty { text-align: center; color: #666; padding: 40px; }
    .table-wrap { display: flex; flex-direction: column; gap: 10px; }
    .team-row { background: #1a1a2e; border-left: 4px solid; border-radius: 0 10px 10px 0; padding: 14px 16px; display: flex; align-items: center; gap: 16px; }
    .rank { font-size: 18px; font-weight: 800; min-width: 40px; }
    .team-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .team-code { font-size: 13px; font-weight: 800; }
    .team-name { font-size: 15px; font-weight: 700; color: #fff; }
    .owner { font-size: 12px; color: #888; }
    .points-col { display: flex; flex-direction: column; align-items: flex-end; }
    .total-pts { font-size: 24px; font-weight: 900; color: #C9A84C; }
    .pts-label { font-size: 11px; color: #888; }
  `]
})
export class LeaderboardComponent implements OnInit {
  rows    = signal<any[]>([]);
  loading = signal(true);
  private seasonId = '00000000-0000-0000-0000-000000000001';
  constructor( @Inject(LeaderboardService) private svc: LeaderboardService) {}
  ngOnInit() {
    this.svc.getLeaderboard(this.seasonId).subscribe({
      next: d => { this.rows.set(d); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}
