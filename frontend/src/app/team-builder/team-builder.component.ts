import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../core/services/team.service';
import { SeasonService } from '../core/services/season.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-team-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="athena-page">
      <h1 class="athena-page-title">My Team</h1>

      @if (loading()) {
        <div class="loading-state">Loading your squad...</div>
      } @else if (!team()) {
        <div class="athena-card empty-state">
          <div class="empty-icon-text">SQUAD</div>
          <p>No squad found for the active season.</p>
          <p class="empty-sub">Your team will appear here after the auction.</p>
        </div>
      } @else {
        <!-- Budget bar -->
        <div class="budget-card athena-card">
          <div class="budget-row">
            <div class="budget-item">
              <span class="budget-label">Team</span>
              <span class="budget-team" [style.color]="team()!.themeColour">{{ team()!.teamName }}</span>
            </div>
            <div class="budget-item">
              <span class="budget-label">Budget Remaining</span>
              <span class="budget-val" [class.low]="team()!.budgetRemainingCr < 10">
                Rs. {{ team()!.budgetRemainingCr }}Cr
              </span>
            </div>
            <div class="budget-item">
              <span class="budget-label">Squad Size</span>
              <span class="budget-val">{{ players().length }}</span>
            </div>
          </div>
        </div>

        @if (success()) { <div class="athena-success animate-fade-in">{{ success() }}</div> }
        @if (error()) { <div class="athena-error animate-fade-in">{{ error() }}</div> }

        <!-- Tabs -->
        <div class="tb-tabs">
          <button class="tb-tab" [class.active]="activeTab() === 'squad'" (click)="activeTab.set('squad')">
            Squad
          </button>
          <button class="tb-tab" [class.active]="activeTab() === 'auctioned'" (click)="activeTab.set('auctioned')">
            Auctioned Players
          </button>
        </div>

        @if (activeTab() === 'squad') {

        <!-- Role assignment notice -->
        @if (!hasCaptain() || !hasVC() || !hasImpact()) {
          <div class="athena-info">
            <strong>Setup required:</strong>
            @if (!hasCaptain()) { Assign a Captain (2x points). }
            @if (!hasVC()) { Assign a Vice-Captain (1.5x). }
            @if (!hasImpact()) { Assign an Impact Player (1.25x). }
          </div>
        }

        <!-- Playing XI -->
        <div class="squad-section">
          <div class="section-hdr">
            <span class="athena-subheading">Playing XI</span>
            <span class="athena-badge athena-badge-surface">{{ xi().length }}/11</span>
          </div>
          <div class="player-list">
            @for (p of xi(); track p.id) {
              <div class="player-row athena-card-sm" [class.captain]="p.isCaptain" [class.vc]="p.isViceCaptain" [class.impact]="p.isImpactPlayer">
                <div class="player-info">
                  <div class="player-name-row">
                    <span class="player-nm">{{ p.player.name }}</span>
                    @if (p.isCaptain)      { <span class="role-pill captain-pill">C</span> }
                    @if (p.isViceCaptain)  { <span class="role-pill vc-pill">VC</span> }
                    @if (p.isImpactPlayer) { <span class="role-pill impact-pill">IP</span> }
                  </div>
                  <div class="player-meta">
                    <span class="meta-tag">{{ p.player.iplTeam }}</span>
                    <span class="meta-tag role-{{ p.player.role.toLowerCase() }}">{{ p.player.role }}</span>
                    @if (p.player.isOverseas) { <span class="meta-tag overseas">OS</span> }
                    <span class="meta-price">Rs. {{ p.purchasedPriceCr }}Cr</span>
                  </div>
                </div>
                <div class="player-actions">
                  @if (!p.isCaptain) {
                    <button class="assign-btn c-btn" (click)="assign(p, 'captain')" [disabled]="saving()">C</button>
                  }
                  @if (!p.isViceCaptain) {
                    <button class="assign-btn vc-btn" (click)="assign(p, 'vc')" [disabled]="saving()">VC</button>
                  }
                  @if (!p.isImpactPlayer) {
                    <button class="assign-btn ip-btn" (click)="assign(p, 'impact')" [disabled]="saving()">IP</button>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Reserves -->
        @if (reserves().length > 0) {
          <div class="squad-section">
            <div class="section-hdr">
              <span class="athena-subheading">Reserves</span>
              <span class="athena-badge athena-badge-surface">{{ reserves().length }}</span>
            </div>
            <div class="player-list">
              @for (p of reserves(); track p.id) {
                <div class="player-row athena-card-sm reserve-row">
                  <div class="player-info">
                    <span class="player-nm">{{ p.player.name }}</span>
                    <div class="player-meta">
                      <span class="meta-tag">{{ p.player.iplTeam }}</span>
                      <span class="meta-tag role-{{ p.player.role.toLowerCase() }}">{{ p.player.role }}</span>
                    </div>
                  </div>
                  <span class="reserve-badge">Reserve</span>
                </div>
              }
            </div>
          </div>
        }

        <!-- Points multiplier summary -->
        <div class="athena-card multiplier-card">
          <div class="athena-subheading" style="margin-bottom:12px">Points Multipliers</div>
          <div class="mult-grid">
            @for (p of xi(); track p.id) {
              <div class="mult-row" [class.highlighted]="p.isCaptain || p.isViceCaptain || p.isImpactPlayer">
                <span class="mult-name">{{ p.player.name }}</span>
                <span class="mult-val" [ngClass]="multClass(p)">{{ multLabel(p) }}</span>
              </div>
            }
          </div>
        </div>

        } <!-- end @if (activeTab() === 'squad') -->

        @if (activeTab() === 'auctioned') {
          <div class="auctioned-section">
            <div class="section-hdr">
              <span class="athena-subheading">Auctioned Players</span>
              <span class="athena-badge athena-badge-surface">{{ players().length }}</span>
            </div>

            @if (players().length === 0) {
              <div class="athena-card empty-state">
                <p>No players acquired yet.</p>
              </div>
            } @else {
              <div class="auctioned-list">
                @for (p of sortedByPrice(); track p.id; let i = $index) {
                  <div class="auctioned-row athena-card-sm">
                    <span class="auc-rank">{{ i + 1 }}</span>
                    <div class="auc-info">
                      <div class="auc-name-row">
                        <span class="auc-name">{{ p.player.name }}</span>
                        @if (p.isCaptain)      { <span class="role-pill captain-pill">C</span> }
                        @if (p.isViceCaptain)  { <span class="role-pill vc-pill">VC</span> }
                        @if (p.isImpactPlayer) { <span class="role-pill impact-pill">IP</span> }
                      </div>
                      <div class="auc-meta">
                        <span class="meta-tag">{{ p.player.iplTeam }}</span>
                        <span class="meta-tag role-{{ p.player.role.toLowerCase() }}">{{ p.player.role }}</span>
                        @if (p.player.isOverseas) { <span class="meta-tag overseas">OS</span> }
                        <span class="meta-tag" [class.reserve-tag]="p.slot === 'Reserve'">
                          {{ p.slot === 'Reserve' ? 'Reserve' : 'Playing XI' }}
                        </span>
                      </div>
                    </div>
                    <span class="auc-price">Rs. {{ p.purchasedPriceCr }}Cr</span>
                  </div>
                }
              </div>

              <div class="athena-card auctioned-total-card">
                <span class="atc-label">Total Spent</span>
                <span class="atc-val">Rs. {{ totalSpent() }}Cr</span>
              </div>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .loading-state { color:#666; padding:40px; text-align:center; font-family:var(--font-body); }
    .empty-state { text-align:center; padding:48px; display:flex; flex-direction:column; align-items:center; gap:10px; }
    .empty-icon-text { font-family:var(--font-timer); font-size:11px; font-weight:900; letter-spacing:0.15em; color:var(--gold); background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.2); border-radius:20px; padding:5px 14px; }
    .empty-sub { color:#555; font-size:13px; }

    .tb-tabs { display:flex; gap:4px; margin-bottom:16px; border-bottom:1px solid rgba(212,175,55,0.1); }
    .tb-tab { background:none; border:none; padding:10px 18px; font-family:var(--font-body); font-size:13px; font-weight:700; color:#666; cursor:pointer; border-bottom:2px solid transparent; transition:all 0.15s; }
    .tb-tab.active { color:var(--gold); border-bottom-color:var(--gold); }
    .tb-tab:hover:not(.active) { color:#aaa; }

    .auctioned-section { margin-top:4px; }
    .auctioned-list { display:flex; flex-direction:column; gap:8px; margin-top:10px; }
    .auctioned-row { display:flex; align-items:center; gap:12px; padding:12px 14px; }
    .auc-rank { font-family:var(--font-timer); font-size:13px; font-weight:900; color:var(--gold-dark); width:22px; flex-shrink:0; text-align:center; }
    .auc-info { flex:1; min-width:0; }
    .auc-name-row { display:flex; align-items:center; gap:8px; margin-bottom:4px; }
    .auc-name { font-size:14px; font-weight:700; color:#fff; font-family:var(--font-body); }
    .auc-meta { display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
    .reserve-tag { color:#777 !important; }
    .auc-price { font-family:var(--font-timer); font-size:16px; font-weight:900; color:var(--gold); flex-shrink:0; }
    .auctioned-total-card { margin-top:14px; display:flex; align-items:center; justify-content:space-between; padding:14px 18px; }
    .atc-label { font-size:13px; color:#888; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; }
    .atc-val { font-family:var(--font-timer); font-size:22px; font-weight:900; color:var(--gold); }

    .budget-card { margin-bottom:16px; }
    .budget-row { display:flex; gap:0; flex-wrap:wrap; }
    .budget-item { flex:1; min-width:100px; padding:12px 16px; border-right:1px solid rgba(212,175,55,0.1); }
    .budget-item:last-child { border-right:none; }
    .budget-label { display:block; font-size:11px; color:#888; font-family:var(--font-body); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; }
    .budget-team { font-size:16px; font-weight:800; font-family:var(--font-body); }
    .budget-val { font-family:var(--font-timer); font-size:22px; font-weight:900; color:var(--green-cricket); }
    .budget-val.low { color:var(--red-live); }

    .squad-section { margin-bottom:20px; }
    .section-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
    .player-list { display:flex; flex-direction:column; gap:8px; }

    .player-row {
      display:flex; align-items:center; gap:12px;
      padding:12px 14px;
      border-left:3px solid rgba(212,175,55,0.2);
      transition:all 0.15s;
    }
    .player-row.captain { border-left-color:var(--gold); background:rgba(212,175,55,0.06) !important; }
    .player-row.vc { border-left-color:var(--green-soft); background:rgba(45,156,219,0.05) !important; }
    .player-row.impact { border-left-color:var(--green-cricket); background:rgba(0,200,83,0.05) !important; }
    .reserve-row { border-left-color:#333; opacity:0.7; }

    .player-info { flex:1; min-width:0; }
    .player-name-row { display:flex; align-items:center; gap:8px; margin-bottom:4px; }
    .player-nm { font-size:14px; font-weight:700; color:#fff; font-family:var(--font-body); }
    .role-pill { font-size:10px; font-weight:900; padding:2px 7px; border-radius:8px; letter-spacing:0.06em; }
    .captain-pill { background:rgba(212,175,55,0.2); color:var(--gold); border:1px solid rgba(212,175,55,0.4); }
    .vc-pill { background:rgba(45,156,219,0.15); color:var(--green-soft); }
    .impact-pill { background:rgba(0,200,83,0.15); color:var(--green-cricket); }

    .player-meta { display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
    .meta-tag { font-size:11px; font-weight:600; padding:2px 8px; border-radius:10px; background:rgba(255,255,255,0.06); color:#aaa; }
    .meta-tag.role-batsman { color:var(--green-cricket); }
    .meta-tag.role-bowler  { color:var(--red-live); }
    .meta-tag.role-allrounder { color:var(--gold); }
    .meta-tag.role-wicketkeeper { color:var(--green-soft); }
    .meta-tag.overseas { color:var(--green-soft); }
    .meta-price { font-family:var(--font-timer); font-size:12px; color:#666; }

    .player-actions { display:flex; gap:5px; flex-shrink:0; }
    .assign-btn { font-size:10px; font-weight:900; padding:4px 9px; border-radius:8px; cursor:pointer; border:1px solid; letter-spacing:0.04em; transition:all 0.15s; }
    .assign-btn:disabled { opacity:0.4; cursor:not-allowed; }
    .c-btn  { background:rgba(212,175,55,0.1); color:var(--gold); border-color:rgba(212,175,55,0.3); }
    .vc-btn { background:rgba(45,156,219,0.1); color:var(--green-soft); border-color:rgba(45,156,219,0.3); }
    .ip-btn { background:rgba(0,200,83,0.1); color:var(--green-cricket); border-color:rgba(0,200,83,0.3); }
    .c-btn:hover:not(:disabled) { background:rgba(212,175,55,0.25); }
    .vc-btn:hover:not(:disabled) { background:rgba(45,156,219,0.2); }
    .ip-btn:hover:not(:disabled) { background:rgba(0,200,83,0.2); }

    .reserve-badge { font-size:10px; font-weight:700; color:#555; border:1px solid #333; border-radius:8px; padding:3px 8px; flex-shrink:0; }

    .multiplier-card { margin-top:16px; }
    .mult-grid { display:flex; flex-direction:column; gap:6px; }
    .mult-row { display:flex; justify-content:space-between; align-items:center; padding:6px 10px; border-radius:var(--radius-sm); }
    .mult-row.highlighted { background:rgba(212,175,55,0.06); }
    .mult-name { font-size:13px; color:#ccc; font-family:var(--font-body); }
    .mult-val { font-family:var(--font-timer); font-size:13px; font-weight:900; }
    .mult-captain { color:var(--gold); }
    .mult-vc      { color:var(--green-soft); }
    .mult-impact  { color:var(--green-cricket); }
    .mult-normal  { color:#555; }
  `]
})
export class TeamBuilderComponent implements OnInit {
  team    = signal<any>(null);
  players = signal<any[]>([]);
  loading = signal(true);
  activeTab = signal<'squad'|'auctioned'>('squad');
  saving  = signal(false);
  success = signal('');
  error   = signal('');

  xi       = computed(() => this.players().filter(p => p.slot === 'PlayingXI'));
  reserves = computed(() => this.players().filter(p => p.slot === 'Reserve'));
  hasCaptain = computed(() => this.players().some(p => p.isCaptain));
  hasVC      = computed(() => this.players().some(p => p.isViceCaptain));
  hasImpact  = computed(() => this.players().some(p => p.isImpactPlayer));
  sortedByPrice = computed(() => [...this.players()].sort((a, b) => (b.purchasedPriceCr ?? 0) - (a.purchasedPriceCr ?? 0)));
  totalSpent    = computed(() => this.players().reduce((sum, p) => sum + (p.purchasedPriceCr ?? 0), 0));

  constructor(
    private teamSvc: TeamService,
    private seasonSvc: SeasonService,
    public auth: AuthService
  ) {}

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
    if (!seasonId) { this.loading.set(false); return; }
    this.teamSvc.getMyTeam(seasonId).subscribe({
      next: t => {
        this.team.set(t);
        this.players.set(t.players ?? []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  assign(player: any, role: 'captain' | 'vc' | 'impact') {
    const teamId = this.team()?.id;
    if (!teamId) return;
    this.saving.set(true); this.error.set('');

    // Clear existing role first, then assign
    this.players.update(list => list.map(p => {
      if (role === 'captain')  return { ...p, isCaptain:      p.id === player.id };
      if (role === 'vc')       return { ...p, isViceCaptain:  p.id === player.id };
      if (role === 'impact')   return { ...p, isImpactPlayer: p.id === player.id };
      return p;
    }));

    const updatedPlayers = this.players();

    // Save to API
    this.teamSvc.updateTeam(teamId, { players: updatedPlayers }).subscribe({
      next: () => {
        this.success.set(`${player.player.name} assigned as ${role === 'captain' ? 'Captain' : role === 'vc' ? 'Vice-Captain' : 'Impact Player'}!`);
        this.saving.set(false);
        setTimeout(() => this.success.set(''), 3000);
      },
      error: e => {
        this.error.set(e?.error?.error ?? 'Failed to update.');
        this.saving.set(false);
        this.loadTeam(); // revert on error
      }
    });
  }

  multLabel(p: any) {
    if (p.isCaptain)      return '2.0x';
    if (p.isViceCaptain)  return '1.5x';
    if (p.isImpactPlayer) return '1.25x';
    return '1.0x';
  }
  multClass(p: any) {
    if (p.isCaptain)      return 'mult-captain';
    if (p.isViceCaptain)  return 'mult-vc';
    if (p.isImpactPlayer) return 'mult-impact';
    return 'mult-normal';
  }
}
