# AthenaXI — Product Requirements Document

> Last updated: June 2026  
> Status: Planning → Active Development  
> Author: [Your Name]

---

## 1. Overview

**AthenaXI** is a private fantasy IPL app for 2–9 users. Users pick a team once at the start of the season, assign roles (Captain, Vice-Captain, Impact Player), and accumulate points as IPL matches are played. Points are fetched automatically via web scraping and processed through a Kafka-based event pipeline.

---

## 2. Goals

- Learn fullstack development end-to-end (Angular + .NET 8)
- Learn event-driven architecture with Apache Kafka
- Learn web scraping, background jobs, CI/CD, and cloud deployment
- Build something genuinely usable with friends during IPL season

---

## 3. Users

- **Max concurrent users:** 8–9
- **User types:** Admin (manages transfer windows, triggers manual sync) | Player (picks team, views scores)
- **Auth:** JWT-based login, hand-rolled (no third-party auth provider)

---

## 4. Core Features

### 4.1 Team Selection (One-time per season)
- Pick a Playing XI from the full IPL 2025 player pool
- Assign 5–8 substitutes (bench)
- Assign roles:
  - **Captain (C)** — 2x point multiplier
  - **Vice-Captain (VC)** — 1.5x point multiplier
  - **Impact Player** — 1.25x multiplier (Playing XI only)
- Team is **locked after submission**
- Validation: role constraints, no duplicate players

### 4.2 Transfer Windows
Transfers unlock at fixed match milestones:

| Window | Opens After Match | Closes Before Match |
|--------|-------------------|---------------------|
| 1      | Match 18          | Match 19            |
| 2      | Match 35          | Match 36            |
| 3      | Match 70          | Match 71 (playoffs) |

**What can be changed during transfers:**
- Swap bench player ↔ Playing XI
- Change Captain / Vice-Captain assignment
- Change Impact Player assignment

**What cannot be changed:**
- Adding new players not in original squad
- Changing more than allowed swaps per window (TBD — suggest 2 swaps)

### 4.3 Scoring Engine
Points are calculated per match per player. Only Playing XI players score (unless a sub is promoted via transfer).

| Action | Points |
|--------|--------|
| Run scored | 1 |
| Boundary (4) | +1 bonus |
| Six (6) | +2 bonus |
| 50 runs | +10 bonus |
| 100 runs | +20 bonus |
| Duck (batting) | -5 |
| Wicket taken | 25 |
| LBW / Bowled bonus | +5 |
| Maiden over | +10 |
| 3-wicket haul | +15 bonus |
| 5-wicket haul | +30 bonus |
| Catch | 10 |
| Stumping | 15 |
| Run out (direct) | 15 |
| Run out (assist) | 5 |
| Did not play | 0 |

**Multipliers applied after base points:**
- Captain: base × 2
- Vice-Captain: base × 1.5
- Impact Player: base × 1.25

### 4.4 Leaderboard
- Real-time total points per user
- Breakdown: points per match, per player
- Updates automatically after each match's scores are processed

### 4.5 Daily Score Sync
- GitHub Actions cron job triggers daily at 11:30 PM IST
- Scraper fetches latest scorecards from ESPNcricinfo
- Raw data published to Kafka topic
- Consumers process and store points

---

## 5. Tech Stack (100% Free)

| Layer | Tool | Free Tier |
|-------|------|-----------|
| Frontend | Angular 17+ (standalone components) | Open source |
| Frontend Hosting | GitHub Pages | Free forever |
| Backend | .NET 8 Minimal API | Open source |
| Backend Hosting | Render.com | Free (sleeps after 15min idle) |
| Database | Supabase (PostgreSQL) | 500MB free |
| Auth | JWT hand-rolled | No cost |
| Scraper | HtmlAgilityPack (.NET) | Open source |
| Background Jobs | Hangfire (uses Supabase DB) | Free |
| Messaging | Confluent Cloud Kafka | 5GB/month free |
| CI/CD + Cron | GitHub Actions | 2000 min/month free |
| Local Dev | Docker (Kafka + DB local) | Free |

### Render Free Tier Workaround
GitHub Actions pings the API every 10 minutes via a keep-alive workflow to prevent cold starts.

---

## 6. Architecture

### Phase 1–2 (Simple — no Kafka yet)
```
GitHub Actions cron
       ↓
   Scraper (.NET)
       ↓
  PostgreSQL (Supabase)
       ↓
  .NET Minimal API
       ↓
  Angular Frontend
```

