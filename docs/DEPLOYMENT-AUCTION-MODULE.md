# AthenaXI — Deployment Plan (Auction Module Scope)

> Covers: Auth, Seasons, Teams, Players, Auction, Notifications, Leaderboard (read-only).
> Excludes: Season scoring engine, Transfers, Kafka — those ship as a separate deploy once the Season module is built.
> Stack: Render.com (API) + Supabase (Postgres) + GitHub Pages (Angular) + GitHub Actions (CI/CD).
> Cost: $0/month on all four services at this scope.

---

## 1. Pre-flight checklist (do this before touching any deploy config)

These are blocking — none of the deploy steps below will produce a working app if these aren't done first, since they're things already identified as broken or pending in `TECHNICAL.md`.

1. **Run the pending `AuctionInvites` SQL migration in Supabase.** Without it, every invite-accept request 404s in production exactly like it did locally — this isn't a local-only bug, the table genuinely doesn't exist anywhere yet.
2. **Confirm the `Mode` column exists on `Seasons`** (same migration file, second statement). Both are in `fix-auction-invites-table.sql` already on hand.
3. **Decide now whether the planned `PlainPassword` column ships in this deploy or waits.** If you want team password view/edit live for this auction, run that `ALTER TABLE` too. If not, skip it — don't run it "just in case," since every day it exists is a day team passwords are sitting in cleartext in the database.
4. **Rotate the JWT signing key and the seeded AppOwner password before going live.** `WrathOfGod@2026!` is in this very documentation file, which means it's effectively public the moment this repo is pushed anywhere. Generate a new strong key for `Jwt:Key` and change the AppOwner password via the app once seeded.

---

## 2. Backend — Render.com free Web Service

### 2.1 What free tier actually gives you here
Render's free **Web Service** tier (distinct from their free Postgres, which you're not using since Supabase already hosts the DB) gives:
- 750 instance-hours/month — enough for one always-deployed service running continuously, since a month only has ~720 hours.
- Sleeps after **15 minutes of no inbound traffic**, cold-starts on the next request in roughly 10-30 seconds. You've already accepted this tradeoff for live auctions — make sure whoever's running the auction night knows to open the admin lobby a minute early to "wake" the service before teams join.
- No persistent disk — irrelevant here since all state lives in Supabase Postgres, nothing is written to local disk.
- Auto-deploys from a GitHub branch on every push, which is what the CI/CD step below wires up.

### 2.2 Render service configuration
Create a **New Web Service** in Render, connected to the `athenaxi` GitHub repo, with:

| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Runtime | Docker (recommended) or Native .NET runtime if Render's .NET buildpack is available in your region |
| Build Command (native) | `dotnet publish AthenaXI.API/AthenaXI.API.csproj -c Release -o out` |
| Start Command (native) | `dotnet out/AthenaXI.API.dll` |
| Health Check Path | `/health` (already exists, returns `{status:"healthy",...}`, `AllowAnonymous`) |

