using AthenaXI.Core.DTOs;
using AthenaXI.Core.Enums;
using AthenaXI.Core.Models;
using AthenaXI.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AthenaXI.API.Endpoints;

public static class LeaderboardEndpoints
{
    public static void MapLeaderboardEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/leaderboard").WithTags("Leaderboard");

        // ── GET /api/leaderboard/{seasonId} ───────────────────────────────────
        // Ranked leaderboard — guest accessible
        group.MapGet("/{seasonId:guid}", async (
            Guid seasonId,
            AthenaXIDbContext db) =>
        {
            var teams = await db.FantasyTeams
                .Where(t => t.SeasonId == seasonId && t.IsActive)
                .ToListAsync();

            var userTeams = await db.UserTeams
                .Include(ut => ut.Players)
                .Where(ut => ut.SeasonId == seasonId)
                .ToDictionaryAsync(ut => ut.UserId);

            var matchesPlayed = await db.MatchEvents
                .CountAsync(m => m.SeasonId == seasonId &&
                                 m.Status == MatchStatus.Completed);

            // Calculate total points per team
            var leaderboard = new List<LeaderboardRow>();

            foreach (var team in teams)
            {
                if (!userTeams.TryGetValue(team.UserId, out var ut)) continue;

                var playerIds = ut.Players.Select(p => p.PlayerId).ToList();

                // Sum final points for all team players across all matches
                var totalPoints = await db.PlayerMatchPoints
                    .Where(p => playerIds.Contains(p.PlayerId))
                    .SumAsync(p => (decimal?)p.BasePoints) ?? 0;

                // Points in last match
                var lastMatch = await db.MatchEvents
                    .Where(m => m.SeasonId == seasonId && m.Status == MatchStatus.Completed)
                    .OrderByDescending(m => m.MatchNumber)
                    .FirstOrDefaultAsync();

                decimal lastMatchPts = 0;
                if (lastMatch is not null)
                {
                    lastMatchPts = await db.PlayerMatchPoints
                        .Where(p => playerIds.Contains(p.PlayerId) &&
                                    p.MatchEventId == lastMatch.Id)
                        .SumAsync(p => (decimal?)p.BasePoints) ?? 0;
                }

                leaderboard.Add(new LeaderboardRow(
                    0, team.Id, team.Name, team.ShortCode,
                    team.ThemeColour, team.OwnerDisplayName,
                    totalPoints, matchesPlayed, lastMatchPts));
            }

            // Rank by total points
            var ranked = leaderboard
                .OrderByDescending(r => r.TotalPoints)
                .Select((r, i) => r with { Rank = i + 1 })
                .ToList();

            return Results.Ok(ranked);
        }).AllowAnonymous();

