import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeasonService } from '../../core/services/season.service';
import { TeamService } from '../../core/services/team.service';

@Component({
  selector: 'app-admin-seasons',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="admin-page">
      <div class="admin-page-header">
        <div>
          <h1 class="athena-page-title" style="margin-bottom:4px">🗓️ Seasons</h1>
          <p class="athena-label">Create, configure and manage all seasons</p>
        </div>
        <button class="athena-btn athena-btn-primary" (click)="showCreate.set(!showCreate())">
          {{ showCreate() ? 'âœ• Cancel' : '+ New Season' }}
        </button>
      </div>

      @if (error()) { <div class="athena-error animate-fade-in">{{ error() }}</div> }
      @if (success()) { <div class="athena-success animate-fade-in">{{ success() }}</div> }

      @if (showCreate()) {
        <div class="athena-card create-panel animate-fade-in">
          <h2 class="panel-title">New Season</h2>
          <div class="athena-grid-2">
            <div class="athena-field"><label class="athena-field-label">Name</label>
              <input class="athena-input" [(ngModel)]="form.name" placeholder="IPL 2026" /></div>
            <div class="athena-field"><label class="athena-field-label">Year</label>
              <input class="athena-input" type="number" [(ngModel)]="form.year" /></div>
            <div class="athena-field"><label class="athena-field-label">Mode</label>
              <select class="athena-input" [(ngModel)]="form.mode">
                <option value="">Select mode...</option>
                <option value="FreshAuction">ðŸ†• Fresh Auction</option>
                <option value="AuctionWithRetentions">ðŸŸ¡ Auction with Retentions</option>
                <option value="DirectAllocation">ðŸ”µ Direct Allocation</option>
              </select></div>
            <div class="athena-field"><label class="athena-field-label">Auction Date</label>
              <input class="athena-input" type="date" [(ngModel)]="form.auctionDate" /></div>
            <div class="athena-field"><label class="athena-field-label">Season Start</label>
              <input class="athena-input" type="date" [(ngModel)]="form.seasonStartDate" /></div>
            <div class="athena-field"><label class="athena-field-label">Season End</label>
              <input class="athena-input" type="date" [(ngModel)]="form.seasonEndDate" /></div>
          </div>
          <div class="panel-actions">
            <button class="athena-btn athena-btn-secondary" (click)="showCreate.set(false)">Cancel</button>
            <button class="athena-btn athena-btn-primary" (click)="createSeason()" [disabled]="saving() || !form.name || !form.mode">
              {{ saving() ? 'Creating...' : 'Create Season' }}
            </button>
          </div>
        </div>
      }

      @if (loading()) {
        <div class="loading-state">Loading seasons...</div>
      } @else if (seasons().length === 0 && !showCreate()) {
        <div class="empty-state athena-card">
          <span style="font-size:40px">📅</span>
          <p>No seasons yet. Create your first above.</p>
        </div>
      } @else {
        <div class="seasons-list">
          @for (s of seasons(); track s.id) {
            <div class="season-card athena-card">
              <div class="season-row" (click)="toggle(s.id)">
                <div class="season-main">
                  <div class="season-name-row">
                    <span class="season-name">{{ s.name }}</span>
                    <span class="athena-badge" [ngClass]="statusBadge(s.status)">{{ s.status }}</span>
                    <span class="athena-badge athena-badge-surface">{{ modeLabel(s.mode) }}</span>
                  </div>
                  <div class="season-meta">
                    @if (s.auctionDate) { <span>👨‍⚖🏷️ Auction: {{ s.auctionDate | date:'mediumDate' }}</span> }
                    @if (s.seasonStartDate) { <span>📅 Starts: {{ s.seasonStartDate | date:'mediumDate' }}</span> }
                  </div>
                </div>
                <div class="season-actions" (click)="$event.stopPropagation()">
                  <button class="icon-btn" (click)="startEdit(s)" title="Edit">✏️</button>
                  <button class="icon-btn" (click)="deleteSeason(s.id)" title="Delete">🗑️</button>
                  <span class="expand-icon">{{ expandedId() === s.id ? '▲' : '▼' }}</span>
                </div>
              </div>

              @if (editingId() === s.id) {
                <div class="edit-panel animate-fade-in">
                  <div class="athena-grid-2">
                    <div class="athena-field"><label class="athena-field-label">Status</label>
                      <select class="athena-input" [(ngModel)]="editForm.status">
                        <option value="Upcoming">Upcoming</option>
                        <option value="ReadyForAuction">Ready For Auction</option>
                        <option value="AuctionPhase">Auction Phase</option>
                        <option value="TeamSelectionPhase">Team Selection</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select></div>
                    <div class="athena-field"><label class="athena-field-label">Auction Date</label>
                      <input class="athena-input" type="date" [(ngModel)]="editForm.auctionDate" /></div>
                    <div class="athena-field"><label class="athena-field-label">Season Start</label>
                      <input class="athena-input" type="date" [(ngModel)]="editForm.seasonStartDate" /></div>
                    <div class="athena-field"><label class="athena-field-label">Season End</label>
                      <input class="athena-input" type="date" [(ngModel)]="editForm.seasonEndDate" /></div>
                  </div>
                  <div class="panel-actions">
                    <button class="athena-btn athena-btn-secondary" (click)="editingId.set(null)">Cancel</button>
                    <button class="athena-btn athena-btn-primary" (click)="saveEdit(s.id)" [disabled]="saving()">
                      {{ saving() ? 'Saving...' : 'Save' }}
                    </button>
                  </div>
                </div>
              }

              @if (expandedId() === s.id && editingId() !== s.id) {
                <div class="season-detail animate-fade-in">
                  <div class="detail-tabs">
                    <button class="detail-tab" [class.active]="activeTab() === 'teams'" (click)="activeTab.set('teams'); loadTeams(s.id)">👥Teams ({{ seasonTeams().length }})</button>
                    <button class="detail-tab" [class.active]="activeTab() === 'config'" (click)="loadConfig(s.id)">⚙️ Config</button>
                  </div>

                  @if (activeTab() === 'teams') {
                    <div class="teams-section">
                      <div class="add-team-form">
                        <h3 class="athena-subheading" style="margin-bottom:12px">Add Team</h3>
                        @if (previousTeams().length > 0) {
                          <div style="margin-bottom:12px">
                            <span class="athena-label" style="display:block;margin-bottom:8px">Clone from previous season:</span>
                            <div style="display:flex;gap:8px;flex-wrap:wrap">
                              @for (pt of previousTeams(); track pt.id) {
                                <button class="clone-chip" [style.border-color]="pt.themeColour" (click)="cloneTeam(pt)">
                                  <span [style.color]="pt.themeColour">{{ pt.shortCode }}</span> {{ pt.teamName }}
                                </button>
                              }
                            </div>
                          </div>
                        }
                        <div class="athena-grid-2">
                          <div class="athena-field"><label class="athena-field-label">Team Name</label>
                            <input class="athena-input" [(ngModel)]="teamForm.teamName" placeholder="Chennai Strikers" /></div>
                          <div class="athena-field"><label class="athena-field-label">Short Code</label>
                            <input class="athena-input" [(ngModel)]="teamForm.shortCode" placeholder="CS" maxlength="4" /></div>
                          <div class="athena-field"><label class="athena-field-label">Colour</label>
                            <input class="athena-input" type="color" [(ngModel)]="teamForm.themeColour" style="height:42px;padding:4px" /></div>
                          <div class="athena-field"><label class="athena-field-label">Owner Name</label>
                            <input class="athena-input" [(ngModel)]="teamForm.ownerDisplayName" placeholder="Karthik" /></div>
                          <div class="athena-field"><label class="athena-field-label">Username</label>
                            <input class="athena-input" [(ngModel)]="teamForm.username" placeholder="cs_team" /></div>
                          <div class="athena-field"><label class="athena-field-label">Password</label>
                            <input class="athena-input" type="password" [(ngModel)]="teamForm.password" /></div>
                        </div>
                        <button class="athena-btn athena-btn-primary" style="margin-top:12px;width:100%" (click)="addTeam(s.id)" [disabled]="saving()">
                          + Add Team
                        </button>
                      </div>
                      @if (seasonTeams().length > 0) {
                        <div style="display:flex;flex-direction:column;gap:8px;margin-top:4px">
                          @for (t of seasonTeams(); track t.id) {
                            <div class="team-row-inner" [style.border-left-color]="t.themeColour">
                              <span style="font-size:13px;font-weight:800;min-width:32px" [style.color]="t.themeColour">{{ t.shortCode }}</span>
                              <div style="flex:1">
                                <div style="font-size:14px;font-weight:700;color:#fff">{{ t.teamName }}</div>
                                <div style="font-size:11px;color:#666">{{ '@' + t.username }}</div>
                              </div>
                              <span style="font-family:var(--font-timer);font-size:14px;color:var(--gold);font-weight:700">💰{{ t.budgetRemainingCr }}Cr</span>
                              <button class="cred-toggle-btn" (click)="toggleCredentials(t.id)">
                                {{ credentialsOpenId() === t.id ? 'Hide' : 'Password' }}
                              </button>
                            </div>
                            @if (credentialsOpenId() === t.id) {
                              <div class="cred-panel animate-fade-in">
                                @if (loadingCreds()) {
                                  <span class="athena-label">Loading...</span>
                                } @else {
                                  <div class="cred-row">
                                    <span class="cred-label">Current password</span>
                                    <span class="cred-value">
                                      {{ showPlain() ? (currentCreds()?.plainPassword ?? 'â€” not recorded â€”') : 'â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢' }}
                                    </span>
                                    <button class="cred-eye-btn" (click)="showPlain.set(!showPlain())">
                                      {{ showPlain() ? 'Hide' : 'Reveal' }}
                                    </button>
                                  </div>
                                  <div class="cred-row">
                                    <input class="athena-input cred-reset-input" type="text"
                                      [(ngModel)]="resetPasswordValue" placeholder="Set new password..." />
                                    <button class="cred-reset-btn" (click)="resetTeamPassword(t.id)"
                                      [disabled]="!resetPasswordValue || saving()">
                                      Reset
                                    </button>
                                  </div>
                                }
                              </div>
                            }
                          }
                        </div>
                      } @else {
                        <p style="color:#555;font-size:13px;margin-top:8px">No teams added yet.</p>
                      }
                    </div>
                  }

                  @if (activeTab() === 'config') {
                    <div class="config-section">
                      @if (loadingConfig()) {
                        <p class="athena-label">Loading...</p>
                      } @else if (seasonConfig()) {
                        <div class="config-grid">
                          @for (item of configItems(); track item.label) {
                            <div class="config-item">
                              <span class="athena-label">{{ item.label }}</span>
                              <span style="font-family:var(--font-timer);font-size:18px;color:var(--gold);font-weight:700">{{ item.value }}</span>
                            </div>
                          }
                        </div>
                      }
                    </div>
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
    .admin-page { padding: 28px 24px; max-width: 900px; }
    .admin-page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
    .loading-state, .empty-state { color: #666; padding: 40px; text-align: center; font-family: var(--font-body); }
    .empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .create-panel { margin-bottom: 24px; padding: 24px; }
    .panel-title { font-family: var(--font-body); font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 20px; }
    .panel-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
    .seasons-list { display: flex; flex-direction: column; gap: 12px; }
    .season-card { padding: 0; overflow: hidden; }
    .season-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 20px; cursor: pointer; transition: background 0.15s; }
    .season-row:hover { background: rgba(212,175,55,0.03); }
    .season-main { flex: 1; min-width: 0; }
    .season-name-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 6px; }
    .season-name { font-family: var(--font-body); font-size: 16px; font-weight: 700; color: #fff; }
    .season-meta { display: flex; gap: 16px; font-family: var(--font-body); font-size: 12px; color: #666; flex-wrap: wrap; }
    .season-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .icon-btn { background: none; border: none; font-size: 16px; cursor: pointer; opacity: 0.6; padding: 4px 6px; transition: opacity 0.15s; border-radius: 6px; }
    .icon-btn:hover { opacity: 1; background: rgba(255,255,255,0.05); }
    .expand-icon { color: #555; font-size: 11px; padding: 4px 6px; cursor: pointer; }
    .edit-panel { padding: 20px; border-top: 1px solid rgba(212,175,55,0.1); background: rgba(10,31,47,0.6); }
    .season-detail { border-top: 1px solid rgba(212,175,55,0.1); }
    .detail-tabs { display: flex; border-bottom: 1px solid rgba(212,175,55,0.1); }
    .detail-tab { background: none; border: none; padding: 12px 20px; font-family: var(--font-body); font-size: 13px; font-weight: 600; color: #666; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; }
    .detail-tab.active { color: var(--gold); border-bottom-color: var(--gold); }
    .teams-section, .config-section { padding: 20px; }
    .add-team-form { background: rgba(10,31,47,0.5); border-radius: var(--radius-md); padding: 16px; margin-bottom: 16px; border: 1px solid rgba(212,175,55,0.08); }
    .clone-chip { background: rgba(30,58,95,0.4); border: 1px solid; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 600; cursor: pointer; color: #ccc; display: flex; gap: 6px; align-items: center; transition: background 0.15s; }
    .clone-chip:hover { background: rgba(30,58,95,0.8); }
    .team-row-inner { display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: rgba(10,31,47,0.6); border-left: 3px solid; border-radius: 0 var(--radius-md) var(--radius-md) 0; }
    .cred-toggle-btn { font-size:11px; font-weight:700; color:var(--gold-dark); background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.18); border-radius:8px; padding:5px 10px; cursor:pointer; flex-shrink:0; white-space:nowrap; }
    .cred-toggle-btn:hover { background:rgba(212,175,55,0.18); color:var(--gold); }
    .cred-panel { background:rgba(8,20,36,0.7); border:1px solid rgba(212,175,55,0.15); border-radius:var(--radius-md); padding:12px 14px; display:flex; flex-direction:column; gap:10px; margin-top:-4px; margin-bottom:4px; }
    .cred-row { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .cred-label { font-size:11px; color:#888; min-width:110px; }
    .cred-value { font-family:var(--font-timer); font-size:13px; color:#fff; letter-spacing:0.04em; flex:1; }
    .cred-eye-btn { font-size:11px; font-weight:700; color:var(--green-soft); background:rgba(45,156,219,0.1); border:1px solid rgba(45,156,219,0.25); border-radius:8px; padding:4px 10px; cursor:pointer; flex-shrink:0; }
    .cred-reset-input { flex:1; min-width:140px; font-size:12px !important; padding:7px 10px !important; }
    .cred-reset-btn { font-size:11px; font-weight:700; color:var(--red-live); background:rgba(255,59,48,0.08); border:1px solid rgba(255,59,48,0.2); border-radius:8px; padding:7px 14px; cursor:pointer; flex-shrink:0; }
    .cred-reset-btn:disabled { opacity:0.4; cursor:not-allowed; }
    .config-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .config-item { background: rgba(10,31,47,0.6); border-radius: var(--radius-md); padding: 12px; display: flex; flex-direction: column; gap: 4px; }
    select.athena-input { cursor: pointer; }
    select.athena-input option { background: var(--navy-deep); }
  `]
})
export class SeasonsAdminComponent implements OnInit {
  seasons       = signal<any[]>([]);
  seasonTeams   = signal<any[]>([]);
  previousTeams = signal<any[]>([]);
  seasonConfig  = signal<any>(null);
  loading       = signal(true);
  loadingConfig = signal(false);
  saving        = signal(false);
  error         = signal('');
  success       = signal('');
  showCreate    = signal(false);
  expandedId    = signal<string|null>(null);
  editingId     = signal<string|null>(null);
  activeTab     = signal<'teams'|'config'>('teams');

  // Team credentials reveal/reset â€” admin-only feature
  credentialsOpenId = signal<string|null>(null);
  loadingCreds      = signal(false);
  currentCreds      = signal<any>(null);
  showPlain         = signal(false);
  resetPasswordValue = '';

  form     = { name:'', year: new Date().getFullYear(), mode:'', auctionDate:'', seasonStartDate:'', seasonEndDate:'' };
  editForm = { name:'', status:'', auctionDate:'', seasonStartDate:'', seasonEndDate:'' };
  teamForm = { teamName:'', shortCode:'', themeColour:'#D4AF37', ownerDisplayName:'', username:'', password:'' };

  configItems() {
    const c = this.seasonConfig();
    if (!c) return [];
    return [
      { label: 'Budget', value: `💰${c.budgetPerTeamCr}Cr` },
      { label: 'Squad', value: c.minSquadSize },
      { label: 'Overseas', value: c.maxOverseasPlayers },
      { label: 'RTM Slots', value: c.rtmSlotsPerTeam },
      { label: 'C Mult.', value: `${c.captainMultiplier}x` },
      { label: 'VC Mult.', value: `${c.viceCaptainMultiplier}x` },
    ];
  }

  constructor(private seasonSvc: SeasonService, private teamSvc: TeamService) {}
  ngOnInit() { this.loadSeasons(); }

  loadSeasons() {
    this.seasonSvc.getAll().subscribe({ next: d => { this.seasons.set(d); this.loading.set(false); }, error: () => this.loading.set(false) });
  }

  toggle(id: string) {
    if (this.expandedId() === id) { this.expandedId.set(null); return; }
    this.expandedId.set(id);
    this.activeTab.set('teams');
    this.loadTeams(id);
    this.loadPreviousTeams(id);
  }

  loadTeams(sid: string) {
    this.teamSvc.getTeamsBySeason(sid).subscribe({ next: d => this.seasonTeams.set(d), error: () => {} });
  }

  toggleCredentials(teamId: string) {
    if (this.credentialsOpenId() === teamId) {
      this.credentialsOpenId.set(null);
      this.currentCreds.set(null);
      this.showPlain.set(false);
      this.resetPasswordValue = '';
      return;
    }
    this.credentialsOpenId.set(teamId);
    this.showPlain.set(false);
    this.resetPasswordValue = '';
    this.loadingCreds.set(true);
    this.teamSvc.getCredentials(teamId).subscribe({
      next: c => { this.currentCreds.set(c); this.loadingCreds.set(false); },
      error: () => { this.currentCreds.set(null); this.loadingCreds.set(false); }
    });
  }

  resetTeamPassword(teamId: string) {
    const team = this.seasonTeams().find(t => t.id === teamId);
    if (!team || !this.resetPasswordValue) return;
    this.saving.set(true);
    this.teamSvc.updateTeam(teamId, {
      teamName: team.teamName,
      shortCode: team.shortCode,
      themeColour: team.themeColour,
      ownerDisplayName: team.ownerDisplayName,
      newPassword: this.resetPasswordValue,
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.success.set('Password reset!');
        setTimeout(() => this.success.set(''), 3000);
        // Refresh credentials view to show the new plaintext password
        this.teamSvc.getCredentials(teamId).subscribe({ next: c => this.currentCreds.set(c) });
        this.resetPasswordValue = '';
      },
      error: e => { this.error.set(e?.error?.error ?? 'Failed to reset password.'); this.saving.set(false); }
    });
  }

  loadPreviousTeams(currentId: string) {
    const prev = this.seasons().find(s => s.id !== currentId);
    if (!prev) return;
    this.teamSvc.getTeamsBySeason(prev.id).subscribe({ next: d => this.previousTeams.set(d), error: () => {} });
  }

  loadConfig(sid: string) {
    this.activeTab.set('config');
    this.loadingConfig.set(true);
    this.seasonSvc.getById(sid).subscribe({ next: d => { this.seasonConfig.set(d.config); this.loadingConfig.set(false); }, error: () => this.loadingConfig.set(false) });
  }

  createSeason() {
    this.saving.set(true); this.error.set('');
    this.seasonSvc.create({ ...this.form, numberOfTeams: 10, allowGuests: true }).subscribe({
      next: s => { this.seasons.update(l => [s, ...l]); this.showCreate.set(false); this.success.set(`"${s.name}" created!`); this.saving.set(false); setTimeout(() => this.success.set(''), 3000); },
      error: e => { this.error.set(e?.error?.error ?? 'Failed to create.'); this.saving.set(false); }
    });
  }

  startEdit(s: any) {
    this.editingId.set(s.id);
    this.editForm = {
      name: s.name,
      status: s.status,
      auctionDate: s.auctionDate?.split('T')[0] ?? '',
      seasonStartDate: s.seasonStartDate?.split('T')[0] ?? '',
      seasonEndDate: s.seasonEndDate?.split('T')[0] ?? '',
    };
  }

  saveEdit(id: string) {
    this.saving.set(true);
    this.seasonSvc.updateStatus(id, this.editForm.status, {
      auctionDate: this.editForm.auctionDate || undefined,
      seasonStartDate: this.editForm.seasonStartDate || undefined,
      seasonEndDate: this.editForm.seasonEndDate || undefined,
    }).subscribe({
      next: () => {
        this.seasons.update(l => l.map(s => s.id === id ? {
          ...s,
          status: this.editForm.status,
          auctionDate: this.editForm.auctionDate || s.auctionDate,
          seasonStartDate: this.editForm.seasonStartDate || s.seasonStartDate,
          seasonEndDate: this.editForm.seasonEndDate || s.seasonEndDate,
        } : s));
        this.editingId.set(null);
        this.saving.set(false);
        this.success.set('Updated!');
        setTimeout(() => this.success.set(''), 3000);
      },
      error: () => { this.error.set('Failed to update.'); this.saving.set(false); }
    });
  }

  deleteSeason(id: string) {
    if (!confirm('Delete this season? Cannot be undone.')) return;
    this.seasonSvc.delete(id).subscribe({
      next: () => { this.seasons.update(l => l.filter(s => s.id !== id)); this.success.set('Deleted.'); },
      error: e => this.error.set(e?.error?.error ?? 'Cannot delete â€” may have teams.')
    });
  }

  addTeam(seasonId: string) {
    this.saving.set(true); this.error.set('');
    this.teamSvc.createTeam({ ...this.teamForm, seasonId }).subscribe({
      next: t => { this.seasonTeams.update(l => [...l, { ...t, username: this.teamForm.username }]); this.teamForm = { teamName:'', shortCode:'', themeColour:'#D4AF37', ownerDisplayName:'', username:'', password:'' }; this.success.set('Team added!'); this.saving.set(false); setTimeout(() => this.success.set(''), 3000); },
      error: e => { this.error.set(e?.error?.error ?? 'Failed.'); this.saving.set(false); }
    });
  }

  cloneTeam(pt: any) {
    this.teamForm = { ...this.teamForm, teamName: pt.teamName, shortCode: pt.shortCode, themeColour: pt.themeColour, ownerDisplayName: pt.ownerDisplayName, username: pt.username + '_26' };
  }

  statusBadge(s: string) {
    const m: any = { Upcoming:'athena-badge-surface', ReadyForAuction:'athena-badge-blue', AuctionPhase:'athena-badge-red', TeamSelectionPhase:'athena-badge-gold', InProgress:'athena-badge-green', Completed:'athena-badge-surface' };
    return m[s] ?? 'athena-badge-surface';
  }
  modeLabel(m: string) { return { FreshAuction:'🟢 Fresh', AuctionWithRetentions:'🟡 Retention', DirectAllocation:'🔵 Direct' }[m] ?? m; }
}
