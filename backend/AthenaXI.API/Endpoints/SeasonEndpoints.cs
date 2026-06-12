using AthenaXI.Core.DTOs;
using AthenaXI.Core.Enums;
using AthenaXI.Core.Models;
using AthenaXI.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AthenaXI.API.Endpoints;

public static class SeasonEndpoints
{
    public static void MapSeasonEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/seasons").WithTags("Seasons");

        // ── POST /api/seasons ─────────────────────────────────────────────────
        // Create a new season — Admin or AppOwner
        group.MapPost("/", async (
            CreateSeasonRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            if (!Enum.TryParse<SeasonMode>(req.Mode, out var mode))
                return Results.BadRequest(new { error = $"Invalid mode. Use: FreshAuction | AuctionWithRetentions | DirectAllocation" });

            if (await db.Seasons.AnyAsync(s => s.Year == req.Year && s.Name == req.Name))
                return Results.Conflict(new { error = "A season with this name and year already exists." });

            var season = new Season
            {
                Name = req.Name.Trim(),
                Year = req.Year,
                Mode = mode,
                Status = SeasonStatus.Upcoming,

                AuctionDate = req.AuctionDate.HasValue
                    ? DateTime.SpecifyKind(req.AuctionDate.Value, DateTimeKind.Utc)
                    : null,

                            SeasonStartDate = req.SeasonStartDate.HasValue
                    ? DateTime.SpecifyKind(req.SeasonStartDate.Value, DateTimeKind.Utc)
                    : null,

                            SeasonEndDate = req.SeasonEndDate.HasValue
                    ? DateTime.SpecifyKind(req.SeasonEndDate.Value, DateTimeKind.Utc)
                    : null
            };

            // Attach default SeasonConfig (My11Circle T20 defaults)
            var config = DefaultSeasonConfig(season.Id);
            season.Config = config;

            db.Seasons.Add(season);
            await db.SaveChangesAsync();

            return Results.Created($"/api/seasons/{season.Id}", ToSeasonResponse(season));
        }).RequireAuthorization();

        // ── GET /api/seasons ──────────────────────────────────────────────────
        group.MapGet("/", async (AthenaXIDbContext db) =>
        {
            var seasons = await db.Seasons
                .OrderByDescending(s => s.Year)
                .Select(s => ToSeasonResponse(s))
                .ToListAsync();
            return Results.Ok(seasons);
        }).AllowAnonymous();

        // ── GET /api/seasons/{id} ─────────────────────────────────────────────
        group.MapGet("/{id:guid}", async (Guid id, AthenaXIDbContext db) =>
        {
            var season = await db.Seasons
                .Include(s => s.Config)
                .Include(s => s.Teams)
                .Include(s => s.Matches)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (season is null) return Results.NotFound();

            var response = new SeasonDetailResponse(
                season.Id, season.Name, season.Year,
                season.Mode.ToString(), season.Status.ToString(),
                season.AuctionDate, season.SeasonStartDate, season.SeasonEndDate,
                season.Config is null ? null : ToConfigResponse(season.Config),
                season.Teams.Count,
                season.Matches.Count(m => m.Status == MatchStatus.Completed)
            );
            return Results.Ok(response);
        }).AllowAnonymous();

        // ── GET /api/seasons/active ───────────────────────────────────────────
        group.MapGet("/active", async (AthenaXIDbContext db) =>
        {
            var season = await db.Seasons
                .Include(s => s.Config)
                .Where(s => s.Status == SeasonStatus.InProgress ||
                            s.Status == SeasonStatus.AuctionPhase ||
                            s.Status == SeasonStatus.TeamSelectionPhase)
                .OrderByDescending(s => s.Year)
                .FirstOrDefaultAsync();

            return season is null
                ? Results.NotFound(new { error = "No active season found." })
                : Results.Ok(ToSeasonResponse(season));
        }).AllowAnonymous();

