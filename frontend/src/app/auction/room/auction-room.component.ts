import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { AuctionService } from '../../core/services/auction.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auction-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auction-shell">

      <!-- Header -->
      <div class="auction-header">
        <div class="header-left">
          <span class="logo">₳ AthenaXI</span>
          <span class="badge" [class.live]="session()?.status === 'InProgress'">
            {{ session()?.status === 'InProgress' ? '��� LIVE' : session()?.status ?? 'Loading...' }}
          </span>
        </div>
        <div class="header-stats">
          <span>✅ Sold: {{ session()?.soldCount ?? 0 }}</span>
          <span>��� Unsold: {{ session()?.unsoldCount ?? 0 }}</span>
          <span>⏳ Pending: {{ session()?.pendingCount ?? 0 }}</span>
        </div>
      </div>

      <div class="auction-body">

        <!-- Current Player Card -->
        <div class="player-section">
          @if (session()?.currentPlayer; as player) {
            <div class="player-card">
              <div class="set-badge">{{ player.setDisplayName ?? player.auctionSet }}</div>
              <h1 class="player-name">{{ player.playerName }}</h1>
              <div class="player-meta">
                <span class="ipl-team">{{ player.iplTeam }}</span>
                <span class="role-badge" [class]="player.role.toLowerCase()">{{ player.role }}</span>
                @if (player.isOverseas) { <span class="tag overseas">��� Overseas</span> }
                @if (player.isUncapped) { <span class="tag uncapped">⭐ Uncapped</span> }
              </div>
              <div class="base-price">Base: ₹{{ player.basePriceCr }}Cr</div>
              @if (player.rtmTeam) {
                <div class="rtm-badge">��� RTM — {{ player.rtmTeam }}</div>
              }

              <!-- Current Bid -->
              <div class="current-bid">
                <div class="bid-amount">₹{{ player.currentBidCr }}Cr</div>
                @if (player.currentLeaderTeam) {
                  <div class="bid-leader" [style.color]="player.currentLeaderColour">
                    ��� {{ player.currentLeaderTeam }}
                  </div>
                } @else {
                  <div class="bid-leader muted">No bids yet</div>
                }
              </div>

              <!-- Bid increment info -->
              <div class="increment-info">Min increment: ₹{{ player.bidIncrementCr }}Cr</div>

              <!-- Timer -->
              @if (timerSeconds() !== null) {
                <div class="timer" [class.urgent]="(timerSeconds() ?? 0) <= 5">
                  ⏱ {{ timerSeconds() }}s
                </div>
              }

              <!-- Admin controls -->
              @if (isAdmin()) {
                <div class="admin-controls">
                  <div class="bid-input-row">
                    <input type="number" [(ngModel)]="bidAmount"
                      [placeholder]="'Min ₹' + player.currentBidCr + player.bidIncrementCr + 'Cr'"
                      class="bid-input" />
                    <button class="btn-bid" (click)="quickBid(player)">Place Bid</button>
                  </div>
                  <div class="action-row">
                    <button class="btn-sold" (click)="markSold(player)">✅ SOLD</button>
                    <button class="btn-unsold" (click)="markUnsold(player)"> ⛔ UNSOLD</button>
                    <button class="btn-timer" (click)="toggleTimer()">
                      {{ timerSeconds() !== null ? '⏹ Stop Timer' : '▶️ Start Timer' }}
                    </button>
                  </div>
                </div>
              }
            </div>
          } @else {
            <div class="no-player">
              @if (session()?.status === 'NotStarted') {
                <div class="waiting">
                  <p>₳ Auction not started yet</p>
                  @if (isAdmin()) {
                    <button class="btn-start" (click)="startAuction()">▶️ Start Auction</button>
                  }
                </div>
              } @else if (session()?.status === 'Completed') {
                <div class="waiting">
                  <p>₳ Auction Complete!</p>
                  <p class="sub">All squads have been finalised.</p>
                </div>
              } @else {
                <p>Waiting for next player...</p>
              }
            </div>
          }
        </div>

        <!-- Teams Standings Panel -->
        <div class="standings-section">
          <h2 class="standings-title">💰 Team Budgets</h2>
          <div class="standings-list">
            @for (team of standings(); track team.teamId) {
              <div class="standing-row" [style.border-left-color]="team.themeColour">
                <div class="team-info">
                  <span class="team-code" [style.color]="team.themeColour">{{ team.shortCode }}</span>
                  <span class="team-name">{{ team.teamName }}</span>
                </div>
                <div class="team-stats">
                  <span class="budget" [class.low]="team.budgetRemainingCr < 10">
                    ₹{{ team.budgetRemainingCr }}Cr
                  </span>
                  <span class="players">👥 {{ team.playersAcquired }}</span>
                </div>
              </div>
            }
          </div>
        </div>

      </div>

    </div>
  `,
  styles: [`
    .auction-shell {
      min-height: 100vh;
      background: #0a0a14;
      color: #fff;
      font-family: 'Inter', 'Arial', sans-serif;
      display: flex;
      flex-direction: column;
    }
    .auction-header {
      background: #1a1a2e;
      border-bottom: 2px solid #C9A84C44;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .header-left { display: flex; align-items: center; gap: 12px; }
    .logo { font-size: 20px; font-weight: 800; color: #C9A84C; }
    .badge {
      background: #333; border-radius: 20px;
      padding: 4px 12px; font-size: 12px; font-weight: 700;
    }
    .badge.live { background: #3a0a0a; color: #ff4444; }
    .header-stats { display: flex; gap: 16px; font-size: 13px; color: #aaa; }
    .auction-body {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 0;
    }
    @media (max-width: 768px) {
      .auction-body { grid-template-columns: 1fr; }
    }
    .player-section {
      padding: 32px 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .player-card {
      background: #1a1a2e;
      border: 1px solid #C9A84C44;
      border-radius: 20px;
      padding: 32px;
      width: 100%;
      max-width: 560px;
      text-align: center;
    }
    .set-badge {
      display: inline-block;
      background: #C9A84C22;
      color: #C9A84C;
      border-radius: 20px;
      padding: 4px 16px;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .player-name {
      font-size: 36px; font-weight: 900;
      color: #fff; margin: 0 0 12px;
    }
    .player-meta {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }
    .ipl-team {
      background: #333; border-radius: 8px;
      padding: 4px 12px; font-size: 13px;
    }
    .role-badge {
      border-radius: 8px; padding: 4px 12px;
      font-size: 13px; font-weight: 700;
    }
    .role-badge.batsman { background: #1e4d2b; color: #4ade80; }
    .role-badge.bowler  { background: #3a1515; color: #f87171; }
    .role-badge.allrounder { background: #2d2d00; color: #facc15; }
    .role-badge.wicketkeeper { background: #1a2e4a; color: #60a5fa; }
    .tag {
      border-radius: 8px; padding: 4px 10px;
      font-size: 12px;
    }
    .overseas { background: #0a2a3a; color: #38bdf8; }
    .uncapped { background: #2a1a00; color: #fb923c; }
    .base-price { color: #888; font-size: 14px; margin-bottom: 8px; }
    .rtm-badge {
      display: inline-block;
      background: #ff000022; border: 1px solid #ff4444;
      color: #ff4444; border-radius: 8px;
      padding: 4px 14px; font-size: 13px; font-weight: 700;
      margin-bottom: 16px;
    }
    .current-bid {
      background: #0f0f1a;
      border-radius: 12px;
      padding: 20px;
      margin: 16px 0;
    }
    .bid-amount {
      font-size: 48px; font-weight: 900;
      color: #C9A84C;
    }
    .bid-leader { font-size: 18px; font-weight: 700; margin-top: 4px; }
    .bid-leader.muted { color: #555; }
    .increment-info { color: #555; font-size: 12px; margin-bottom: 12px; }
    .timer {
      font-size: 36px; font-weight: 900;
      color: #4ade80; margin: 12px 0;
    }
    .timer.urgent { color: #f87171; animation: pulse 1s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
    .admin-controls { margin-top: 16px; }
    .bid-input-row {
      display: flex; gap: 8px; margin-bottom: 12px;
    }
    .bid-input {
      flex: 1; background: #0f0f1a;
      border: 1px solid #444; border-radius: 8px;
      padding: 10px 14px; color: #fff; font-size: 15px;
    }
    .btn-bid {
      background: #1F4E79; color: #fff;
      border: none; border-radius: 8px;
      padding: 10px 16px; font-weight: 700;
      cursor: pointer;
    }
    .action-row { display: flex; gap: 8px; }
    .btn-sold, .btn-unsold, .btn-timer {
      flex: 1; border: none; border-radius: 8px;
      padding: 12px; font-weight: 800;
      font-size: 14px; cursor: pointer;
    }
    .btn-sold   { background: #1e7b45; color: #fff; }
    .btn-unsold { background: #7b1e1e; color: #fff; }
    .btn-timer  { background: #333;    color: #fff; }
    .no-player {
      text-align: center; color: #555;
      font-size: 18px;
    }
    .waiting p { margin: 8px 0; }
    .waiting .sub { font-size: 14px; }
    .btn-start {
      background: #C9A84C; color: #0f0f1a;
      border: none; border-radius: 10px;
      padding: 14px 32px; font-size: 16px;
      font-weight: 800; cursor: pointer;
      margin-top: 16px;
    }
    .standings-section {
      background: #111120;
      border-left: 1px solid #C9A84C22;
      padding: 24px 16px;
      overflow-y: auto;
    }
    .standings-title {
      color: #C9A84C; font-size: 14px;
      font-weight: 700; margin: 0 0 16px;
      text-transform: uppercase; letter-spacing: 1px;
    }
    .standings-list { display: flex; flex-direction: column; gap: 10px; }
    .standing-row {
      background: #1a1a2e;
      border-left: 3px solid;
      border-radius: 0 8px 8px 0;
      padding: 10px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .team-info { display: flex; flex-direction: column; gap: 2px; }
    .team-code { font-size: 12px; font-weight: 800; }
    .team-name { font-size: 13px; color: #ccc; }
    .team-stats { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
    .budget { font-size: 15px; font-weight: 800; color: #4ade80; }
    .budget.low { color: #f87171; }
    .players { font-size: 12px; color: #888; }
  `]
})
export class AuctionRoomComponent implements OnInit, OnDestroy {
  session   = signal<any>(null);
  standings = signal<any[]>([]);
  timerSeconds = signal<number | null>(null);
  bidAmount = 0;

  private pollSub?: Subscription;
  private timerSub?: Subscription;
  private seasonId = '00000000-0000-0000-0000-000000000001'; // TODO: from route

  isAdmin = () => this.auth.isAdmin();

  constructor(
    private auctionSvc: AuctionService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadSession();
    this.loadStandings();
    // Poll every 3 seconds for live updates
    this.pollSub = interval(3000).subscribe(() => {
      this.loadSession();
      this.loadStandings();
    });
  }

  ngOnDestroy() {
    this.pollSub?.unsubscribe();
    this.timerSub?.unsubscribe();
  }

  loadSession() {
    this.auctionSvc.getSession(this.seasonId).subscribe({
      next: s => this.session.set(s),
      error: () => {}
    });
  }

  loadStandings() {
    this.auctionSvc.getStandings(this.seasonId).subscribe({
      next: s => this.standings.set(s),
      error: () => {}
    });
  }

  startAuction() {
    const sessionId = this.session()?.id;
    if (!sessionId) return;
    this.auctionSvc.startAuction(sessionId).subscribe(() => this.loadSession());
  }

  quickBid(player: any) {
    const s = this.session();
    if (!s) return;
    this.auctionSvc.placeBid({
      auctionSessionId:    s.id,
      auctionPlayerSlotId: player.slotId,
      amountCr:            this.bidAmount,
    }).subscribe(() => this.loadSession());
  }

  markSold(player: any) {
    // TODO: open modal to select winning team
    console.log('Mark sold', player);
  }

  markUnsold(player: any) {
    const s = this.session();
    if (!s) return;
    this.auctionSvc.markUnsold({
      auctionSessionId:    s.id,
      auctionPlayerSlotId: player.slotId,
    }).subscribe(() => this.loadSession());
  }

  toggleTimer() {
    if (this.timerSeconds() !== null) {
      this.timerSub?.unsubscribe();
      this.timerSeconds.set(null);
    } else {
      const config = this.session()?.config;
      let secs = config?.bidTimerSeconds ?? 10;
      this.timerSeconds.set(secs);
      this.timerSub = interval(1000).subscribe(() => {
        secs--;
        this.timerSeconds.set(secs);
        if (secs <= 0) {
          this.timerSub?.unsubscribe();
          this.timerSeconds.set(null);
          // Auto-prompt sold
        }
      });
    }
  }
}
