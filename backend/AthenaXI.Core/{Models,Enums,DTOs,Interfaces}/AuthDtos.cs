namespace AthenaXI.Core.DTOs;

// ─── Requests ────────────────────────────────────────────────────────────────

public record RegisterRequest(
    string Username,
    string Email,
    string Password,
    string? TeamName
);

public record LoginRequest(
    string Username,
    string Password
);

public record CreateTeamLoginRequest(
    string Username,
    string Password,
    string TeamName,
    string ShortCode,
    string ThemeColour,
    string OwnerDisplayName,
    Guid SeasonId
);

public record ImpersonateRequest(
    Guid TargetUserId
);

public record ChangePasswordRequest(
    string CurrentPassword,
    string NewPassword
);

// ─── Responses ────────────────────────────────────────────────────────────────

public record AuthResponse(
    string Token,
    string Username,
    string Role,
    Guid UserId,
    string? TeamName,
    DateTime ExpiresAt
);

public record UserProfileResponse(
    Guid Id,
    string Username,
    string Email,
    string Role,
    string? TeamName,
    bool IsImpersonating,
    string? ImpersonatedBy,
    DateTime CreatedAt
);

public record TeamLoginResponse(
    Guid UserId,
    string Username,
    string TeamName,
    string ShortCode,
    string ThemeColour,
    string OwnerDisplayName,
    Guid SeasonId,
    string Token
);
