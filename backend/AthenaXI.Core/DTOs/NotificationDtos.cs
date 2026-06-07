namespace AthenaXI.Core.DTOs;

public record NotificationResponse(
    Guid Id,
    string Title,
    string Body,
    string Type,
    bool IsRead,
    DateTime CreatedAt
);

public record SendNotificationRequest(
    Guid? UserId,           // null = broadcast to all
    string Title,
    string Body,
    string Type
);

public record LeaderboardRow(
    int Rank,
    Guid TeamId,
    string TeamName,
    string ShortCode,
    string ThemeColour,
    string OwnerDisplayName,
    decimal TotalPoints,
    int MatchesPlayed,
    decimal PointsLastMatch
);

public record TeamPointsBreakdown(
    Guid TeamId,
    string TeamName,
    string ShortCode,
    string ThemeColour,
    decimal TotalPoints,
    List<MatchPointRow> MatchBreakdown
);

public record MatchPointRow(
    int MatchNumber,
    string Teams,
    DateTime MatchDate,
    decimal Points,
    List<PlayerPointRow> PlayerPoints
);

public record PlayerPointRow(
    Guid PlayerId,
    string PlayerName,
    string Role,
    string IPLTeam,
    bool IsCaptain,
    bool IsViceCaptain,
    bool IsImpactPlayer,
    decimal BasePoints,
    decimal Multiplier,
    decimal FinalPoints,
    bool DidPlay,
    bool IsManuallyEdited,
    string? EditReason
);

public record PointOverrideRequest(
    Guid PlayerId,
    Guid MatchEventId,
    decimal NewBasePoints,
    string Reason
);
