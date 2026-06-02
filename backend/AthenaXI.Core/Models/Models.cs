using AthenaXI.Core.Enums;

namespace AthenaXI.Core.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Player;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public UserTeam? Team { get; set; }
    public ICollection<TransferLog> Transfers { get; set; } = [];
}

public class Player
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string IPLTeam { get; set; } = string.Empty;
    public PlayerRole Role { get; set; }
    public bool IsOverseas { get; set; }

    // Navigation
    public ICollection<UserTeamPlayer> TeamSlots { get; set; } = [];
    public ICollection<PlayerMatchPoints> MatchPoints { get; set; } = [];
}

public class UserTeam
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public bool IsLocked { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User User { get; set; } = null!;
    public ICollection<UserTeamPlayer> Players { get; set; } = [];
}

public class UserTeamPlayer
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserTeamId { get; set; }
    public Guid PlayerId { get; set; }
    public TeamSlot Slot { get; set; }
    public bool IsCaptain { get; set; }
    public bool IsViceCaptain { get; set; }
    public bool IsImpactPlayer { get; set; }

    // Navigation
    public UserTeam UserTeam { get; set; } = null!;
    public Player Player { get; set; } = null!;
}

public class MatchEvent
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int MatchNumber { get; set; }
    public DateTime MatchDate { get; set; }
    public string Team1 { get; set; } = string.Empty;
    public string Team2 { get; set; } = string.Empty;
    public bool IsTransferWindowOpen { get; set; } = false;
    public DateTime? ScrapedAt { get; set; }

    // Navigation
    public ICollection<PlayerMatchPoints> PlayerPoints { get; set; } = [];
}

public class PlayerMatchPoints
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PlayerId { get; set; }
    public Guid MatchEventId { get; set; }
    public decimal BasePoints { get; set; }
    public decimal Multiplier { get; set; } = 1.0m;
    public decimal FinalPoints { get; set; }
    public bool DidPlay { get; set; }

    // Navigation
    public Player Player { get; set; } = null!;
    public MatchEvent MatchEvent { get; set; } = null!;
}

public class TransferLog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public int TransferWindow { get; set; }
    public Guid? FromPlayerId { get; set; }
    public Guid? ToPlayerId { get; set; }
    public TransferType TransferType { get; set; }
    public DateTime MadeAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public User User { get; set; } = null!;
}
