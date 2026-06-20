# AthenaXI — Product Requirements Document

> Last updated: June 2026 (Season setup flow, retention, team identity, auction-first focus)
> Status: Active Development
> Author: [Your Name]

---

## 1. Overview

**AthenaXI** digitalises a real-world friend group IPL auction tradition. Friends gather once a year for an auction day — bidding on IPL players with mock budgets — then track points all season. AthenaXI replaces the manual spreadsheet entirely, automates point calculation, and makes the auction itself a polished live experience.

### Two Modules (built in this order)
| Priority | Module | When | Purpose |
|----------|--------|------|---------|
| 1st | 🔨 **Auction** | Pre-season | Season setup → team creation → retention → live bidding |
| 2nd | 🏏 **Season** | During IPL | Team management, scoring, leaderboard, transfers |

> Development focus: **Complete Auction module fully before Season module begins.**
> All Season hooks (models, APIs, DB schema) are designed upfront so nothing needs rework.

Designed **mobile-first** — phones for participants, desktop for the big screen auction room.

---

## 2. Goals

- **#1:** Automate point calculation — biggest manual pain point
- **#2:** Run the live auction digitally — replace the chaotic group sheet
- Learn fullstack Angular + .NET 8, Kafka, scraping, CI/CD, cloud deployment
- Ship a **mobile-first PWA** installable from browser, no app store needed

---

## 3. Roles & Permissions

| Role | Who | What they can do |
|------|-----|-----------------|
| **App Owner** | You (master) | Everything — impersonate any user, delete/edit anything, manage all seasons, override any action |
| **League Admin** | Designated per season | Create seasons, configure rules, create teams, manage auction, edit points post-sync, open/close transfer windows, trigger manual sync |
| **Team Owner** | One login per team (shared) | Participate in auction, manage their team, assign C/VC/Impact, make transfers |
| **Guest** | Anyone with the link | View leaderboard + all teams — read only, no interactions |

**Team Login:**
- Each team has **one shared login** (username + password) created by App Owner or League Admin
- Team login is associated with a Team identity (name, short code, colour)
- Team owner and their friends share this login during auction day on their phones

**Impersonation (App Owner only):**
- Switch into any user's session to debug
- All actions logged with `[IMPERSONATED by AppOwner]` tag

---

## 4. Season Setup Flow

This is the entry point for every season. Must be completed before auction or season play begins.

### Step 1 — Create Season
Admin enters:
| Field | Example |
|-------|---------|
| Season name | IPL 2026 |
| Year | 2026 |
| Tournament format | T20 |
| Number of participant teams | 6 |
| Allow guest viewers? | Yes / No |
| Auction date | 2026-03-01 |
| Season start date | 2026-03-22 |
| Season end date | 2026-05-25 |

### Step 2 — Choose Season Mode
Three options:

| Mode | Description |
|------|-------------|
| 🟢 **Fresh Auction** | All players go to auction. No retentions. Full bidding war from scratch. |
| 🟡 **Auction with Retentions** | Each team retains select players pre-auction (manual sheet upload). Retained players deducted from budget. Remaining players auctioned. |
| 🔵 **Direct Allocation** | No auction at all. Admin uploads final rosters per team. Season starts immediately after upload. |

### Step 3 — Configure Season Rules
All configurable per season (see Section 7 for full list):
- Budget, squad size, overseas/uncapped limits
- Retention rules (if Auction with Retentions mode)
- Scoring points system (My11Circle T20 defaults)
- Multipliers (C, VC, Impact Player)
- Transfer window milestones

### Step 4 — Create Teams & Associate Logins
Admin creates each team:
| Field | Example |
|-------|---------|
| Team name | Chennai Strikers |
| Short code | CS |
| Theme colour | #FFD700 |
| Username | cs_team |
| Password | (set by admin, shared with team owner) |

- App Owner or League Admin can create teams
- Each team gets one login
- Teams are associated to the season

### Step 5 — Pre-Auction Setup (Mode dependent)

**Fresh Auction:**
- Upload Player Pool CSV/Excel
- Upload Auction Order CSV/Excel
- Set auction start (scheduled or immediate)

