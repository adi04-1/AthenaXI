import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeasonService } from '../../core/services/season.service';
import { PlayerService } from '../../core/services/player.service';
import { read, utils } from 'xlsx';

@Component({
  selector: 'app-admin-players',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <div class="admin-page-header">
        <div>
          <h1 class="athena-page-title" style="margin-bottom:4px">🏏📤 Player Upload</h1>
          <p class="athena-label">Select season → download template → upload data</p>
        </div>
      </div>

      @if (error()) { <div class="athena-error animate-fade-in">{{ error() }}</div> }
      @if (success()) { <div class="athena-success animate-fade-in">{{ success() }}</div> }

      <!-- Step 1 — Select Season -->
      <div class="wizard-step athena-card" [class.done]="selectedSeason()">
        <div class="step-header">
          <div class="step-num" [class.complete]="selectedSeason()">
            {{ selectedSeason() ? '✅' : '1' }}
          </div>
          <div>
            <div class="step-title">Select Season</div>
            <div class="athena-label">Choose which season to upload players for</div>
          </div>
          @if (selectedSeason()) {
            <button class="athena-btn athena-btn-secondary" style="margin-left:auto;padding:6px 12px;font-size:12px" (click)="reset()">Change</button>
          }
        </div>

        @if (!selectedSeason()) {
          <div style="margin-top:16px">
            @if (loadingSeasons()) {
              <p class="athena-label">Loading seasons...</p>
            } @else {
              <div class="season-select-list">
                @for (s of seasons(); track s.id) {
                  <button class="season-select-btn" (click)="selectSeason(s)">
                    <div>
                      <span class="season-sel-name">{{ s.name }}</span>
                      <span class="athena-badge athena-badge-surface" style="margin-left:8px">{{ modeLabel(s.mode) }}</span>
                    </div>
                    <span class="athena-label">{{ s.status }}</span>
                  </button>
                }
              </div>
            }
          </div>
        } @else {
          <div class="selected-season-display">
            <span class="season-sel-name">{{ selectedSeason().name }}</span>
            <span class="athena-badge athena-badge-gold">{{ modeLabel(selectedSeason().mode) }}</span>
          </div>
        }
      </div>

      <!-- Step 2 — Download Template -->
      @if (selectedSeason()) {
        <div class="wizard-step athena-card animate-fade-in" [class.done]="uploadDone()">
          <div class="step-header">
            <div class="step-num" [class.complete]="uploadDone()">
              {{ uploadDone() ? '✅' : '2' }}
            </div>
            <div>
              <div class="step-title">Download Template</div>
              <div class="athena-label">Template matches your season mode</div>
            </div>
          </div>
          <div class="template-info">
            <div class="template-card" [ngClass]="templateStyle()">
              <span class="template-icon">{{ templateIcon() }}</span>
              <div>
                <div class="template-name">{{ templateName() }}</div>
                <div class="template-sheets">{{ templateSheets() }}</div>
              </div>
              <a [href]="templateUrl()" download class="athena-btn athena-btn-primary" style="margin-left:auto;text-decoration:none;padding:8px 16px;font-size:13px">
                ⬇️ Download
              </a>
            </div>
            <div class="template-rules">
              @for (rule of templateRules(); track rule) {
                <div class="rule-row">✦ {{ rule }}</div>
              }
            </div>
          </div>
        </div>

        <!-- Step 3 — Upload -->
        <div class="wizard-step athena-card animate-fade-in">
          <div class="step-header">
            <div class="step-num" [class.complete]="uploadDone()">
              {{ uploadDone() ? '✅' : '3' }}
            </div>
            <div>
              <div class="step-title">Upload File</div>
              <div class="athena-label">
                @if (uploadDone()) { Upload complete — locked for this season. }
                @else { Upload only once — re-upload requires starting over. }
              </div>
            </div>
          </div>

          @if (!uploadDone()) {
            <div class="upload-area" (click)="fileInput.click()" [class.has-file]="selectedFile()">
              <input #fileInput type="file" accept=".xlsx,.xls" style="display:none" (change)="onFile($event)" />
              @if (selectedFile()) {
                <span style="font-size:32px">✅</span>
                <span class="upload-filename">{{ selectedFile()!.name }}</span>
                <span class="athena-label">Click to change file</span>
              } @else {
                <span style="font-size:32px">📁</span>
                <span class="upload-filename">Click to select Excel file</span>
                <span class="athena-label">.xlsx or .xls accepted</span>
              }
            </div>

            @if (selectedFile()) {
              <button class="athena-btn athena-btn-primary" style="width:100%;margin-top:12px"
                (click)="processUpload()" [disabled]="saving()">
                {{ saving() ? '⚙️ Processing...' : '⚔️ Upload & Process' }}
              </button>
            }
          } @else {
            <div class="upload-result-display">
              <div class="result-stat">
                <span class="result-num" style="color:var(--green-cricket)">{{ uploadResult().imported }}</span>
                <span class="athena-label">Imported</span>
              </div>
              @if (uploadResult().skipped > 0) {
                <div class="result-stat">
                  <span class="result-num" style="color:var(--gold)">{{ uploadResult().skipped }}</span>
                  <span class="athena-label">Skipped</span>
                </div>
              }
              @if (uploadResult().errors?.length > 0) {
                <div class="result-errors">
                  @for (e of uploadResult().errors; track e) {
                    <div class="err-line">⚠️ {{ e }}</div>
                  }
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .admin-page { padding: 28px 24px; max-width: 720px; }
    .admin-page-header { margin-bottom: 24px; }
    .wizard-step { padding: 20px; margin-bottom: 16px; }
    .wizard-step.done { opacity: 0.8; }
    .step-header { display: flex; align-items: flex-start; gap: 14px; }
    .step-num { width: 32px; height: 32px; border-radius: 50%; background: rgba(212,175,55,0.15); border: 1px solid rgba(212,175,55,0.3); display: flex; align-items: center; justify-content: center; font-family: var(--font-timer); font-size: 14px; font-weight: 900; color: var(--gold); flex-shrink: 0; }
    .step-num.complete { background: rgba(0,200,83,0.15); border-color: rgba(0,200,83,0.3); color: var(--green-cricket); }
    .step-title { font-family: var(--font-body); font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 2px; }
    .season-select-list { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
    .season-select-btn { background: rgba(10,31,47,0.6); border: 1px solid rgba(212,175,55,0.1); border-radius: var(--radius-md); padding: 14px 16px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s; text-align: left; }
    .season-select-btn:hover { border-color: rgba(212,175,55,0.4); background: rgba(30,58,95,0.4); }
    .season-sel-name { font-family: var(--font-body); font-size: 15px; font-weight: 700; color: #fff; }
    .selected-season-display { display: flex; align-items: center; gap: 10px; margin-top: 14px; padding: 12px 14px; background: rgba(10,31,47,0.5); border-radius: var(--radius-md); }
    .template-info { margin-top: 16px; }
    .template-card { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: var(--radius-md); margin-bottom: 12px; }
    .template-card.fresh { background: rgba(0,200,83,0.08); border: 1px solid rgba(0,200,83,0.2); }
    .template-card.retention { background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2); }
    .template-card.direct { background: rgba(45,156,219,0.08); border: 1px solid rgba(45,156,219,0.2); }
    .template-icon { font-size: 28px; }
    .template-name { font-family: var(--font-body); font-size: 14px; font-weight: 700; color: #fff; }
    .template-sheets { font-size: 12px; color: #888; margin-top: 2px; }
    .template-rules { display: flex; flex-direction: column; gap: 6px; }
    .rule-row { font-family: var(--font-body); font-size: 12px; color: #888; }
    .upload-area { border: 2px dashed rgba(212,175,55,0.2); border-radius: var(--radius-lg); padding: 36px; text-align: center; cursor: pointer; margin-top: 16px; transition: all 0.15s; display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .upload-area:hover, .upload-area.has-file { border-color: var(--gold); background: rgba(212,175,55,0.04); }
    .upload-filename { font-family: var(--font-body); font-size: 14px; color: #ccc; font-weight: 600; }
    .upload-result-display { display: flex; gap: 24px; margin-top: 16px; flex-wrap: wrap; }
    .result-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .result-num { font-family: var(--font-timer); font-size: 32px; font-weight: 900; }
    .result-errors { margin-top: 12px; background: rgba(58,10,10,0.5); border-radius: var(--radius-md); padding: 12px; max-height: 120px; overflow-y: auto; }
    .err-line { font-size: 12px; color: #f87171; padding: 2px 0; }
  `]
})
export class PlayersAdminComponent implements OnInit {
  seasons        = signal<any[]>([]);
  selectedSeason = signal<any>(null);
  loadingSeasons = signal(true);
  saving         = signal(false);
  uploadDone     = signal(false);
  uploadResult   = signal<any>(null);
  selectedFile   = signal<File|null>(null);
  error          = signal('');
  success        = signal('');

  constructor(private seasonSvc: SeasonService, private playerSvc: PlayerService) {}

  ngOnInit() {
    this.seasonSvc.getAll().subscribe({
      next: d => { this.seasons.set(d.filter((s: any) => s.status !== 'Completed')); this.loadingSeasons.set(false); },
      error: () => this.loadingSeasons.set(false)
    });
  }

  selectSeason(s: any) { this.selectedSeason.set(s); }
  reset() { this.selectedSeason.set(null); this.uploadDone.set(false); this.selectedFile.set(null); this.uploadResult.set(null); }
  onFile(e: any) { const f = e.target.files?.[0]; if (f) { this.selectedFile.set(f); this.error.set(''); } }

  templateName() { const m = this.selectedSeason()?.mode; return m === 'FreshAuction' ? 'Fresh Auction Template' : m === 'AuctionWithRetentions' ? 'Retention Auction Template' : 'Direct Allocation Template'; }
  templateIcon() { return { FreshAuction:'🏏', AuctionWithRetentions:'🔄', DirectAllocation:'📋' }[this.selectedSeason()?.mode as string] ?? '📁'; }
  templateStyle() { return { FreshAuction:'fresh', AuctionWithRetentions:'retention', DirectAllocation:'direct' }[this.selectedSeason()?.mode as string] ?? ''; }
  templateSheets() { return { FreshAuction:'2 sheets: Player Pool + Auction Order', AuctionWithRetentions:'3 sheets: Player Pool + Auction Order + Retentions', DirectAllocation:'1 sheet: Final Roster' }[this.selectedSeason()?.mode as string] ?? ''; }
  templateUrl() { return `/assets/templates/template_${this.selectedSeason()?.mode?.toLowerCase()}.xlsx`; }
  templateRules() {
    const base = ['player_name and ipl_team are required', 'Role: Batsman / Bowler / AllRounder / WicketKeeper', 'is_overseas and is_uncapped: TRUE or FALSE'];
    if (this.selectedSeason()?.mode === 'AuctionWithRetentions') base.push('Retentions sheet: team_code, player_name, retention_cost_cr, slot');
    return base;
  }
  modeLabel(m: string) { return { FreshAuction:'🟢 Fresh', AuctionWithRetentions:'🟡 Retention', DirectAllocation:'🔵 Direct' }[m] ?? m; }

  processUpload() {
    const file = this.selectedFile(); const season = this.selectedSeason();
    if (!file || !season) return;
    this.saving.set(true); this.error.set('');
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const wb = read(e.target.result, { type: 'array' });
        if (season.mode === 'DirectAllocation') {
          const rows = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          this.playerSvc.uploadDirectAllocation(season.id, rows as any[]).subscribe({
            next: r => { this.uploadResult.set(r); this.uploadDone.set(true); this.saving.set(false); this.success.set('Rosters uploaded! Season is now InProgress.'); },
            error: e => { this.error.set(e?.error?.error ?? 'Upload failed.'); this.saving.set(false); }
          });
        } else {
          const poolSheet = wb.Sheets['Player Pool'] ?? wb.Sheets[wb.SheetNames[0]];
          const orderSheet = wb.Sheets['Auction Order'] ?? wb.Sheets[wb.SheetNames[1]];
          const poolRows = utils.sheet_to_json(poolSheet) as any[];
          const orderRows = utils.sheet_to_json(orderSheet) as any[];
          this.playerSvc.uploadPlayers(poolRows).subscribe({
            next: poolRes => {
              this.playerSvc.uploadAuctionOrder(season.id, orderRows).subscribe({
                next: orderRes => {
                  const result = { imported: poolRes.imported, skipped: poolRes.skipped, errors: [...(poolRes.errors||[]), ...(orderRes.errors||[])] };
                  if (season.mode === 'AuctionWithRetentions' && wb.SheetNames[2]) {
                    const retRows = utils.sheet_to_json(wb.Sheets[wb.SheetNames[2]]) as any[];
                    this.playerSvc.uploadPlayers(retRows).subscribe({ next: () => {}, error: () => {} });
                  }
                  this.uploadResult.set(result); this.uploadDone.set(true); this.saving.set(false);
                  this.success.set('Players and auction order uploaded successfully!');
                },
                error: e => { this.error.set(e?.error?.error ?? 'Auction order upload failed.'); this.saving.set(false); }
              });
            },
            error: e => { this.error.set(e?.error?.error ?? 'Player upload failed.'); this.saving.set(false); }
          });
        }
      } catch { this.error.set('Could not read file. Please use a valid .xlsx file.'); this.saving.set(false); }
    };
    reader.readAsArrayBuffer(file);
  }
}
