using AthenaXI.Core.DTOs;
using AthenaXI.Core.Enums;
using AthenaXI.Core.Models;
using AthenaXI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AthenaXI.API.Endpoints;

public static class PlayerEndpoints
{
    public static void MapPlayerEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/players").WithTags("Players");

        // ── POST /api/players/upload ──────────────────────────────────────────
        group.MapPost("/upload", async (
            List<PlayerUploadRow> rows,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var errors   = new List<string>();
            var imported = 0;
            var skipped  = 0;
            var validRoles = new[] { "Batsman", "Bowler", "AllRounder", "WicketKeeper" };
            var validTeams = new[] { "CSK","MI","RCB","KKR","SRH","DC","PBKS","RR","GT","LSG" };

            foreach (var (row, idx) in rows.Select((r, i) => (r, i + 1)))
            {
                if (string.IsNullOrWhiteSpace(row.PlayerName))
                { errors.Add($"Row {idx}: player_name is required."); skipped++; continue; }

                if (!validTeams.Contains(row.IplTeam?.ToUpper()))
                { errors.Add($"Row {idx} ({row.PlayerName}): invalid ipl_team '{row.IplTeam}'."); skipped++; continue; }

                if (!validRoles.Contains(row.Role))
                { errors.Add($"Row {idx} ({row.PlayerName}): invalid role '{row.Role}'."); skipped++; continue; }

                if (!Enum.TryParse<PlayerRole>(row.Role, out var role))
                { errors.Add($"Row {idx} ({row.PlayerName}): could not parse role."); skipped++; continue; }

                if (await db.Players.AnyAsync(p => p.Name.ToLower() == row.PlayerName.ToLower().Trim()))
                { skipped++; continue; }

                db.Players.Add(new Player
                {
                    Name         = row.PlayerName.Trim(),
                    IPLTeam      = row.IplTeam.ToUpper().Trim(),
                    Role         = role,
                    IsOverseas   = row.IsOverseas,
                    IsUncapped   = row.IsUncapped,
                    BasePriceCr  = row.BasePriceCr,
                    Nationality  = row.Nationality,
                    BattingStyle = row.BattingStyle,
                    BowlingStyle = row.BowlingStyle,
                    Notes        = row.Notes,
                    IsActive     = true,
                });
                imported++;
            }

            await db.SaveChangesAsync();
            return Results.Ok(new PlayerUploadResultResponse(rows.Count, imported, skipped, errors));
        }).RequireAuthorization("AdminOrOwner");

        // ── POST /api/players/auction-order/{seasonId} ────────────────────────
        group.MapPost("/auction-order/{seasonId:guid}", async (
            Guid seasonId,
            List<AuctionOrderRow> rows,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var season = await db.Seasons.FindAsync(seasonId);
            if (season is null) return Results.NotFound(new { error = "Season not found." });

            var existing = await db.AuctionSessions
                .FirstOrDefaultAsync(a => a.SeasonId == seasonId && a.Status != AuctionStatus.Completed);
            if (existing is not null)
                return Results.Conflict(new { error = "Auction session already exists. Complete or delete it first." });

            var errors   = new List<string>();
            var imported = 0;
            var skipped  = 0;
            var validSets = new[] { "Marquee","Batsmen","Bowlers","AllRounders","WicketKeepers","Uncapped" };

            var session = new AuctionSession
            {
                SeasonId           = seasonId,
                Status             = AuctionStatus.NotStarted,
                CurrentPlayerIndex = 0,
            };
            db.AuctionSessions.Add(session);
            await db.SaveChangesAsync();

            foreach (var (row, idx) in rows.Select((r, i) => (r, i + 1)))
            {
                if (string.IsNullOrWhiteSpace(row.PlayerName))
                { errors.Add($"Row {idx}: player_name required."); skipped++; continue; }

                if (!validSets.Contains(row.AuctionSet))
                { errors.Add($"Row {idx} ({row.PlayerName}): invalid auction_set '{row.AuctionSet}'."); skipped++; continue; }

                var player = await db.Players
                    .FirstOrDefaultAsync(p => p.Name.ToLower() == row.PlayerName.ToLower().Trim());
                if (player is null)
                { errors.Add($"Row {idx}: Player '{row.PlayerName}' not found. Upload players first."); skipped++; continue; }

                if (await db.AuctionPlayerSlots.AnyAsync(s =>
                        s.AuctionSessionId == session.Id && s.AuctionOrder == row.AuctionOrder))
                { errors.Add($"Row {idx}: Duplicate auction_order {row.AuctionOrder}."); skipped++; continue; }

                db.AuctionPlayerSlots.Add(new AuctionPlayerSlot
                {
                    AuctionSessionId = session.Id,
                    PlayerId         = player.Id,
                    AuctionOrder     = row.AuctionOrder,
                    AuctionSet       = row.AuctionSet,
                    SetDisplayName   = row.SetDisplayName,
                    BasePriceCr      = row.BasePriceCr,
                    BidIncrementCr   = row.BidIncrementCr,
                    RtmTeam          = row.RtmTeam,
                    Status           = AuctionSlotStatus.Pending,
                });
                imported++;
            }

            await db.SaveChangesAsync();
            return Results.Ok(new AuctionOrderUploadResultResponse(
                rows.Count, imported, skipped, errors, session.Id));
        }).RequireAuthorization("AdminOrOwner");