**Auction with Retentions:**
- Upload Retention Sheet (per team — player name + deduction amount)
- Upload Player Pool (retained players excluded from auction pool automatically)
- Upload Auction Order
- System deducts retention costs from each team's budget before auction starts
- Set auction start

**Direct Allocation:**
- Upload Roster Sheet per team (player name, role, slot — XI/Impact/Reserve)
- System validates composition rules
- Season starts immediately after upload confirmed

### Step 6 — Ready State
- All teams shown with budget, retention deductions, squad slots
- Admin confirms → Season status moves to `AuctionPhase` or `InProgress`

---

## 5. Retention Rules (Auction with Retentions mode)

### Retention Sheet Format (uploaded per season)
| Field | Notes |
|-------|-------|
| team_code | Short code e.g. CS |
| player_name | Must match player in pool exactly |
| retention_cost_cr | Custom amount set by admin e.g. 15.00 |
| slot | PlayingXI / Reserve |

### Validation Rules
- Max retained players per team: **configurable** (default 3, set in Season Rules)
- Max overseas retained: subject to season overseas cap
- Min uncapped retained: counts toward season uncapped requirement
- Min wicketkeeper: at least 1 WK in final squad (across retained + auction)
- Retained player's cost deducted from team's starting budget before auction
- Retained players do NOT appear in auction pool
- Retained players appear on big screen as "Already Retained — [Team Code]" if called

### Retention Cost
- Admin sets custom deduction per player in the retention sheet
- No fixed tier — fully flexible per season agreement

---

## 6. Team Identity

Each team has:
| Field | Type | Example |
|-------|------|---------|
| name | string | Chennai Strikers |
| short_code | string (2-4 chars) | CS |
| theme_colour | hex string | #FFD700 |
| username | string | cs_team |
| password_hash | bcrypt | — |
| owner_display_name | string | Karthik |
| season_id | FK | linked to current season |

Teams are **season-scoped** — same group of friends can have different team names each year.

---

## 7. Module 1 — Auction

### 7.1 Pre-Auction Setup
See Section 4 (Season Setup Flow) — Steps 4 and 5 cover all pre-auction config.

**Excel/CSV uploads:**
- `players-upload.xlsx` — master player pool (see `/docs/templates/`)
- `auction-order.xlsx` — auction sequence with sets, increments, RTM flags
- `retentions.xlsx` — retained players per team with deduction (Retention mode only)
- `direct-allocation.xlsx` — final rosters per team (Direct Allocation mode only)

### 7.2 RTM (Right to Match)
- RTM slots per team: configurable in season rules (default 1)
- Player marked with `rtm_team` in auction order sheet
- When player comes up — other teams bid normally
- RTM team can match final bid within timer window
- RTM use deducted from team's RTM count
- Budget deducted at matched price
- RTM logged in auction results

### 7.3 Auction Day — Big Screen View (Desktop)
- Current player card: Name, IPL Team, Role, Base Price, RTM flag
- Current highest bid + leading team (with team colour)
- Bid timer: auctioneer toggles on/off, configurable countdown
- All teams panel: remaining budget + squad count (live)
- Unsold pool counter
- Set progress: "Set 2 — Batsmen | Player 4 of 12"
- Retained players panel: already-assigned players per team shown

### 7.4 Auction Day — Phone View (Team Owner)
- Remaining budget (large, prominent, in team colour)
- My squad (retained + auctioned so far)
- Budget warning alert when budget can't cover remaining minimum slots
- RTM prompt when their RTM player comes up
- Read-only view of other teams

### 7.5 Bidding Rules
| Rule | Detail |
|------|--------|
| Starting bid | Player's base price from upload |
| Increment | Per-player from sheet, fallback to season default |
| Teams can jump | Any amount above minimum increment |
| Budget guard | App blocks bid if team can't cover remaining required slots |
| Unsold | Player goes back into pool, recalled at end |
| Admin correction | Reassign any player before auction marked Complete |
| RTM | RTM team matches final bid — real IPL rules |

### 7.6 Post-Auction
- Shareable squad card per team (WhatsApp-ready)
- Admin marks auction Complete — squads locked
- Transition to Season module
- Full auction log available (every bid, sold/unsold, RTM decisions)

---