If you go the Docker route instead (more reliable across Render's .NET version changes), here's a minimal Dockerfile to add at `backend/Dockerfile`:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish AthenaXI.API/AthenaXI.API.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000
ENTRYPOINT ["dotnet", "AthenaXI.API.dll"]
```

Render injects `PORT` as an env var on native runtime; on Docker you control it via `ASPNETCORE_URLS` as above — Render free tier expects the container to listen on port `10000` by convention, double-check this against Render's current docs for Docker services since they occasionally change the expected port.

### 2.3 Environment variables to set in Render dashboard
None of these should live in `appsettings.json` in the repo — they go in Render's environment variable panel instead.

| Key | Value | Notes |
|---|---|---|
| `ConnectionStrings__DefaultConnection` | your Supabase connection string | Use the **pooled** connection string (port 6543, `pgbouncer=true`) from Supabase's connection settings, not the direct one — Render's free tier and Supabase's direct connections don't always play well together for sustained connections, and EF migrations are already known to block against Supabase per existing notes |
| `Jwt__Key` | a new long random secret | Generate fresh — do not reuse `WrathOfGod@2026!`-adjacent values |
| `Jwt__Issuer` | `AthenaXI` | Match whatever `Program.cs` expects |
| `Jwt__Audience` | `AthenaXI` | Same |
| `ASPNETCORE_ENVIRONMENT` | `Production` | Disables dev-only behaviors |

### 2.4 CORS — update before deploying, not after
`Program.cs` currently allows `http://localhost:4200` and a placeholder `https://YOURUSERNAME.github.io`. Before deploying, replace that placeholder with your actual GitHub Pages URL (e.g. `https://yourusername.github.io`), or the Angular app will be silently blocked by CORS the moment it's live — this is a one-line miss that produces a confusing "network error" with no obvious cause in the browser console beyond a CORS rejection.

---

## 3. Database — Supabase (already in place, just hardening)

1. **Run the pending migration** from §1 above if not already done.
2. **Check Row Level Security (RLS).** Since the .NET API connects with a single service-role-equivalent connection string and does all authorization in application code (the `IsInRole`/policy checks already built), RLS should either be fully disabled on these tables or explicitly allow the connection role full access — partial RLS rules here would silently break queries in ways that look like application bugs. For a closed friend-group app talking only to your own backend, disabling RLS entirely on these tables is the simplest correct choice; just confirm Supabase didn't enable it by default on table creation.
3. **Connection pooling**: use the pooled connection string (transaction mode, port 6543) for the app's runtime connection string in Render, since Supabase's free tier has a real cap on direct/session connections and a live auction with multiple polling clients (each team owner's browser polling every 3s) will exercise this harder than normal CRUD traffic.
4. **Backup before auction night.** Supabase free tier doesn't include point-in-time recovery — take a manual export (`pg_dump` via Supabase's dashboard or CLI) right before the live auction starts, so a bad `admin-correct` call or accidental delete has a recovery path.

---

## 4. Frontend — GitHub Pages

### 4.1 Build for Pages
Angular's hash routing (`withHashLocation()`, already configured) is what makes GitHub Pages viable without server-side rewrite rules — Pages can't do path-based SPA fallback on the free tier, so hash routing avoiding that requirement is the right call already made.

```bash
cd frontend
ng build --configuration production --base-href /athenaxi/
```

Adjust `--base-href` to match your actual repo name if you're deploying to `https://yourusername.github.io/athenaxi/` (the standard project-pages pattern) rather than a root `yourusername.github.io` user-pages repo.

### 4.2 Point the Angular environment at the deployed API
Before building, `frontend/src/environments/environment.prod.ts` (or whichever file the prod build config points to) needs `apiUrl` updated from `http://localhost:5000/api` to your Render service's actual URL, e.g. `https://athenaxi-api.onrender.com/api`. This is easy to miss since dev work never touches this file.

### 4.3 GitHub Pages settings
In the repo's Settings → Pages, set the source to the `gh-pages` branch (or `/docs` folder, depending on which convention the CI workflow below uses) — `gh-pages` branch via an action is the more common and flexible choice.

---

## 5. CI/CD — GitHub Actions

Two independent workflows: one deploys the Angular build to GitHub Pages on push to `main`, the other is just Render's own auto-deploy webhook (Render handles this itself once the GitHub repo is connected in §2.2 — no custom Action needed for the backend).

`.github/workflows/deploy-frontend.yml`:

```yaml
name: Deploy Frontend to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        working-directory: frontend
        run: npm ci

      - name: Build
        working-directory: frontend
        run: ng build --configuration production --base-href /athenaxi/

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: frontend/dist/athenaxi/browser
```

Adjust `publish_dir` to match the actual output path Angular 17's `application` builder produces for your project name — it nests under `browser/` in newer Angular versions, which is an easy path mismatch to miss.

The backend needs no custom workflow file at all: Render's GitHub integration auto-builds and redeploys on every push to the connected branch once the service is created in §2.2. Keeping that as Render's native behavior rather than scripting it yourself avoids fighting Render's own deploy lifecycle.

---

## 6. Auction-night specific operational notes

These aren't deploy steps, but they're things that only matter once this module is actually live and your friend group is using it for a real auction, so they belong in this plan rather than being discovered live.

1. **Wake the backend ~2 minutes before the auction starts** by hitting `/health` once from any browser — this absorbs the cold-start delay before anyone is actively trying to bid.
2. **The 3-second polling interval means up to ~3s of staleness** is normal during fast bidding — this was an accepted tradeoff (§2 of TECHNICAL.md), not a bug, but worth mentioning to the group so a slightly-stale standings panel doesn't look broken.
3. **Take the Supabase backup mentioned in §3.4 right before** auction start, not days before — auction data (teams, budgets, players) is exactly what you can't easily reconstruct if something goes wrong mid-auction.
4. **Have the Swagger UI (`/`, since `RoutePrefix = string.Empty`) open in a second tab** as the admin's fallback — it's already proven useful for testing invite-accept and triggering endpoints manually when the UI had gaps, and that same fallback value carries into live auction night if something in the UI misbehaves under real usage.

---

## 7. Explicit non-goals of this deployment

To keep this plan honest about scope: this deploy does **not** include Kafka (Confluent Cloud), the scraper, the scoring engine, or transfer windows, since none of those are built yet. Deploying now means deploying Auth + Seasons + Teams + Players + Auction + Notifications + read-only Leaderboard only. The Season module ships as a second, additive deploy later — same Render service, same Supabase instance, just more endpoints and a new set of frontend routes added on top, not a separate infrastructure setup.
