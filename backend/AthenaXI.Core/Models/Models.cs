using AthenaXI.Core.Enums;

namespace AthenaXI.Core.Models;

// ─── USER ────────────────────────────────────────────────────────────────────

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.TeamOwner;
    public string? TeamName { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public UserTeam? Team { get; set; }
    public ICollection<TransferLog> Transfers { get; set; } = [];
    public ICollection<Notification> Notifications { get; set; } = [];
    public ICollection<AuctionBid> Bids { get; set; } = [];
}

// ─── PLAYER ──────────────────────────────────────────────────────────────────

public class Player
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string IPLTeam { get; set; } = string.Empty;
    public PlayerRole Role { get; set; }
    public bool IsOverseas { get; set; }
    public bool IsUncapped { get; set; }
    public decimal BasePriceCr { get; set; }
    public string? Nationality { get; set; }
    public string? BattingStyle { get; set; }
    public string? BowlingStyle { get; set; }
    public string? Notes { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<UserTeamPlayer> TeamSlots { get; set; } = [];
    public ICollection<PlayerMatchPoints> MatchPoints { get; set; } = [];
    public ICollection<AuctionResult> AuctionResults { get; set; } = [];
}

// ─── SEASON ──────────────────────────────────────────────────────────────────

public class Season
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public int Year { get; set; }
    public SeasonStatus Status { get; set; } = SeasonStatus.Upcoming;
    public SeasonMode Mode { get; set; } = SeasonMode.FreshAuction;
    public DateTime? AuctionDate { get; set; }
    public DateTime? SeasonStartDate { get; set; }
    public DateTime? SeasonEndDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public SeasonConfig? Config { get; set; }
    public ICollection<MatchEvent> Matches { get; set; } = [];
    public ICollection<AuctionSession> AuctionSessions { get; set; } = [];
    public ICollection<UserTeam> Teams { get; set; } = [];
}

// ─── SEASON CONFIG ────────────────────────────────────────────────────────────

public class SeasonConfig
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SeasonId { get; set; }

    // Auction rules
    public decimal BudgetPerTeamCr { get; set; } = 120;
    public int MinSquadSize { get; set; } = 12;
    public int MaxSquadSize { get; set; } = 12;
    public int ReservePlayers { get; set; } = 3;
    public int MaxOverseasPlayers { get; set; } = 4;
    public int MinUncappedPlayers { get; set; } = 1;
    public int MinWicketKeepers { get; set; } = 1;
    public int RtmSlotsPerTeam { get; set; } = 1;
    public decimal DefaultBidIncrementCr { get; set; } = 1.00m;
    public int BidTimerSeconds { get; set; } = 10;
    public int MaxSwapsPerWindow { get; set; } = 2;
    public int MaxRetainedPlayersPerTeam { get; set; } = 3;
    public int MaxOverseasRetained { get; set; } = 1;

    // Transfer windows
    public int TransferWindow1AfterMatch { get; set; } = 18;
    public int TransferWindow2AfterMatch { get; set; } = 35;
    public int TransferWindow3AfterMatch { get; set; } = 70;

    // Multipliers
    public decimal CaptainMultiplier { get; set; } = 2.0m;
    public decimal ViceCaptainMultiplier { get; set; } = 1.5m;
    public decimal ImpactPlayerMultiplier { get; set; } = 1.25m;
    public decimal PlayingXIMultiplier { get; set; } = 1.0m;
    public int PlayingXIBonusPoints { get; set; } = 4;

    // Batting (My11Circle T20)
    public int PtRun { get; set; } = 1;
    public int PtFourBonus { get; set; } = 4;
    public int PtSixBonus { get; set; } = 6;
    public int Pt25RunBonus { get; set; } = 4;
    public int Pt50RunBonus { get; set; } = 8;
    public int Pt75RunBonus { get; set; } = 12;
    public int Pt100RunBonus { get; set; } = 16;
    public int PtDuck { get; set; } = -2;

    // Strike rate
    public int PtSrBelow50 { get; set; } = -6;
    public int PtSr50To60 { get; set; } = -4;
    public int PtSr60To70 { get; set; } = -2;
    public int PtSr70To130 { get; set; } = 0;
    public int PtSr130To150 { get; set; } = 2;
    public int PtSr150To170 { get; set; } = 4;
    public int PtSrAbove170 { get; set; } = 6;

    // Bowling
    public int PtDotBall { get; set; } = 1;
    public int PtWicket { get; set; } = 30;
    public int PtMaidenOver { get; set; } = 12;
    public int PtLbwBowledBonus { get; set; } = 8;
    public int Pt3WicketBonus { get; set; } = 4;
    public int Pt4WicketBonus { get; set; } = 8;
    public int Pt5WicketBonus { get; set; } = 12;

    // Economy rate
    public int PtEconBelow5 { get; set; } = 6;
    public int PtEcon5To6 { get; set; } = 4;
    public int PtEcon6To7 { get; set; } = 2;
    public int PtEcon7To10 { get; set; } = 0;
    public int PtEcon10To11 { get; set; } = -2;
    public int PtEcon11To12 { get; set; } = -4;
    public int PtEconAbove12 { get; set; } = -6;

    // Fielding
    public int PtCatch { get; set; } = 8;
    public int Pt3CatchBonus { get; set; } = 4;
    public int PtStumping { get; set; } = 12;
    public int PtRunOutDirect { get; set; } = 12;
    public int PtRunOutAssist { get; set; } = 6;

    public Season Season { get; set; } = null!;
}

