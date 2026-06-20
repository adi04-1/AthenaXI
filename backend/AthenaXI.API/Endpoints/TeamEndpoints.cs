using AthenaXI.API.Services;
using AthenaXI.Core.DTOs;
using AthenaXI.Core.Enums;
using AthenaXI.Core.Models;
using AthenaXI.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AthenaXI.API.Endpoints;

public static class TeamEndpoints
{
    public static void MapTeamEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/teams").WithTags("Teams");

        // ── POST /api/teams ───────────────────────────────────────────────────
        // Create team + login — Admin or AppOwner
        group.MapPost("/", async (
            CreateFantasyTeamRequest req,
            AthenaXIDbContext db,
            TokenService tokenSvc,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var season = await db.Seasons
                .Include(s => s.Config)
                .FirstOrDefaultAsync(s => s.Id == req.SeasonId);
            if (season is null)
                return Results.NotFound(new { error = "Season not found." });

            // Validate short code unique per season
            if (await db.FantasyTeams.AnyAsync(t =>
                    t.SeasonId == req.SeasonId &&
                    t.ShortCode == req.ShortCode.ToUpper()))
                return Results.Conflict(new { error = "Short code already used in this season." });

            // Validate username unique
            if (await db.Users.AnyAsync(u => u.Username == req.Username.Trim().ToLower()))
                return Results.Conflict(new { error = "Username already taken." });

            // Check team count limit
            var teamCount = await db.FantasyTeams.CountAsync(t => t.SeasonId == req.SeasonId);
            if (season.Config is not null && teamCount >= 20)
                return Results.BadRequest(new { error = "Maximum teams reached for this season." });

            // Create user login
            var user = new User
            {
                Username     = req.Username.Trim().ToLower(),
                Email        = $"{req.Username.Trim().ToLower()}@athenaxi.local",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
                PlainPassword = req.Password, // admin-recovery field — see security note on User model
                Role         = UserRole.TeamOwner,
                TeamName     = req.TeamName,
                IsActive     = true,
            };
            db.Users.Add(user);
            await db.SaveChangesAsync();

            // Create fantasy team
            var team = new FantasyTeam
            {
                UserId           = user.Id,
                SeasonId         = req.SeasonId,
                Name             = req.TeamName.Trim(),
                ShortCode        = req.ShortCode.Trim().ToUpper(),
                ThemeColour      = req.ThemeColour,
                OwnerDisplayName = req.OwnerDisplayName.Trim(),
                IsActive         = true,
            };
            db.FantasyTeams.Add(team);

            // Create UserTeam (season squad tracker)
            var userTeam = new UserTeam
            {
                UserId             = user.Id,
                SeasonId           = req.SeasonId,
                BudgetRemainingCr  = season.Config?.BudgetPerTeamCr ?? 120,
                RtmSlotsRemaining  = season.Config?.RtmSlotsPerTeam ?? 1,
                IsLocked           = false,
            };
            db.UserTeams.Add(userTeam);
            await db.SaveChangesAsync();

            var (token, _) = tokenSvc.GenerateToken(user);

            return Results.Created($"/api/teams/{team.Id}", new FantasyTeamResponse(
                team.Id, team.SeasonId, team.Name, team.ShortCode,
                team.ThemeColour, team.OwnerDisplayName, user.Username,
                userTeam.BudgetRemainingCr, 0, []));
        }).RequireAuthorization();

        // ── GET /api/teams/season/{seasonId} ──────────────────────────────────
        group.MapGet("/season/{seasonId:guid}", async (
            Guid seasonId,
            AthenaXIDbContext db) =>
        {
            var teams = await db.FantasyTeams
                .Include(t => t.User)
                .Include(t => t.RetainedPlayers)
                    .ThenInclude(r => r.Player)
                .Where(t => t.SeasonId == seasonId && t.IsActive)
                .ToListAsync();

            var userTeams = await db.UserTeams
                .Where(ut => ut.SeasonId == seasonId)
                .ToDictionaryAsync(ut => ut.UserId);

            var response = teams.Select(t =>
            {
                userTeams.TryGetValue(t.UserId, out var ut);
                return new FantasyTeamResponse(
                    t.Id, t.SeasonId, t.Name, t.ShortCode,
                    t.ThemeColour, t.OwnerDisplayName, t.User.Username,
                    ut?.BudgetRemainingCr ?? 0,
                    ut?.Players.Count ?? 0,
                    t.RetainedPlayers.Select(r => new RetainedPlayerResponse(
                        r.PlayerId, r.Player.Name, r.Player.IPLTeam,
                        r.Player.Role.ToString(), r.RetentionCostCr,
                        r.Slot.ToString())).ToList());
            });

            return Results.Ok(response);
        }).AllowAnonymous();

