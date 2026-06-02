using Microsoft.EntityFrameworkCore;
using AthenaXI.Core.Models;

namespace AthenaXI.Data;

// Full configuration coming Day 2
public class AthenaXIDbContext(DbContextOptions<AthenaXIDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Player> Players => Set<Player>();
    public DbSet<UserTeam> UserTeams => Set<UserTeam>();
    public DbSet<UserTeamPlayer> UserTeamPlayers => Set<UserTeamPlayer>();
    public DbSet<MatchEvent> MatchEvents => Set<MatchEvent>();
    public DbSet<PlayerMatchPoints> PlayerMatchPoints => Set<PlayerMatchPoints>();
    public DbSet<TransferLog> TransferLogs => Set<TransferLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Relationships, constraints, seed data — Day 2
        base.OnModelCreating(modelBuilder);
    }
}
