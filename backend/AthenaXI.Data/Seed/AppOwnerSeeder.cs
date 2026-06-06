using AthenaXI.Core.Enums;
using AthenaXI.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace AthenaXI.Data.Seed;

public static class AppOwnerSeeder
{
    public static async Task SeedAsync(AthenaXIDbContext db)
    {
        if (await db.Users.AnyAsync(u => u.Role == UserRole.AppOwner)) return;

        const string password = "WrathOfGod@2026!";

        var owner = new User
        {
            Username     = "athenaxi_owner",
            Email        = "owner@athenaxi.local",
            PasswordHash = HashPassword(password),
            Role         = UserRole.AppOwner,
            TeamName     = "App Owner",
            IsActive     = true,
        };

        db.Users.Add(owner);
        await db.SaveChangesAsync();

        Console.WriteLine("✅ AppOwner seeded");
        Console.WriteLine("   Username : athenaxi_owner");
        Console.WriteLine($"   Password : {password}");
        Console.WriteLine("   ⚠️  Change this password immediately after first login!");
    }

    private static string HashPassword(string password)
    {
        const int iterations = 100_000;

        using var rng = RandomNumberGenerator.Create();
        byte[] salt = new byte[16];
        rng.GetBytes(salt);

        using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterations, HashAlgorithmName.SHA256);
        byte[] hash = pbkdf2.GetBytes(32);

        return $"{iterations}.{Convert.ToBase64String(salt)}.{Convert.ToBase64String(hash)}";
    }
}
