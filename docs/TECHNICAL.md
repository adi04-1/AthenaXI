# AthenaXI — Technical Documentation

> Last updated: June 17, 2026 (auction prep checklist + two bug fixes added)
> Tracks implementation status, architecture, methodology, how-to guides, and known issues.

---

## 1. Role & Screen Access Map

| Screen | Guest | TeamOwner | LeagueAdmin | AppOwner |
|--------|-------|-----------|-------------|----------|
| `/login` | ✅ | ✅ | ✅ | ✅ |
| `/leaderboard` | ✅ read | ✅ | ✅ | ✅ |
| `/team` | ❌ | ✅ own | ✅ all | ✅ all |
| `/auction` | ✅ watch | ✅ bid | ✅ control | ✅ control |
| `/transfers` | ❌ | ✅ own | ✅ manage | ✅ manage |
| `/notifications` | ❌ | ✅ own | ✅ all+send | ✅ all+send |
| `/admin/*` | ❌ | ❌ | ✅ | ✅ |
| `/admin/seasons` | ❌ | ❌ | ✅ CRUD | ✅ CRUD |
| `/admin/players` | ❌ | ❌ | ✅ upload | ✅ upload |
| `/admin/auction` | ❌ | ❌ | ✅ invite+start | ✅ invite+start |
| `/admin/notifications` | ❌ | ❌ | ✅ send | ✅ send |

---

## 2. Real-Time Architecture — Polling, Not WebSockets