        // ── GET /api/leaderboard/{seasonId}/team/{teamId} ─────────────────────
        // Detailed breakdown for one team — match by match, player by player
        group.MapGet("/{seasonId:guid}/team/{teamId:guid}", async (
            Guid seasonId,
            Guid teamId,
            AthenaXIDbContext db) =>
        {
            var team = await db.FantasyTeams
                .FirstOrDefaultAsync(t => t.Id == teamId && t.SeasonId == seasonId);
            if (team is null) return Results.NotFound();

            var ut = await db.UserTeams
                .Include(u => u.Players).ThenInclude(p => p.Player)
                .FirstOrDefaultAsync(u => u.UserId == team.UserId && u.SeasonId == seasonId);
            if (ut is null) return Results.NotFound();

            var config = await db.SeasonConfigs
                .FirstOrDefaultAsync(c => c.SeasonId == seasonId);

            var playerIds = ut.Players.Select(p => p.PlayerId).ToList();

            var matches = await db.MatchEvents
                .Where(m => m.SeasonId == seasonId && m.Status == MatchStatus.Completed)
                .OrderBy(m => m.MatchNumber)
                .ToListAsync();

            var matchBreakdowns = new List<MatchPointRow>();

            foreach (var match in matches)
            {
                var matchPoints = await db.PlayerMatchPoints
                    .Include(p => p.Player)
                    .Where(p => playerIds.Contains(p.PlayerId) &&
                                p.MatchEventId == match.Id)
                    .ToListAsync();

                if (!matchPoints.Any()) continue;

                var playerRows = matchPoints.Select(mp =>
                {
                    var utp = ut.Players.FirstOrDefault(p => p.PlayerId == mp.PlayerId);
                    var multiplier = utp switch
                    {
                        { IsCaptain: true }      => config?.CaptainMultiplier ?? 2.0m,
                        { IsViceCaptain: true }  => config?.ViceCaptainMultiplier ?? 1.5m,
                        { IsImpactPlayer: true } => config?.ImpactPlayerMultiplier ?? 1.25m,
                        _                        => 1.0m
                    };

                    var finalPts = mp.BasePoints * multiplier;

                    return new PlayerPointRow(
                        mp.PlayerId, mp.Player.Name,
                        mp.Player.Role.ToString(), mp.Player.IPLTeam,
                        utp?.IsCaptain ?? false,
                        utp?.IsViceCaptain ?? false,
                        utp?.IsImpactPlayer ?? false,
                        mp.BasePoints, multiplier, finalPts,
                        mp.DidPlay, mp.IsManuallyEdited, mp.EditReason);
                }).ToList();

                matchBreakdowns.Add(new MatchPointRow(
                    match.MatchNumber,
                    $"{match.Team1} vs {match.Team2}",
                    match.MatchDate,
                    playerRows.Sum(p => p.FinalPoints),
                    playerRows));
            }

            var totalPoints = matchBreakdowns.Sum(m => m.Points);

            return Results.Ok(new TeamPointsBreakdown(
                team.Id, team.Name, team.ShortCode,
                team.ThemeColour, totalPoints, matchBreakdowns));
        }).AllowAnonymous();

        // ── POST /api/leaderboard/points/override ─────────────────────────────
        // Admin edits player points after sync
        group.MapPost("/points/override", async (
            PointOverrideRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var editorId = Guid.Parse(caller.FindFirst("userId")!.Value);

            var points = await db.PlayerMatchPoints
                .FirstOrDefaultAsync(p =>
                    p.PlayerId == req.PlayerId &&
                    p.MatchEventId == req.MatchEventId);

            if (points is null) return Results.NotFound(new { error = "Points record not found." });

            points.BasePoints        = req.NewBasePoints;
            points.IsManuallyEdited  = true;
            points.EditReason        = req.Reason;
            points.EditedByUserId    = editorId;
            points.EditedAt          = DateTime.UtcNow;

            await db.SaveChangesAsync();

            // Notify affected team owners
            var affectedTeams = await db.UserTeamPlayers
                .Include(p => p.UserTeam)
                .Where(p => p.PlayerId == req.PlayerId)
                .Select(p => p.UserTeam.UserId)
                .ToListAsync();

            var player = await db.Players.FindAsync(req.PlayerId);
            foreach (var uid in affectedTeams)
            {
                await NotificationEndpoints.SendAsync(db, uid,
                    "Points Updated",
                    $"{player?.Name}'s points were manually adjusted. Reason: {req.Reason}",
                    NotificationType.PointsManuallyEdited);
            }

            return Results.Ok(new
            {
                message      = "Points updated.",
                playerId     = req.PlayerId,
                matchEventId = req.MatchEventId,
                newPoints    = req.NewBasePoints,
                reason       = req.Reason,
            });
        }).RequireAuthorization();
    }

    private static bool IsAdminOrOwner(ClaimsPrincipal caller)
    {
        var role = caller.FindFirst("role")?.Value;
        return role == nameof(UserRole.AppOwner) || role == nameof(UserRole.LeagueAdmin);
    }
}
