using AthenaXI.Core.Models;
using AthenaXI.Core.Enums;
using Microsoft.EntityFrameworkCore;

namespace AthenaXI.Data.Seed;

public static class SeasonSeeder
{
    public static async Task SeedAsync(AthenaXIDbContext db)
    {
        if (await db.Seasons.AnyAsync()) return;

        var season = new Season
        {
            Id = Guid.Parse("00000000-0000-0000-0000-000000000001"),
            Name = "IPL 2025",
            Year = 2025,
            Status = SeasonStatus.Upcoming,
            SeasonStartDate = new DateTime(2026, 6, 1, 0, 0, 0, DateTimeKind.Utc),
            SeasonEndDate   = new DateTime(2026, 8, 1, 0, 0, 0, DateTimeKind.Utc),
            AuctionDate     = new DateTime(2026, 5, 25, 0, 0, 0, DateTimeKind.Utc),
        };

        var config = new SeasonConfig
        {
            Id = Guid.NewGuid(),
            SeasonId = season.Id,

            // Auction rules
            BudgetPerTeamCr        = 120,
            MinSquadSize           = 12,
            MaxSquadSize           = 12,
            ReservePlayers         = 3,
            MaxOverseasPlayers     = 4,
            MinUncappedPlayers     = 1,
            MinWicketKeepers       = 1,
            RtmSlotsPerTeam        = 1,
            DefaultBidIncrementCr  = 1.00m,
            BidTimerSeconds        = 10,
            MaxSwapsPerWindow      = 2,

            // Transfer windows
            TransferWindow1AfterMatch = 18,
            TransferWindow2AfterMatch = 35,
            TransferWindow3AfterMatch = 70,

            // Multipliers
            CaptainMultiplier      = 2.0m,
            ViceCaptainMultiplier  = 1.5m,
            ImpactPlayerMultiplier = 1.25m,
            PlayingXIMultiplier    = 1.0m,
            PlayingXIBonusPoints   = 4,

            // Batting — My11Circle T20
            PtRun        = 1,
            PtFourBonus  = 4,
            PtSixBonus   = 6,
            Pt25RunBonus = 4,
            Pt50RunBonus = 8,
            Pt75RunBonus = 12,
            Pt100RunBonus = 16,
            PtDuck       = -2,

            // Strike rate
            PtSrBelow50  = -6,
            PtSr50To60   = -4,
            PtSr60To70   = -2,
            PtSr70To130  = 0,
            PtSr130To150 = 2,
            PtSr150To170 = 4,
            PtSrAbove170 = 6,

            // Bowling
            PtDotBall       = 1,
            PtWicket        = 30,
            PtMaidenOver    = 12,
            PtLbwBowledBonus = 8,
            Pt3WicketBonus  = 4,
            Pt4WicketBonus  = 8,
            Pt5WicketBonus  = 12,

            // Economy rate
            PtEconBelow5  = 6,
            PtEcon5To6    = 4,
            PtEcon6To7    = 2,
            PtEcon7To10   = 0,
            PtEcon10To11  = -2,
            PtEcon11To12  = -4,
            PtEconAbove12 = -6,

            // Fielding
            PtCatch        = 8,
            Pt3CatchBonus  = 4,
            PtStumping     = 12,
            PtRunOutDirect = 12,
            PtRunOutAssist = 6,
        };

        db.Seasons.Add(season);
        db.SeasonConfigs.Add(config);
        await db.SaveChangesAsync();

        Console.WriteLine("✅ Season + SeasonConfig seeded (IPL 2025 with My11Circle T20 defaults)");
    }
}
