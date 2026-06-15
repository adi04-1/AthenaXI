using AthenaXI.Core.Models;
namespace AthenaXI.Core.DTOs;

// ─── Requests ────────────────────────────────────────────────────────────────

public record PlaceBidRequest(
    Guid AuctionSessionId,
    Guid AuctionPlayerSlotId,
    decimal AmountCr,
    bool IsRtm = false,
    Guid? TeamUserId = null
);

public record MarkSoldRequest(
    Guid AuctionSessionId,
    Guid AuctionPlayerSlotId,
    Guid WinningUserId,
    decimal FinalPriceCr,
    bool WasRtm = false
);

public record MarkUnsoldRequest(
    Guid AuctionSessionId,
    Guid AuctionPlayerSlotId
);

public record AdminCorrectRequest(
    Guid AuctionSessionId,
    Guid PlayerId,
    Guid NewWinningUserId,
    decimal NewPriceCr,
    string Reason
);

public record AdvancePlayerRequest(
    Guid AuctionSessionId
);

// ─── Responses ────────────────────────────────────────────────────────────────

public record AuctionSessionResponse(
    Guid Id,
    Guid SeasonId,
    string Status,
    int CurrentPlayerIndex,
    int TotalPlayers,
    int SoldCount,
    int UnsoldCount,
    int PendingCount,
    DateTime? StartedAt,
    DateTime? CompletedAt,
    CurrentPlayerResponse? CurrentPlayer
);

public record CurrentPlayerResponse(
    Guid SlotId,
    Guid PlayerId,
    string PlayerName,
    string IplTeam,
    string Role,
    bool IsOverseas,
    bool IsUncapped,
    decimal BasePriceCr,
    decimal BidIncrementCr,
    string AuctionSet,
    string? SetDisplayName,
    string? RtmTeam,
    string SlotStatus,
    decimal CurrentBidCr,
    string? CurrentLeaderTeam,
    string? CurrentLeaderColour,
    Guid? CurrentLeaderUserId 
);

public record BidResponse(
    Guid BidId,
    decimal AmountCr,
    string BiddingTeam,
    string BiddingTeamColour,
    bool IsRtm,
    DateTime PlacedAt
);

public record AuctionStandingsRow(
    Guid TeamId,
    Guid UserId,
    string TeamName,
    string ShortCode,
    string ThemeColour,
    decimal BudgetRemainingCr,
    int PlayersAcquired,
    int RtmSlotsRemaining
);

public record AuctionResultResponse(
    Guid PlayerId,
    string PlayerName,
    string IplTeam,
    string Role,
    Guid? WinningTeamId,
    string? WinningTeamName,
    string? WinningTeamCode,
    decimal? FinalPriceCr,
    bool WasRtm,
    bool WentUnsold,
    DateTime ResolvedAt,
    Guid? SlotId = null
);

// ─── Invite DTOs ──────────────────────────────────────────────────────────────

public record AuctionInviteResponse(
    Guid InviteId,
    Guid AuctionSessionId,
    Guid FantasyTeamId,
    string TeamName,
    string ShortCode,
    string ThemeColour,
    string Status,
    DateTime SentAt,
    DateTime? RespondedAt
);

public record RespondToInviteRequest(
    Guid InviteId,
    bool Accept           // true = Accept, false = Decline
);

public record AuctionLobbyResponse(
    Guid SessionId,
    string SeasonName,
    string AuctionStatus,
    int TotalTeams,
    int AcceptedCount,
    int PendingCount,
    int DeclinedCount,
    bool CanStart,
    List<AuctionInviteResponse> Invites
);