        // ── PUT /api/seasons/{id}/config ──────────────────────────────────────
        // Update season rules — Admin or AppOwner
        group.MapPut("/{id:guid}/config", async (
            Guid id,
            UpdateSeasonConfigRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var config = await db.SeasonConfigs.FirstOrDefaultAsync(c => c.SeasonId == id);
            if (config is null) return Results.NotFound(new { error = "Season config not found." });

            // Map all fields from request
            config.BudgetPerTeamCr           = req.BudgetPerTeamCr;
            config.MinSquadSize              = req.MinSquadSize;
            config.MaxSquadSize              = req.MaxSquadSize;
            config.ReservePlayers            = req.ReservePlayers;
            config.MaxOverseasPlayers        = req.MaxOverseasPlayers;
            config.MinUncappedPlayers        = req.MinUncappedPlayers;
            config.MinWicketKeepers          = req.MinWicketKeepers;
            config.RtmSlotsPerTeam           = req.RtmSlotsPerTeam;
            config.DefaultBidIncrementCr     = req.DefaultBidIncrementCr;
            config.BidTimerSeconds           = req.BidTimerSeconds;
            config.MaxSwapsPerWindow         = req.MaxSwapsPerWindow;
            config.MaxRetainedPlayersPerTeam = req.MaxRetainedPlayersPerTeam;
            config.MaxOverseasRetained       = req.MaxOverseasRetained;
            config.TransferWindow1AfterMatch = req.TransferWindow1AfterMatch;
            config.TransferWindow2AfterMatch = req.TransferWindow2AfterMatch;
            config.TransferWindow3AfterMatch = req.TransferWindow3AfterMatch;
            config.CaptainMultiplier         = req.CaptainMultiplier;
            config.ViceCaptainMultiplier     = req.ViceCaptainMultiplier;
            config.ImpactPlayerMultiplier    = req.ImpactPlayerMultiplier;
            config.PlayingXIBonusPoints      = req.PlayingXIBonusPoints;
            config.PtRun                     = req.PtRun;
            config.PtFourBonus               = req.PtFourBonus;
            config.PtSixBonus                = req.PtSixBonus;
            config.Pt25RunBonus              = req.Pt25RunBonus;
            config.Pt50RunBonus              = req.Pt50RunBonus;
            config.Pt75RunBonus              = req.Pt75RunBonus;
            config.Pt100RunBonus             = req.Pt100RunBonus;
            config.PtDuck                    = req.PtDuck;
            config.PtSrBelow50               = req.PtSrBelow50;
            config.PtSr50To60                = req.PtSr50To60;
            config.PtSr60To70                = req.PtSr60To70;
            config.PtSr70To130               = req.PtSr70To130;
            config.PtSr130To150              = req.PtSr130To150;
            config.PtSr150To170              = req.PtSr150To170;
            config.PtSrAbove170              = req.PtSrAbove170;
            config.PtDotBall                 = req.PtDotBall;
            config.PtWicket                  = req.PtWicket;
            config.PtMaidenOver              = req.PtMaidenOver;
            config.PtLbwBowledBonus          = req.PtLbwBowledBonus;
            config.Pt3WicketBonus            = req.Pt3WicketBonus;
            config.Pt4WicketBonus            = req.Pt4WicketBonus;
            config.Pt5WicketBonus            = req.Pt5WicketBonus;
            config.PtEconBelow5              = req.PtEconBelow5;
            config.PtEcon5To6                = req.PtEcon5To6;
            config.PtEcon6To7                = req.PtEcon6To7;
            config.PtEcon7To10               = req.PtEcon7To10;
            config.PtEcon10To11              = req.PtEcon10To11;
            config.PtEcon11To12              = req.PtEcon11To12;
            config.PtEconAbove12             = req.PtEconAbove12;
            config.PtCatch                   = req.PtCatch;
            config.Pt3CatchBonus             = req.Pt3CatchBonus;
            config.PtStumping                = req.PtStumping;
            config.PtRunOutDirect            = req.PtRunOutDirect;
            config.PtRunOutAssist            = req.PtRunOutAssist;

            await db.SaveChangesAsync();
            return Results.Ok(ToConfigResponse(config));
        }).RequireAuthorization();

        // ── PUT /api/seasons/{id}/status ──────────────────────────────────────
        group.MapPut("/{id:guid}/status", async (
            Guid id,
            UpdateSeasonStatusRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            if (!Enum.TryParse<SeasonStatus>(req.Status, out var status))
                return Results.BadRequest(new { error = "Invalid status." });

            var season = await db.Seasons.FindAsync(id);
            if (season is null) return Results.NotFound();

            season.Status = status;
            await db.SaveChangesAsync();

            return Results.Ok(new { message = $"Season status updated to {status}." });
        }).RequireAuthorization();