        // ── GET /api/teams/{id} ───────────────────────────────────────────────
        group.MapGet("/{id:guid}", async (Guid id, AthenaXIDbContext db) =>
        {
            var team = await db.FantasyTeams
                .Include(t => t.User)
                .Include(t => t.RetainedPlayers).ThenInclude(r => r.Player)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (team is null) return Results.NotFound();

            var ut = await db.UserTeams
                .Include(u => u.Players).ThenInclude(p => p.Player)
                .FirstOrDefaultAsync(u => u.UserId == team.UserId && u.SeasonId == team.SeasonId);

            return Results.Ok(new FantasyTeamResponse(
                team.Id, team.SeasonId, team.Name, team.ShortCode,
                team.ThemeColour, team.OwnerDisplayName, team.User.Username,
                ut?.BudgetRemainingCr ?? 0,
                ut?.Players.Count ?? 0,
                team.RetainedPlayers.Select(r => new RetainedPlayerResponse(
                    r.PlayerId, r.Player.Name, r.Player.IPLTeam,
                    r.Player.Role.ToString(), r.RetentionCostCr,
                    r.Slot.ToString())).ToList()));
        }).AllowAnonymous();

        // ── GET /api/teams/my/{seasonId} ──────────────────────────────────────
        // Current logged-in team owner's team
        group.MapGet("/my/{seasonId:guid}", async (
            Guid seasonId,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            var userId = Guid.Parse(caller.FindFirst("userId")!.Value);

            var team = await db.FantasyTeams
                .Include(t => t.RetainedPlayers).ThenInclude(r => r.Player)
                .FirstOrDefaultAsync(t => t.UserId == userId && t.SeasonId == seasonId);

            if (team is null) return Results.NotFound(new { error = "No team found for this season." });

            var ut = await db.UserTeams
                .Include(u => u.Players).ThenInclude(p => p.Player)
                .FirstOrDefaultAsync(u => u.UserId == userId && u.SeasonId == seasonId);

            return Results.Ok(new FantasyTeamResponse(
                team.Id, team.SeasonId, team.Name, team.ShortCode,
                team.ThemeColour, team.OwnerDisplayName, caller.Identity!.Name ?? "",
                ut?.BudgetRemainingCr ?? 0,
                ut?.Players.Count ?? 0,
                team.RetainedPlayers.Select(r => new RetainedPlayerResponse(
                    r.PlayerId, r.Player.Name, r.Player.IPLTeam,
                    r.Player.Role.ToString(), r.RetentionCostCr,
                    r.Slot.ToString())).ToList(),
                Players: ut?.Players.Select(p => new SquadPlayerResponse(
                    p.Id,
                    new PlayerSummary(p.PlayerId, p.Player.Name, p.Player.IPLTeam,
                        p.Player.Role.ToString(), p.Player.IsOverseas),
                    p.Slot.ToString(),
                    p.IsCaptain, p.IsViceCaptain, p.IsImpactPlayer,
                    p.PurchasedPriceCr)).ToList() ?? new List<SquadPlayerResponse>(),
                RtmSlotsRemaining: ut?.RtmSlotsRemaining ?? 0));
        }).RequireAuthorization();

        // ── PUT /api/teams/{id} ───────────────────────────────────────────────
        group.MapPut("/{id:guid}", async (
            Guid id,
            UpdateFantasyTeamRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            var userId  = Guid.Parse(caller.FindFirst("userId")!.Value);
            var isAdmin = IsAdminOrOwner(caller);

            var team = await db.FantasyTeams.FindAsync(id);
            if (team is null) return Results.NotFound();

            // Only the team owner or admin can update
            if (team.UserId != userId && !isAdmin)
                return Results.Forbid();

            team.Name             = req.TeamName.Trim();
            team.ShortCode        = req.ShortCode.Trim().ToUpper();
            team.ThemeColour      = req.ThemeColour;
            team.OwnerDisplayName = req.OwnerDisplayName.Trim();

            // Password reset — admin only, never allowed via self-service team update
            if (isAdmin && !string.IsNullOrWhiteSpace(req.NewPassword))
            {
                var user = await db.Users.FindAsync(team.UserId);
                if (user is not null)
                {
                    user.PasswordHash  = BCrypt.Net.BCrypt.HashPassword(req.NewPassword);
                    user.PlainPassword = req.NewPassword; // admin-recovery field — see security note on User model
                }
            }

            await db.SaveChangesAsync();

            return Results.Ok(new { message = "Team updated." });
        }).RequireAuthorization();