### Phase 3 (Kafka introduced)
```
GitHub Actions cron
       ↓
   Scraper (.NET) — Producer
       ↓
  Kafka Topic: raw-match-scores (Confluent Cloud)
       ↓
  ┌────────────────────────────┐
  │ Consumer 1: points-calculator → PostgreSQL │
  │ Consumer 2: leaderboard-updater → PostgreSQL │
  │ Consumer 3: notifier (future scope) │
  └────────────────────────────┘
       ↓
  .NET Minimal API
       ↓
  Angular Frontend
```

---

## 7. Folder Structure

```
athenaxi/
├── frontend/                  # Angular app
│   └── src/app/
│       ├── auth/
│       ├── team-builder/
│       ├── leaderboard/
│       ├── transfers/
│       └── shared/
├── backend/
│   ├── AthenaXI.API/        # Minimal API endpoints
│   ├── AthenaXI.Core/       # Models, interfaces, DTOs
│   ├── AthenaXI.Data/       # EF Core, migrations
│   ├── AthenaXI.Scraper/    # HtmlAgilityPack scraping logic
│   ├── AthenaXI.Jobs/       # Hangfire background jobs
│   └── AthenaXI.Kafka/      # Producers & consumers
├── docs/
│   ├── PRD.md                 ← this file
│   ├── data-models.md
│   ├── scoring-rules.md
│   └── api-spec.md
└── .github/
    └── workflows/
        ├── deploy.yml
        ├── daily-score-sync.yml
        └── keep-alive.yml
```

---

## 8. Build Plan — 20 Days

### 🔵 Phase 1 — Foundation (Days 1–5)
| Day | Goal |
|-----|------|
| 1 | Repo setup, solution structure, Angular + .NET scaffolded, GitHub initialized |
| 2 | DB schema + EF Core migrations, seed IPL 2025 player data |
| 3 | JWT Auth — register, login endpoints in .NET |
| 4 | Angular auth — login page, JWT storage, route guards |
| 5 | Player list API + Angular player browser (filter by team/role) |

### 🟡 Phase 2 — Team Builder (Days 6–10)
| Day | Goal |
|-----|------|
| 6 | Team selection UI — pick Playing XI with constraints |
| 7 | Substitutes bench (5–8 players) |
| 8 | Assign C, VC, Impact Player with visual badges + validation |
| 9 | Save & lock team, confirmation screen |
| 10 | My Team dashboard — full squad, roles, points summary |

### 🟠 Phase 3 — Scoring + Kafka (Days 11–15)
| Day | Goal |
|-----|------|
| 11 | Web scraper — HtmlAgilityPack fetches ESPNcricinfo scorecard |
| 12 | Point calculation engine in C# (all rules from Section 4.3) |
| 13 | Kafka setup — Confluent Cloud, first producer publishing raw scores |
| 14 | Kafka consumers — points calculator + leaderboard updater |
| 15 | Hangfire job + GitHub Actions cron wiring it all together |

### 🔴 Phase 4 — Transfers, Deploy, Polish (Days 16–20)
| Day | Goal |
|-----|------|
| 16 | Transfer window logic — unlock/lock at match milestones |
| 17 | Transfer UI — swap bench ↔ XI, change C/VC/Impact |
| 18 | Deploy — GitHub Pages + Render + Supabase + Confluent all connected |
| 19 | Keep-alive workflow, monitoring, error handling, edge cases |
| 20 | README, architecture diagram, demo GIF, clean commit history |

---

## 9. Open Questions / Future Scope

- [ ] Confirm max substitutes per transfer window (suggesting 2 swaps)
- [ ] Notification system (email or push) when scores update — Kafka Consumer 3
- [ ] Mobile-responsive UI or PWA
- [ ] Admin panel to manually trigger score sync or open/close transfer windows
- [ ] Historical season data for previous IPL seasons
- [ ] Add more users beyond 9 (would require Render paid tier or Railway)

---

## 10. Decisions Log

| Date | Decision | Reason |
|------|----------|--------|
| Jun 2026 | SQLite dropped in favour of Supabase from day 1 | Stay free, avoid migration hassle later |
| Jun 2026 | Kafka added in Phase 3, not Day 1 | Learn the pain of direct DB writes first, appreciate Kafka more |
| Jun 2026 | No third-party auth (no Auth0/Firebase) | Learn JWT properly, keep stack free |
| Jun 2026 | Render over Railway | Render has more predictable free tier for .NET |
