using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AthenaXI.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddTeamIdentityAndRetention : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IPLTeam = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    IsOverseas = table.Column<bool>(type: "boolean", nullable: false),
                    IsUncapped = table.Column<bool>(type: "boolean", nullable: false),
                    BasePriceCr = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    Nationality = table.Column<string>(type: "text", nullable: true),
                    BattingStyle = table.Column<string>(type: "text", nullable: true),
                    BowlingStyle = table.Column<string>(type: "text", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Seasons",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Mode = table.Column<string>(type: "text", nullable: false),
                    AuctionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    SeasonStartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    SeasonEndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seasons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    TeamName = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuctionSessions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SeasonId = table.Column<Guid>(type: "uuid", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CurrentPlayerIndex = table.Column<int>(type: "integer", nullable: false),
                    StartedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuctionSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuctionSessions_Seasons_SeasonId",
                        column: x => x.SeasonId,
                        principalTable: "Seasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MatchEvents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SeasonId = table.Column<Guid>(type: "uuid", nullable: false),
                    MatchNumber = table.Column<int>(type: "integer", nullable: false),
                    MatchDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Team1 = table.Column<string>(type: "text", nullable: false),
                    Team2 = table.Column<string>(type: "text", nullable: false),
                    Venue = table.Column<string>(type: "text", nullable: false),
                    IsTransferWindowOpen = table.Column<bool>(type: "boolean", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    ScrapedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchEvents_Seasons_SeasonId",
                        column: x => x.SeasonId,
                        principalTable: "Seasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SeasonConfigs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SeasonId = table.Column<Guid>(type: "uuid", nullable: false),
                    BudgetPerTeamCr = table.Column<decimal>(type: "numeric(8,2)", precision: 8, scale: 2, nullable: false),
                    MinSquadSize = table.Column<int>(type: "integer", nullable: false),
                    MaxSquadSize = table.Column<int>(type: "integer", nullable: false),
                    ReservePlayers = table.Column<int>(type: "integer", nullable: false),
                    MaxOverseasPlayers = table.Column<int>(type: "integer", nullable: false),
                    MinUncappedPlayers = table.Column<int>(type: "integer", nullable: false),
                    MinWicketKeepers = table.Column<int>(type: "integer", nullable: false),
                    RtmSlotsPerTeam = table.Column<int>(type: "integer", nullable: false),
                    DefaultBidIncrementCr = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    BidTimerSeconds = table.Column<int>(type: "integer", nullable: false),
                    MaxSwapsPerWindow = table.Column<int>(type: "integer", nullable: false),
                    MaxRetainedPlayersPerTeam = table.Column<int>(type: "integer", nullable: false),
                    MaxOverseasRetained = table.Column<int>(type: "integer", nullable: false),
                    TransferWindow1AfterMatch = table.Column<int>(type: "integer", nullable: false),
                    TransferWindow2AfterMatch = table.Column<int>(type: "integer", nullable: false),
                    TransferWindow3AfterMatch = table.Column<int>(type: "integer", nullable: false),
                    CaptainMultiplier = table.Column<decimal>(type: "numeric(4,2)", precision: 4, scale: 2, nullable: false),
                    ViceCaptainMultiplier = table.Column<decimal>(type: "numeric(4,2)", precision: 4, scale: 2, nullable: false),
                    ImpactPlayerMultiplier = table.Column<decimal>(type: "numeric(4,2)", precision: 4, scale: 2, nullable: false),
                    PlayingXIMultiplier = table.Column<decimal>(type: "numeric(4,2)", precision: 4, scale: 2, nullable: false),
                    PlayingXIBonusPoints = table.Column<int>(type: "integer", nullable: false),
                    PtRun = table.Column<int>(type: "integer", nullable: false),
                    PtFourBonus = table.Column<int>(type: "integer", nullable: false),
                    PtSixBonus = table.Column<int>(type: "integer", nullable: false),
                    Pt25RunBonus = table.Column<int>(type: "integer", nullable: false),
                    Pt50RunBonus = table.Column<int>(type: "integer", nullable: false),
                    Pt75RunBonus = table.Column<int>(type: "integer", nullable: false),
                    Pt100RunBonus = table.Column<int>(type: "integer", nullable: false),
                    PtDuck = table.Column<int>(type: "integer", nullable: false),
                    PtSrBelow50 = table.Column<int>(type: "integer", nullable: false),
                    PtSr50To60 = table.Column<int>(type: "integer", nullable: false),
                    PtSr60To70 = table.Column<int>(type: "integer", nullable: false),
                    PtSr70To130 = table.Column<int>(type: "integer", nullable: false),
                    PtSr130To150 = table.Column<int>(type: "integer", nullable: false),
                    PtSr150To170 = table.Column<int>(type: "integer", nullable: false),
                    PtSrAbove170 = table.Column<int>(type: "integer", nullable: false),
                    PtDotBall = table.Column<int>(type: "integer", nullable: false),
                    PtWicket = table.Column<int>(type: "integer", nullable: false),
                    PtMaidenOver = table.Column<int>(type: "integer", nullable: false),
                    PtLbwBowledBonus = table.Column<int>(type: "integer", nullable: false),
                    Pt3WicketBonus = table.Column<int>(type: "integer", nullable: false),
                    Pt4WicketBonus = table.Column<int>(type: "integer", nullable: false),
                    Pt5WicketBonus = table.Column<int>(type: "integer", nullable: false),
                    PtEconBelow5 = table.Column<int>(type: "integer", nullable: false),
                    PtEcon5To6 = table.Column<int>(type: "integer", nullable: false),
                    PtEcon6To7 = table.Column<int>(type: "integer", nullable: false),
                    PtEcon7To10 = table.Column<int>(type: "integer", nullable: false),
                    PtEcon10To11 = table.Column<int>(type: "integer", nullable: false),
                    PtEcon11To12 = table.Column<int>(type: "integer", nullable: false),
                    PtEconAbove12 = table.Column<int>(type: "integer", nullable: false),
                    PtCatch = table.Column<int>(type: "integer", nullable: false),
                    Pt3CatchBonus = table.Column<int>(type: "integer", nullable: false),
                    PtStumping = table.Column<int>(type: "integer", nullable: false),
                    PtRunOutDirect = table.Column<int>(type: "integer", nullable: false),
                    PtRunOutAssist = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeasonConfigs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SeasonConfigs_Seasons_SeasonId",
                        column: x => x.SeasonId,
                        principalTable: "Seasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FantasyTeams",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SeasonId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ShortCode = table.Column<string>(type: "text", nullable: false),
                    ThemeColour = table.Column<string>(type: "text", nullable: false),
                    OwnerDisplayName = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FantasyTeams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FantasyTeams_Seasons_SeasonId",
                        column: x => x.SeasonId,
                        principalTable: "Seasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FantasyTeams_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Body = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTeams",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    SeasonId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsLocked = table.Column<bool>(type: "boolean", nullable: false),
                    RtmSlotsRemaining = table.Column<int>(type: "integer", nullable: false),
                    BudgetRemainingCr = table.Column<decimal>(type: "numeric(8,2)", precision: 8, scale: 2, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTeams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserTeams_Seasons_SeasonId",
                        column: x => x.SeasonId,
                        principalTable: "Seasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserTeams_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AuctionBids",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AuctionSessionId = table.Column<Guid>(type: "uuid", nullable: false),
                    AuctionPlayerSlotId = table.Column<Guid>(type: "uuid", nullable: false),
                    BiddingUserId = table.Column<Guid>(type: "uuid", nullable: false),
                    AmountCr = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    IsRtm = table.Column<bool>(type: "boolean", nullable: false),
                    PlacedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuctionBids", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuctionBids_AuctionSessions_AuctionSessionId",
                        column: x => x.AuctionSessionId,
                        principalTable: "AuctionSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AuctionBids_Users_BiddingUserId",
                        column: x => x.BiddingUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AuctionPlayerSlots",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AuctionSessionId = table.Column<Guid>(type: "uuid", nullable: false),
                    PlayerId = table.Column<Guid>(type: "uuid", nullable: false),
                    AuctionOrder = table.Column<int>(type: "integer", nullable: false),
                    AuctionSet = table.Column<string>(type: "text", nullable: false),
                    SetDisplayName = table.Column<string>(type: "text", nullable: true),
                    BasePriceCr = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    BidIncrementCr = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    RtmTeam = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuctionPlayerSlots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuctionPlayerSlots_AuctionSessions_AuctionSessionId",
                        column: x => x.AuctionSessionId,
                        principalTable: "AuctionSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AuctionPlayerSlots_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AuctionResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AuctionSessionId = table.Column<Guid>(type: "uuid", nullable: false),
                    PlayerId = table.Column<Guid>(type: "uuid", nullable: false),
                    WinningUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    FinalPriceCr = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: true),
                    WasRtm = table.Column<bool>(type: "boolean", nullable: false),
                    WentUnsold = table.Column<bool>(type: "boolean", nullable: false),
                    ResolvedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuctionResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuctionResults_AuctionSessions_AuctionSessionId",
                        column: x => x.AuctionSessionId,
                        principalTable: "AuctionSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AuctionResults_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlayerMatchPoints",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PlayerId = table.Column<Guid>(type: "uuid", nullable: false),
                    MatchEventId = table.Column<Guid>(type: "uuid", nullable: false),
                    Runs = table.Column<int>(type: "integer", nullable: false),
                    Fours = table.Column<int>(type: "integer", nullable: false),
                    Sixes = table.Column<int>(type: "integer", nullable: false),
                    BallsFaced = table.Column<int>(type: "integer", nullable: false),
                    WasDismissed = table.Column<bool>(type: "boolean", nullable: false),
                    IsDuck = table.Column<bool>(type: "boolean", nullable: false),
                    Wickets = table.Column<int>(type: "integer", nullable: false),
                    DotBalls = table.Column<int>(type: "integer", nullable: false),
                    MaidenOvers = table.Column<int>(type: "integer", nullable: false),
                    OversBowled = table.Column<decimal>(type: "numeric(4,1)", precision: 4, scale: 1, nullable: false),
                    RunsConceded = table.Column<int>(type: "integer", nullable: false),
                    IsLbw = table.Column<bool>(type: "boolean", nullable: false),
                    IsBowled = table.Column<bool>(type: "boolean", nullable: false),
                    Catches = table.Column<int>(type: "integer", nullable: false),
                    IsStumping = table.Column<bool>(type: "boolean", nullable: false),
                    IsRunOutDirect = table.Column<bool>(type: "boolean", nullable: false),
                    IsRunOutAssist = table.Column<bool>(type: "boolean", nullable: false),
                    DidPlay = table.Column<bool>(type: "boolean", nullable: false),
                    BasePoints = table.Column<decimal>(type: "numeric(8,2)", precision: 8, scale: 2, nullable: false),
                    IsManuallyEdited = table.Column<bool>(type: "boolean", nullable: false),
                    EditReason = table.Column<string>(type: "text", nullable: true),
                    EditedByUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    EditedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerMatchPoints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlayerMatchPoints_MatchEvents_MatchEventId",
                        column: x => x.MatchEventId,
                        principalTable: "MatchEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayerMatchPoints_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SyncJobLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MatchEventId = table.Column<Guid>(type: "uuid", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    PlayersProcessed = table.Column<int>(type: "integer", nullable: false),
                    Errors = table.Column<string>(type: "text", nullable: true),
                    TriggeredBy = table.Column<string>(type: "text", nullable: false),
                    StartedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SyncJobLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SyncJobLogs_MatchEvents_MatchEventId",
                        column: x => x.MatchEventId,
                        principalTable: "MatchEvents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RetainedPlayers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FantasyTeamId = table.Column<Guid>(type: "uuid", nullable: false),
                    SeasonId = table.Column<Guid>(type: "uuid", nullable: false),
                    PlayerId = table.Column<Guid>(type: "uuid", nullable: false),
                    RetentionCostCr = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    Slot = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetainedPlayers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RetainedPlayers_FantasyTeams_FantasyTeamId",
                        column: x => x.FantasyTeamId,
                        principalTable: "FantasyTeams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RetainedPlayers_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RetainedPlayers_Seasons_SeasonId",
                        column: x => x.SeasonId,
                        principalTable: "Seasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TransferLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserTeamId = table.Column<Guid>(type: "uuid", nullable: false),
                    TransferWindow = table.Column<int>(type: "integer", nullable: false),
                    FromPlayerId = table.Column<Guid>(type: "uuid", nullable: true),
                    ToPlayerId = table.Column<Guid>(type: "uuid", nullable: true),
                    TransferType = table.Column<string>(type: "text", nullable: false),
                    IsReserveActivation = table.Column<bool>(type: "boolean", nullable: false),
                    IsAdminApproved = table.Column<bool>(type: "boolean", nullable: false),
                    Reason = table.Column<string>(type: "text", nullable: true),
                    MadeAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransferLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransferLogs_UserTeams_UserTeamId",
                        column: x => x.UserTeamId,
                        principalTable: "UserTeams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransferLogs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserTeamPlayers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserTeamId = table.Column<Guid>(type: "uuid", nullable: false),
                    PlayerId = table.Column<Guid>(type: "uuid", nullable: false),
                    Slot = table.Column<string>(type: "text", nullable: false),
                    IsCaptain = table.Column<bool>(type: "boolean", nullable: false),
                    IsViceCaptain = table.Column<bool>(type: "boolean", nullable: false),
                    IsImpactPlayer = table.Column<bool>(type: "boolean", nullable: false),
                    IsReserve = table.Column<bool>(type: "boolean", nullable: false),
                    PurchasedPriceCr = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    AssignedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTeamPlayers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserTeamPlayers_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserTeamPlayers_UserTeams_UserTeamId",
                        column: x => x.UserTeamId,
                        principalTable: "UserTeams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuctionBids_AuctionSessionId",
                table: "AuctionBids",
                column: "AuctionSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_AuctionBids_BiddingUserId",
                table: "AuctionBids",
                column: "BiddingUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AuctionPlayerSlots_AuctionSessionId_AuctionOrder",
                table: "AuctionPlayerSlots",
                columns: new[] { "AuctionSessionId", "AuctionOrder" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuctionPlayerSlots_PlayerId",
                table: "AuctionPlayerSlots",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_AuctionResults_AuctionSessionId_PlayerId",
                table: "AuctionResults",
                columns: new[] { "AuctionSessionId", "PlayerId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuctionResults_PlayerId",
                table: "AuctionResults",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_AuctionSessions_SeasonId",
                table: "AuctionSessions",
                column: "SeasonId");

            migrationBuilder.CreateIndex(
                name: "IX_FantasyTeams_SeasonId_ShortCode",
                table: "FantasyTeams",
                columns: new[] { "SeasonId", "ShortCode" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FantasyTeams_UserId",
                table: "FantasyTeams",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchEvents_SeasonId_MatchNumber",
                table: "MatchEvents",
                columns: new[] { "SeasonId", "MatchNumber" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId_IsRead",
                table: "Notifications",
                columns: new[] { "UserId", "IsRead" });

            migrationBuilder.CreateIndex(
                name: "IX_PlayerMatchPoints_MatchEventId",
                table: "PlayerMatchPoints",
                column: "MatchEventId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerMatchPoints_PlayerId_MatchEventId",
                table: "PlayerMatchPoints",
                columns: new[] { "PlayerId", "MatchEventId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Players_Name",
                table: "Players",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_RetainedPlayers_FantasyTeamId_PlayerId",
                table: "RetainedPlayers",
                columns: new[] { "FantasyTeamId", "PlayerId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RetainedPlayers_PlayerId",
                table: "RetainedPlayers",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_RetainedPlayers_SeasonId",
                table: "RetainedPlayers",
                column: "SeasonId");

            migrationBuilder.CreateIndex(
                name: "IX_SeasonConfigs_SeasonId",
                table: "SeasonConfigs",
                column: "SeasonId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SyncJobLogs_MatchEventId",
                table: "SyncJobLogs",
                column: "MatchEventId");

            migrationBuilder.CreateIndex(
                name: "IX_TransferLogs_UserId",
                table: "TransferLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TransferLogs_UserTeamId",
                table: "TransferLogs",
                column: "UserTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserTeamPlayers_PlayerId",
                table: "UserTeamPlayers",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTeamPlayers_UserTeamId_PlayerId",
                table: "UserTeamPlayers",
                columns: new[] { "UserTeamId", "PlayerId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserTeams_SeasonId",
                table: "UserTeams",
                column: "SeasonId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTeams_UserId",
                table: "UserTeams",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserTeams_UserId_SeasonId",
                table: "UserTeams",
                columns: new[] { "UserId", "SeasonId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuctionBids");

            migrationBuilder.DropTable(
                name: "AuctionPlayerSlots");

            migrationBuilder.DropTable(
                name: "AuctionResults");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "PlayerMatchPoints");

            migrationBuilder.DropTable(
                name: "RetainedPlayers");

            migrationBuilder.DropTable(
                name: "SeasonConfigs");

            migrationBuilder.DropTable(
                name: "SyncJobLogs");

            migrationBuilder.DropTable(
                name: "TransferLogs");

            migrationBuilder.DropTable(
                name: "UserTeamPlayers");

            migrationBuilder.DropTable(
                name: "AuctionSessions");

            migrationBuilder.DropTable(
                name: "FantasyTeams");

            migrationBuilder.DropTable(
                name: "MatchEvents");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "UserTeams");

            migrationBuilder.DropTable(
                name: "Seasons");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