## 8. Module 2 — Season

> Built after Auction module is complete. All DB models and hooks designed upfront.

### 8.1 Team Management (Post-Auction / Post-Allocation)
- Assign Captain (C), Vice-Captain (VC), Impact Player
- Select Playing XI from squad
- Designate up to 3 Reserves (injury backup — configurable)
- All locked when League Admin sets season start

### 8.2 Transfer Windows
Configurable per season. Defaults:
| Window | After Match | Max Swaps |
|--------|-------------|-----------|
| 1 | 18 | 2 |
| 2 | 35 | 2 |
| 3 | 70 | 2 |

### 8.3 Scoring Engine ⚡ (Core — #1 priority feature)
Based on **My11Circle T20 rules (April 17, 2025)**. All values editable per season.

**Batting**
| Action | Points |
|--------|--------|
| Run | 1 |
| Boundary (4) bonus | 4 |
| Six (6) bonus | 6 |
| 25 run bonus | 4 |
| 50 run bonus | 8 |
| 75 run bonus | 12 |
| 100 run bonus | 16 |
| Duck | -2 |

**Strike Rate** (min 20 runs OR 10 balls)
| SR | Points |
|----|--------|
| <50 | -6 |
| 50–59.99 | -4 |
| 60–69.99 | -2 |
| 70–129.99 | 0 |
| 130–149.99 | +2 |
| 150–169.99 | +4 |
| 170+ | +6 |

**Bowling**
| Action | Points |
|--------|--------|
| Dot ball | 1 |
| Wicket | 30 |
| Maiden over | 12 |
| LBW/Bowled bonus | 8 |
| 3-wicket bonus | 4 |
| 4-wicket bonus | 8 |
| 5-wicket bonus | 12 |

**Economy Rate** (min 2 overs)
| Economy | Points |
|---------|--------|
| <5 | +6 |
| 5–5.99 | +4 |
| 6–6.99 | +2 |
| 7–9.99 | 0 |
| 10–10.99 | -2 |
| 11–11.99 | -4 |
| 12+ | -6 |

**Fielding**
| Action | Points |
|--------|--------|
| Catch | 8 |
| 3-catch bonus | 4 |
| Stumping | 12 |
| Run out (direct) | 12 |
| Run out (assist) | 6 |

**Multipliers**
| Role | Default |
|------|---------|
| Captain (C) | × 2.0 |
| Vice-Captain (VC) | × 1.5 |
| Impact Player | × 1.25 |
| Playing XI flat bonus | +4 pts |
| Bench/Reserve | × 0 |

### 8.4 Daily Score Sync
- GitHub Actions cron: nightly 11:30 PM IST
- HtmlAgilityPack scrapes ESPNcricinfo
- Kafka pipeline: raw-match-scores → points-calculator → leaderboard-updater → notifier
- Admin can trigger manually
- One job log entry per match processed

### 8.5 Post-Sync Point Editing
- League Admin or App Owner edits any player's points after sync
- Must enter a reason/note
- Logged: player, match, original, new, reason, editor, timestamp

### 8.6 Leaderboard
- Total points per team ranked
- Drill down: match breakdown, player breakdown
- Guest accessible (no login)

---

## 9. Admin Panel

| Section | Access |
|---------|--------|
| Season Setup wizard | League Admin, App Owner |
| Team Management | League Admin, App Owner |
| Auction Control | League Admin, App Owner |
| Score Sync + Job Logs | League Admin, App Owner |
| Point Override | League Admin, App Owner |
| Transfer Windows | League Admin, App Owner |
| User Management | App Owner only |
| Impersonation | App Owner only |
| Notifications | League Admin, App Owner |

---

## 10. In-App Notifications (Bell Icon)

| Event | Recipients |
|-------|-----------|
| Match points updated | All Team Owners |
| Player scored 50+ | That team's owner |
| Player scored 100 | That team's owner |
| Transfer window opened | All Team Owners |
| Transfer window closing in 24h | All Team Owners |
| Reserve swap approved/rejected | That team's owner |
| Auction starting soon | All users |
| Points manually edited | Affected team's owner |

---

## 11. Mobile-First UI

