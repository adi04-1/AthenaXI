namespace AthenaXI.Core.DTOs;

// ─── Requests ────────────────────────────────────────────────────────────────

public record CreateFantasyTeamRequest(
    Guid SeasonId,
    string TeamName,
    string ShortCode,
    string ThemeColour,
    string OwnerDisplayName,
    string Username,
    string Password
);

public record UpdateFantasyTeamRequest(
    string TeamName,
    string ShortCode,
    string ThemeColour,
    string OwnerDisplayName,
    string? NewPassword = null   // Admin-only — when provided, resets the team's login password
);

public record UploadRetentionsRequest(
    Guid SeasonId,
    List<RetentionEntryRequest> Retentions
);

public record RetentionEntryRequest(
    string TeamShortCode,
    string PlayerName,
    decimal RetentionCostCr,
    string Slot          // PlayingXI | Reserve
);

// ─── Responses ────────────────────────────────────────────────────────────────

public record FantasyTeamResponse(
    Guid Id,
    Guid SeasonId,
    string TeamName,
    string ShortCode,
    string ThemeColour,
    string OwnerDisplayName,
    string Username,
    decimal BudgetRemainingCr,
    int PlayersInSquad,
    List<RetainedPlayerResponse> RetainedPlayers,
    List<SquadPlayerResponse>? Players = null,   // bought players — populated by /my/{seasonId}
    int RtmSlotsRemaining = 0
);

public record SquadPlayerResponse(
    Guid Id,                       // UserTeamPlayer.Id
    PlayerSummary Player,
    string Slot,
    bool IsCaptain,
    bool IsViceCaptain,
    bool IsImpactPlayer,
    decimal PurchasedPriceCr
);

public record PlayerSummary(
    Guid Id,
    string Name,
    string IplTeam,
    string Role,
    bool IsOverseas
);

public record RetainedPlayerResponse(
    Guid PlayerId,
    string PlayerName,
    string IPLTeam,
    string Role,
    decimal RetentionCostCr,
    string Slot
);

// Admin-only — never returned to TeamOwner-role callers.
// See security note on User.PlainPassword in Models.cs before extending usage of this.
public record TeamCredentialsResponse(
    Guid TeamId,
    string Username,
    string? PlainPassword
);