        // ── POST /api/players/direct-allocation/{seasonId} ────────────────────
        group.MapPost("/direct-allocation/{seasonId:guid}", async (
            Guid seasonId,
            List<DirectAllocationRow> rows,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var season = await db.Seasons
                .Include(s => s.Config)
                .FirstOrDefaultAsync(s => s.Id == seasonId);
            if (season is null) return Results.NotFound(new { error = "Season not found." });
            if (season.Mode != SeasonMode.DirectAllocation)
                return Results.BadRequest(new { error = "Season is not in Direct Allocation mode." });

            var errors   = new List<string>();
            var imported = 0;
            var skipped  = 0;

            foreach (var (row, idx) in rows.Select((r, i) => (r, i + 1)))
            {
                var team = await db.FantasyTeams
                    .FirstOrDefaultAsync(t => t.SeasonId == seasonId &&
                                              t.ShortCode == row.TeamShortCode.ToUpper());
                if (team is null) { errors.Add($"Row {idx}: Team '{row.TeamShortCode}' not found."); skipped++; continue; }

                var player = await db.Players
                    .FirstOrDefaultAsync(p => p.Name.ToLower() == row.PlayerName.ToLower().Trim());
                if (player is null) { errors.Add($"Row {idx}: Player '{row.PlayerName}' not found."); skipped++; continue; }

                if (!Enum.TryParse<TeamSlot>(row.Slot, out var slot)) slot = TeamSlot.PlayingXI;

                var ut = await db.UserTeams
                    .FirstOrDefaultAsync(u => u.UserId == team.UserId && u.SeasonId == seasonId);
                if (ut is null) { errors.Add($"Row {idx}: No UserTeam for {row.TeamShortCode}."); skipped++; continue; }

                if (await db.UserTeamPlayers.AnyAsync(p =>
                        p.UserTeamId == ut.Id && p.PlayerId == player.Id))
                { skipped++; continue; }

                db.UserTeamPlayers.Add(new UserTeamPlayer
                {
                    UserTeamId     = ut.Id,
                    PlayerId       = player.Id,
                    Slot           = slot,
                    IsCaptain      = row.IsCaptain,
                    IsViceCaptain  = row.IsViceCaptain,
                    IsImpactPlayer = row.IsImpactPlayer,
                    PurchasedPriceCr = 0,
                });
                imported++;
            }

            if (errors.Any() && imported == 0)
                return Results.BadRequest(new { errors });

            await db.SaveChangesAsync();
            season.Status = SeasonStatus.InProgress;
            await db.SaveChangesAsync();

            return Results.Ok(new { message = $"{imported} players allocated.", imported, skipped, errors });
        }).RequireAuthorization("AdminOrOwner");

        // ── GET /api/players ──────────────────────────────────────────────────
        group.MapGet("/", async (
            [FromQuery] string? iplTeam,
            [FromQuery] string? role,
            [FromQuery] bool? isOverseas,
            [FromQuery] bool? isUncapped,
            [FromQuery] string? search,
            AthenaXIDbContext db) =>
        {
            var query = db.Players.Where(p => p.IsActive).AsQueryable();
            if (!string.IsNullOrWhiteSpace(iplTeam)) query = query.Where(p => p.IPLTeam == iplTeam.ToUpper());
            if (!string.IsNullOrWhiteSpace(role) && Enum.TryParse<PlayerRole>(role, out var r)) query = query.Where(p => p.Role == r);
            if (isOverseas.HasValue) query = query.Where(p => p.IsOverseas == isOverseas.Value);
            if (isUncapped.HasValue) query = query.Where(p => p.IsUncapped == isUncapped.Value);
            if (!string.IsNullOrWhiteSpace(search)) query = query.Where(p => p.Name.ToLower().Contains(search.ToLower()));

            var players = await query.OrderBy(p => p.IPLTeam).ThenBy(p => p.Name)
                .Select(p => new PlayerResponse(p.Id, p.Name, p.IPLTeam, p.Role.ToString(),
                    p.IsOverseas, p.IsUncapped, p.BasePriceCr,
                    p.Nationality, p.BattingStyle, p.BowlingStyle, p.Notes))
                .ToListAsync();
            return Results.Ok(players);
        }).AllowAnonymous();

        // ── GET /api/players/{id} ─────────────────────────────────────────────
        group.MapGet("/{id:guid}", async (Guid id, AthenaXIDbContext db) =>
        {
            var p = await db.Players.FindAsync(id);
            if (p is null || !p.IsActive) return Results.NotFound();
            return Results.Ok(new PlayerResponse(p.Id, p.Name, p.IPLTeam, p.Role.ToString(),
                p.IsOverseas, p.IsUncapped, p.BasePriceCr,
                p.Nationality, p.BattingStyle, p.BowlingStyle, p.Notes));
        }).AllowAnonymous();

        // ── DELETE /api/players/{id} ──────────────────────────────────────────
        group.MapDelete("/{id:guid}", async (
            Guid id, AthenaXIDbContext db, ClaimsPrincipal caller) =>
        {
            if (!IsAppOwner(caller)) return Results.Forbid();
            var player = await db.Players.FindAsync(id);
            if (player is null) return Results.NotFound();
            player.IsActive = false;
            await db.SaveChangesAsync();
            return Results.Ok(new { message = "Player deactivated." });
        }).RequireAuthorization("AppOwnerOnly");
    }

    private static string? GetRole(ClaimsPrincipal caller) =>
        caller.FindFirst("role")?.Value
        ?? caller.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

    private static bool IsAdminOrOwner(ClaimsPrincipal caller)
    {
        return caller.IsInRole(nameof(UserRole.AppOwner))
        || caller.IsInRole(nameof(UserRole.LeagueAdmin));
    }

    private static bool IsAppOwner(ClaimsPrincipal caller) =>
        GetRole(caller) == nameof(UserRole.AppOwner);
}