**Navigation (bottom bar):**
🔨 Auction / 🏏 My Team / 📊 Leaderboard / 🔄 Transfers / 🔔 Alerts

**Breakpoints:**
| Name | Width | Usage |
|------|-------|-------|
| Mobile | 0–639px | Primary |
| Tablet | 640–1023px | 2-col grid |
| Desktop | 1024px+ | Auction big screen |

**PWA:** `@angular/pwa`, offline cache for leaderboard + my team.

---

## 12. Tech Stack (100% Free)

| Layer | Tool | Free Tier |
|-------|------|-----------|
| Frontend | Angular 17+ standalone | Open source |
| PWA | @angular/pwa | Open source |
| Frontend Hosting | GitHub Pages | Free |
| Backend | .NET 8 Minimal API | Open source |
| Backend Hosting | Render.com | Free (keep-alive via GH Actions) |
| Database | Supabase (PostgreSQL) | 500MB free |
| Auth | JWT hand-rolled | Free |
| Scraper | HtmlAgilityPack | Open source |
| Background Jobs | Hangfire + Supabase DB | Free |
| Messaging | Confluent Cloud Kafka | 5GB/month free |
| CI/CD + Cron | GitHub Actions | 2000 min/month free |
| Local Dev | Docker (Kafka) | Free |

---

## 13. Architecture

### Auction Phase (no Kafka needed)
```
Angular → .NET API → PostgreSQL (Supabase)
```

### Season Phase (Kafka added in Phase 3)
```
GitHub Actions cron → Scraper → Kafka: raw-match-scores
                                    ↓
                         Consumer 1: points-calculator → DB
                         Consumer 2: leaderboard-updater → DB
                         Consumer 3: notification-dispatcher → DB
                                    ↓
                         .NET API → Angular
```

---

## 14. Folder Structure

```
athenaxi/
├── frontend/src/app/
│   ├── season-setup/          ← NEW — wizard: create season, mode, rules, teams
│   │   ├── create-season/
│   │   ├── choose-mode/
│   │   ├── configure-rules/
│   │   ├── manage-teams/
│   │   └── pre-auction/
│   ├── auction/
│   │   ├── room/              ← big screen
│   │   ├── phone/             ← participant view
│   │   └── summary/           ← post-auction squad cards
│   ├── auth/
│   ├── team/                  ← C/VC/Impact, XI selection (Season module)
│   ├── leaderboard/
│   ├── transfers/
│   ├── notifications/
│   ├── admin/
│   │   ├── season-settings/
│   │   ├── score-sync/
│   │   ├── point-override/
│   │   ├── user-management/
│   │   └── impersonation/
│   └── shared/
├── backend/
│   ├── AthenaXI.API/
│   ├── AthenaXI.Core/         ← Models, enums, DTOs
│   ├── AthenaXI.Data/         ← EF Core + migrations
│   ├── AthenaXI.Scraper/      ← ESPNcricinfo scraper
│   ├── AthenaXI.Jobs/         ← Hangfire jobs
│   └── AthenaXI.Kafka/        ← Producers & consumers
├── docs/
│   ├── PRD.md
│   ├── data-models.md
│   ├── scoring-rules.md
│   ├── api-spec.md
│   └── templates/
│       ├── players-upload-template.csv
│       ├── players-sample.csv
│       ├── auction-order-template.csv
│       ├── retentions-template.csv
│       └── direct-allocation-template.csv
└── .github/workflows/
```

---

## 15. Revised Build Plan — 35 Days

### 🔵 Phase 1 — Foundation (Days 1–4) ✅
| Day | Status |
|-----|--------|
| 1 | ✅ Repo, scaffold, docs, CI/CD workflows |
| 2 | ✅ DB schema, EF Core, migrations, My11Circle season seed |
| 3 | JWT Auth — all 4 roles, team login, impersonation |
| 4 | Angular auth — login, route guards per role |

### 🟡 Phase 2 — Season Setup + Teams (Days 5–8)
| Day | Goal |
|-----|------|
| 5 | Season setup API — create season, choose mode, configure rules |
| 6 | Team management API — create teams with identity + login |
| 7 | Retention sheet upload + validation + budget deduction logic |
| 8 | Season setup UI — wizard (Angular): create → mode → rules → teams |

