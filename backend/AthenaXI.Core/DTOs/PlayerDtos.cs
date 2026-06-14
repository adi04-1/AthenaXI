namespace AthenaXI.Core.DTOs;

// ─── Requests ────────────────────────────────────────────────────────────────

public record PlayerUploadRow(
    [property: System.Text.Json.Serialization.JsonPropertyName("playerName")] string PlayerName,
    [property: System.Text.Json.Serialization.JsonPropertyName("iplTeam")] string IplTeam,
    [property: System.Text.Json.Serialization.JsonPropertyName("role")] string Role,
    [property: System.Text.Json.Serialization.JsonPropertyName("isOverseas")] bool IsOverseas,
    [property: System.Text.Json.Serialization.JsonPropertyName("isUncapped")] bool IsUncapped,
    [property: System.Text.Json.Serialization.JsonPropertyName("basePriceCr")] decimal BasePriceCr,
    [property: System.Text.Json.Serialization.JsonPropertyName("nationality")] string? Nationality,
    [property: System.Text.Json.Serialization.JsonPropertyName("battingStyle")] string? BattingStyle,
    [property: System.Text.Json.Serialization.JsonPropertyName("bowlingStyle")] string? BowlingStyle,
    [property: System.Text.Json.Serialization.JsonPropertyName("notes")] string? Notes
);

public record AuctionOrderRowNormalized(
    [property: System.Text.Json.Serialization.JsonPropertyName("auctionOrder")] int AuctionOrder,
    [property: System.Text.Json.Serialization.JsonPropertyName("playerName")] string PlayerName,
    [property: System.Text.Json.Serialization.JsonPropertyName("auctionSet")] string AuctionSet,
    [property: System.Text.Json.Serialization.JsonPropertyName("basePriceCr")] decimal BasePriceCr,
    [property: System.Text.Json.Serialization.JsonPropertyName("bidIncrementCr")] decimal BidIncrementCr,
    [property: System.Text.Json.Serialization.JsonPropertyName("rtmTeam")] string? RtmTeam,
    [property: System.Text.Json.Serialization.JsonPropertyName("setDisplayName")] string? SetDisplayName,
    [property: System.Text.Json.Serialization.JsonPropertyName("notes")] string? Notes
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