// ─── USER TEAM ────────────────────────────────────────────────────────────────

public class UserTeam
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid SeasonId { get; set; }
    public bool IsLocked { get; set; } = false;
    public int RtmSlotsRemaining { get; set; } = 1;
    public decimal BudgetRemainingCr { get; set; } = 120;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public Season Season { get; set; } = null!;
    public ICollection<UserTeamPlayer> Players { get; set; } = [];
    public ICollection<TransferLog> Transfers { get; set; } = [];
}

// ─── USER TEAM PLAYER ─────────────────────────────────────────────────────────

public class UserTeamPlayer
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserTeamId { get; set; }
    public Guid PlayerId { get; set; }
    public TeamSlot Slot { get; set; }
    public bool IsCaptain { get; set; }
    public bool IsViceCaptain { get; set; }
    public bool IsImpactPlayer { get; set; }
    public bool IsReserve { get; set; }
    public decimal PurchasedPriceCr { get; set; }
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;

    public UserTeam UserTeam { get; set; } = null!;
    public Player Player { get; set; } = null!;
}

// ─── AUCTION ─────────────────────────────────────────────────────────────────

public class AuctionSession
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SeasonId { get; set; }
    public AuctionStatus Status { get; set; } = AuctionStatus.NotStarted;
    public int CurrentPlayerIndex { get; set; } = 0;
    public DateTime? StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }

    public Season Season { get; set; } = null!;
    public ICollection<AuctionPlayerSlot> PlayerSlots { get; set; } = [];
    public ICollection<AuctionBid> Bids { get; set; } = [];
    public ICollection<AuctionResult> Results { get; set; } = [];
}

public class AuctionPlayerSlot
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid AuctionSessionId { get; set; }
    public Guid PlayerId { get; set; }
    public int AuctionOrder { get; set; }
    public string AuctionSet { get; set; } = string.Empty;
    public string? SetDisplayName { get; set; }
    public decimal BasePriceCr { get; set; }
    public decimal BidIncrementCr { get; set; } = 1.00m;
    public string? RtmTeam { get; set; }
    public AuctionSlotStatus Status { get; set; } = AuctionSlotStatus.Pending;

    public AuctionSession AuctionSession { get; set; } = null!;
    public Player Player { get; set; } = null!;
}

public class AuctionBid
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid AuctionSessionId { get; set; }
    public Guid AuctionPlayerSlotId { get; set; }
    public Guid BiddingUserId { get; set; }
    public decimal AmountCr { get; set; }
    public bool IsRtm { get; set; } = false;
    public DateTime PlacedAt { get; set; } = DateTime.UtcNow;

    public AuctionSession AuctionSession { get; set; } = null!;
    public User BiddingUser { get; set; } = null!;
}

public class AuctionResult
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid AuctionSessionId { get; set; }
    public Guid PlayerId { get; set; }
    public Guid? WinningUserId { get; set; }
    public decimal? FinalPriceCr { get; set; }
    public bool WasRtm { get; set; } = false;
    public bool WentUnsold { get; set; } = false;
    public DateTime ResolvedAt { get; set; } = DateTime.UtcNow;

    public AuctionSession AuctionSession { get; set; } = null!;
    public Player Player { get; set; } = null!;
}