        // ── DELETE /api/seasons/{id} ──────────────────────────────────────────
        // AppOwner only — only if no teams registered
        group.MapDelete("/{id:guid}", async (
            Guid id,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var season = await db.Seasons
                .Include(s => s.Teams)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (season is null) return Results.NotFound();

            if (season.Teams.Any())
                return Results.BadRequest(new { error = "Cannot delete a season with registered teams." });

            db.Seasons.Remove(season);
            await db.SaveChangesAsync();
            return Results.Ok(new { message = "Season deleted." });
        }).RequireAuthorization();
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private static bool IsAdminOrOwner(ClaimsPrincipal caller)
{
    var role = caller.FindFirst(ClaimTypes.Role)?.Value;

    return role == nameof(UserRole.AppOwner)
        || role == nameof(UserRole.LeagueAdmin);
}

private static bool IsAppOwner(ClaimsPrincipal caller)
{
    return caller.FindFirst(ClaimTypes.Role)?.Value
        == nameof(UserRole.AppOwner);
}
    private static SeasonResponse ToSeasonResponse(Season s) => new(
        s.Id, s.Name, s.Year, s.Mode.ToString(), s.Status.ToString(),
        0, true, s.AuctionDate?.ToUniversalTime(),
        s.SeasonStartDate?.ToUniversalTime(),
        s.SeasonEndDate?.ToUniversalTime(), s.CreatedAt);

    private static SeasonConfigResponse ToConfigResponse(SeasonConfig c) => new(
        c.BudgetPerTeamCr, c.MinSquadSize, c.MaxSquadSize, c.ReservePlayers,
        c.MaxOverseasPlayers, c.MinUncappedPlayers, c.MinWicketKeepers,
        c.RtmSlotsPerTeam, c.DefaultBidIncrementCr, c.BidTimerSeconds,
        c.MaxSwapsPerWindow, c.MaxRetainedPlayersPerTeam, c.MaxOverseasRetained,
        c.TransferWindow1AfterMatch, c.TransferWindow2AfterMatch, c.TransferWindow3AfterMatch,
        c.CaptainMultiplier, c.ViceCaptainMultiplier, c.ImpactPlayerMultiplier,
        c.PlayingXIBonusPoints,
        new ScoringPointsResponse(
            c.PtRun, c.PtFourBonus, c.PtSixBonus,
            c.Pt25RunBonus, c.Pt50RunBonus, c.Pt75RunBonus, c.Pt100RunBonus, c.PtDuck,
            c.PtSrBelow50, c.PtSr50To60, c.PtSr60To70, c.PtSr70To130,
            c.PtSr130To150, c.PtSr150To170, c.PtSrAbove170,
            c.PtDotBall, c.PtWicket, c.PtMaidenOver, c.PtLbwBowledBonus,
            c.Pt3WicketBonus, c.Pt4WicketBonus, c.Pt5WicketBonus,
            c.PtEconBelow5, c.PtEcon5To6, c.PtEcon6To7, c.PtEcon7To10,
            c.PtEcon10To11, c.PtEcon11To12, c.PtEconAbove12,
            c.PtCatch, c.Pt3CatchBonus, c.PtStumping, c.PtRunOutDirect, c.PtRunOutAssist));

    private static SeasonConfig DefaultSeasonConfig(Guid seasonId) => new()
    {
        SeasonId = seasonId,
        BudgetPerTeamCr = 120, MinSquadSize = 12, MaxSquadSize = 12,
        ReservePlayers = 3, MaxOverseasPlayers = 4, MinUncappedPlayers = 1,
        MinWicketKeepers = 1, RtmSlotsPerTeam = 1, DefaultBidIncrementCr = 1.00m,
        BidTimerSeconds = 10, MaxSwapsPerWindow = 2,
        MaxRetainedPlayersPerTeam = 3, MaxOverseasRetained = 1,
        TransferWindow1AfterMatch = 18, TransferWindow2AfterMatch = 35,
        TransferWindow3AfterMatch = 70,
        CaptainMultiplier = 2.0m, ViceCaptainMultiplier = 1.5m,
        ImpactPlayerMultiplier = 1.25m, PlayingXIMultiplier = 1.0m,
        PlayingXIBonusPoints = 4,
        PtRun = 1, PtFourBonus = 4, PtSixBonus = 6,
        Pt25RunBonus = 4, Pt50RunBonus = 8, Pt75RunBonus = 12, Pt100RunBonus = 16,
        PtDuck = -2,
        PtSrBelow50 = -6, PtSr50To60 = -4, PtSr60To70 = -2, PtSr70To130 = 0,
        PtSr130To150 = 2, PtSr150To170 = 4, PtSrAbove170 = 6,
        PtDotBall = 1, PtWicket = 30, PtMaidenOver = 12, PtLbwBowledBonus = 8,
        Pt3WicketBonus = 4, Pt4WicketBonus = 8, Pt5WicketBonus = 12,
        PtEconBelow5 = 6, PtEcon5To6 = 4, PtEcon6To7 = 2, PtEcon7To10 = 0,
        PtEcon10To11 = -2, PtEcon11To12 = -4, PtEconAbove12 = -6,
        PtCatch = 8, Pt3CatchBonus = 4, PtStumping = 12,
        PtRunOutDirect = 12, PtRunOutAssist = 6,
    };
}
