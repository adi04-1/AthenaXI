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
    string OwnerDisplayName
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
    List<RetainedPlayerResponse> RetainedPlayers
);

public record RetainedPlayerResponse(
    Guid PlayerId,
    string PlayerName,
    string IPLTeam,
    string Role,
    decimal RetentionCostCr,
    string Slot
);
