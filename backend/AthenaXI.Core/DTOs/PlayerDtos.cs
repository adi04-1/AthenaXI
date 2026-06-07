namespace AthenaXI.Core.DTOs;

// ─── Requests ────────────────────────────────────────────────────────────────

public record PlayerUploadRow(
    string PlayerName,
    string IplTeam,
    string Role,
    bool IsOverseas,
    bool IsUncapped,
    decimal BasePriceCr,
    string? Nationality,
    string? BattingStyle,
    string? BowlingStyle,
    string? Notes
);

public record AuctionOrderRow(
    int AuctionOrder,
    string PlayerName,
    string AuctionSet,
    decimal BasePriceCr,
    decimal BidIncrementCr,
    string? RtmTeam,
    string? SetDisplayName,
    string? Notes
);

public record DirectAllocationRow(
    string TeamShortCode,
    string PlayerName,
    string Slot,       // PlayingXI | Reserve | Impact
    bool IsCaptain,
    bool IsViceCaptain,
    bool IsImpactPlayer
);

public record PlayerFilterRequest(
    string? IplTeam,
    string? Role,
    bool? IsOverseas,
    bool? IsUncapped,
    string? Search
);

// ─── Responses ────────────────────────────────────────────────────────────────

public record PlayerResponse(
    Guid Id,
    string Name,
    string IplTeam,
    string Role,
    bool IsOverseas,
    bool IsUncapped,
    decimal BasePriceCr,
    string? Nationality,
    string? BattingStyle,
    string? BowlingStyle,
    string? Notes
);

public record PlayerUploadResultResponse(
    int TotalRows,
    int Imported,
    int Skipped,
    List<string> Errors
);

public record AuctionOrderUploadResultResponse(
    int TotalRows,
    int Imported,
    int Skipped,
    List<string> Errors,
    Guid AuctionSessionId
);