### 🟠 Phase 3 — Auction Module (Days 9–18)
| Day | Goal |
|-----|------|
| 9 | Player pool + auction order upload API (Excel parsing) |
| 10 | Auction engine — start, nominate, bid, sold, unsold pool |
| 11 | RTM logic — flag, prompt, match/decline, budget deduction |
| 12 | Budget guard + composition validation |
| 13 | Big screen UI — player card, live bids, timer, all teams panel |
| 14 | Phone view — budget, squad, RTM prompt, warnings |
| 15 | Admin correction — reassign player, override bid |
| 16 | Direct allocation upload — roster per team, instant season start |
| 17 | Post-auction — shareable squad card, lock squads |
| 18 | Auction polish — edge cases, unsold recall, full flow test |

### 🟣 Phase 4 — Season Module (Days 19–27)
| Day | Goal |
|-----|------|
| 19 | Team management — assign C/VC/Impact, select XI, reserves |
| 20 | Web scraper — ESPNcricinfo scorecard fetching |
| 21 | Points calculation engine — all My11Circle T20 rules + multipliers |
| 22 | Point override — admin edit post-sync with reason log |
| 23 | Kafka setup — producer + consumers (points, leaderboard, notifications) |
| 24 | Hangfire + GitHub Actions cron + per-match job logs |
| 25 | In-app notifications — bell icon, unread count, all triggers |
| 26 | Transfer window logic — configurable milestones, reserve swap |
| 27 | Transfer UI — swap XI, change roles, reserve activation |

### 🔴 Phase 5 — Deploy, Polish, PWA (Days 28–35)
| Day | Goal |
|-----|------|
| 28 | Leaderboard — ranked table, drill-down, guest access |
| 29 | Admin dashboard — sync logs, user management, impersonation |
| 30 | PWA — manifest, service worker, offline cache |
| 31 | Deploy — GitHub Pages + Render + Supabase + Confluent |
| 32 | Keep-alive, monitoring, error boundaries |
| 33 | Mobile polish — real device testing, touch fixes |
| 34 | Guest access — public leaderboard + all teams without login |
| 35 | README, architecture diagram, demo GIF, clean history |

---

## 16. Open Questions / Future Scope
- [ ] WebSockets for real-time auction bidding (currently polling)
- [ ] Push notifications — Web Push API
- [ ] Historical season archive
- [ ] More than 9 users (Render paid tier)
- [ ] WhatsApp bot for score alerts

---

## 17. Decisions Log

| Date | Decision | Reason |
|------|----------|--------|
| Jun 2026 | Supabase from Day 1 | Avoid SQLite → Postgres migration |
| Jun 2026 | Kafka in Phase 4 | Auction needs no Kafka; add when scoring begins |
| Jun 2026 | No third-party auth | Learn JWT, free |
| Jun 2026 | Render over Railway | Predictable free tier for .NET |
| Jun 2026 | Mobile-first | Friends use phones during matches and auction |
| Jun 2026 | PWA via @angular/pwa | No app store, install from browser |
| Jun 2026 | Auction module built first | Complete one module fully before moving to next |
| Jun 2026 | My11Circle T20 rules, manually mirrored | Scraping rules page is fragile; admin panel config gives control |
| Jun 2026 | Per-match job logs | Enough detail to debug, not overwhelming |
| Jun 2026 | In-app notifications only | Push is future scope |
| Jun 2026 | RTM = real IPL rules | Friends want authentic experience |
| Jun 2026 | Guest = leaderboard + all teams | Casual followers can watch without account |
| Jun 2026 | App Owner impersonation | Debug without sharing credentials |
| Jun 2026 | Season setup wizard | Clear onboarding flow before any auction starts |
| Jun 2026 | Three season modes | Fresh / Retention / Direct covers all real-world scenarios |
| Jun 2026 | One login per team | Shared by team owner + friends on auction day |
| Jun 2026 | Team identity (name, colour, code) | Teams feel real, big screen looks professional |
| Jun 2026 | Retention cost = custom per player | More flexible than fixed tiers, admin decides per season |
| Jun 2026 | Max retention = configurable | Varies year to year like real IPL |
