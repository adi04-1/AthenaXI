namespace AthenaXI.Core.DTOs;

// ─── Requests ────────────────────────────────────────────────────────────────

public record CreateSeasonRequest(
    string Name,
    int Year,
    string Mode,                    // FreshAuction | AuctionWithRetentions | DirectAllocation
    int NumberOfTeams,
    bool AllowGuests,
    DateTime? AuctionDate,
    DateTime? SeasonStartDate,
    DateTime? SeasonEndDate
);

public record UpdateSeasonConfigRequest(
    // Auction rules
    decimal BudgetPerTeamCr,
    int MinSquadSize,
    int MaxSquadSize,
    int ReservePlayers,
    int MaxOverseasPlayers,
    int MinUncappedPlayers,
    int MinWicketKeepers,
    int RtmSlotsPerTeam,
    decimal DefaultBidIncrementCr,
    int BidTimerSeconds,
    int MaxSwapsPerWindow,
    int MaxRetainedPlayersPerTeam,
    int MaxOverseasRetained,

    // Transfer windows
    int TransferWindow1AfterMatch,
    int TransferWindow2AfterMatch,
    int TransferWindow3AfterMatch,

    // Multipliers
    decimal CaptainMultiplier,
    decimal ViceCaptainMultiplier,
    decimal ImpactPlayerMultiplier,
    int PlayingXIBonusPoints,

    // Batting
    int PtRun, int PtFourBonus, int PtSixBonus,
    int Pt25RunBonus, int Pt50RunBonus, int Pt75RunBonus, int Pt100RunBonus,
    int PtDuck,

    // Strike rate
    int PtSrBelow50, int PtSr50To60, int PtSr60To70,
    int PtSr70To130, int PtSr130To150, int PtSr150To170, int PtSrAbove170,

    // Bowling
    int PtDotBall, int PtWicket, int PtMaidenOver, int PtLbwBowledBonus,
    int Pt3WicketBonus, int Pt4WicketBonus, int Pt5WicketBonus,

    // Economy
    int PtEconBelow5, int PtEcon5To6, int PtEcon6To7,
    int PtEcon7To10, int PtEcon10To11, int PtEcon11To12, int PtEconAbove12,

    // Fielding
    int PtCatch, int Pt3CatchBonus, int PtStumping,
    int PtRunOutDirect, int PtRunOutAssist
);

public record UpdateSeasonStatusRequest(string Status);

// ─── Responses ────────────────────────────────────────────────────────────────

public record SeasonResponse(
    Guid Id,
    string Name,
    int Year,
    string Mode,
    string Status,
    int NumberOfTeams,
    bool AllowGuests,
    DateTime? AuctionDate,
    DateTime? SeasonStartDate,
    DateTime? SeasonEndDate,
    DateTime CreatedAt
);

public record SeasonDetailResponse(
    Guid Id,
    string Name,
    int Year,
    string Mode,
    string Status,
    DateTime? AuctionDate,
    DateTime? SeasonStartDate,
    DateTime? SeasonEndDate,
    SeasonConfigResponse? Config,
    int TeamsRegistered,
    int MatchesPlayed
);

public record SeasonConfigResponse(
    decimal BudgetPerTeamCr,
    int MinSquadSize,
    int MaxSquadSize,
    int ReservePlayers,
    int MaxOverseasPlayers,
    int MinUncappedPlayers,
    int MinWicketKeepers,
    int RtmSlotsPerTeam,
    decimal DefaultBidIncrementCr,
    int BidTimerSeconds,
    int MaxSwapsPerWindow,
    int MaxRetainedPlayersPerTeam,
    int MaxOverseasRetained,
    int TransferWindow1AfterMatch,
    int TransferWindow2AfterMatch,
    int TransferWindow3AfterMatch,
    decimal CaptainMultiplier,
    decimal ViceCaptainMultiplier,
    decimal ImpactPlayerMultiplier,
    int PlayingXIBonusPoints,
    ScoringPointsResponse ScoringPoints
);

public record ScoringPointsResponse(
    int PtRun, int PtFourBonus, int PtSixBonus,
    int Pt25RunBonus, int Pt50RunBonus, int Pt75RunBonus, int Pt100RunBonus,
    int PtDuck,
    int PtSrBelow50, int PtSr50To60, int PtSr60To70,
    int PtSr70To130, int PtSr130To150, int PtSr150To170, int PtSrAbove170,
    int PtDotBall, int PtWicket, int PtMaidenOver, int PtLbwBowledBonus,
    int Pt3WicketBonus, int Pt4WicketBonus, int Pt5WicketBonus,
    int PtEconBelow5, int PtEcon5To6, int PtEcon6To7,
    int PtEcon7To10, int PtEcon10To11, int PtEcon11To12, int PtEconAbove12,
    int PtCatch, int Pt3CatchBonus, int PtStumping,
    int PtRunOutDirect, int PtRunOutAssist
);
