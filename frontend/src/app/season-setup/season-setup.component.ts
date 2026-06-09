import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeasonService } from '../core/services/season.service';
import { TeamService } from '../core/services/team.service';

@Component({
  selector: 'app-season-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="wizard-header">
        <h1 class="page-title"> Season Setup </h1>
          <h1 class="page-title">
            <!-- Season Setup -->
          </h1>
        <div class="steps">
          @for (s of steps; track s.num) {
            <div class="step" [class.active]="step() === s.num" [class.done]="step() > s.num">
              {{ step() > s.num ? '✅' : s.num }}
              <span class="step-label">{{ s.label }}</span>
            </div>
          }
        </div>
      </div>

      @if (error()) {
        <div class="error-banner">{{ error() }}</div>
      }
      @if (success()) {
        <div class="success-banner">{{ success() }}</div>
      }

      <!-- Step 1 — Season Details -->
      @if (step() === 1) {
        <div class="card">
          <h2 class="card-title">Step 1 — Season Details</h2>
          <div class="fields">
            <div class="field">
              <label>Season Name</label>
              <input [(ngModel)]="form.name" placeholder="e.g. IPL 2025" />
            </div>
            <div class="field">
              <label>Year</label>
              <input type="number" [(ngModel)]="form.year" placeholder="2025" />
            </div>
            <div class="field">
              <label>Auction Date</label>
              <input type="date" [(ngModel)]="form.auctionDate" />
            </div>
            <div class="field">
              <label>Season Start Date</label>
              <input type="date" [(ngModel)]="form.seasonStartDate" />
            </div>
            <div class="field">
              <label>Season End Date</label>
              <input type="date" [(ngModel)]="form.seasonEndDate" />
            </div>
          </div>
          <button class="btn-next" (click)="next()" [disabled]="!form.name || !form.year">
            Next →
          </button>
        </div>
      }

      <!-- Step 2 — Season Mode -->
      @if (step() === 2) {
        <div class="card">
          <h2 class="card-title">Step 2 — Choose Mode</h2>
          <div class="mode-grid">
            @for (m of modes; track m.value) {
              <div class="mode-card" [class.selected]="form.mode === m.value"
                (click)="form.mode = m.value">
                <span class="mode-icon">{{ m.icon }}</span>
                <span class="mode-name">{{ m.label }}</span>
                <span class="mode-desc">{{ m.desc }}</span>
              </div>
            }
          </div>
          <div class="btn-row">
            <button class="btn-back" (click)="step.set(1)">← Back</button>
            <button class="btn-next" (click)="createSeason()" [disabled]="!form.mode || saving()">
              {{ saving() ? 'Creating...' : 'Create Season →' }}
            </button>
          </div>
        </div>
      }

      <!-- Step 3 — Configure Rules -->
      @if (step() === 3) {
        <div class="card">
          <h2 class="card-title">Step 3 — Season Rules</h2>
          <p class="hint">My11Circle T20 defaults applied. Adjust if needed.</p>
          <div class="rules-grid">
            <div class="field">
              <label>Budget per team (Cr)</label>
              <input type="number" [(ngModel)]="config.budgetPerTeamCr" />
            </div>
            <div class="field">
              <label>Squad size</label>
              <input type="number" [(ngModel)]="config.minSquadSize" />
            </div>
            <div class="field">
              <label>Max overseas</label>
              <input type="number" [(ngModel)]="config.maxOverseasPlayers" />
            </div>
            <div class="field">
              <label>RTM slots per team</label>
              <input type="number" [(ngModel)]="config.rtmSlotsPerTeam" />
            </div>
            <div class="field">
              <label>Max retained players</label>
              <input type="number" [(ngModel)]="config.maxRetainedPlayersPerTeam" />
            </div>
            <div class="field">
              <label>Max swaps per transfer window</label>
              <input type="number" [(ngModel)]="config.maxSwapsPerWindow" />
            </div>
          </div>
          <div class="btn-row">
            <button class="btn-back" (click)="step.set(2)">← Back</button>
            <button class="btn-next" (click)="saveConfig()" [disabled]="saving()">
              {{ saving() ? 'Saving...' : 'Save & Continue →' }}
            </button>
          </div>
        </div>
      }

      <!-- Step 4 — Add Teams -->
      @if (step() === 4) {
        <div class="card">
          <h2 class="card-title">Step 4 — Add Teams</h2>
          <div class="fields">
            <div class="field">
              <label>Team Name</label>
              <input [(ngModel)]="teamForm.teamName" placeholder="Chennai Strikers" />
            </div>
            <div class="field">
              <label>Short Code (2–4 chars)</label>
              <input [(ngModel)]="teamForm.shortCode" placeholder="CS" maxlength="4" />
            </div>
            <div class="field">
              <label>Theme Colour</label>
              <input type="color" [(ngModel)]="teamForm.themeColour" />
            </div>
            <div class="field">
              <label>Owner Display Name</label>
              <input [(ngModel)]="teamForm.ownerDisplayName" placeholder="Karthik" />
            </div>
            <div class="field">
              <label>Login Username</label>
              <input [(ngModel)]="teamForm.username" placeholder="cs_team" />
            </div>
            <div class="field">
              <label>Login Password</label>
              <input type="password" [(ngModel)]="teamForm.password" placeholder="••••••••" />
            </div>
          </div>
          <button class="btn-add" (click)="addTeam()" [disabled]="saving()">
            {{ saving() ? 'Adding...' : '+ Add Team' }}
          </button>

          @if (addedTeams().length > 0) {
            <div class="teams-added">
              <h3 class="added-title">Teams Added ({{ addedTeams().length }})</h3>
              @for (t of addedTeams(); track t.id) {
                <div class="team-chip" [style.border-left-color]="t.themeColour">
                  <span class="chip-code" [style.color]="t.themeColour">{{ t.shortCode }}</span>
                  <span class="chip-name">{{ t.teamName }}</span>
                  <span class="chip-user">@{{ t.username }}</span>
                </div>
              }
            </div>
          }

          <div class="btn-row">
            <button class="btn-back" (click)="step.set(3)">← Back</button>
            <button class="btn-next" (click)="step.set(5)" [disabled]="addedTeams().length === 0">
              Done → Go to Auction Setup
            </button>
          </div>
        </div>
      }

      <!-- Step 5 — Done -->
      @if (step() === 5) {
        <div class="card done-card">
          <span class="done-icon">✅</span>
          <h2>Season Ready!</h2>
          <p>{{ form.name }} is set up with {{ addedTeams().length }} teams.</p>
          <p class="hint">Next: Upload player pool and auction order from Admin → Auction Control.</p>
          <button class="btn-next" (click)="router.navigate(['/admin'])">Go to Admin →</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .page { padding: 16px; max-width: 640px; margin: 0 auto; }
    .wizard-header { margin-bottom: 24px; }
    .page-title { font-size: 22px; font-weight: 800; color: #C9A84C; margin: 0 0 16px; }
    .steps { display: flex; gap: 8px; flex-wrap: wrap; }
    .step { background: #1a1a2e; border-radius: 20px; padding: 4px 12px; font-size: 12px; color: #666; display: flex; align-items: center; gap: 6px; }
    .step.active { background: #C9A84C22; color: #C9A84C; border: 1px solid #C9A84C44; }
    .step.done { background: #1e4d2b22; color: #4ade80; }
    .step-label { font-size: 11px; }
    .error-banner { background: #3a0a0a; border: 1px solid #C0392B; color: #ff6b6b; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; }
    .success-banner { background: #0a3a1a; border: 1px solid #4ade80; color: #4ade80; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; }
    .card { background: #1a1a2e; border: 1px solid #C9A84C22; border-radius: 16px; padding: 24px; }
    .card-title { font-size: 18px; font-weight: 800; color: #fff; margin: 0 0 20px; }
    .hint { color: #888; font-size: 13px; margin: 0 0 16px; }
    .fields, .rules-grid { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
    .rules-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    label { color: #aaa; font-size: 13px; font-weight: 600; }
    input { background: #0f0f1a; border: 1px solid #333; border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 14px; outline: none; }
    input:focus { border-color: #C9A84C; }
    input[type=color] { height: 40px; padding: 4px; }
    .mode-grid { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
    .mode-card { background: #0f0f1a; border: 2px solid #333; border-radius: 12px; padding: 16px; cursor: pointer; display: flex; flex-direction: column; gap: 4px; }
    .mode-card.selected { border-color: #C9A84C; background: #C9A84C11; }
    .mode-icon { font-size: 24px; }
    .mode-name { font-size: 15px; font-weight: 700; color: #fff; }
    .mode-desc { font-size: 13px; color: #888; }
    .btn-row { display: flex; gap: 10px; }
    .btn-next { flex: 1; background: #C9A84C; color: #0f0f1a; border: none; border-radius: 8px; padding: 12px; font-size: 15px; font-weight: 700; cursor: pointer; }
    .btn-next:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-back { background: transparent; border: 1px solid #444; color: #888; border-radius: 8px; padding: 12px 16px; cursor: pointer; }
    .btn-add { width: 100%; background: #1F4E79; color: #fff; border: none; border-radius: 8px; padding: 12px; font-size: 14px; font-weight: 700; cursor: pointer; margin-bottom: 16px; }
    .teams-added { margin-bottom: 16px; }
    .added-title { font-size: 14px; color: #aaa; font-weight: 700; margin: 0 0 10px; }
    .team-chip { background: #0f0f1a; border-left: 3px solid; border-radius: 0 8px 8px 0; padding: 10px 14px; margin-bottom: 8px; display: flex; gap: 12px; align-items: center; }
    .chip-code { font-size: 13px; font-weight: 800; }
    .chip-name { font-size: 14px; font-weight: 700; color: #fff; flex: 1; }
    .chip-user { font-size: 12px; color: #888; }
    .done-card { text-align: center; padding: 40px; }
    .done-icon { font-size: 64px; }
    .done-card h2 { color: #C9A84C; font-size: 24px; margin: 16px 0 8px; }
    .done-card p { color: #aaa; margin: 0 0 8px; }
  `]
})
export class SeasonSetupComponent implements OnInit {
  step    = signal(1);
  saving  = signal(false);
  error   = signal('');
  success = signal('');

  seasonId = signal<string | null>(null);
  addedTeams = signal<any[]>([]);

  steps = [
    { num: 1, label: 'Details' },
    { num: 2, label: 'Mode' },
    { num: 3, label: 'Rules' },
    { num: 4, label: 'Teams' },
    { num: 5, label: 'Done' },
  ];

  modes = [
    { value: 'FreshAuction', icon: '���', label: 'Fresh Auction', desc: 'All players auctioned. No retentions.' },
    { value: 'AuctionWithRetentions', icon: '���', label: 'Auction with Retentions', desc: 'Teams retain select players, rest auctioned.' },
    { value: 'DirectAllocation', icon: '���', label: 'Direct Allocation', desc: 'No auction. Upload final rosters directly.' },
  ];

  form = {
    name: '', year: new Date().getFullYear(),
    mode: '', auctionDate: '', seasonStartDate: '', seasonEndDate: ''
  };

  config = {
    budgetPerTeamCr: 120, minSquadSize: 12, maxSquadSize: 12,
    reservePlayers: 3, maxOverseasPlayers: 4, minUncappedPlayers: 1,
    minWicketKeepers: 1, rtmSlotsPerTeam: 1, defaultBidIncrementCr: 1,
    bidTimerSeconds: 10, maxSwapsPerWindow: 2,
    maxRetainedPlayersPerTeam: 3, maxOverseasRetained: 1,
    transferWindow1AfterMatch: 18, transferWindow2AfterMatch: 35, transferWindow3AfterMatch: 70,
    captainMultiplier: 2.0, viceCaptainMultiplier: 1.5, impactPlayerMultiplier: 1.25,
    playingXIBonusPoints: 4,
    ptRun: 1, ptFourBonus: 4, ptSixBonus: 6,
    pt25RunBonus: 4, pt50RunBonus: 8, pt75RunBonus: 12, pt100RunBonus: 16, ptDuck: -2,
    ptSrBelow50: -6, ptSr50To60: -4, ptSr60To70: -2, ptSr70To130: 0,
    ptSr130To150: 2, ptSr150To170: 4, ptSrAbove170: 6,
    ptDotBall: 1, ptWicket: 30, ptMaidenOver: 12, ptLbwBowledBonus: 8,
    pt3WicketBonus: 4, pt4WicketBonus: 8, pt5WicketBonus: 12,
    ptEconBelow5: 6, ptEcon5To6: 4, ptEcon6To7: 2, ptEcon7To10: 0,
    ptEcon10To11: -2, ptEcon11To12: -4, ptEconAbove12: -6,
    ptCatch: 8, pt3CatchBonus: 4, ptStumping: 12, ptRunOutDirect: 12, ptRunOutAssist: 6,
  };

  teamForm = {
    teamName: '', shortCode: '', themeColour: '#C9A84C',
    ownerDisplayName: '', username: '', password: ''
  };

  constructor( @Inject(SeasonService) private seasonSvc: SeasonService, @Inject(TeamService) private teamSvc: TeamService, public router: Router) {}

  ngOnInit() {}

  next() { this.error.set(''); this.step.update(s => s + 1); }

  createSeason() {
    this.saving.set(true); this.error.set('');
    this.seasonSvc.create({
      name: this.form.name, year: this.form.year, mode: this.form.mode,
      numberOfTeams: 10, allowGuests: true,
      auctionDate: this.form.auctionDate || null,
      seasonStartDate: this.form.seasonStartDate || null,
      seasonEndDate: this.form.seasonEndDate || null,
    }).subscribe({
      next: s => {
        this.seasonId.set(s.id);
        this.success.set(`Season "${s.name}" created!`);
        this.saving.set(false);
        this.step.set(3);
      },
      error: e => {
        this.error.set(e?.error?.error ?? 'Failed to create season.');
        this.saving.set(false);
      }
    });
  }

  saveConfig() {
    const id = this.seasonId();
    if (!id) return;
    this.saving.set(true);
    this.seasonSvc.updateConfig(id, this.config).subscribe({
      next: () => { this.saving.set(false); this.step.set(4); },
      error: () => { this.error.set('Failed to save config.'); this.saving.set(false); }
    });
  }

  addTeam() {
    const id = this.seasonId();
    if (!id) return;
    this.saving.set(true); this.error.set('');
    this.teamSvc.createTeam({ ...this.teamForm, seasonId: id }).subscribe({
      next: t => {
        this.addedTeams.update(l => [...l, { ...t, username: this.teamForm.username }]);
        this.teamForm = { teamName: '', shortCode: '', themeColour: '#C9A84C', ownerDisplayName: '', username: '', password: '' };
        this.success.set('Team added!');
        this.saving.set(false);
      },
      error: e => {
        this.error.set(e?.error?.error ?? 'Failed to add team.');
        this.saving.set(false);
      }
    });
  }
}
