import { Component, OnInit, OnDestroy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AuctionService } from '../../core/services/auction.service';
import { AuthService } from '../../core/services/auth.service';
import { TeamService } from '../../core/services/team.service';
import { SeasonService } from '../../core/services/season.service';

@Component({
  selector: 'app-auction-room',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="room">

      <!-- ── TOP BAR ── -->
      <header class="room-header">
        <div class="rh-left">
          <span class="rh-brand">AthenaXI</span>
          <div class="live-chip" [class.live]="isLive()" [class.idle]="!isLive()">
            {{ isLive() ? 'LIVE' : (session()?.status ?? 'LOADING') }}
          </div>
        </div>
        <div class="rh-stats">
          <div class="rh-stat"><span class="rs-val">{{ session()?.soldCount ?? 0 }}</span><span class="rs-lbl">Sold</span></div>
          <div class="rh-stat"><span class="rs-val">{{ session()?.unsoldCount ?? 0 }}</span><span class="rs-lbl">Unsold</span></div>
          <div class="rh-stat"><span class="rs-val">{{ session()?.pendingCount ?? 0 }}</span><span class="rs-lbl">Remaining</span></div>
        </div>
        <div class="rh-right">
          @if (isAdmin()) { <a routerLink="/admin/auction" class="rh-link">← Lobby</a> }
        </div>
      </header>

      <!-- ── IDLE STATES ── -->
      @if (!session() || session()?.status === 'NoSession' || session()?.status === 'NotStarted') {
        <div class="idle-wrap">
          <div class="idle-card">
            <div class="idle-badge">{{ session()?.status === 'NotStarted' ? 'READY' : 'STANDBY' }}</div>
            @if (session()?.status === 'NotStarted') {
              <h2>{{ session()?.totalPlayers ?? 0 }} Players Loaded</h2>
              <p>All teams notified. Start when everyone is ready.</p>
              @if (isAdmin()) {
                <button class="start-btn" (click)="startAuction()" [disabled]="saving()">
                  {{ saving() ? 'Starting...' : 'Start Auction' }}
                </button>
              } @else {
                <p class="idle-wait">Waiting for the auctioneer to begin...</p>
              }
            } @else {
              <h2>No Active Auction</h2>
              <p>Upload players and set the auction order from Admin, then return here.</p>
              @if (isAdmin()) {
                <a routerLink="/admin/auction" class="start-btn" style="text-decoration:none;display:inline-block">Go to Lobby</a>
              }
            }
          </div>
        </div>
      }

      <!-- ── COMPLETED ── -->
      @if (session()?.status === 'Completed') {
        <div class="idle-wrap">
          <div class="idle-card">
            <div class="idle-badge done">COMPLETE</div>
            <h2>Auction Finished</h2>
            <p>All squads are locked. Teams can now assign Captain, VC and Impact Player.</p>
            <a routerLink="/leaderboard" class="start-btn" style="text-decoration:none;display:inline-block">View Leaderboard</a>
          </div>
        </div>
      }

      <!-- ── LIVE AUCTION ── -->
      @if (isLive()) {
        <div class="auction-grid">

          <!-- ════ LEFT — PLAYER + BIDDING ════ -->
          <div class="left-col">

            <!-- Player card -->
            <div class="player-card">
              <div class="pc-set">{{ cp()?.setDisplayName ?? cp()?.auctionSet }}</div>

              @if (cp()?.rtmTeam) {
                <div class="rtm-notice">
                  <span class="rtm-icon">RTM</span>
                  <span><strong>{{ cp()!.rtmTeam }}</strong> holds Right to Match on this player</span>
                </div>
              }

              <div class="pc-name">{{ cp()?.playerName }}</div>

              <div class="pc-tags">
                <span class="ptag ipl">{{ cp()?.iplTeam }}</span>
                <span class="ptag" [ngClass]="'r-' + (cp()?.role?.toLowerCase() ?? '')">{{ cp()?.role }}</span>
                @if (cp()?.isOverseas) { <span class="ptag os">Overseas</span> }
                @if (cp()?.isUncapped) { <span class="ptag unc">Uncapped</span> }
              </div>

              <div class="pc-base">Base Price: <strong>Rs. {{ cp()?.basePriceCr }}Cr</strong>
                <span class="pc-incr"> · Increment: Rs. {{ cp()?.bidIncrementCr }}Cr</span>
              </div>

              <!-- Bid ticker -->
              <div class="bid-ticker" [class.active]="hasBid()">
                <div class="bt-amount">Rs. {{ currentBid() }}Cr</div>
                <div class="bt-leader" [style.color]="leaderColour()">
                  {{ hasBid() ? (leaderName() + ' leads') : 'No bids yet — opens at base price' }}
                </div>
              </div>

              <!-- Timer -->
              @if (timerOn()) {
                <div class="timer-bar" [class.urgent]="timerSecs() <= 5">
                  <div class="tb-track" [style.width]="(timerSecs()/10*100) + '%'"></div>
                  <div class="tb-num">{{ timerSecs() }}s</div>
                </div>
              }
            </div>

            <!-- ── TEAM OWNER bidding ── -->
            @if (!isAdmin() && myTeam()) {
              <div class="bid-panel">
                <div class="bp-budget">
                  <span class="bp-lbl">My Budget</span>
                  <span class="bp-val" [class.low]="myTeam()!.budgetRemainingCr < 10">
                    Rs. {{ myTeam()!.budgetRemainingCr }}Cr
                  </span>
                </div>
                <div class="bp-quick">
                  <button class="qbtn" (click)="setAmt(minBid())">Rs. {{ minBid() }}</button>
                  <button class="qbtn" (click)="setAmt(minBid() + cp()!.bidIncrementCr)">Rs. {{ minBid() + cp()!.bidIncrementCr }}</button>
                  <button class="qbtn" (click)="setAmt(minBid() + cp()!.bidIncrementCr * 2)">Rs. {{ minBid() + cp()!.bidIncrementCr * 2 }}</button>
                </div>
                <div class="bp-row">
                  <input class="athena-input" type="number" [(ngModel)]="bidAmt" [min]="minBid()" step="0.25" placeholder="Enter amount" />
                  <button class="bid-btn" (click)="teamBid()" [disabled]="saving() || bidAmt < minBid()">
                    {{ saving() ? '...' : 'BID' }}
                  </button>
                </div>
                @if (cp()?.rtmTeam === myTeam()!.shortCode && myTeam()!.rtmSlotsRemaining > 0) {
                  <button class="rtm-btn" (click)="teamBid(true)" [disabled]="saving()">
                    Exercise RTM — Match Rs. {{ currentBid() }}Cr ({{ myTeam()!.rtmSlotsRemaining }} slot left)
                  </button>
                }
                @if (bidErr()) { <div class="inline-err">{{ bidErr() }}</div> }
              </div>
            }

            <!-- ── ADMIN auctioneer panel ── -->
            @if (isAdmin()) {
              <div class="admin-panel">
                <div class="ap-title">AUCTIONEER CONTROLS</div>

                <!-- Section 1: Raise bid for a team -->
                <div class="ap-section">
                  <div class="ap-section-lbl">Raise bid on behalf of team</div>
                  <div class="ap-row">
                    <select class="athena-input ap-select" [(ngModel)]="raiseBidUserId">
                      <option [ngValue]="">Select team...</option>
                      @for (t of standings(); track t.userId) {
                        <option [ngValue]="t.userId">{{ t.shortCode }} — {{ t.teamName }} (Rs. {{ t.budgetRemainingCr }}Cr)</option>
                      }
                    </select>
                  </div>
                  <div class="ap-row">
                    <button class="qbtn" (click)="setAmt(minBid())">Rs. {{ minBid() }}</button>
                    <button class="qbtn" (click)="setAmt(minBid() + cp()!.bidIncrementCr)">Rs. {{ minBid() + cp()!.bidIncrementCr }}</button>
                    <input class="athena-input ap-inp" type="number" [(ngModel)]="bidAmt" [min]="minBid()" step="0.25" placeholder="Amount" />
                    <button class="raise-btn" (click)="adminRaise()" [disabled]="!raiseBidUserId || saving()">RAISE</button>
                  </div>
                  @if (bidErr()) { <div class="inline-err">{{ bidErr() }}</div> }
                </div>

                <!-- Section 2: Sold -->
                <div class="ap-section sold-zone" [class.ready]="hasBid()">
                  <div class="ap-section-lbl">
                    Mark as SOLD
                    @if (!hasBid()) { <span class="ap-hint">— place at least one bid first</span> }
                  </div>

                  @if (hasBid()) {
                    <div class="current-leader-row">
                      <span class="cl-label">Current leader:</span>
                      <span class="cl-team" [style.color]="leaderColour()">{{ leaderName() }}</span>
                      <span class="cl-price"> => Rs. {{ currentBid() }}Cr</span>
                    </div>
                  }

                  <div class="ap-row">
                    <select class="athena-input ap-select" [(ngModel)]="soldUserId">
                      <option value="">
                        {{ hasBid() ? 'Confirm: ' + leaderName() + ' (or override)' : 'Select team...' }}
                      </option>
                      @for (t of standings(); track t.teamId) {
                        <option [value]="t.userId">{{ t.shortCode }} — {{ t.teamName }}</option>
                      }
                    </select>
                    <input class="athena-input ap-inp-sm" type="number" [(ngModel)]="soldAmt"
                      [placeholder]="'Rs.' + currentBid()" step="0.25" />
                    <button class="sold-btn" (click)="markSold()"
                      [disabled]="!hasBid() || saving()">
                      SOLD
                    </button>
                  </div>
                  @if (!hasBid()) {
                    <div class="ap-hint-row">Place at least one bid before marking sold.</div>
                  }
                </div>

                <!-- Section 3: Timer + Unsold + Complete -->
                <div class="ap-section">
                  <div class="ap-bottom-row">
                    <button class="timer-btn" [class.on]="timerOn()" (click)="toggleTimer()">
                      {{ timerOn() ? 'Stop Timer (' + timerSecs() + 's)' : 'Start 10s Timer' }}
                    </button>
                    <button class="unsold-btn" (click)="markUnsold()" [disabled]="saving()">UNSOLD</button>
                  </div>
                  @if ((session()?.pendingCount ?? 1) === 0) {
                    <button class="complete-btn" (click)="completeAuction()" [disabled]="saving()">
                      Complete Auction & Lock All Squads
                    </button>
                  }
                </div>
              </div>
            }

            <!-- Bid history -->
            @if (recentBids().length > 0) {
              <div class="bid-history">
                <div class="bh-title">BID HISTORY</div>
                @for (b of recentBids(); track b.bidId; let i = $index) {
                  <div class="bh-row" [class.bh-top]="i === 0">
                    <div class="bh-team" [style.color]="b.biddingTeamColour">{{ b.biddingTeam }}</div>
                    <div class="bh-meta">
                      @if (b.isRtm) { <span class="rtm-pill">RTM</span> }
                      <span class="bh-time">{{ b.placedAt | date:'HH:mm:ss' }}</span>
                    </div>
                    <div class="bh-amt">Rs. {{ b.amountCr }}Cr</div>
                  </div>
                }
              </div>
            }

          </div>

          <!-- ════ RIGHT — STANDINGS + UNSOLD ════ -->
          <div class="right-col">
            <div class="rc-title">TEAM BUDGETS</div>
            @for (t of standings(); track t.teamId) {
              <div class="team-row" [style.border-left-color]="t.themeColour"
                [class.leading]="t.userId === leadingUserId()">
                <div class="tr-left">
                  <span class="tr-code" [style.color]="t.themeColour">{{ t.shortCode }}</span>
                  <div class="tr-info">
                    <span class="tr-name">{{ t.teamName }}</span>
                    <span class="tr-players">{{ t.playersAcquired }} players</span>
                  </div>
                </div>
                <div class="tr-right">
                  <span class="tr-budget" [class.low]="t.budgetRemainingCr < 10">Rs. {{ t.budgetRemainingCr }}Cr</span>
                  @if (t.rtmSlotsRemaining > 0) { <span class="rtm-pill sm">RTM:{{ t.rtmSlotsRemaining }}</span> }
                </div>
              </div>
            }

            @if (unsoldList().length > 0) {
              <div class="unsold-section">
                <div class="rc-title" style="margin-top:16px">UNSOLD POOL</div>
                @for (u of unsoldList(); track u.slotId) {
                  <div class="unsold-row">
                    <span class="un-name">{{ u.playerName }}</span>
                    @if (isAdmin()) {
                      <button class="recall-btn" (click)="recall(u.slotId)" [disabled]="saving() || !!cp()">
                        {{ cp() ? 'In Progress' : 'Recall' }}
                      </button>
                    }
                  </div>
                }
              </div>
            }
          </div>

        </div>
      }

      <!-- Toast -->
      @if (toastMsg()) {
        <div class="toast" [class.toast-err]="toastIsErr()">{{ toastMsg() }}</div>
      }

    </div>
  `,
  styles: [`
    /* ── Shell ── */
    .room { min-height:100vh; background:var(--navy-deep); display:flex; flex-direction:column; font-family:var(--font-body); color:#fff; }

    /* ── Header ── */
    .room-header { background:rgba(10,31,47,0.97); border-bottom:1px solid rgba(212,175,55,0.18); padding:10px 20px; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; position:sticky; top:0; z-index:50; backdrop-filter:blur(12px); }
    .rh-brand { font-family:var(--font-heading); font-size:18px; font-weight:900; letter-spacing:0.15em; background:linear-gradient(180deg,#fff 0%,var(--gold) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
    .rh-left { display:flex; align-items:center; gap:12px; }
    .live-chip { font-size:10px; font-weight:900; letter-spacing:0.12em; padding:3px 10px; border-radius:20px; text-transform:uppercase; }
    .live-chip.live { background:rgba(255,59,48,0.15); color:var(--red-live); border:1px solid rgba(255,59,48,0.3); animation:pulse-dot 1.5s ease infinite; }
    .live-chip.idle { background:rgba(212,175,55,0.1); color:var(--gold); border:1px solid rgba(212,175,55,0.2); }
    .rh-stats { display:flex; gap:20px; }
    .rh-stat { display:flex; flex-direction:column; align-items:center; gap:1px; }
    .rs-val { font-family:var(--font-timer); font-size:18px; font-weight:900; color:#fff; line-height:1; }
    .rs-lbl { font-size:9px; color:#666; text-transform:uppercase; letter-spacing:0.08em; }
    .rh-link { font-size:12px; font-weight:700; color:var(--gold-dark); text-decoration:none; border:1px solid rgba(212,175,55,0.2); border-radius:6px; padding:5px 12px; }

    /* ── Idle / Completed ── */
    .idle-wrap { flex:1; display:flex; align-items:center; justify-content:center; padding:40px 20px; }
    .idle-card { text-align:center; max-width:420px; background:linear-gradient(135deg,rgba(30,58,95,0.7),rgba(10,31,47,0.9)); border:1px solid rgba(212,175,55,0.2); border-radius:16px; padding:48px 32px; }
    .idle-badge { font-family:var(--font-timer); font-size:11px; font-weight:900; letter-spacing:0.18em; color:var(--gold); background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.25); border-radius:20px; padding:5px 16px; display:inline-block; margin-bottom:20px; }
    .idle-badge.done { color:var(--green-cricket); background:rgba(0,200,83,0.1); border-color:rgba(0,200,83,0.25); }
    .idle-card h2 { font-size:22px; font-weight:800; margin:0 0 10px; }
    .idle-card p { color:#888; font-size:14px; margin:0 0 20px; line-height:1.5; }
    .idle-wait { color:#555 !important; font-size:13px !important; margin-top:16px !important; }
    .start-btn { background:linear-gradient(135deg,var(--gold-dark),var(--gold)); color:var(--navy-deep); border:none; border-radius:10px; padding:13px 32px; font-size:15px; font-weight:800; cursor:pointer; letter-spacing:0.04em; }
    .start-btn:disabled { opacity:0.5; cursor:not-allowed; }

    /* ── Live grid ── */
    .auction-grid { flex:1; display:grid; grid-template-columns:1fr 270px; min-height:0; }
    @media (max-width:860px) { .auction-grid { grid-template-columns:1fr; } }
    .left-col { padding:16px; display:flex; flex-direction:column; gap:12px; overflow-y:auto; }
    .right-col { background:rgba(8,24,40,0.8); border-left:1px solid rgba(212,175,55,0.1); padding:14px 12px; overflow-y:auto; }

    /* ── Player card ── */
    .player-card { background:linear-gradient(135deg,rgba(30,58,95,0.75),rgba(10,31,47,0.95)); border:1px solid rgba(212,175,55,0.2); border-radius:14px; padding:22px; position:relative; overflow:hidden; }
    .player-card::before { content:''; position:absolute; inset:0; border-radius:14px; background:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); opacity:0.035; pointer-events:none; }
    .pc-set { font-size:10px; font-weight:800; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold-dark); margin-bottom:10px; }
    .rtm-notice { display:flex; align-items:center; gap:10px; background:rgba(255,59,48,0.08); border:1px solid rgba(255,59,48,0.22); border-radius:8px; padding:8px 12px; margin-bottom:12px; font-size:13px; color:#ccc; }
    .rtm-icon { font-family:var(--font-timer); font-size:9px; font-weight:900; letter-spacing:0.08em; background:rgba(255,59,48,0.15); color:var(--red-live); padding:2px 7px; border-radius:6px; flex-shrink:0; }
    .pc-name { font-family:var(--font-heading); font-size:clamp(26px,4vw,44px); font-weight:900; letter-spacing:0.03em; background:linear-gradient(180deg,#fff 0%,var(--gold) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; line-height:1.1; margin-bottom:12px; }
    .pc-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px; }
    .ptag { font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px; }
    .ptag.ipl { background:rgba(255,255,255,0.07); color:#ccc; }
    .ptag.r-batsman    { background:rgba(0,200,83,0.1);  color:var(--green-cricket); }
    .ptag.r-bowler     { background:rgba(255,59,48,0.1); color:var(--red-live); }
    .ptag.r-allrounder { background:rgba(212,175,55,0.1); color:var(--gold); }
    .ptag.r-wicketkeeper { background:rgba(45,156,219,0.1); color:var(--green-soft); }
    .ptag.os  { background:rgba(45,156,219,0.1); color:var(--green-soft); }
    .ptag.unc { background:rgba(212,175,55,0.08); color:var(--gold-dark); }
    .pc-base { font-size:13px; color:#666; margin-bottom:14px; }
    .pc-incr { color:#555; }

    /* Bid ticker */
    .bid-ticker { background:rgba(5,15,30,0.9); border:1px solid rgba(212,175,55,0.1); border-radius:12px; padding:18px 20px; text-align:center; margin-bottom:12px; transition:border-color 0.4s; }
    .bid-ticker.active { border-color:rgba(212,175,55,0.35); }
    .bt-amount { font-family:var(--font-timer); font-size:clamp(36px,5vw,54px); font-weight:900; background:linear-gradient(90deg,var(--gold-dark),var(--gold),var(--gold-light),var(--gold),var(--gold-dark)); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer 3s linear infinite; line-height:1; }
    .bt-leader { font-size:15px; font-weight:700; margin-top:6px; }
    .bt-leader.muted,.bt-leader:not([style]) { color:#555; font-size:13px; }

    /* Timer bar */
    .timer-bar { position:relative; background:rgba(10,31,47,0.8); border-radius:8px; padding:10px 16px; margin-bottom:10px; display:flex; align-items:center; gap:12px; border:1px solid rgba(0,200,83,0.2); overflow:hidden; }
    .tb-track { position:absolute; left:0; top:0; bottom:0; background:rgba(0,200,83,0.12); border-radius:8px; transition:width 0.9s linear; }
    .timer-bar.urgent { border-color:rgba(255,59,48,0.4); }
    .timer-bar.urgent .tb-track { background:rgba(255,59,48,0.15); }
    .tb-num { font-family:var(--font-timer); font-size:28px; font-weight:900; color:var(--green-cricket); position:relative; z-index:1; }
    .timer-bar.urgent .tb-num { color:var(--red-live); }

    /* Team bid panel */
    .bid-panel { background:rgba(15,25,45,0.8); border:1px solid rgba(212,175,55,0.15); border-radius:14px; padding:16px; }
    .bp-budget { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(212,175,55,0.1); }
    .bp-lbl { font-size:11px; color:#888; text-transform:uppercase; letter-spacing:0.08em; font-weight:700; }
    .bp-val { font-family:var(--font-timer); font-size:24px; font-weight:900; color:var(--green-cricket); }
    .bp-val.low { color:var(--red-live); }
    .bp-quick { display:flex; gap:6px; margin-bottom:10px; flex-wrap:wrap; }
    .qbtn { background:rgba(212,175,55,0.1); color:var(--gold); border:1px solid rgba(212,175,55,0.22); border-radius:8px; padding:6px 12px; font-size:12px; font-weight:700; cursor:pointer; white-space:nowrap; transition:background 0.15s; }
    .qbtn:hover { background:rgba(212,175,55,0.22); }
    .bp-row { display:flex; gap:8px; }
    .bp-row .athena-input { flex:1; }
    .bid-btn { background:linear-gradient(135deg,var(--gold-dark),var(--gold)); color:var(--navy-deep); border:none; border-radius:8px; padding:10px 22px; font-weight:900; font-size:15px; cursor:pointer; flex-shrink:0; letter-spacing:0.04em; transition:filter 0.15s; }
    .bid-btn:disabled { opacity:0.4; cursor:not-allowed; }
    .bid-btn:not(:disabled):hover { filter:brightness(1.1); }
    .rtm-btn { width:100%; margin-top:10px; background:rgba(255,59,48,0.1); color:var(--red-live); border:1px solid rgba(255,59,48,0.3); border-radius:8px; padding:10px; font-weight:700; font-size:13px; cursor:pointer; transition:background 0.15s; }
    .rtm-btn:hover { background:rgba(255,59,48,0.2); }

    /* Admin panel */
    .admin-panel { background:rgba(8,20,36,0.9); border:1px solid rgba(212,175,55,0.2); border-radius:14px; padding:18px; display:flex; flex-direction:column; gap:0; }
    .ap-title { font-family:var(--font-timer); font-size:10px; font-weight:900; letter-spacing:0.14em; color:var(--gold); text-transform:uppercase; margin-bottom:14px; }
    .ap-section { padding:14px 0; border-bottom:1px solid rgba(212,175,55,0.08); display:flex; flex-direction:column; gap:8px; }
    .ap-section:last-child { border-bottom:none; padding-bottom:0; }
    .ap-section-lbl { font-size:11px; font-weight:700; color:#888; text-transform:uppercase; letter-spacing:0.08em; }
    .ap-hint { font-weight:400; color:#555; font-size:10px; }
    .ap-hint-row { font-size:11px; color:#555; margin-top:4px; }
    .ap-row { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
    .ap-select { flex:1; min-width:140px; font-size:13px !important; }
    .ap-select option { background:var(--navy-deep); }
    .ap-inp { width:90px; flex-shrink:0; }
    .ap-inp-sm { width:80px; flex-shrink:0; }

    /* Raise button */
    .raise-btn { background:rgba(45,156,219,0.15); color:var(--green-soft); border:1px solid rgba(45,156,219,0.3); border-radius:8px; padding:9px 16px; font-weight:800; font-size:13px; cursor:pointer; flex-shrink:0; transition:background 0.15s; }
    .raise-btn:disabled { opacity:0.4; cursor:not-allowed; }
    .raise-btn:not(:disabled):hover { background:rgba(45,156,219,0.28); }

    /* Sold zone */
    .sold-zone { background:rgba(0,200,83,0.03); border-radius:10px; padding:14px !important; border:1px solid rgba(0,200,83,0.1); }
    .sold-zone.ready { border-color:rgba(0,200,83,0.25); background:rgba(0,200,83,0.06); }
    .current-leader-row { display:flex; align-items:center; gap:8px; background:rgba(10,31,47,0.6); border-radius:8px; padding:8px 12px; }
    .cl-label { font-size:11px; color:#888; font-weight:600; }
    .cl-team { font-size:14px; font-weight:800; }
    .cl-price { font-family:var(--font-timer); font-size:14px; font-weight:900; color:var(--gold); margin-left:auto; }
    .sold-btn { background:linear-gradient(135deg,#0a3d1a,var(--green-cricket)); color:#fff; border:none; border-radius:8px; padding:10px 20px; font-weight:900; font-size:14px; letter-spacing:0.06em; cursor:pointer; flex-shrink:0; transition:all 0.15s; }
    .sold-btn:disabled { opacity:0.35; cursor:not-allowed; filter:grayscale(0.5); }
    .sold-btn:not(:disabled):hover { filter:brightness(1.12); }

    /* Bottom actions */
    .ap-bottom-row { display:flex; gap:8px; }
    .timer-btn { flex:1; background:rgba(30,58,95,0.5); color:#aaa; border:1px solid rgba(212,175,55,0.15); border-radius:8px; padding:10px; font-weight:600; font-size:13px; cursor:pointer; transition:all 0.15s; }
    .timer-btn.on { background:rgba(212,175,55,0.1); color:var(--gold); border-color:rgba(212,175,55,0.35); }
    .unsold-btn { flex:1; background:linear-gradient(135deg,#2a0808,var(--red-pressure)); color:#fff; border:none; border-radius:8px; padding:10px; font-weight:700; font-size:13px; cursor:pointer; }
    .unsold-btn:disabled { opacity:0.4; cursor:not-allowed; }
    .complete-btn { width:100%; margin-top:8px; background:rgba(212,175,55,0.08); color:var(--gold); border:1px solid rgba(212,175,55,0.25); border-radius:8px; padding:10px; font-weight:700; font-size:13px; cursor:pointer; transition:background 0.15s; }
    .complete-btn:hover { background:rgba(212,175,55,0.16); }

    /* Inline error */
    .inline-err { font-size:12px; color:var(--red-live); background:rgba(255,59,48,0.1); border:1px solid rgba(255,59,48,0.2); border-radius:6px; padding:6px 10px; }

    /* Bid history */
    .bid-history { background:rgba(8,20,36,0.7); border:1px solid rgba(212,175,55,0.1); border-radius:12px; padding:14px; }
    .bh-title { font-family:var(--font-timer); font-size:10px; font-weight:900; letter-spacing:0.14em; color:var(--gold-dark); margin-bottom:10px; }
    .bh-row { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:8px; background:rgba(10,31,47,0.4); margin-bottom:6px; transition:all 0.2s; }
    .bh-row.bh-top { background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.18); }
    .bh-team { font-size:13px; font-weight:700; flex:1; }
    .bh-meta { display:flex; align-items:center; gap:6px; }
    .bh-time { font-size:10px; color:#555; }
    .bh-amt { font-family:var(--font-timer); font-size:15px; font-weight:900; color:var(--gold); }
    .rtm-pill { font-size:9px; font-weight:800; background:rgba(255,59,48,0.12); color:var(--red-live); border:1px solid rgba(255,59,48,0.25); padding:2px 6px; border-radius:6px; }
    .rtm-pill.sm { font-size:8px; }

    /* Right col */
    .rc-title { font-family:var(--font-timer); font-size:9px; font-weight:900; letter-spacing:0.16em; color:var(--gold-dark); text-transform:uppercase; margin-bottom:10px; }
    .team-row { display:flex; align-items:center; justify-content:space-between; border-left:3px solid; border-radius:0 8px 8px 0; padding:9px 11px; margin-bottom:7px; background:rgba(30,58,95,0.25); transition:all 0.2s; }
    .team-row.leading { background:rgba(212,175,55,0.08) !important; box-shadow:0 0 10px rgba(212,175,55,0.08); }
    .tr-left { display:flex; align-items:center; gap:8px; }
    .tr-code { font-size:11px; font-weight:900; letter-spacing:0.05em; flex-shrink:0; }
    .tr-info { display:flex; flex-direction:column; gap:1px; }
    .tr-name { font-size:12px; font-weight:700; color:#fff; }
    .tr-players { font-size:10px; color:#666; }
    .tr-right { display:flex; flex-direction:column; align-items:flex-end; gap:3px; }
    .tr-budget { font-family:var(--font-timer); font-size:13px; font-weight:900; color:var(--green-cricket); }
    .tr-budget.low { color:var(--red-live); }

    /* Unsold */
    .unsold-section { margin-top:4px; }
    .unsold-row { display:flex; align-items:center; justify-content:space-between; background:rgba(255,59,48,0.05); border:1px solid rgba(255,59,48,0.12); border-radius:8px; padding:7px 10px; margin-bottom:6px; }
    .un-name { font-size:12px; color:#ccc; }
    .recall-btn { font-size:10px; font-weight:700; color:var(--gold); background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.2); border-radius:8px; padding:3px 9px; cursor:pointer; }
    .recall-btn:disabled { opacity:0.4; cursor:not-allowed; }

    /* Toast */
    .toast { position:fixed; bottom:80px; left:50%; transform:translateX(-50%); background:var(--green-cricket); color:var(--navy-deep); padding:10px 22px; border-radius:10px; font-size:13px; font-weight:800; z-index:300; animation:fade-in 0.2s ease; white-space:nowrap; box-shadow:0 4px 20px rgba(0,0,0,0.4); }
    .toast.toast-err { background:var(--red-pressure); color:#fff; }
    @media (min-width:1024px) { .room { padding-bottom:0; } }
  `]
})
export class AuctionRoomComponent implements OnInit, OnDestroy {
  session     = signal<any>(null);
  standings   = signal<any[]>([]);
  recentBids  = signal<any[]>([]);
  unsoldList  = signal<any[]>([]);
  myTeam      = signal<any>(null);
  saving      = signal(false);
  toastMsg    = signal('');
  toastIsErr  = signal(false);
  timerOn     = signal(false);
  timerSecs   = signal(10);
  bidErr      = signal('');

  // Form values
  bidAmt        = 0;
  raiseBidUserId = '';
  soldUserId     = '';
  soldAmt        = 0;

  private pollSub?: Subscription;
  private timerSub?: Subscription;

  private get sid() { return this.seasonSvc.activeSeason()?.id ?? '00000000-0000-0000-0000-000000000001'; }

  isLive       = computed(() => this.session()?.status === 'InProgress');
  cp           = computed(() => this.session()?.currentPlayer ?? null);
  currentBid   = computed(() => this.cp()?.currentBidCr ?? this.cp()?.basePriceCr ?? 0);
  hasBid       = computed(() => !!this.cp()?.currentLeaderTeam);
  leaderName   = computed(() => this.cp()?.currentLeaderTeam ?? '');
  leaderColour = computed(() => this.cp()?.currentLeaderColour ?? '#fff');
  leadingUserId = computed(() => {
    const id = this.cp()?.currentLeaderUserId;
    if (id) return id;
    // fallback: match by name
    const name = this.leaderName();
    return this.standings().find(t => t.teamName === name || t.shortCode === name)?.userId ?? null;
  });
  minBid = computed(() => {
    const p = this.cp();
    if (!p) return 0;
    return this.hasBid() ? this.currentBid() + p.bidIncrementCr : p.basePriceCr;
  });

  constructor(
    private auctionSvc: AuctionService,
    private teamSvc: TeamService,
    private seasonSvc: SeasonService,
    public auth: AuthService
  ) {
    // Auto-fill soldUserId when leader changes
    effect(() => {
      const uid = this.leadingUserId();
      if (uid && !this.soldUserId) this.soldUserId = uid;
    });
  }

  ngOnInit() {
    if (!this.seasonSvc.activeSeason()) {
      this.seasonSvc.getActive().subscribe({ next: () => this.boot(), error: () => this.boot() });
    } else {
      this.boot();
    }
  }

  boot() {
    this.loadAll();
    if (!this.isAdmin()) this.loadMyTeam();
    this.pollSub = interval(3000).subscribe(() => this.loadAll());
  }

  ngOnDestroy() { this.pollSub?.unsubscribe(); this.timerSub?.unsubscribe(); }

  loadAll() {
    this.auctionSvc.getSession(this.sid).subscribe({
      next: s => {
        this.session.set(s);
        if (s?.id && s.status !== 'NoSession') {
          this.loadStandings();
          if (s.currentPlayer?.slotId) this.loadBids(s.currentPlayer.slotId);
          this.loadUnsold(s.id);
        }
      }, error: () => {}
    });
  }

  loadStandings() {
    this.auctionSvc.getStandings(this.sid).subscribe({ next: d => this.standings.set(d as any[]), error: () => {} });
  }

  loadBids(slotId: string) {
    this.auctionSvc.getBids(slotId).subscribe({ next: d => this.recentBids.set((d as any[]).slice(0, 10)), error: () => {} });
  }

  loadUnsold(sessionId: string) {
    this.auctionSvc.getResults(sessionId).subscribe({
      next: (res: any[]) => {
        this.unsoldList.set(res.filter(r => r.wentUnsold).map(r => ({
          slotId: r.slotId,
          playerName: r.playerName
        })));
      }, error: () => {}
    });
  }

  loadMyTeam() {
    this.teamSvc.getMyTeam(this.sid).subscribe({ next: t => this.myTeam.set(t), error: () => {} });
  }

  setAmt(v: number) { this.bidAmt = v; }

  teamBid(isRtm = false) {
    const s = this.session(); const p = this.cp();
    if (!s || !p) return;
    this.bidErr.set('');
    if (this.bidAmt < this.minBid()) { this.bidErr.set(`Minimum Rs. ${this.minBid()}Cr`); return; }
    this.saving.set(true);
    this.auctionSvc.placeBid({ auctionSessionId: s.id, auctionPlayerSlotId: p.slotId, amountCr: this.bidAmt, isRtm }).subscribe({
      next: () => { this.saving.set(false); this.showToast('Bid placed!'); this.loadAll(); },
      error: e => { this.bidErr.set(e?.error?.error ?? 'Bid failed.'); this.saving.set(false); }
    });
  }

  adminRaise() {
    const s = this.session(); const p = this.cp();
    if (!s || !p || !this.raiseBidUserId) return;
    this.bidErr.set('');
    console.log('Raising bid for user', this.raiseBidUserId, 'with amount', this.bidAmt);
    if (this.bidAmt < this.minBid()) { this.bidErr.set(`Minimum Rs. ${this.minBid()}Cr`); return; }
    this.saving.set(true);
    this.auctionSvc.placeBid({
      auctionSessionId: s.id, auctionPlayerSlotId: p.slotId,
      amountCr: this.bidAmt, isRtm: false, teamUserId: this.raiseBidUserId
    }).subscribe({
      next: () => { this.saving.set(false); this.showToast('Bid raised!'); this.raiseBidUserId = ''; this.loadAll(); },
      error: e => { this.bidErr.set(e?.error?.error ?? 'Bid failed — check API logs.'); this.saving.set(false); }
    });
  }

  markSold() {
    const s = this.session(); const p = this.cp();
    if (!s || !p || !this.hasBid()) return;
    const winUserId = this.soldUserId || this.leadingUserId();
    const finalPrice = this.soldAmt || this.currentBid();
    if (!winUserId) { this.showToast('Select a team to sell to.', true); return; }
    this.saving.set(true);
    this.auctionSvc.markSold({ auctionSessionId: s.id, auctionPlayerSlotId: p.slotId, winningUserId: winUserId, finalPriceCr: finalPrice, wasRtm: false }).subscribe({
      next: r => {
        this.saving.set(false); this.showToast(r?.message ?? 'Sold!');
        this.soldUserId = ''; this.soldAmt = 0;
        this.timerSub?.unsubscribe(); this.timerOn.set(false); this.timerSecs.set(10);
        this.loadAll();
      },
      error: e => { this.showToast(e?.error?.error ?? 'Sold failed.', true); this.saving.set(false); }
    });
  }

  markUnsold() {
    const s = this.session(); const p = this.cp();
    if (!s || !p) return;
    this.saving.set(true);
    this.auctionSvc.markUnsold({ auctionSessionId: s.id, auctionPlayerSlotId: p.slotId }).subscribe({
      next: r => { this.saving.set(false); this.showToast(r?.message ?? 'Marked unsold.'); this.loadAll(); },
      error: e => { this.showToast(e?.error?.error ?? 'Failed.', true); this.saving.set(false); }
    });
  }

  recall(slotId: string) {
    if (!slotId) { this.showToast('No slot ID for this player.', true); return; }
    this.saving.set(true);
    this.auctionSvc.recallUnsold(slotId).subscribe({
      next: () => { this.saving.set(false); this.showToast('Player recalled!'); this.loadAll(); },
      error: e => { this.showToast(e?.error?.error ?? 'Recall failed.', true); this.saving.set(false); }
    });
  }

  startAuction() {
    const sid = this.session()?.id;
    if (!sid) return;
    this.saving.set(true);
    this.auctionSvc.startAuction(sid).subscribe({
      next: () => { this.saving.set(false); this.loadAll(); },
      error: e => { this.showToast(e?.error?.error ?? 'Failed.', true); this.saving.set(false); }
    });
  }

  completeAuction() {
    const sid = this.session()?.id;
    if (!sid || !confirm('Complete auction? Squads will be locked.')) return;
    this.saving.set(true);
    this.auctionSvc.completeAuction(sid).subscribe({
      next: () => { this.saving.set(false); this.loadAll(); },
      error: e => { this.showToast(e?.error?.error ?? 'Failed.', true); this.saving.set(false); }
    });
  }

  toggleTimer() {
    if (this.timerOn()) {
      this.timerSub?.unsubscribe(); this.timerOn.set(false); this.timerSecs.set(10);
    } else {
      let s = 10; this.timerSecs.set(s); this.timerOn.set(true);
      this.timerSub = interval(1000).subscribe(() => {
        s--; this.timerSecs.set(s);
        if (s <= 0) { this.timerSub?.unsubscribe(); this.timerOn.set(false); this.timerSecs.set(10); }
      });
    }
  }

  isAdmin() { return this.auth.isAdmin(); }

  showToast(msg: string, err = false) {
    this.toastMsg.set(msg); this.toastIsErr.set(err);
    setTimeout(() => this.toastMsg.set(''), 3000);
  }
}
