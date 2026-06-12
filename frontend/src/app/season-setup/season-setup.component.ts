import { Component, OnInit, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeasonService } from '../core/services/season.service';
import { TeamService } from '../core/services/team.service';
import { AuctionService } from '../core/services/auction.service';
import { PlayerService } from '../core/services/player.service';
import { read, utils } from 'xlsx';

@Component({
  selector: 'app-season-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="wizard-header">
        <h1 class="page-title"> Season Setup</h1>
        <div class="steps">
          @for (s of steps(); track s.num) {
            <div class="step"
              [class.active]="step() === s.num"
              [class.done]="step() > s.num"
              [class.hidden]="!s.visible">
              {{ step() > s.num ? '✅' : s.num }}
              <span class="step-label">{{ s.label }}</span>
            </div>
          }
        </div>
      </div>

      @if (error()) { <div class="error-banner">{{ error() }}</div> }
      @if (success()) { <div class="success-banner">{{ success() }}</div> }

      <!-- STEP 1 — Season Details -->
      @if (step() === 1) {
        <div class="card">
          <h2 class="card-title">Step 1 — Season Details</h2>
          <div class="fields">
            <div class="field"><label>Season Name</label>
              <input [(ngModel)]="form.name" placeholder="IPL 2025" /></div>
            <div class="field"><label>Year</label>
              <input type="number" [(ngModel)]="form.year" /></div>
            <div class="field"><label>Auction Date</label>
              <input type="date" [(ngModel)]="form.auctionDate" /></div>
            <div class="field"><label>Season Start Date</label>
              <input type="date" [(ngModel)]="form.seasonStartDate" /></div>
            <div class="field"><label>Season End Date</label>
              <input type="date" [(ngModel)]="form.seasonEndDate" /></div>
          </div>
          <button class="btn-next" (click)="next()" [disabled]="!form.name || !form.year">Next →</button>
        </div>
      }

      <!-- STEP 2 — Mode -->
      @if (step() === 2) {
        <div class="card">
          <h2 class="card-title">Step 2 — Season Mode</h2>
          <div class="mode-grid">
            @for (m of modes; track m.value) {
              <div class="mode-card" [class.selected]="form.mode === m.value" (click)="selectMode(m.value)">
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

      <!-- STEP 3 — Rules -->
      @if (step() === 3) {
        <div class="card">
          <h2 class="card-title">Step 3 — Season Rules</h2>
          <p class="hint">My11Circle T20 defaults applied. Adjust if needed.</p>
          <div class="rules-grid">
            <div class="field"><label>Budget per team (Cr)</label>
              <input type="number" [(ngModel)]="config.budgetPerTeamCr" /></div>
            <div class="field"><label>Squad size</label>
              <input type="number" [(ngModel)]="config.minSquadSize" /></div>
            <div class="field"><label>Max overseas</label>
              <input type="number" [(ngModel)]="config.maxOverseasPlayers" /></div>
            <div class="field"><label>RTM slots per team</label>
              <input type="number" [(ngModel)]="config.rtmSlotsPerTeam" /></div>
            <div class="field"><label>Max retained players</label>
              <input type="number" [(ngModel)]="config.maxRetainedPlayersPerTeam" /></div>
            <div class="field"><label>Max swaps per window</label>
              <input type="number" [(ngModel)]="config.maxSwapsPerWindow" /></div>
          </div>
          <div class="btn-row">
            <button class="btn-back" (click)="step.set(2)">← Back</button>
            <button class="btn-next" (click)="saveConfig()" [disabled]="saving()">
              {{ saving() ? 'Saving...' : 'Save & Continue →' }}
            </button>
          </div>
        </div>
      }

      <!-- STEP 4 — Teams -->
      @if (step() === 4) {
        <div class="card">
          <h2 class="card-title">Step 4 — Register Teams</h2>
          <div class="fields">
            <div class="field"><label>Team Name</label>
              <input [(ngModel)]="teamForm.teamName" placeholder="Chennai Strikers" /></div>
            <div class="field"><label>Short Code</label>
              <input [(ngModel)]="teamForm.shortCode" placeholder="CS" maxlength="4" /></div>
            <div class="field"><label>Theme Colour</label>
              <input type="color" [(ngModel)]="teamForm.themeColour" /></div>
            <div class="field"><label>Owner Display Name</label>
              <input [(ngModel)]="teamForm.ownerDisplayName" placeholder="Karthik" /></div>
            <div class="field"><label>Login Username</label>
              <input [(ngModel)]="teamForm.username" placeholder="cs_team" /></div>
            <div class="field"><label>Login Password</label>
              <input type="password" [(ngModel)]="teamForm.password" /></div>
          </div>
          <button class="btn-add" (click)="addTeam()" [disabled]="saving()">
            {{ saving() ? 'Adding...' : '+ Add Team' }}
          </button>
          @if (addedTeams().length > 0) {
            <div class="teams-list">
              @for (t of addedTeams(); track t.id) {
                <div class="team-chip" [style.border-left-color]="t.themeColour">
                  <span class="chip-code" [style.color]="t.themeColour">{{ t.shortCode }}</span>
                  <span class="chip-name">{{ t.teamName }}</span>
                  <span class="chip-user">@{{ t.username }}</span>
                </div>
              }
            </div>
          }
          <div class="btn-row" style="margin-top:16px">
            <button class="btn-back" (click)="step.set(3)">← Back</button>
            <button class="btn-next" (click)="next()" [disabled]="addedTeams().length === 0">
              Continue → Upload
            </button>
          </div>
        </div>
      }

      <!-- STEP 5 — Upload (mode-dependent) -->
      @if (step() === 5) {
        <div class="card">
          <h2 class="card-title">Step 5 — Upload
            @if (form.mode === 'DirectAllocation') { Rosters }
            @else { Player Pool & Auction Order }
          </h2>

          @if (form.mode === 'DirectAllocation') {
            <p class="hint">Upload one Excel file with a sheet per team containing their final roster.</p>
          } @else {
            <p class="hint">
              Upload one Excel file with
              @if (form.mode === 'FreshAuction') { <strong>2 sheets:</strong> Player Pool + Auction Order. }
              @else { <strong>3 sheets:</strong> Player Pool + Auction Order + Retentions. }
              Re-upload anytime before auction starts to replace.
            </p>
          }

          <div class="upload-zone" (click)="fileInput.click()"
            [class.uploaded]="uploadFile()">
            <input #fileInput type="file" accept=".xlsx,.xls"
              style="display:none" (change)="onFileSelected($event)" />
            @if (uploadFile()) {
              <span class="upload-icon">✅</span>
              <span class="upload-name">{{ uploadFile()!.name }}</span>
              <span class="upload-change">Click to change</span>
            } @else {
              <span class="upload-icon">���</span>
              <span class="upload-name">Click to select Excel file</span>
            }
          </div>

          @if (uploadResult()) {
            <div class="upload-result">
              <p>✅ {{ uploadResult()!.imported }} players imported</p>
              @if (uploadResult()!.skipped > 0) {
                <p class="warn">⚠️ {{ uploadResult()!.skipped }} rows skipped</p>
              }
              @if (uploadResult()!.errors?.length > 0) {
                <div class="errors">
                  @for (e of uploadResult()!.errors; track e) {
                    <p class="err-row">{{ e }}</p>
                  }
                </div>
              }
            </div>
          }

          <div class="btn-row">
            <button class="btn-back" (click)="step.set(4)">← Back</button>
            <button class="btn-next" (click)="processUpload()" [disabled]="!uploadFile() || saving()">
              {{ saving() ? 'Processing...' : 'Upload & Continue →' }}
            </button>
          </div>
        </div>
      }

      <!-- STEP 6 — Send Invites (auction modes only) -->
      @if (step() === 6 && form.mode !== 'DirectAllocation') {
        <div class="card">
          <h2 class="card-title">Step 6 — Send Auction Invites</h2>
          <p class="hint">Send invites to all {{ addedTeams().length }} teams. They must accept to join the auction room.</p>

          <div class="invite-summary">
            @for (t of addedTeams(); track t.id) {
              <div class="invite-row" [style.border-left-color]="t.themeColour">
                <span class="chip-code" [style.color]="t.themeColour">{{ t.shortCode }}</span>
                <span class="chip-name">{{ t.teamName }}</span>
                <span class="invite-status" [class]="getInviteStatus(t.id)">
                  {{ getInviteStatusLabel(t.id) }}
                </span>
              </div>
            }
          </div>

          @if (invitesSent()) {
            <div class="lobby-stats">
              <span class="stat accepted">✅ Accepted: {{ acceptedCount() }}</span>
              <span class="stat pending">⏳ Pending: {{ pendingCount() }}</span>
              <span class="stat declined">❌ Declined: {{ declinedCount() }}</span>
            </div>
          }

          <div class="btn-row">
            <button class="btn-back" (click)="step.set(5)">← Back</button>
            @if (!invitesSent()) {
              <button class="btn-next" (click)="sendInvites()" [disabled]="saving()">
                {{ saving() ? 'Sending...' : '��� Send Invites' }}
              </button>
            } @else {
              <button class="btn-next" (click)="refreshLobby()" [disabled]="saving()">
                ��� Refresh Status
              </button>
              <button class="btn-start" (click)="startAuction()"
                [disabled]="acceptedCount() < 1 || saving()">
                ▶️ Start Auction ({{ acceptedCount() }} ready)
              </button>
            }
          </div>
        </div>
      }

      <!-- STEP 6 — Direct Allocation done -->
      @if (step() === 6 && form.mode === 'DirectAllocation') {
        <div class="card done-card">
          <span class="done-icon">���️</span>
          <h2>Season Live!</h2>
          <p>{{ form.name }} is now InProgress with {{ addedTeams().length }} teams.</p>
          <button class="btn-next" (click)="router.navigate(['/leaderboard'])">View Leaderboard →</button>
        </div>
      }

      <!-- STEP 7 — Auction started -->
      @if (step() === 7) {
        <div class="card done-card">
          <span class="done-icon">���</span>
          <h2>Auction Started!</h2>
          <p>{{ acceptedCount() }} teams are in the room.</p>
          <button class="btn-next" (click)="router.navigate(['/auction'])">Go to Auction Room →</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .page { padding: 16px; max-width: 640px; margin: 0 auto; }
    .wizard-header { margin-bottom: 24px; }
    .page-title { font-size: 22px; font-weight: 800; color: #C9A84C; margin: 0 0 16px; }
    .steps { display: flex; gap: 6px; flex-wrap: wrap; }
    .step { background: #1a1a2e; border-radius: 20px; padding: 4px 10px; font-size: 11px; color: #666; display: flex; align-items: center; gap: 4px; }
    .step.active { background: #C9A84C22; color: #C9A84C; border: 1px solid #C9A84C44; }
    .step.done { background: #1e4d2b22; color: #4ade80; }
    .step.hidden { display: none; }
    .error-banner { background: #3a0a0a; border: 1px solid #C0392B; color: #ff6b6b; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 13px; }
    .success-banner { background: #0a3a1a; border: 1px solid #4ade80; color: #4ade80; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 13px; }
    .card { background: #1a1a2e; border: 1px solid #C9A84C22; border-radius: 16px; padding: 24px; }
    .card-title { font-size: 18px; font-weight: 800; color: #fff; margin: 0 0 16px; }
    .hint { color: #888; font-size: 13px; margin: 0 0 16px; }
    .fields { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
    .rules-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    label { color: #aaa; font-size: 13px; font-weight: 600; }
    input { background: #0f0f1a; border: 1px solid #333; border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 14px; outline: none; }
    input:focus { border-color: #C9A84C; }
    input[type=color] { height: 40px; padding: 4px; }
    .mode-grid { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
    .mode-card { background: #0f0f1a; border: 2px solid #333; border-radius: 12px; padding: 16px; cursor: pointer; }
    .mode-card.selected { border-color: #C9A84C; background: #C9A84C11; }
    .mode-icon { font-size: 24px; display: block; margin-bottom: 4px; }
    .mode-name { font-size: 15px; font-weight: 700; color: #fff; display: block; }
    .mode-desc { font-size: 13px; color: #888; display: block; }
    .btn-row { display: flex; gap: 10px; }
    .btn-next { flex: 1; background: #C9A84C; color: #0f0f1a; border: none; border-radius: 8px; padding: 12px; font-size: 15px; font-weight: 700; cursor: pointer; }
    .btn-next:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-back { background: transparent; border: 1px solid #444; color: #888; border-radius: 8px; padding: 12px 16px; cursor: pointer; }
    .btn-add { width: 100%; background: #1F4E79; color: #fff; border: none; border-radius: 8px; padding: 12px; font-size: 14px; font-weight: 700; cursor: pointer; margin-bottom: 16px; }
    .btn-start { flex: 1; background: #1e7b45; color: #fff; border: none; border-radius: 8px; padding: 12px; font-size: 14px; font-weight: 700; cursor: pointer; }
    .btn-start:disabled { opacity: 0.5; cursor: not-allowed; }
    .teams-list { margin-bottom: 8px; }
    .team-chip, .invite-row { background: #0f0f1a; border-left: 3px solid; border-radius: 0 8px 8px 0; padding: 10px 14px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; }
    .chip-code { font-size: 13px; font-weight: 800; }
    .chip-name { font-size: 14px; font-weight: 700; color: #fff; flex: 1; }
    .chip-user { font-size: 12px; color: #888; }
    .invite-status { font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 10px; }
    .invite-status.accepted { background: #1e4d2b; color: #4ade80; }
    .invite-status.pending { background: #2d2d00; color: #facc15; }
    .invite-status.declined { background: #3a0a0a; color: #f87171; }
    .lobby-stats { display: flex; gap: 12px; margin: 12px 0; flex-wrap: wrap; }
    .stat { font-size: 13px; font-weight: 700; padding: 4px 10px; border-radius: 10px; background: #0f0f1a; }
    .upload-zone { border: 2px dashed #333; border-radius: 12px; padding: 32px; text-align: center; cursor: pointer; margin-bottom: 16px; transition: border-color 0.2s; }
    .upload-zone:hover, .upload-zone.uploaded { border-color: #C9A84C; }
    .upload-icon { font-size: 32px; display: block; margin-bottom: 8px; }
    .upload-name { font-size: 14px; color: #ccc; display: block; }
    .upload-change { font-size: 12px; color: #888; display: block; margin-top: 4px; }
    .upload-result { background: #0f0f1a; border-radius: 10px; padding: 14px; margin-bottom: 16px; }
    .upload-result p { margin: 0 0 4px; font-size: 13px; color: #4ade80; }
    .warn { color: #facc15 !important; }
    .errors { margin-top: 8px; max-height: 120px; overflow-y: auto; }
    .err-row { font-size: 12px; color: #f87171; margin: 2px 0; }
    .done-card { text-align: center; padding: 40px; }
    .done-icon { font-size: 64px; display: block; }
    .done-card h2 { color: #C9A84C; font-size: 24px; margin: 16px 0 8px; }
    .done-card p { color: #aaa; margin: 0 0 8px; }
  `]
})
export class SeasonSetupComponent implements OnInit {
  step    = signal(1);
  saving  = signal(false);
  error   = signal('');
  success = signal('');
  seasonId    = signal<string | null>(null);
  sessionId   = signal<string | null>(null);
  addedTeams  = signal<any[]>([]);
  uploadFile  = signal<File | null>(null);
  uploadResult = signal<any | null>(null);
  invitesSent  = signal(false);
  lobbyData    = signal<any | null>(null);

  acceptedCount = () => this.lobbyData()?.acceptedCount ?? 0;
  pendingCount  = () => this.lobbyData()?.pendingCount ?? 0;
  declinedCount = () => this.lobbyData()?.declinedCount ?? 0;

  steps = signal([
    { num: 1, label: 'Details',  visible: true },
    { num: 2, label: 'Mode',     visible: true },
    { num: 3, label: 'Rules',    visible: true },
    { num: 4, label: 'Teams',    visible: true },
    { num: 5, label: 'Upload',   visible: true },
    { num: 6, label: 'Invites',  visible: true },
    { num: 7, label: 'Done',     visible: true },
  ]);

  modes = [
    { value: 'FreshAuction',          icon: '🆕', label: 'Fresh Auction',          desc: 'All players auctioned. No retentions.' },
    { value: 'AuctionWithRetentions', icon: '🔐', label: 'Auction with Retentions', desc: '3-sheet upload: players + order + retentions.' },
    { value: 'DirectAllocation',      icon: '📝', label: 'Direct Allocation',       desc: 'No auction. Upload final rosters.' },
  ];

  form = { name: '', year: new Date().getFullYear(), mode: '', auctionDate: '', seasonStartDate: '', seasonEndDate: '' };

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

  teamForm = { teamName: '', shortCode: '', themeColour: '#C9A84C', ownerDisplayName: '', username: '', password: '' };

  constructor(
    @Inject(SeasonService) private seasonSvc: SeasonService,
    @Inject(TeamService) private teamSvc: TeamService,
    @Inject(AuctionService) private auctionSvc: AuctionService,
    @Inject(PlayerService) private playerSvc: PlayerService,
    public router: Router
  ) {}

  ngOnInit() {}

  selectMode(mode: string) {
    this.form.mode = mode;
    // Hide invite step for Direct Allocation
    this.steps.update(s => s.map(step =>
      step.num === 6 ? { ...step, label: mode === 'DirectAllocation' ? 'Done' : 'Invites' } : step
    ));
  }

  next() { this.error.set(''); this.success.set(''); this.step.update(s => s + 1); }

  createSeason() {
    this.saving.set(true); this.error.set('');
    this.seasonSvc.create({
      name: this.form.name, year: this.form.year, mode: this.form.mode,
      numberOfTeams: 10, allowGuests: true,
      auctionDate: this.form.auctionDate || null,
      seasonStartDate: this.form.seasonStartDate || null,
      seasonEndDate: this.form.seasonEndDate || null,
    }).subscribe({
      next: s => { this.seasonId.set(s.id); this.saving.set(false); this.step.set(3); },
      error: e => { this.error.set(e?.error?.error ?? 'Failed to create season.'); this.saving.set(false); }
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
      error: e => { this.error.set(e?.error?.error ?? 'Failed to add team.'); this.saving.set(false); }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) { this.uploadFile.set(file); this.uploadResult.set(null); }
  }

  processUpload() {
    const file = this.uploadFile();
    const seasonId = this.seasonId();
    if (!file || !seasonId) return;

    this.saving.set(true); this.error.set('');
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const wb = read(e.target.result, { type: 'array' });

        if (this.form.mode === 'DirectAllocation') {
          // Parse roster sheet
          const sheet = wb.Sheets[wb.SheetNames[0]];
          const rows: any[] = utils.sheet_to_json(sheet);
          this.playerSvc.uploadDirectAllocation(seasonId, rows).subscribe({
            next: r => { this.uploadResult.set(r); this.saving.set(false); this.step.set(6); },
            error: e => { this.error.set(e?.error?.error ?? 'Upload failed.'); this.saving.set(false); }
          });
        } else {
          // Sheet 1: Player Pool
          const poolSheet = wb.Sheets['Player Pool'] ?? wb.Sheets[wb.SheetNames[0]];
          const poolRows: any[] = utils.sheet_to_json(poolSheet);

          // Sheet 2: Auction Order
          const orderSheet = wb.Sheets['Auction Order'] ?? wb.Sheets[wb.SheetNames[1]];
          const orderRows: any[] = utils.sheet_to_json(orderSheet);

          // Upload players first, then auction order
          this.playerSvc.uploadPlayers(this.normalizePoolRows(poolRows)).subscribe({
            next: poolResult => {
              this.playerSvc.uploadAuctionOrder(seasonId, this.normalizeOrderRows(orderRows)).subscribe({
                next: orderResult => {
                  this.sessionId.set(orderResult.auctionSessionId);
                  this.uploadResult.set({ ...poolResult, auctionSessionId: orderResult.auctionSessionId });
                  this.saving.set(false);

                  // Handle retentions if present
                  if (this.form.mode === 'AuctionWithRetentions' && wb.SheetNames.length >= 3) {
                    const retSheet = wb.Sheets['Retentions'] ?? wb.Sheets[wb.SheetNames[2]];
                    const retRows: any[] = utils.sheet_to_json(retSheet);
                    this.teamSvc.uploadRetentions({ seasonId, retentions: this.normalizeRetentionRows(retRows) }).subscribe({
                      next: () => this.step.set(6),
                      error: () => this.step.set(6) // non-blocking
                    });
                  } else {
                    this.step.set(6);
                  }
                },
                error: e => { this.error.set(e?.error?.error ?? 'Auction order upload failed.'); this.saving.set(false); }
              });
            },
            error: e => { this.error.set(e?.error?.error ?? 'Player upload failed.'); this.saving.set(false); }
          });
        }
      } catch {
        this.error.set('Failed to read Excel file. Make sure it is a valid .xlsx file.');
        this.saving.set(false);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  sendInvites() {
    const sid = this.sessionId();
    if (!sid) return;
    this.saving.set(true);
    this.auctionSvc.sendInvites(sid).subscribe({
      next: () => { this.invitesSent.set(true); this.saving.set(false); this.refreshLobby(); },
      error: () => { this.error.set('Failed to send invites.'); this.saving.set(false); }
    });
  }

  refreshLobby() {
    const sid = this.sessionId();
    if (!sid) return;
    this.auctionSvc.getLobby(sid).subscribe({
      next: data => this.lobbyData.set(data),
      error: () => {}
    });
  }

  startAuction() {
    const sid = this.sessionId();
    if (!sid) return;
    this.saving.set(true);
    this.auctionSvc.startAuction(sid).subscribe({
      next: () => { this.saving.set(false); this.step.set(7); },
      error: e => { this.error.set(e?.error?.error ?? 'Failed to start auction.'); this.saving.set(false); }
    });
  }

  getInviteStatus(teamId: string): string {
    if (!this.lobbyData()) return 'pending';
    const invite = this.lobbyData()?.invites?.find((i: any) => i.fantasyTeamId === teamId);
    return invite?.status?.toLowerCase() ?? 'pending';
  }

  getInviteStatusLabel(teamId: string): string {
    const s = this.getInviteStatus(teamId);
    return s === 'accepted' ? '✅ Accepted' : s === 'declined' ? '❌ Declined' : '⏳ Pending';
  }

  // Normalize Excel column names to API field names
  private normalizePoolRows(rows: any[]) {
    return rows.filter(r => r['player_name ★'] || r['player_name']).map(r => ({
      playerName:   r['player_name ★'] ?? r['player_name'],
      iplTeam:      r['ipl_team ★']    ?? r['ipl_team'],
      role:         r['role ★']        ?? r['role'],
      isOverseas:   (r['is_overseas ★'] ?? r['is_overseas']) === 'TRUE',
      isUncapped:   (r['is_uncapped ★'] ?? r['is_uncapped']) === 'TRUE',
      basePriceCr:  parseFloat(r['base_price_cr ★'] ?? r['base_price_cr'] ?? 0),
      nationality:  r['nationality'] ?? null,
      battingStyle: r['batting_style'] ?? null,
      bowlingStyle: r['bowling_style'] ?? null,
      notes:        r['notes'] ?? null,
    }));
  }

  private normalizeOrderRows(rows: any[]) {
    return rows.filter(r => r['player_name ★'] || r['player_name']).map(r => ({
      auctionOrder:    parseInt(r['auction_order ★'] ?? r['auction_order'] ?? 0),
      playerName:      r['player_name ★']      ?? r['player_name'],
      auctionSet:      r['auction_set ★']      ?? r['auction_set'],
      basePriceCr:     parseFloat(r['base_price_cr ★'] ?? r['base_price_cr'] ?? 0),
      bidIncrementCr:  parseFloat(r['bid_increment_cr ★'] ?? r['bid_increment_cr'] ?? 1),
      rtmTeam:         r['rtm_team'] ?? null,
      setDisplayName:  r['set_display_name'] ?? null,
      notes:           r['notes'] ?? null,
    }));
  }

  private normalizeRetentionRows(rows: any[]) {
    return rows.filter(r => r['team_code'] || r['player_name']).map(r => ({
      teamShortCode:   r['team_code'],
      playerName:      r['player_name'],
      retentionCostCr: parseFloat(r['retention_cost_cr'] ?? 0),
      slot:            r['slot'] ?? 'PlayingXI',
    }));
  }
}