AthenaXI runs entirely on **HTTP polling**, not WebSockets or SignalR. This is a deliberate fit for the free-tier hosting constraint (Render.com's free tier sleeps idle WebSocket connections; polling survives cold starts gracefully).

### Polling cadence
| Surface | Interval | Mechanism |
|---|---|---|
| Auction room (session, standings, bids, results) | 3s | `interval(3000)` RxJS subscription in `AuctionRoomComponent.ngOnInit` |
| Notifications bell / invite check | 30s | `interval(30000)` RxJS subscription in `NotificationsComponent` |
| Countdown bid timer | 1s (local only, not server-polled) | `interval(1000)` decrementing a local signal, reset/stopped by admin actions |

### Why polling over WebSockets here
- No persistent connection to manage across Render's free-tier sleep/wake cycles.
- Every endpoint needed for the auction room is already a plain REST GET, so polling reuses the exact same service methods used for one-off loads — no separate real-time protocol to maintain.
- Trade-off accepted: up to ~3s of staleness during live bidding. Mitigated by optimistic local state (e.g. toast feedback fires immediately on a successful POST, before the next poll cycle confirms it).
- Future option if this becomes a bottleneck: swap the 3s interval for Supabase Realtime (Postgres logical replication over WebSocket) without changing component logic, since the polling methods already return the exact shape needed — only the trigger mechanism would change.

### State management — Angular Signals, not NgRx/RxJS subjects
The frontend uses **Angular Signals** (`signal()`, `computed()`, `effect()`) as the single state primitive across every component built in this project — there is no NgRx store, no `BehaviorSubject` service-level state.

Patterns established and followed everywhere:
- **`signal<T>(initial)`** for all mutable component state (`session`, `standings`, `myTeam`, `saving`, `toast`, etc).
- **`computed(() => ...)`** for derived state that depends on one or more signals — e.g. `isLive`, `currentBid`, `hasBid`, `minBid`, `leadingUserId` in `AuctionRoomComponent` are all computed, never manually kept in sync.
- **`effect(() => ...)`** for side effects that should re-run automatically when a dependency signal changes — e.g. auto-filling `soldUserId` when the bid leader changes, and auto-exiting the unsold-round picker UI the moment a new player goes active.
- Services expose state via signals where it needs to be shared across components (`SeasonService.activeSeason`, `NotificationService.unreadCount`), rather than components subscribing to Observables and manually unsubscribing — this eliminates most manual subscription cleanup, though polling subscriptions (the `interval()` ones above) still require `OnDestroy` cleanup since RxJS intervals aren't signals.
- No `async` pipe usage in templates — everything reads directly off signals (`session()`, `currentBid()`), which Angular 17's change detection handles natively without zone.js overhead in zoneless-compatible code paths.

This keeps the codebase intentionally simple for a single-developer learning project: one mental model (signals) for all state, instead of mixing RxJS subjects, NgRx, and signals.

---

## 3. Frontend Module

### Stack
- Angular 17.3+, standalone components, Signals (see §2 above)
- TypeScript ~5.4 (DO NOT upgrade to 6.x — incompatible with Angular 17)
- Hash routing (`withHashLocation()`) for GitHub Pages
- xlsx 0.18.5 for Excel parsing

### Critical Config Files

**angular.json** — Uses `@angular-devkit/build-angular:application` builder (NOT `browser`).
`browser` builder is deprecated in Angular 17+. Always use `application`.

**tsconfig.json** — Key settings:
```json
"moduleResolution": "bundler",
"target": "ES2022",
"module": "ES2022",
"useDefineForClassFields": false
```

**tsconfig.app.json** — Extends root tsconfig, `files: ["src/main.ts"]`

### Install commands
```bash
cd frontend
npm install          # installs all deps including xlsx
ng serve              # dev server at localhost:4200
ng build              # production build
```

### Folder Structure
```
frontend/src/
├── app/
│   ├── admin/
│   │   ├── admin.component.ts           ✅ Sidebar shell
│   │   ├── seasons/seasons.component.ts ✅ CRUD + teams + config — Edit form gap: see §9
│   │   ├── players/players.component.ts ✅ 3-step upload wizard, header normalization
│   │   ├── auction-lobby/               ✅ Invite board + kickstart — shuffle-set UI: pending
│   │   └── notifications-admin/         ✅ Templates + compose
│   ├── auth/login.component.ts          ✅ Athena themed
│   ├── auction/room/auction-room.component.ts ✅ Big screen + phone — full auctioneer panel,
│   │                                        unsold-round flow, admin-correct, RTM
│   ├── leaderboard/                     ✅ Ranked table
│   ├── notifications/                   ✅ Bell + mark read + invite accept/decline banner
│   ├── team-builder/                    ✅ C/VC/Impact assignment — Auctioned Players tab: pending
│   ├── transfers/                       ⏳ Stub only (7 lines)
│   ├── core/
│   │   ├── services/ (8 services)       ✅ All wired — SeasonService caches activeSeason signal
│   │   ├── guards/auth.guard.ts         ✅ authGuard, adminGuard
│   │   └── interceptors/auth.interceptor.ts ✅ JWT Bearer
│   ├── app.component.ts                 ✅ Topbar + bottom nav (all roles) — desktop sidebar
│   │                                        for TeamOwner: pending (see §9)
│   ├── app.config.ts                    ✅ Hash routing
│   └── app.routes.ts                    ✅ All routes + admin children
├── assets/templates/
│   ├── template_freshauction.xlsx       ✅ 2 sheets
│   ├── template_auctionwithretentions.xlsx ✅ 3 sheets
│   └── template_directallocation.xlsx   ✅ 1 sheet
├── athena-theme.css                     ✅ Full design system
├── styles.css                           ✅ @import athena-theme.css
└── index.html                           ✅
```

### Design System (athena-theme.css)
| Token | Value | Usage |
|-------|-------|-------|
| `--navy-deep` | `#0A1F2F` | Page backgrounds |
| `--navy-midnight` | `#1E3A5F` | Card backgrounds |
| `--gold` | `#D4AF37` | Primary accent |
| `--gold-dark` | (darker shade) | Secondary labels, set headers |
| `--gold-light` | `#F3E5AB` | Highlights |
| `--red-live` | `#FF3B30` | Live indicators, RTM tags |
| `--red-pressure` | (deeper red) | Unsold buttons, destructive actions |
| `--green-cricket` | `#00C853` | Success states, sold confirmations |
| `--green-soft` | (muted blue-green) | Wicketkeeper tags, overseas tags, secondary accents |
| `--font-heading` | Montserrat / Playfair | Player names, brand |
| `--font-timer` | Archivo Black, tabular-nums | Bid amounts, countdowns, stat numbers |
| `--font-body` | Inter | All UI copy |

Key classes: `.athena-card`, `.athena-card-sm`, `.athena-btn-primary`, `.athena-btn-secondary`, `.athena-input`, `.athena-page`, `.athena-page-title`, `.athena-badge`, `.athena-success`, `.athena-error`, `.athena-info`

---

## 4. Backend Module

### Stack
- .NET 8 Minimal API, EF Core 8, Npgsql
- JWT Bearer (hand-rolled), BCrypt.Net-Next
- Hangfire (scheduled jobs, not yet wired to a cron task), HtmlAgilityPack (planned — scraper), Confluent.Kafka (planned — event stream)

### CRITICAL — JWT Claim Fix
Add these two lines BEFORE `var builder = WebApplication.CreateBuilder(args)` in Program.cs:
```csharp
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();
```
Without this, .NET remaps `"role"` to a long URI and ALL role checks return 403.

### Role Check Pattern (current standard — all endpoints must use this)

Two role-check styles exist in the codebase's history; **the second is now the standard** going forward, since it's simpler and was confirmed working by direct testing:

```csharp
// ✅ CURRENT STANDARD — IsInRole against the JWT's "role" claim
private static bool IsAdminOrOwner(ClaimsPrincipal caller) =>
    caller.IsInRole(nameof(UserRole.AppOwner))
    || caller.IsInRole(nameof(UserRole.LeagueAdmin));
```

Endpoints should prefer named `RequireAuthorization("PolicyName")` policies (configured once in `Program.cs` via `AddAuthorizationBuilder()`) over the older pattern of `AllowAnonymous()` + manual in-handler role checks. The named-policy approach centralizes the role logic and avoids accidentally leaving an endpoint open. Where `AllowAnonymous()` is still used in the current codebase, it is intentional — those routes are genuinely public reads (standings, results, bid history) that any guest should be able to view without a token.

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("AppOwnerOnly", p => p.RequireAuthenticatedUser().RequireClaim(ClaimTypes.Role, nameof(UserRole.AppOwner)))
    .AddPolicy("AdminOrOwner", p => p.RequireAuthenticatedUser().RequireClaim(ClaimTypes.Role, nameof(UserRole.AppOwner), nameof(UserRole.LeagueAdmin)))
    .AddPolicy("TeamOwnerOrAbove", p => p.RequireAuthenticatedUser().RequireClaim(ClaimTypes.Role, nameof(UserRole.AppOwner), nameof(UserRole.LeagueAdmin), nameof(UserRole.TeamOwner)))
    .AddPolicy("AnyLoggedIn", p => p.RequireAuthenticatedUser());
```

### API Endpoints Reference

#### Auth `/api/auth`
| Method | Route | Role |
|--------|-------|------|
| POST | `/login` | Public |
| GET | `/me` | Any |
| POST | `/register` | AppOwner |
| POST | `/team-login` | Admin+ |
| POST | `/impersonate` | AppOwner |
| POST | `/change-password` | Any |
| GET | `/users` | AppOwner |
| PUT | `/users/{id}/deactivate` | AppOwner |

#### Seasons `/api/seasons`
| Method | Route | Role | Notes |
|--------|-------|------|-------|
| POST | `/` | Admin+ | Name/Year/Mode locked after creation |
| GET | `/` | Public | |
| GET | `/active` | Public | Returns the season currently in AuctionPhase / TeamSelectionPhase / InProgress |
| GET | `/{id}` | Public | |
| PUT | `/{id}/config` | Admin+ | Full scoring + squad rules — see §6 |
| PUT | `/{id}/status` | Admin+ | **Status only** — Edit form should also PUT dates; see §9 |
| DELETE | `/{id}` | AppOwner | Blocked if teams already registered |

#### Teams `/api/teams`
| Method | Route | Role | Notes |
|--------|-------|------|-------|
| POST | `/` | Admin+ | |
| GET | `/season/{seasonId}` | Public | |
| GET | `/{id}` | Public | |
| GET | `/my/{seasonId}` | TeamOwner+ | |
| PUT | `/{id}` | TeamOwner+ | Planned: admin-only plaintext password field — see §9 security note |
| POST | `/retentions` | Admin+ | |
| DELETE | `/retentions/{id}` | Admin+ | |

#### Players `/api/players`
| Method | Route | Role |
|--------|-------|------|
| POST | `/upload` | Admin+ |
| POST | `/auction-order/{seasonId}` | Admin+ |
| POST | `/direct-allocation/{seasonId}` | Admin+ |
| GET | `/` | Public |
| GET | `/{id}` | Public |
| DELETE | `/{id}` | AppOwner |

#### Auction `/api/auction`
| Method | Route | Role | Notes |
|--------|-------|------|-------|
| POST | `/{id}/start` | Admin+ | Activates first slot by `AuctionOrder` |
| GET | `/session/{seasonId}` | Public | Returns `{status:"NoSession"}` if not set up. Includes `currentLeaderUserId` for admin sold-confirmation UI |
| GET | `/standings/{seasonId}` | Public | Live budget board |
| POST | `/bid` | TeamOwner+ | Place bid. Accepts optional `teamUserId` — admin-only override to bid on behalf of a team |
| POST | `/sold` | Admin+ | Mark sold, assign player, deduct budget, advance to next slot |
| POST | `/unsold` | Admin+ | Mark unsold, slot returns to pool for later recall |
| POST | `/recall-unsold/{slotId}` | Admin+ | Re-activates an unsold slot. Blocks if another slot is already Active. Powers the "Start Unsold Round" UI flow |
| POST | `/admin-correct` | Admin+ | Reassign a sold player to a different team/price before auction completes. Refunds original team automatically |
| POST | `/{id}/complete` | Admin+ | Locks squads, moves season to TeamSelectionPhase |
| GET | `/results/{sessionId}` | Public | Full sold+unsold log, includes `slotId` per result for recall/correct UI lookups |
| GET | `/bids/{slotId}` | Public | Bid history for one player slot |
| POST | `/{id}/send-invites` | Admin+ | Creates `AuctionInvite` rows + sends a `Notification` to each team |
| GET | `/{id}/lobby` | Public | Invite accept/pending/decline counts, `canStart` flag |
| POST | `/invite/respond` | TeamOwner | Accept/decline. **Requires `AuctionInvites` table to exist — see §8 known issues** |
| GET | `/my-invite/{seasonId}` | TeamOwner | Own invite status for the active season. ⚠️ Requires the season to be in `AuctionPhase` status — see §7a |

#### Notifications `/api/notifications`
| Method | Route | Role |
|--------|-------|------|
| GET | `/my` | Any |
| GET | `/unread-count` | Any |
| PUT | `/{id}/read` | Any |
| PUT | `/read-all` | Any |
| POST | `/send` | Admin+ (userId=null = broadcast) |

#### Leaderboard `/api/leaderboard`
| Method | Route | Role |
|--------|-------|------|
| GET | `/{seasonId}` | Public |
| GET | `/{seasonId}/team/{teamId}` | Public |
| POST | `/points/override` | Admin+ |

---

## 5. Database Module

### Tables (19 + AuctionInvites = 20)
| Table | Status |
|-------|--------|
| Users | ✅ |
| Players | ✅ |
| Seasons | ✅ (Mode column added via SQL) |
| SeasonConfigs | ✅ |
| FantasyTeams | ✅ (added via SQL) |
| RetainedPlayers | ✅ (added via SQL) |
| UserTeams | ✅ |
| UserTeamPlayers | ✅ |
| AuctionSessions | ✅ |
| AuctionPlayerSlots | ✅ |
| AuctionBids | ✅ |
| AuctionResults | ✅ |
| AuctionInvites | ⚠️ Model + EF config + routes all exist in code; the **table itself was never created in Supabase**. This is the confirmed root cause of the `GET /api/auction/my-invite/{seasonId}` 404 reported during testing — see §8 |
| MatchEvents | ✅ |
| PlayerMatchPoints | ✅ |
| TransferLogs | ✅ |
| SyncJobLogs | ✅ |
| Notifications | ✅ |

### ⚠️ Pending SQL — Run in Supabase SQL Editor
```sql
-- AuctionInvites table (required for invite/lobby flow — fixes the my-invite 404)
CREATE TABLE IF NOT EXISTS "AuctionInvites" (
    "Id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "AuctionSessionId" uuid NOT NULL,
    "FantasyTeamId" uuid NOT NULL,
    "UserId" uuid NOT NULL,
    "Status" text NOT NULL DEFAULT 'Pending',
    "SentAt" timestamptz NOT NULL DEFAULT now(),
    "RespondedAt" timestamptz NULL,
    CONSTRAINT "PK_AuctionInvites" PRIMARY KEY ("Id"),
    CONSTRAINT "UQ_AuctionInvites_Session_Team" UNIQUE ("AuctionSessionId", "FantasyTeamId")
);
CREATE INDEX IF NOT EXISTS "IX_AuctionInvites_Session" ON "AuctionInvites" ("AuctionSessionId");
CREATE INDEX IF NOT EXISTS "IX_AuctionInvites_User" ON "AuctionInvites" ("UserId");

-- Add Mode column if missing
ALTER TABLE "Seasons" ADD COLUMN IF NOT EXISTS "Mode" text NOT NULL DEFAULT 'FreshAuction';
```

### Planned schema change — Team password recovery (see §9 security note)
```sql
-- NOT YET APPLIED. Tradeoff accepted deliberately for this friend-group app;
-- see §9 for the explicit security note before running this.
ALTER TABLE "FantasyTeams" ADD COLUMN IF NOT EXISTS "PlainPassword" text NULL;
```

---

## 6. Scoring Rules — My11Circle T20 Format (manually mirrored, no scraping of rules)

These are the actual default values seeded into every new `SeasonConfig` via `DefaultSeasonConfig()`. Admins can override any of these per-season through `PUT /api/seasons/{id}/config`.

### Squad & Auction Rules
| Field | Default | Meaning |
|---|---|---|
| `BudgetPerTeamCr` | 120 | Starting purse per team |
| `MinSquadSize` / `MaxSquadSize` | 12 / 12 | Required squad size |
| `ReservePlayers` | 3 | Of the 12, how many sit as bench/reserve |
| `MaxOverseasPlayers` | 4 | Cap on overseas players per squad |
| `MinUncappedPlayers` | 1 | Minimum uncapped players required |
| `MinWicketKeepers` | 1 | Minimum keepers required |
| `RtmSlotsPerTeam` | 1 | Right-to-match slots per team |
| `DefaultBidIncrementCr` | 1.00 | Default increment when a slot doesn't override it |
| `BidTimerSeconds` | 10 | Default countdown shown in the auction room |
| `MaxSwapsPerWindow` | 2 | Transfer window swap cap |
| `MaxRetainedPlayersPerTeam` | 3 | For AuctionWithRetentions mode |
| `MaxOverseasRetained` | 1 | Overseas cap within retentions |
| `TransferWindow1/2/3AfterMatch` | 18 / 35 / 70 | Match number that opens each window |

### Multipliers
| Field | Default | Meaning |
|---|---|---|
| `CaptainMultiplier` | 2.0x | |
| `ViceCaptainMultiplier` | 1.5x | |
| `ImpactPlayerMultiplier` | 1.25x | |
| `PlayingXIMultiplier` | 1.0x | Baseline — not actually a multiplier, included for completeness |
| `PlayingXIBonusPoints` | +4 | Flat bonus just for being named in the Playing XI |

### Batting Points
| Field | Default |
|---|---|
| `PtRun` | 1 per run |
| `PtFourBonus` | +4 |
| `PtSixBonus` | +6 |
| `Pt25RunBonus` | +4 |
| `Pt50RunBonus` | +8 |
| `Pt75RunBonus` | +12 |
| `Pt100RunBonus` | +16 |
| `PtDuck` | −2 |

### Strike Rate Bonus/Penalty (qualifying innings only)
| Range | Points |
|---|---|
| Below 50 | −6 |
| 50–60 | −4 |
| 60–70 | −2 |
| 70–130 | 0 |
| 130–150 | +2 |
| 150–170 | +4 |
| Above 170 | +6 |

### Bowling Points
| Field | Default |
|---|---|
| `PtDotBall` | +1 |
| `PtWicket` | +30 |
| `PtMaidenOver` | +12 |
| `PtLbwBowledBonus` | +8 |
| `Pt3WicketBonus` | +4 |
| `Pt4WicketBonus` | +8 |
| `Pt5WicketBonus` | +12 |

### Economy Rate Bonus/Penalty (qualifying overs only)
| Range | Points |
|---|---|
| Below 5 | +6 |
| 5–6 | +4 |
| 6–7 | +2 |
| 7–10 | 0 |
| 10–11 | −2 |
| 11–12 | −4 |
| Above 12 | −6 |

### Fielding Points
| Field | Default |
|---|---|
| `PtCatch` | +8 |
| `Pt3CatchBonus` | +4 |
| `PtStumping` | +12 |
| `PtRunOutDirect` | +12 |
| `PtRunOutAssist` | +6 |

These fields are not yet wired to an automated stat ingestion pipeline — that is the next major piece of work (Season module, scraper + points engine, see §10).

---

## 7. Season Lifecycle

```
CREATE SEASON → CONFIGURE RULES → ADD TEAMS → UPLOAD PLAYERS → SEND INVITES → AUCTION → SEASON
     ↓               ↓                ↓              ↓                ↓            ↓
 /admin/seasons   (auto seeded    (inline in     /admin/players  /admin/auction  /auction
                  My11Circle)     season panel)  wizard          lobby
```

### Season Modes
| Mode | Upload | Auction | Tables Used |
|------|--------|---------|-------------|
| FreshAuction | 2 sheets (pool + order) | Full live auction | AuctionSessions, AuctionPlayerSlots, AuctionBids, AuctionResults |
| AuctionWithRetentions | 3 sheets (+retentions) | Live auction (excl. retained) | + RetainedPlayers |
| DirectAllocation | 1 sheet (final roster) | Skipped entirely | UserTeamPlayers (direct) |

### Auction order — set-fixed, player-shuffle-within-set
The final auction order keeps sets in a fixed sequence (Marquee → Specialist Batters → Specialist Bowlers → All-Rounders → Wicketkeepers → Uncapped, etc, as defined by the uploaded `auction_set` column). The admin can manually trigger a shuffle of player order **within** the currently-active set, on demand, before or during the auction — for unpredictability without breaking the overall set sequencing the group expects. Implemented as `POST /api/auction/{sessionId}/shuffle-set` (admin-only) + a "Shuffle Set" button per set in the admin auction lobby. No auto-shuffle — every shuffle is an explicit admin click.

---

## 7a. Auction Preparation Checklist

Follow this exact order before opening the auction room to your friend group. Skipping or reordering these steps is the single most common cause of auction-day issues (invite-accept 404s, "no players found," teams unable to join).

### Step 1 — Create the season
`/admin/seasons` → New Season. Set Name, Year, and Mode (FreshAuction / AuctionWithRetentions / DirectAllocation). These three fields lock immediately after creation — see §9 for why Edit only covers Status + Dates.

### Step 2 — Add teams
Inline in the season panel's Teams tab. Each team gets a generated username/password — the admin can view or reset these later via the password reveal panel (§9 security note applies).

### Step 3 — Upload players
`/admin/players` wizard. Download the template matching the season's Mode, fill it in, upload. For FreshAuction/AuctionWithRetentions this populates both the player pool and the auction order (with `auction_set` and `auction_order` columns driving the set-fixed sequencing described above).

### Step 4 — ⚠️ Move the season into `AuctionPhase` status — required before invites work
**This is the step that's easy to miss.** The `GET /api/auction/my-invite/{seasonId}` endpoint (which powers the Accept/Decline banner on a team owner's Notifications page) only resolves correctly once the season's `Status` is `AuctionPhase`. If the season is still `Upcoming` or `ReadyForAuction`, team owners can still receive the invite notification itself, but accepting it will fail or behave inconsistently, because the invite-accept flow and the live auction session are both scoped to the season's current phase.

Set this via `/admin/seasons` → Edit → Status → `AuctionPhase`, then Save. (As of the Edit-form fix in §9, this same panel also lets you set Auction Date / Season Start / Season End in the same step.)

### Step 5 — Send invites
`/admin/auction` lobby → **Send / Resend Invites**. This creates `AuctionInvite` rows (one per team) and pushes an `AuctionStartingSoon` notification to each team owner. Confirm the `AuctionInvites` table exists first — see the pending-SQL note in §9 if invites still 404 after completing Step 4.

### Step 6 — Wait for teams to accept (or use Shuffle Set while you wait)
Team owners accept/decline from their Notifications page banner. The lobby shows live Accepted/Pending/Declined counts. While waiting, this is a good moment to use the **Shuffle Set** panel (also in the auction lobby) to randomize player order within any set that has 2+ pending players — sets stay in their fixed sequence, only the players inside the active set get reshuffled, and it can be re-triggered as many times as you like before that set comes up for bidding.

### Step 7 — Start the auction
Once at least one team has accepted (`canStart: true` in the lobby response), click **Auction Live**. This flips the `AuctionSession.Status` to `InProgress` and activates the first slot by `AuctionOrder`. From here the flow is the live bidding loop documented in the Auction `/api/auction` endpoint table in §4.

### Quick reference — required season status per action
| Action | Required Season Status |
|---|---|
| Upload players / auction order | Any pre-auction status |
| Send invites | Any pre-auction status (commonly done right after upload) |
| **Team owner can accept/decline invite** | **`AuctionPhase`** — will not work correctly in any other status |
| Start the live auction | `AuctionPhase`, with ≥1 accepted invite |
| Team assigns C/VC/Impact Player | `TeamSelectionPhase` (set automatically when admin completes the auction) |

---

## 8. How to Run Locally

```bash
# Backend
cd backend
dotnet restore AthenaXI.sln
dotnet run --project AthenaXI.API
# API:    http://localhost:5000
# Swagger: http://localhost:5000 (RoutePrefix = string.Empty)

# Frontend
cd frontend
npm install
ng serve
# App: http://localhost:4200
```

### First Login
```
Username: athenaxi_owner
Password: AngelOfDeath@2026#
```

---

## 9. Known Issues & Fixes Log

| Issue | Cause | Fix |
|-------|-------|-----|
| Swagger blank page | RoutePrefix conflict | Set `RoutePrefix = string.Empty` |
| 403 on all admin endpoints | JWT claim remapping | Add `JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear()` to Program.cs |
| BCrypt SaltParseException | Corrupted hash in DB | Delete user row in Supabase, restart API |
| `column s.Mode does not exist` | Migration not run | Run `ALTER TABLE "Seasons" ADD COLUMN "Mode"...` in Supabase SQL Editor |
| Angular blank page | Circular dep in constructor | Move router.navigate to ngOnInit |
| EF migration timeout | Supabase blocks direct connections | Apply SQL manually via Supabase SQL Editor |
| `ng serve` outdir error | angular.json missing / wrong builder | Use `application` builder, not `browser` |
| TypeScript 6.x errors | Angular 17 only supports TS ~5.4 | Pin to `"typescript": "~5.4.0"` in package.json |
| xlsx import error | Wrong import syntax | Use `import { read, utils } from 'xlsx'` not `import * as XLSX` |
| Excel upload says "player_name empty" for all rows | Headers like `player_name ★` with symbols/spaces don't match expected camelCase keys | Normalize headers client-side: strip `★`, trim, lowercase, map to exact field names before sending to API; also added `PropertyNameCaseInsensitive = true` server-side as a safety net |
| `AuctionInvites` table missing entirely (one-time setup issue, distinct from the bugs below) | Table was never created in Supabase despite model/EF config/routes all existing in code | Run the pending SQL in §5 |
| Admin "raise bid for team" silently fails | `PlaceBidRequest` lacked a `TeamUserId` field; Angular service wasn't sending it | Added `TeamUserId` to the DTO + service method; bid endpoint now uses it when an admin sends it, bypassing the per-team budget guard intentionally for manual overrides |
| "Recall unsold" said "player not found in unsold pool" | Frontend was passing `playerId` instead of the `AuctionPlayerSlot.Id` the endpoint expects | Added `SlotId` to `AuctionResultResponse` so the unsold-pool UI has the correct ID to pass to `recall-unsold/{slotId}` |
| Notification bell not visible for TeamOwner role | Topbar was conditionally hidden via `!isAdmin()` check that accidentally excluded the bell for non-admins too | Topbar/bottom-nav now render for any logged-in role; admin-only links are individually gated inside, not the whole bar |
| `GET /api/auction/my-invite/{seasonId}` → 404 with `"No team found"` even though the team genuinely exists for that user+season | Two separate causes, both now fixed: (1) the season wasn't in `AuctionPhase` status — see the new §7a checklist, this is a required precondition, not a bug in isolation; (2) `Guid.Parse(caller.FindFirst("userId")!.Value)` used a null-forgiving `!` operator — if the `userId` claim was ever absent from the JWT (e.g. token issued before a claim-mapping change), this threw a `NullReferenceException` that surfaced to the client as a bare 404 with no useful error, making it look like a missing-route problem when it was actually a runtime crash | Endpoint now tries `userId` → `sub` → `ClaimTypes.NameIdentifier` in order and returns a proper `401 Unauthorized` if none are present, instead of crashing; the 404 body also now echoes back the exact `userId`/`seasonId` it searched for, so a genuine team/season mismatch is immediately visible instead of requiring a Supabase cross-check |
| Shuffle Set → `500 Internal Server Error` on save | `AuctionPlayerSlots` has a composite unique index on `(AuctionSessionId, AuctionOrder)`. Writing a true permutation of order values directly causes an intermediate row to temporarily hold a value still in use by another row in the same `SaveChangesAsync()` batch — Postgres rejects the duplicate mid-transaction | Two-phase update: first move every row in the set to a guaranteed-unique negative offset (`-(i+1) - 1,000,000`, far outside any real order range) and save, then apply the real shuffled values in a second save once no collision is possible |

### Open items (UI/UX backlog)
Items 1–5 below were confirmed decisions that are now **implemented** as of this writing — kept here briefly for traceability, then this list will be trimmed to only genuinely open items in the next doc pass.
1. ✅ **Season Edit form** — now sends Status + Auction Date + Season Start + Season End. Name/Year/Mode remain locked after creation per the original decision.
2. ✅ **TeamOwner desktop layout** — converted to a left sidebar on desktop (768px breakpoint, matching Admin's pattern), bottom nav remains for mobile only.
3. ✅ **Mobile header alignment** — root cause was `flex-wrap: wrap` on the topbar's right-hand cluster causing height jumps when content didn't fit one line; removed, right cluster is now `flex-shrink: 0` and never wraps.
4. ✅ **Team password view/edit in Season admin** — `PlainPassword` column added to `User` with reveal toggle + reset form in the season admin teams panel, admin-only `GET /{id}/credentials` endpoint.
   ⚠️ **Security note still applies**: this is a real regression — if the database ever leaks, every team's password leaks in cleartext alongside it. Implemented deliberately for this closed friend-group app; do not copy this pattern into any app handling real user accounts.
5. ✅ **"Auctioned Players" tab** — lives inside the team owner's My Team page as a tab alongside Squad, showing every acquired player sorted by price with a total-spent summary.
6. ✅ **Shuffle Set feature** — `POST /api/auction/{sessionId}/shuffle-set` (admin-only) + a Player Sets panel in the auction lobby showing pending/sold/unsold counts per set with a per-set Shuffle button, disabled when fewer than 2 pending players remain in that set.

---

## 10. Build Progress Log

| Day | What | Status |
|-----|------|--------|
| 1 | Repo, scaffold, CI/CD | ✅ |
| 2 | DB schema, EF Core, migrations, seed | ✅ |
| 3 | JWT auth, 4 roles, AppOwner seed | ✅ |
| 4 | Angular login, guards, interceptor | ✅ |
| 5 | Season API (CRUD + config) | ✅ |
| 6 | Team API (create, retentions) | ✅ |
| 7 | Player upload, auction order, direct allocation | ✅ |
| 8 | Auction engine (bid, sold, unsold, RTM, correction) | ✅ |
| 9 | Notifications, Leaderboard, point override | ✅ |
| 10 | Program.cs wired, all endpoints registered | ✅ |
| 11 | Angular services, season wizard, nav | ✅ |
| 12 | Admin panel redesign (sidebar, seasons, players, lobby, notifs) | ✅ |
| 12 | Athena design system (athena-theme.css) | ✅ |
| 12 | Excel upload templates (3 modes) | ✅ |
| 13 | Auction Room UI — full build (player card, bid ticker, timer, admin panel, RTM, bid history, team standings) | ✅ |
| 14 | Auction invite system (model, send-invites, lobby, respond, my-invite) | ✅ fully resolved — table created, season-phase requirement documented in §7a, null-claim crash fixed, see §9 |
| 15 | Auction polish round 1 — admin sold/unsold/raise-bid-for-team fixes, notifications visibility fix | ✅ |
| 16 | Unsold-round re-auction flow ("Start Unsold Round" picker, recall loop) | ✅ |
| 17 | Admin-correct UI (Recently Sold panel + inline correction form) | ✅ |
| 18 | Auction module remaining UI fixes (Edit form, desktop sidebar, mobile header, team password, Auctioned Players tab, Shuffle Set) | ✅ all six implemented — see §9 |
| 18b | Post-implementation bug fixes found during real testing — invite-accept null-claim crash, Shuffle Set unique-constraint 500 | ✅ both fixed, see §9 |
| 19 | Team management (C/VC/Impact) | ✅ |
| 20 | ESPNcricinfo scraper | ⏳ |
| 21 | Points calculation engine (wire §6 scoring rules to ingested match stats) | ⏳ |
| 22 | Transfer windows | ⏳ |
| 23 | Kafka setup | ⏳ |
| 24 | Hangfire + cron | ⏳ |
| 25–35 | Polish, PWA, deploy | ⏳ |