        // ── GET /api/teams/{id}/credentials ───────────────────────────────────
        // Admin-only — reveals username + plaintext password for recovery.
        // See security note on User.PlainPassword in Models.cs.
        group.MapGet("/{id:guid}/credentials", async (
            Guid id,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var team = await db.FantasyTeams.FindAsync(id);
            if (team is null) return Results.NotFound();

            var user = await db.Users.FindAsync(team.UserId);
            if (user is null) return Results.NotFound();

            return Results.Ok(new TeamCredentialsResponse(team.Id, user.Username, user.PlainPassword));
        }).RequireAuthorization();

        // ── POST /api/teams/retentions ────────────────────────────────────────
        // Upload retention list — Admin only
        group.MapPost("/retentions", async (
            UploadRetentionsRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var season = await db.Seasons
                .Include(s => s.Config)
                .FirstOrDefaultAsync(s => s.Id == req.SeasonId);

            if (season is null) return Results.NotFound(new { error = "Season not found." });
            if (season.Mode == SeasonMode.FreshAuction)
                return Results.BadRequest(new { error = "This season is Fresh Auction — no retentions allowed." });

            var config    = season.Config!;
            var errors    = new List<string>();
            var toInsert  = new List<RetainedPlayer>();

            foreach (var entry in req.Retentions)
            {
                // Find team
                var team = await db.FantasyTeams
                    .FirstOrDefaultAsync(t => t.SeasonId == req.SeasonId &&
                                              t.ShortCode == entry.TeamShortCode.ToUpper());
                if (team is null) { errors.Add($"Team '{entry.TeamShortCode}' not found."); continue; }

                // Find player
                var player = await db.Players
                    .FirstOrDefaultAsync(p => p.Name.ToLower() == entry.PlayerName.ToLower().Trim());
                if (player is null) { errors.Add($"Player '{entry.PlayerName}' not found in pool."); continue; }

                // Check duplicate
                if (await db.RetainedPlayers.AnyAsync(r =>
                        r.FantasyTeamId == team.Id && r.PlayerId == player.Id))
                { errors.Add($"{entry.PlayerName} already retained by {entry.TeamShortCode}."); continue; }

                // Check max retention count
                var retainedCount = await db.RetainedPlayers
                    .CountAsync(r => r.FantasyTeamId == team.Id);
                if (retainedCount >= config.MaxRetainedPlayersPerTeam)
                { errors.Add($"{entry.TeamShortCode} has reached max retentions ({config.MaxRetainedPlayersPerTeam})."); continue; }

                // Check overseas limit
                if (player.IsOverseas)
                {
                    var overseasRetained = await db.RetainedPlayers
                        .Include(r => r.Player)
                        .CountAsync(r => r.FantasyTeamId == team.Id && r.Player.IsOverseas);
                    if (overseasRetained >= config.MaxOverseasRetained)
                    { errors.Add($"{entry.TeamShortCode} overseas retention limit reached."); continue; }
                }

                // Deduct from budget
                var ut = await db.UserTeams
                    .FirstOrDefaultAsync(u => u.UserId == team.UserId && u.SeasonId == req.SeasonId);
                if (ut is not null)
                    ut.BudgetRemainingCr -= entry.RetentionCostCr;

                if (!Enum.TryParse<TeamSlot>(entry.Slot, out var slot))
                    slot = TeamSlot.PlayingXI;

                toInsert.Add(new RetainedPlayer
                {
                    FantasyTeamId    = team.Id,
                    SeasonId         = req.SeasonId,
                    PlayerId         = player.Id,
                    RetentionCostCr  = entry.RetentionCostCr,
                    Slot             = slot,
                });
            }

            if (errors.Any())
                return Results.BadRequest(new { errors });

            db.RetainedPlayers.AddRange(toInsert);
            await db.SaveChangesAsync();

            return Results.Ok(new
            {
                message  = $"{toInsert.Count} player(s) retained successfully.",
                retained = toInsert.Count
            });
        }).RequireAuthorization();

        // ── DELETE /api/teams/retentions/{id} ─────────────────────────────────
        group.MapDelete("/retentions/{id:guid}", async (
            Guid id,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var retention = await db.RetainedPlayers
                .Include(r => r.FantasyTeam)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (retention is null) return Results.NotFound();

            // Refund budget
            var ut = await db.UserTeams.FirstOrDefaultAsync(u =>
                u.UserId == retention.FantasyTeam.UserId &&
                u.SeasonId == retention.SeasonId);
            if (ut is not null)
                ut.BudgetRemainingCr += retention.RetentionCostCr;

            db.RetainedPlayers.Remove(retention);
            await db.SaveChangesAsync();

            return Results.Ok(new { message = "Retention removed and budget refunded." });
        }).RequireAuthorization();
    }

    private static bool IsAdminOrOwner(ClaimsPrincipal caller)
    {
       return caller.IsInRole(nameof(UserRole.AppOwner))
        || caller.IsInRole(nameof(UserRole.LeagueAdmin));
    }
}
