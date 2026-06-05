using Microsoft.EntityFrameworkCore;
using AthenaXI.Core.Models;
using AthenaXI.Core.Enums;

namespace AthenaXI.Data;

public class AthenaXIDbContext(DbContextOptions<AthenaXIDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Player> Players => Set<Player>();
    public DbSet<Season> Seasons => Set<Season>();
    public DbSet<SeasonConfig> SeasonConfigs => Set<SeasonConfig>();
    public DbSet<FantasyTeam> FantasyTeams => Set<FantasyTeam>();
    public DbSet<RetainedPlayer> RetainedPlayers => Set<RetainedPlayer>();
    public DbSet<UserTeam> UserTeams => Set<UserTeam>();
    public DbSet<UserTeamPlayer> UserTeamPlayers => Set<UserTeamPlayer>();
    public DbSet<AuctionSession> AuctionSessions => Set<AuctionSession>();
    public DbSet<AuctionPlayerSlot> AuctionPlayerSlots => Set<AuctionPlayerSlot>();
    public DbSet<AuctionBid> AuctionBids => Set<AuctionBid>();
    public DbSet<AuctionResult> AuctionResults => Set<AuctionResult>();
    public DbSet<MatchEvent> MatchEvents => Set<MatchEvent>();
    public DbSet<PlayerMatchPoints> PlayerMatchPoints => Set<PlayerMatchPoints>();
    public DbSet<TransferLog> TransferLogs => Set<TransferLog>();
    public DbSet<SyncJobLog> SyncJobLogs => Set<SyncJobLog>();
    public DbSet<Notification> Notifications => Set<Notification>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        // ── User ─────────────────────────────────────────────────────────────
        mb.Entity<User>(e =>
        {
            e.HasIndex(u => u.Username).IsUnique();
            e.HasIndex(u => u.Email).IsUnique();
            e.Property(u => u.Role).HasConversion<string>();
        });

        // ── Player ───────────────────────────────────────────────────────────
        mb.Entity<Player>(e =>
        {
            e.HasIndex(p => p.Name);
            e.Property(p => p.Role).HasConversion<string>();
            e.Property(p => p.BasePriceCr).HasPrecision(5, 2);
        });

        // ── Season ───────────────────────────────────────────────────────────
        mb.Entity<Season>(e =>
        {
            e.Property(s => s.Status).HasConversion<string>();
            e.Property(s => s.Mode).HasConversion<string>();
            e.HasOne(s => s.Config)
             .WithOne(c => c.Season)
             .HasForeignKey<SeasonConfig>(c => c.SeasonId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── SeasonConfig ──────────────────────────────────────────────────────
        mb.Entity<SeasonConfig>(e =>
        {
            e.Property(c => c.BudgetPerTeamCr).HasPrecision(8, 2);
            e.Property(c => c.DefaultBidIncrementCr).HasPrecision(5, 2);
            e.Property(c => c.CaptainMultiplier).HasPrecision(4, 2);
            e.Property(c => c.ViceCaptainMultiplier).HasPrecision(4, 2);
            e.Property(c => c.ImpactPlayerMultiplier).HasPrecision(4, 2);
            e.Property(c => c.PlayingXIMultiplier).HasPrecision(4, 2);
        });

        // ── FantasyTeam ───────────────────────────────────────────────────────
        mb.Entity<FantasyTeam>(e =>
        {
            e.HasIndex(t => new { t.SeasonId, t.ShortCode }).IsUnique();
            e.HasOne(t => t.Season)
             .WithMany()
             .HasForeignKey(t => t.SeasonId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(t => t.User)
             .WithMany()
             .HasForeignKey(t => t.UserId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ── RetainedPlayer ────────────────────────────────────────────────────
        mb.Entity<RetainedPlayer>(e =>
        {
            e.HasIndex(r => new { r.FantasyTeamId, r.PlayerId }).IsUnique();
            e.Property(r => r.RetentionCostCr).HasPrecision(5, 2);
            e.Property(r => r.Slot).HasConversion<string>();
            e.HasOne(r => r.FantasyTeam)
             .WithMany(t => t.RetainedPlayers)
             .HasForeignKey(r => r.FantasyTeamId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(r => r.Player)
             .WithMany()
             .HasForeignKey(r => r.PlayerId)
             .OnDelete(DeleteBehavior.Restrict);
            e.HasOne(r => r.Season)
             .WithMany()
             .HasForeignKey(r => r.SeasonId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ── UserTeam ──────────────────────────────────────────────────────────
        mb.Entity<UserTeam>(e =>
        {
            e.HasIndex(t => new { t.UserId, t.SeasonId }).IsUnique();
            e.Property(t => t.BudgetRemainingCr).HasPrecision(8, 2);
            e.HasOne(t => t.User)
             .WithOne(u => u.Team)
             .HasForeignKey<UserTeam>(t => t.UserId)
             .OnDelete(DeleteBehavior.Restrict);
            e.HasOne(t => t.Season)
             .WithMany(s => s.Teams)
             .HasForeignKey(t => t.SeasonId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ── UserTeamPlayer ────────────────────────────────────────────────────
        mb.Entity<UserTeamPlayer>(e =>
        {
            e.HasIndex(p => new { p.UserTeamId, p.PlayerId }).IsUnique();
            e.Property(p => p.Slot).HasConversion<string>();
            e.Property(p => p.PurchasedPriceCr).HasPrecision(5, 2);
            e.HasOne(p => p.UserTeam)
             .WithMany(t => t.Players)
             .HasForeignKey(p => p.UserTeamId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(p => p.Player)
             .WithMany(pl => pl.TeamSlots)
             .HasForeignKey(p => p.PlayerId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ── AuctionSession ────────────────────────────────────────────────────
        mb.Entity<AuctionSession>(e =>
        {
            e.Property(a => a.Status).HasConversion<string>();
            e.HasOne(a => a.Season)
             .WithMany(s => s.AuctionSessions)
             .HasForeignKey(a => a.SeasonId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── AuctionPlayerSlot ─────────────────────────────────────────────────
        mb.Entity<AuctionPlayerSlot>(e =>
        {
            e.HasIndex(s => new { s.AuctionSessionId, s.AuctionOrder }).IsUnique();
            e.Property(s => s.Status).HasConversion<string>();
            e.Property(s => s.BasePriceCr).HasPrecision(5, 2);
            e.Property(s => s.BidIncrementCr).HasPrecision(5, 2);
            e.HasOne(s => s.AuctionSession)
             .WithMany(a => a.PlayerSlots)
             .HasForeignKey(s => s.AuctionSessionId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(s => s.Player)
             .WithMany()
             .HasForeignKey(s => s.PlayerId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ── AuctionBid ────────────────────────────────────────────────────────
        mb.Entity<AuctionBid>(e =>
        {
            e.Property(b => b.AmountCr).HasPrecision(5, 2);
            e.HasOne(b => b.AuctionSession)
             .WithMany(a => a.Bids)
             .HasForeignKey(b => b.AuctionSessionId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(b => b.BiddingUser)
             .WithMany(u => u.Bids)
             .HasForeignKey(b => b.BiddingUserId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ── AuctionResult ─────────────────────────────────────────────────────
        mb.Entity<AuctionResult>(e =>
        {
            e.HasIndex(r => new { r.AuctionSessionId, r.PlayerId }).IsUnique();
            e.Property(r => r.FinalPriceCr).HasPrecision(5, 2);
            e.HasOne(r => r.AuctionSession)
             .WithMany(a => a.Results)
             .HasForeignKey(r => r.AuctionSessionId)
             .OnDelete(DeleteBehavior.Cascade);
            e.HasOne(r => r.Player)
             .WithMany(p => p.AuctionResults)
             .HasForeignKey(r => r.PlayerId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // ── MatchEvent ────────────────────────────────────────────────────────
        mb.Entity<MatchEvent>(e =>
        {
            e.HasIndex(m => new { m.SeasonId, m.MatchNumber }).IsUnique();
            e.Property(m => m.Status).HasConversion<string>();
            e.HasOne(m => m.Season)
             .WithMany(s => s.Matches)
             .HasForeignKey(m => m.SeasonId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── PlayerMatchPoints ─────────────────────────────────────────────────
        mb.Entity<PlayerMatchPoints>(e =>
        {
            e.HasIndex(p => new { p.PlayerId, p.MatchEventId }).IsUnique();
            e.Property(p => p.BasePoints).HasPrecision(8, 2);
            e.Property(p => p.OversBowled).HasPrecision(4, 1);
            e.HasOne(p => p.Player)
             .WithMany(pl => pl.MatchPoints)
             .HasForeignKey(p => p.PlayerId)
             .OnDelete(DeleteBehavior.Restrict);
            e.HasOne(p => p.MatchEvent)
             .WithMany(m => m.PlayerPoints)
             .HasForeignKey(p => p.MatchEventId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── TransferLog ───────────────────────────────────────────────────────
        mb.Entity<TransferLog>(e =>
        {
            e.Property(t => t.TransferType).HasConversion<string>();
            e.HasOne(t => t.User)
             .WithMany(u => u.Transfers)
             .HasForeignKey(t => t.UserId)
             .OnDelete(DeleteBehavior.Restrict);
            e.HasOne(t => t.UserTeam)
             .WithMany(ut => ut.Transfers)
             .HasForeignKey(t => t.UserTeamId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── SyncJobLog ────────────────────────────────────────────────────────
        mb.Entity<SyncJobLog>(e =>
        {
            e.Property(s => s.Status).HasConversion<string>();
            e.HasOne(s => s.MatchEvent)
             .WithMany(m => m.SyncLogs)
             .HasForeignKey(s => s.MatchEventId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // ── Notification ──────────────────────────────────────────────────────
        mb.Entity<Notification>(e =>
        {
            e.HasIndex(n => new { n.UserId, n.IsRead });
            e.Property(n => n.Type).HasConversion<string>();
            e.HasOne(n => n.User)
             .WithMany(u => u.Notifications)
             .HasForeignKey(n => n.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        base.OnModelCreating(mb);
    }
}
