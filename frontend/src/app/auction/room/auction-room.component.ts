import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AuctionService } from '../../core/services/auction.service';
import { AuthService } from '../../core/services/auth.service';
import { TeamService } from '../../core/services/team.service';

@Component({
  selector: 'app-auction-room',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auction-shell">

      <!-- Header bar -->
      <div class="auction-header">
        <div class="header-left">
          <span class="auction-brand">AthenaXI</span>
          <div class="status-chip" [class.live]="isLive()" [class.waiting]="!isLive()">
            {{ isLive() ? 'LIVE' : session()?.status ?? 'Loading' }}
          </div>
        </div>
        <div class="auction-progress" *ngIf="session()">
          <span class="prog-text">Sold: <strong>{{ session()?.soldCount ?? 0 }}</strong></span>
          <span class="prog-text">Unsold: <strong>{{ session()?.unsoldCount ?? 0 }}</strong></span>
          <span class="prog-text">Remaining: <strong>{{ session()?.pendingCount ?? 0 }}</strong></span>
        </div>
        <div class="header-right">
          @if (isAdmin()) {
            <a routerLink="/admin/auction" class="athena-btn athena-btn-secondary" style="font-size:12px;padding:6px 12px;text-decoration:none">
              Lobby
            </a>
          }
        </div>
      </div>

      <!-- No session state -->
      @if (!session() || session()?.status === 'NoSession') {
        <div class="no-session-state">
          <div class="no-session-card athena-card">
            <div class="ns-icon">AUC</div>
            <h2 class="ns-title">No Active Auction</h2>
            <p class="ns-sub">Upload player pool and auction order, then start the auction from the Admin Lobby.</p>
            @if (isAdmin()) {
              <a routerLink="/admin/auction" class="athena-btn athena-btn-primary" style="text-decoration:none;display:inline-block;margin-top:16px">
                Go to Auction Lobby
              </a>
            } @else {
              <p class="ns-wait">Waiting for admin to start the auction...</p>
            }
          </div>
        </div>
      }

      <!-- Not started state -->
      @if (session()?.status === 'NotStarted') {
        <div class="no-session-state">
          <div class="no-session-card athena-card">
            <div class="ns-icon">READY</div>
            <h2 class="ns-title">Auction Ready to Start</h2>
            <p class="ns-sub">{{ session()?.totalPlayers ?? 0 }} players loaded. Waiting for admin to begin.</p>
            @if (isAdmin()) {
              <button class="athena-btn athena-btn-primary" style="margin-top:16px" (click)="startAuction()" [disabled]="saving()">
                {{ saving() ? 'Starting...' : 'Start Auction' }}
              </button>
            }
          </div>
        </div>
      }

      <!-- Active auction -->
      @if (isLive()) {
        <div class="auction-body">

          <!-- Left: Current Player -->
          <div class="player-panel">
            @if (currentPlayer()) {
              <div class="player-card athena-card">

                <!-- Set label -->
                <div class="set-label">{{ currentPlayer()!.setDisplayName ?? currentPlayer()!.auctionSet }}</div>

                <!-- Player name -->
                <h1 class="player-name">{{ currentPlayer()!.playerName }}</h1>

                <!-- Tags -->
                <div class="player-tags">
                  <span class="tag ipl-tag">{{ currentPlayer()!.iplTeam }}</span>
                  <span class="tag role-tag" [ngClass]="'role-' + currentPlayer()!.role.toLowerCase()">
                    {{ currentPlayer()!.role }}
                  </span>
                  @if (currentPlayer()!.isOverseas) {
                    <span class="tag overseas-tag">Overseas</span>
                  }
                  @if (currentPlayer()!.isUncapped) {
                    <span class="tag uncapped-tag">Uncapped</span>
                  }
                  @if (currentPlayer()!.rtmTeam) {
                    <span class="tag rtm-tag">RTM: {{ currentPlayer()!.rtmTeam }}</span>
                  }
                </div>

                <!-- Base price -->
                <div class="base-price">Base Price: <strong>Rs. {{ currentPlayer()!.basePriceCr }}Cr</strong></div>

                <!-- Current bid display -->
                <div class="bid-display">
                  <div class="bid-amount">Rs. {{ currentBid() }}Cr</div>
                  @if (leadingTeam()) {
                    <div class="bid-leader" [style.color]="leadingTeamColour()">
                      {{ leadingTeam() }}
                    </div>
                  } @else {
                    <div class="bid-leader muted">No bids yet — opening at base price</div>
                  }
                  <div class="bid-increment">Min increment: Rs. {{ currentPlayer()!.bidIncrementCr }}Cr</div>
                </div>

                <!-- Timer -->
                @if (timerActive()) {
                  <div class="timer-display" [class.urgent]="timerSeconds() <= 5">
                    <div class="timer-num">{{ timerSeconds() }}</div>
                    <div class="timer-label">seconds</div>
                  </div>
                }

                <!-- Team owner bid section -->
                @if (!isAdmin() && myTeam()) {
                  <div class="team-bid-section">
                    <div class="my-budget-bar">
                      <span class="budget-label">My Budget</span>
                      <span class="budget-val" [class.low]="myTeam()!.budgetRemainingCr < 10">
                        Rs. {{ myTeam()!.budgetRemainingCr }}Cr
                      </span>
                    </div>
                    <div class="bid-input-row">
                      <input class="athena-input bid-input" type="number"
                        [(ngModel)]="bidAmount"
                        [placeholder]="'Min ' + minBid()"
                        [min]="minBid()" step="0.25" />
                      <button class="athena-btn athena-btn-primary bid-btn"
                        (click)="placeBid(false)"
                        [disabled]="saving() || bidAmount < minBid()">
                        Bid
                      </button>
                    </div>
                    @if (currentPlayer()!.rtmTeam === myTeam()!.shortCode) {
                      <button class="athena-btn rtm-btn"
                        (click)="placeBid(true)"
                        [disabled]="saving() || myTeam()!.rtmSlotsRemaining < 1">
                        Use RTM ({{ myTeam()!.rtmSlotsRemaining }} left)
                      </button>
                    }
                  </div>
                }

                <!-- Admin controls -->
                @if (isAdmin()) {
                  <div class="admin-controls">
                    <div class="bid-input-row">
                      <select class="athena-input" [(ngModel)]="selectedTeamId" style="flex:1">
                        <option value="">Select bidding team...</option>
                        @for (t of standings(); track t.teamId) {
                          <option [value]="t.userId">{{ t.teamName }} (Rs. {{ t.budgetRemainingCr }}Cr)</option>
                        }
                      </select>
                      <input class="athena-input bid-input" type="number"
                        [(ngModel)]="bidAmount" placeholder="Amount" style="width:100px" />
                      <button class="athena-btn athena-btn-primary"
                        (click)="adminBid()"
                        [disabled]="!selectedTeamId || saving()">
                        Bid
                      </button>
                    </div>

                    <div class="admin-action-row">
                      <!-- Sold -->
                      <button class="athena-btn sold-btn"
                        (click)="markSold()"
                        [disabled]="!leadingTeamUserId() || saving()">
                        SOLD to {{ leadingTeam() ?? '?' }}
                      </button>
                      <!-- Unsold -->
                      <button class="athena-btn unsold-btn"
                        (click)="markUnsold()"
                        [disabled]="saving()">
                        UNSOLD
                      </button>
                      <!-- Timer -->
                      <button class="athena-btn timer-btn"
                        (click)="toggleTimer()">
                        {{ timerActive() ? 'Stop Timer' : 'Start Timer' }}
                      </button>
                    </div>
                  </div>
                }
              </div>

              <!-- Recent bids -->
              @if (recentBids().length > 0) {
                <div class="recent-bids athena-card">
                  <div class="section-label">Bid History</div>
                  @for (bid of recentBids(); track bid.bidId) {
                    <div class="bid-row" [class.top]="bid === recentBids()[0]">
                      <span class="bid-team" [style.color]="bid.biddingTeamColour">{{ bid.biddingTeam }}</span>
                      <span class="bid-val">Rs. {{ bid.amountCr }}Cr</span>
                      @if (bid.isRtm) { <span class="rtm-pill">RTM</span> }
                    </div>
                  }
                </div>
              }

            } @else {
              <div class="waiting-player athena-card">
                <p>Waiting for next player...</p>
                @if (isAdmin()) {
                  <button class="athena-btn athena-btn-primary" style="margin-top:12px"
                    (click)="completeAuction()" [disabled]="saving()">
                    Complete Auction
                  </button>
                }
              </div>
            }
          </div>

          <!-- Right: Team Standings -->
          <div class="standings-panel">
            <div class="section-label" style="padding:16px 16px 8px">Team Budgets</div>
            <div class="standings-list">
              @for (t of standings(); track t.teamId) {
                <div class="standing-row" [style.border-left-color]="t.themeColour">
                  <div class="standing-team">
                    <span class="s-code" [style.color]="t.themeColour">{{ t.shortCode }}</span>
                    <span class="s-name">{{ t.teamName }}</span>
                  </div>
                  <div class="standing-stats">
                    <span class="s-budget" [class.low]="t.budgetRemainingCr < 10">
                      Rs. {{ t.budgetRemainingCr }}Cr
                    </span>
                    <span class="s-players">{{ t.playersAcquired }} players</span>
                    @if (t.rtmSlotsRemaining > 0) {
                      <span class="rtm-pill small">RTM: {{ t.rtmSlotsRemaining }}</span>
                    }
                  </div>
                </div>
              }
            </div>

            <!-- Unsold pool -->
            @if (unsoldSlots().length > 0 && isAdmin()) {
              <div class="unsold-pool">
                <div class="section-label" style="padding:12px 16px 8px">Unsold Pool</div>
                @for (slot of unsoldSlots(); track slot.slotId) {
                  <div class="unsold-row">
                    <span class="unsold-name">{{ slot.playerName }}</span>
                    <button class="recall-btn" (click)="recallUnsold(slot.slotId)" [disabled]="saving()">
                      Recall
                    </button>
                  </div>
                }
              </div>
            }
          </div>

        </div>
      }

      <!-- Completed state -->
      @if (session()?.status === 'Completed') {
        <div class="no-session-state">
          <div class="no-session-card athena-card">
            <div class="ns-icon">DONE</div>
            <h2 class="ns-title">Auction Complete</h2>
            <p class="ns-sub">All squads have been finalised. Teams can now assign Captain, VC and Impact Player.</p>
            <a routerLink="/leaderboard" class="athena-btn athena-btn-primary" style="text-decoration:none;display:inline-block;margin-top:16px">
              View Leaderboard
            </a>
          </div>
        </div>
      }

      <!-- Error / Success toast -->
      @if (toast()) {
        <div class="toast" [class.error]="toastType() === 'error'" [class.success]="toastType() === 'success'">
          {{ toast() }}
        </div>
      }

    </div>
  `,
  styles: [`
    /* Shell */
    .auction-shell {
      min-height: 100vh;
      background: var(--navy-deep);
      display: flex; flex-direction: column;
      font-family: var(--font-body);
    }

    /* Header */
    .auction-header {
      background: rgba(10,31,47,0.97);
      border-bottom: 1px solid rgba(212,175,55,0.2);
      padding: 10px 20px;
      display: flex; align-items: center;
      justify-content: space-between; gap: 12px;
      flex-wrap: wrap; position: sticky; top: 0; z-index: 50;
    }
    .header-left { display: flex; align-items: center; gap: 12px; }
    .auction-brand {
      font-family: var(--font-heading); font-size: 18px;
      font-weight: 900; letter-spacing: 0.15em;
      background: linear-gradient(180deg, #fff 0%, var(--gold) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .status-chip {
      font-size: 11px; font-weight: 800; letter-spacing: 0.1em;
      padding: 3px 10px; border-radius: 20px;
    }
    .status-chip.live {
      background: rgba(255,59,48,0.15); color: var(--red-live);
      border: 1px solid rgba(255,59,48,0.3);
      animation: pulse-chip 1.5s ease infinite;
    }
    .status-chip.waiting { background: rgba(212,175,55,0.1); color: var(--gold); border: 1px solid rgba(212,175,55,0.2); }
    @keyframes pulse-chip { 0%,100%{opacity:1} 50%{opacity:0.6} }
    .auction-progress { display: flex; gap: 16px; flex-wrap: wrap; }
    .prog-text { font-size: 12px; color: #888; }
    .prog-text strong { color: #fff; }

    /* No session */
    .no-session-state {
      flex: 1; display: flex;
      align-items: center; justify-content: center; padding: 40px 20px;
    }
    .no-session-card { text-align: center; padding: 48px 32px; max-width: 440px; }
    .ns-icon {
      font-family: var(--font-timer); font-size: 13px; font-weight: 900;
      color: var(--gold); letter-spacing: 0.15em;
      background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.2);
      border-radius: var(--radius-xl); padding: 6px 16px;
      display: inline-block; margin-bottom: 20px;
    }
    .ns-title { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 10px; }
    .ns-sub { color: #888; font-size: 14px; line-height: 1.5; }
    .ns-wait { color: #555; font-size: 13px; margin-top: 16px; }

    /* Auction body — 2-col on desktop */
    .auction-body {
      flex: 1; display: grid;
      grid-template-columns: 1fr 300px;
      gap: 0; min-height: 0;
    }
    @media (max-width: 900px) {
      .auction-body { grid-template-columns: 1fr; }
    }

    /* Player panel */
    .player-panel {
      padding: 20px; display: flex;
      flex-direction: column; gap: 12px;
    }
    .player-card { padding: 24px; }
    .set-label {
      font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
      text-transform: uppercase; color: var(--gold-dark);
      margin-bottom: 12px;
    }
    .player-name {
      font-family: var(--font-heading); font-size: 32px;
      font-weight: 900; letter-spacing: 0.04em;
      background: linear-gradient(180deg, #fff 0%, var(--gold) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-bottom: 12px; line-height: 1.1;
    }
    @media (max-width: 600px) { .player-name { font-size: 24px; } }
    .player-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
    .tag {
      font-size: 11px; font-weight: 700;
      padding: 3px 10px; border-radius: 20px;
    }
    .ipl-tag { background: rgba(255,255,255,0.08); color: #ccc; }
    .role-batsman    { background: rgba(0,200,83,0.1);  color: var(--green-cricket); }
    .role-bowler     { background: rgba(255,59,48,0.1); color: var(--red-live); }
    .role-allrounder { background: rgba(212,175,55,0.1); color: var(--gold); }
    .role-wicketkeeper { background: rgba(45,156,219,0.1); color: var(--green-soft); }
    .overseas-tag { background: rgba(45,156,219,0.1); color: var(--green-soft); }
    .uncapped-tag { background: rgba(212,175,55,0.08); color: var(--gold-dark); }
    .rtm-tag { background: rgba(255,59,48,0.12); color: var(--red-live); border: 1px solid rgba(255,59,48,0.3); }

    .base-price { font-size: 13px; color: #666; margin-bottom: 12px; }

    /* Bid display */
    .bid-display {
      background: rgba(10,31,47,0.8);
      border-radius: var(--radius-md);
      padding: 16px 20px; margin-bottom: 16px;
      border: 1px solid rgba(212,175,55,0.1);
      text-align: center;
    }
    .bid-amount {
      font-family: var(--font-timer); font-size: 42px; font-weight: 900;
      background: linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light), var(--gold), var(--gold-dark));
      background-size: 200% auto;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      animation: shimmer 3s linear infinite;
    }
    .bid-leader { font-size: 16px; font-weight: 700; margin-top: 4px; }
    .bid-leader.muted { color: #555; font-size: 13px; }
    .bid-increment { font-size: 12px; color: #555; margin-top: 6px; }

    /* Timer */
    .timer-display {
      text-align: center; padding: 12px;
      background: rgba(10,31,47,0.6);
      border-radius: var(--radius-md);
      margin-bottom: 12px;
    }
    .timer-num {
      font-family: var(--font-timer); font-size: 48px; font-weight: 900;
      color: var(--green-cricket);
    }
    .timer-display.urgent .timer-num {
      color: var(--red-live);
      animation: pulse-chip 0.8s infinite;
    }
    .timer-label { font-size: 11px; color: #666; letter-spacing: 0.1em; text-transform: uppercase; }

    /* Team bid */
    .team-bid-section { margin-top: 4px; }
    .my-budget-bar {
      display: flex; justify-content: space-between; align-items: center;
      background: rgba(10,31,47,0.6); border-radius: var(--radius-md);
      padding: 10px 14px; margin-bottom: 10px;
    }
    .budget-label { font-size: 12px; color: #888; }
    .budget-val { font-family: var(--font-timer); font-size: 20px; font-weight: 900; color: var(--green-cricket); }
    .budget-val.low { color: var(--red-live); }
    .bid-input-row { display: flex; gap: 8px; margin-bottom: 8px; }
    .bid-input { width: 120px; flex-shrink: 0; }
    .bid-btn { flex: 1; font-size: 15px !important; }
    .rtm-btn {
      width: 100%;
      background: linear-gradient(135deg, rgba(255,59,48,0.2), rgba(255,59,48,0.1));
      border: 1px solid rgba(255,59,48,0.4); color: var(--red-live);
      border-radius: var(--radius-md); padding: 10px; font-weight: 700;
      cursor: pointer; font-size: 14px;
    }

    /* Admin controls */
    .admin-controls { margin-top: 4px; display: flex; flex-direction: column; gap: 10px; }
    .admin-action-row { display: flex; gap: 8px; flex-wrap: wrap; }
    .sold-btn {
      flex: 2;
      background: linear-gradient(135deg, #0d4a1f, var(--green-cricket));
      color: #fff; border: none; border-radius: var(--radius-md);
      padding: 12px; font-weight: 800; font-size: 14px; cursor: pointer;
      transition: opacity 0.15s;
    }
    .sold-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .unsold-btn {
      flex: 1;
      background: linear-gradient(135deg, #3a0a0a, var(--red-pressure));
      color: #fff; border: none; border-radius: var(--radius-md);
      padding: 12px; font-weight: 700; font-size: 13px; cursor: pointer;
    }
    .timer-btn {
      flex: 1;
      background: rgba(30,58,95,0.6); color: #ccc;
      border: 1px solid rgba(212,175,55,0.2);
      border-radius: var(--radius-md); padding: 12px;
      font-weight: 600; font-size: 13px; cursor: pointer;
    }

    /* Recent bids */
    .recent-bids { padding: 14px; }
    .section-label {
      font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--gold-dark); margin-bottom: 10px;
    }
    .bid-row {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 10px; border-radius: var(--radius-md);
      background: rgba(10,31,47,0.4); margin-bottom: 6px;
      transition: all 0.2s;
    }
    .bid-row.top { background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2); }
    .bid-team { font-size: 13px; font-weight: 700; flex: 1; }
    .bid-val { font-family: var(--font-timer); font-size: 15px; font-weight: 900; color: var(--gold); }
    .rtm-pill {
      font-size: 10px; font-weight: 800; letter-spacing: 0.06em;
      background: rgba(255,59,48,0.12); color: var(--red-live);
      border: 1px solid rgba(255,59,48,0.25);
      padding: 2px 7px; border-radius: 10px;
    }
    .rtm-pill.small { font-size: 9px; }

    /* Standings panel */
    .standings-panel {
      background: rgba(10,31,47,0.6);
      border-left: 1px solid rgba(212,175,55,0.1);
      overflow-y: auto;
    }
    .standings-list { display: flex; flex-direction: column; gap: 6px; padding: 0 12px 12px; }
    .standing-row {
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(30,58,95,0.3);
      border-left: 3px solid;
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
      padding: 10px 12px;
    }
    .standing-team { display: flex; flex-direction: column; gap: 2px; }
    .s-code { font-size: 11px; font-weight: 800; letter-spacing: 0.06em; }
    .s-name { font-size: 13px; font-weight: 600; color: #fff; }
    .standing-stats { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
    .s-budget { font-family: var(--font-timer); font-size: 16px; font-weight: 900; color: var(--green-cricket); }
    .s-budget.low { color: var(--red-live); }
    .s-players { font-size: 11px; color: #666; }

    /* Unsold pool */
    .unsold-pool { padding: 0 12px 12px; }
    .unsold-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 10px; background: rgba(255,59,48,0.06);
      border: 1px solid rgba(255,59,48,0.15);
      border-radius: var(--radius-md); margin-bottom: 6px;
    }
    .unsold-name { font-size: 13px; color: #ccc; }
    .recall-btn {
      font-size: 11px; font-weight: 700; color: var(--gold);
      background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.25);
      border-radius: 10px; padding: 3px 10px; cursor: pointer;
    }

    /* Waiting */
    .waiting-player {
      text-align: center; padding: 40px;
      color: #555; font-size: 16px;
    }

    /* Toast */
    .toast {
      position: fixed; bottom: 80px; left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px; border-radius: var(--radius-md);
      font-size: 13px; font-weight: 700;
      z-index: 200; animation: fade-in 0.2s ease;
    }
    .toast.error { background: var(--red-pressure); color: #fff; }
    .toast.success { background: var(--green-cricket); color: var(--navy-deep); }
  `]
})
export class AuctionRoomComponent implements OnInit, OnDestroy {
  session      = signal<any>(null);
  standings    = signal<any[]>([]);
  recentBids   = signal<any[]>([]);
  unsoldSlots  = signal<any[]>([]);
  myTeam       = signal<any>(null);
  saving       = signal(false);
  toast        = signal('');
  toastType    = signal<'error'|'success'>('success');
  timerActive  = signal(false);
  timerSeconds = signal(10);
  bidAmount    = 0;
  selectedTeamId = '';

  private pollSub?: Subscription;
  private timerSub?: Subscription;
  private seasonId = '00000000-0000-0000-0000-000000000001'; // TODO: load from active season

  isLive        = computed(() => this.session()?.status === 'InProgress');
  currentPlayer = computed(() => this.session()?.currentPlayer ?? null);
  currentBid    = computed(() => this.currentPlayer()?.currentBidCr ?? this.currentPlayer()?.basePriceCr ?? 0);
  leadingTeam   = computed(() => this.currentPlayer()?.currentLeaderTeam ?? null);
  leadingTeamColour = computed(() => this.currentPlayer()?.currentLeaderColour ?? '#fff');
  leadingTeamUserId = computed(() => this.currentPlayer()?.currentLeaderUserId ?? null);
  minBid = computed(() => {
    const p = this.currentPlayer();
    if (!p) return 0;
    return this.currentBid() + p.bidIncrementCr;
  });

  constructor(
    private auctionSvc: AuctionService,
    private teamSvc: TeamService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.loadAll();
    // Load active season
    this.loadMyTeam();
    // Poll every 3 seconds
    this.pollSub = interval(3000).subscribe(() => this.loadAll());
  }

  ngOnDestroy() {
    this.pollSub?.unsubscribe();
    this.timerSub?.unsubscribe();
  }

  loadAll() {
    this.auctionSvc.getSession(this.seasonId).subscribe({
      next: s => {
        this.session.set(s);
        if (s?.id && s.status !== 'NoSession') {
          this.loadStandings();
          if (s.currentPlayer?.slotId) this.loadBids(s.currentPlayer.slotId);
        }
      },
      error: () => {}
    });
  }

  loadStandings() {
    this.auctionSvc.getStandings(this.seasonId).subscribe({
      next: d => this.standings.set(d),
      error: () => {}
    });
  }

  loadBids(slotId: string) {
    this.auctionSvc.getBids(slotId).subscribe({
      next: d => this.recentBids.set(d.slice(0, 8)),
      error: () => {}
    });
  }

  loadMyTeam() {
    if (this.auth.isAdmin()) return;
    this.teamSvc.getMyTeam(this.seasonId).subscribe({
      next: t => this.myTeam.set(t),
      error: () => {}
    });
  }

  startAuction() {
    const sid = this.session()?.id;
    if (!sid) return;
    this.saving.set(true);
    this.auctionSvc.startAuction(sid).subscribe({
      next: () => { this.saving.set(false); this.loadAll(); },
      error: e => { this.showToast(e?.error?.error ?? 'Failed to start.', 'error'); this.saving.set(false); }
    });
  }

  placeBid(isRtm: boolean) {
    const s = this.session();
    const p = this.currentPlayer();
    if (!s || !p) return;
    this.saving.set(true);
    this.auctionSvc.placeBid({
      auctionSessionId:    s.id,
      auctionPlayerSlotId: p.slotId,
      amountCr:            this.bidAmount,
      isRtm
    }).subscribe({
      next: () => { this.saving.set(false); this.showToast('Bid placed!', 'success'); this.loadAll(); },
      error: e => { this.showToast(e?.error?.error ?? 'Bid failed.', 'error'); this.saving.set(false); }
    });
  }

  adminBid() {
    const s = this.session(); const p = this.currentPlayer();
    if (!s || !p || !this.selectedTeamId) return;
    this.saving.set(true);
    this.auctionSvc.placeBid({
      auctionSessionId:    s.id,
      auctionPlayerSlotId: p.slotId,
      amountCr:            this.bidAmount,
      isRtm:               false
    }).subscribe({
      next: () => { this.saving.set(false); this.loadAll(); },
      error: e => { this.showToast(e?.error?.error ?? 'Bid failed.', 'error'); this.saving.set(false); }
    });
  }

  markSold() {
    const s = this.session(); const p = this.currentPlayer();
    if (!s || !p || !this.leadingTeamUserId()) return;
    this.saving.set(true);
    this.auctionSvc.markSold({
      auctionSessionId:    s.id,
      auctionPlayerSlotId: p.slotId,
      winningUserId:       this.leadingTeamUserId(),
      finalPriceCr:        this.currentBid(),
      wasRtm:              false
    }).subscribe({
      next: r => {
        this.saving.set(false);
        this.showToast(r.message ?? 'Player sold!', 'success');
        this.timerSub?.unsubscribe(); this.timerActive.set(false);
        this.loadAll();
      },
      error: e => { this.showToast(e?.error?.error ?? 'Failed.', 'error'); this.saving.set(false); }
    });
  }

  markUnsold() {
    const s = this.session(); const p = this.currentPlayer();
    if (!s || !p) return;
    this.saving.set(true);
    this.auctionSvc.markUnsold({
      auctionSessionId:    s.id,
      auctionPlayerSlotId: p.slotId
    }).subscribe({
      next: r => {
        this.saving.set(false);
        this.showToast(r.message ?? 'Marked unsold.', 'success');
        this.loadAll();
      },
      error: e => { this.showToast(e?.error?.error ?? 'Failed.', 'error'); this.saving.set(false); }
    });
  }

  recallUnsold(slotId: string) {
    this.saving.set(true);
    this.auctionSvc.recallUnsold(slotId).subscribe({
      next: () => { this.saving.set(false); this.loadAll(); },
      error: e => { this.showToast(e?.error?.error ?? 'Failed.', 'error'); this.saving.set(false); }
    });
  }

  completeAuction() {
    const sid = this.session()?.id;
    if (!sid) return;
    if (!confirm('Complete the auction? All squads will be locked.')) return;
    this.saving.set(true);
    this.auctionSvc.completeAuction(sid).subscribe({
      next: () => { this.saving.set(false); this.loadAll(); },
      error: e => { this.showToast(e?.error?.error ?? 'Failed.', 'error'); this.saving.set(false); }
    });
  }

  toggleTimer() {
    if (this.timerActive()) {
      this.timerSub?.unsubscribe();
      this.timerActive.set(false);
      this.timerSeconds.set(10);
    } else {
      let secs = 10;
      this.timerSeconds.set(secs);
      this.timerActive.set(true);
      this.timerSub = interval(1000).subscribe(() => {
        secs--;
        this.timerSeconds.set(secs);
        if (secs <= 0) {
          this.timerSub?.unsubscribe();
          this.timerActive.set(false);
          this.timerSeconds.set(10);
        }
      });
    }
  }

  isAdmin() { return this.auth.isAdmin(); }

  showToast(msg: string, type: 'error'|'success') {
    this.toast.set(msg); this.toastType.set(type);
    setTimeout(() => this.toast.set(''), 3000);
  }
}