// ─── MATCH & SCORING ─────────────────────────────────────────────────────────

public class MatchEvent
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SeasonId { get; set; }
    public int MatchNumber { get; set; }
    public DateTime MatchDate { get; set; }
    public string Team1 { get; set; } = string.Empty;
    public string Team2 { get; set; } = string.Empty;
    public string Venue { get; set; } = string.Empty;
    public bool IsTransferWindowOpen { get; set; } = false;
    public MatchStatus Status { get; set; } = MatchStatus.Upcoming;
    public DateTime? ScrapedAt { get; set; }

    public Season Season { get; set; } = null!;
    public ICollection<PlayerMatchPoints> PlayerPoints { get; set; } = [];
    public ICollection<SyncJobLog> SyncLogs { get; set; } = [];
}

public class PlayerMatchPoints
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PlayerId { get; set; }
    public Guid MatchEventId { get; set; }

    // Raw stats from scraper
    public int Runs { get; set; }
    public int Fours { get; set; }
    public int Sixes { get; set; }
    public int BallsFaced { get; set; }
    public bool WasDismissed { get; set; }
    public bool IsDuck { get; set; }
    public int Wickets { get; set; }
    public int DotBalls { get; set; }
    public int MaidenOvers { get; set; }
    public decimal OversBowled { get; set; }
    public int RunsConceded { get; set; }
    public bool IsLbw { get; set; }
    public bool IsBowled { get; set; }
    public int Catches { get; set; }
    public bool IsStumping { get; set; }
    public bool IsRunOutDirect { get; set; }
    public bool IsRunOutAssist { get; set; }
    public bool DidPlay { get; set; }

    // Calculated
    public decimal BasePoints { get; set; }
    public bool IsManuallyEdited { get; set; } = false;
    public string? EditReason { get; set; }
    public Guid? EditedByUserId { get; set; }
    public DateTime? EditedAt { get; set; }

    public Player Player { get; set; } = null!;
    public MatchEvent MatchEvent { get; set; } = null!;
}

// ─── TRANSFERS ────────────────────────────────────────────────────────────────

public class TransferLog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid UserTeamId { get; set; }
    public int TransferWindow { get; set; }
    public Guid? FromPlayerId { get; set; }
    public Guid? ToPlayerId { get; set; }
    public TransferType TransferType { get; set; }
    public bool IsReserveActivation { get; set; } = false;
    public bool IsAdminApproved { get; set; } = false;
    public string? Reason { get; set; }
    public DateTime MadeAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public UserTeam UserTeam { get; set; } = null!;
}

// ─── SYNC JOB LOG ────────────────────────────────────────────────────────────

public class SyncJobLog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid MatchEventId { get; set; }
    public SyncJobStatus Status { get; set; }
    public int PlayersProcessed { get; set; }
    public string? Errors { get; set; }
    public string TriggeredBy { get; set; } = "Cron";
    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }

    public MatchEvent MatchEvent { get; set; } = null!;
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

public class Notification
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public NotificationType Type { get; set; }
    public bool IsRead { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
}
// ─── FANTASY TEAM IDENTITY ────────────────────────────────────────────────────

public class FantasyTeam
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SeasonId { get; set; }
    public Guid UserId { get; set; }               // linked login
    public string Name { get; set; } = string.Empty;          // Chennai Strikers
    public string ShortCode { get; set; } = string.Empty;     // CS
    public string ThemeColour { get; set; } = "#1A1A2E";      // hex
    public string OwnerDisplayName { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Season Season { get; set; } = null!;
    public User User { get; set; } = null!;
    public ICollection<RetainedPlayer> RetainedPlayers { get; set; } = [];
}

// ─── RETAINED PLAYER ──────────────────────────────────────────────────────────

public class RetainedPlayer
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid FantasyTeamId { get; set; }
    public Guid SeasonId { get; set; }
    public Guid PlayerId { get; set; }
    public decimal RetentionCostCr { get; set; }   // custom per player
    public TeamSlot Slot { get; set; } = TeamSlot.PlayingXI;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public FantasyTeam FantasyTeam { get; set; } = null!;
    public Player Player { get; set; } = null!;
    public Season Season { get; set; } = null!;
}
