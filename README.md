# 🏛️ AthenaXI

> *Strategy of the gods. Fantasy cricket for the serious fan.*

AthenaXI is a private fantasy IPL app built for a small group of friends. Pick your squad once, assign your Captain, Vice-Captain and Impact Player — then watch the points roll in as IPL matches are played. Transfers open at key match milestones to keep things interesting all season.

---

## ⚡ Features

- 🏏 **One-time team selection** — pick your Playing XI + 5–8 subs from the full IPL player pool
- 👑 **Role assignments** — Captain (2x), Vice-Captain (1.5x), Impact Player (1.25x)
- 🔄 **Transfer windows** — limited swaps after Match 18, 35 & 70
- 📊 **Live leaderboard** — auto-updated daily after each match
- 🤖 **Automated scoring** — scrapes ESPNcricinfo, processed via Kafka pipeline
- 🔐 **JWT auth** — each user has their own secure account

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Angular 17+ (standalone components) |
| Backend | .NET 8 Minimal API |
| Database | Supabase (PostgreSQL) |
| Messaging | Apache Kafka (Confluent Cloud) |
| Scraper | HtmlAgilityPack (.NET) |
| Jobs | Hangfire |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages (FE) + Render (BE) |

**100% free to run.**

---

## 📁 Project Structure

```
athenaxi/
├── frontend/                  # Angular app
├── backend/
│   ├── AthenaXI.API/          # Minimal API + endpoints
│   ├── AthenaXI.Core/         # Models, interfaces, DTOs
│   ├── AthenaXI.Data/         # EF Core + migrations
│   ├── AthenaXI.Scraper/      # ESPNcricinfo scraper
│   ├── AthenaXI.Jobs/         # Hangfire background jobs
│   └── AthenaXI.Kafka/        # Producers & consumers
├── docs/
│   ├── PRD.md                 # Full product spec
│   ├── data-models.md         # DB schema reference
│   ├── scoring-rules.md       # Points system
│   └── api-spec.md            # API endpoints
└── .github/workflows/
    ├── deploy.yml             # Deploy on push to main
    ├── daily-score-sync.yml   # Nightly scraper cron
    └── keep-alive.yml         # Render cold start prevention
```

---

## 🚀 Getting Started (Local Dev)

### Prerequisites
- Node.js 20+
- Angular CLI (`npm install -g @angular/cli`)
- .NET 8 SDK
- Docker (for local Kafka)

### Frontend
```bash
cd frontend
npm install
ng serve
# Runs at http://localhost:4200
```

### Backend
```bash
cd backend
dotnet restore
dotnet run --project AthenaXI.API
# Runs at http://localhost:5000
```

### Local Kafka (Docker)
```bash
docker-compose up -d
# Kafka at localhost:9092
```

---

## 📅 Build Log

| Day | What was built |
|-----|---------------|
| Day 1 | Repo setup, folder structure, documentation, README |

---

## 📄 Docs

- [Product Requirements](docs/PRD.md)
- [Data Models](docs/data-models.md)
- [Scoring Rules](docs/scoring-rules.md)
- [API Spec](docs/api-spec.md)

---

## 👤 Author

Built as a learning project — fullstack Angular + .NET 8 + Kafka + web scraping.
