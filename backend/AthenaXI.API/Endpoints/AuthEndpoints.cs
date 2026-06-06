using AthenaXI.API.Services;
using AthenaXI.Core.DTOs;
using AthenaXI.Core.Enums;
using AthenaXI.Core.Models;
using AthenaXI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AthenaXI.API.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/auth").WithTags("Auth");

        // ── POST /api/auth/register ──────────────────────────────────────────
        // AppOwner only — creates League Admin or guest accounts
        group.MapPost("/register", async (
            RegisterRequest req,
            AthenaXIDbContext db,
            TokenService tokenSvc,
            ClaimsPrincipal caller) =>
        {
            // Only AppOwner can register new users
            var callerRole = caller.FindFirst("role")?.Value;
            if (callerRole != nameof(UserRole.AppOwner))
                return Results.Forbid();

            if (await db.Users.AnyAsync(u => u.Username == req.Username))
                return Results.Conflict(new { error = "Username already taken." });

            if (await db.Users.AnyAsync(u => u.Email == req.Email))
                return Results.Conflict(new { error = "Email already registered." });

            var user = new User
            {
                Username     = req.Username.Trim().ToLower(),
                Email        = req.Email.Trim().ToLower(),
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
                Role         = UserRole.LeagueAdmin,
                TeamName     = req.TeamName,
            };

            db.Users.Add(user);
            await db.SaveChangesAsync();

            var (token, expiresAt) = tokenSvc.GenerateToken(user);
            return Results.Created($"/api/auth/{user.Id}", new AuthResponse(
                token, user.Username, user.Role.ToString(),
                user.Id, user.TeamName, expiresAt));
        }).RequireAuthorization();

        // ── POST /api/auth/login ─────────────────────────────────────────────
        group.MapPost("/login", async (
            LoginRequest req,
            AthenaXIDbContext db,
            TokenService tokenSvc) =>
        {
            var user = await db.Users
                .FirstOrDefaultAsync(u => u.Username == req.Username.Trim().ToLower());

            if (user is null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
                return Results.Unauthorized();

            if (!user.IsActive)
                return Results.Forbid();

            var (token, expiresAt) = tokenSvc.GenerateToken(user);
            return Results.Ok(new AuthResponse(
                token, user.Username, user.Role.ToString(),
                user.Id, user.TeamName, expiresAt));
        }).AllowAnonymous();

        // ── GET /api/auth/me ─────────────────────────────────────────────────
        group.MapGet("/me", async (
            ClaimsPrincipal caller,
            AthenaXIDbContext db) =>
        {
            var userId = Guid.Parse(caller.FindFirst("userId")!.Value);
            var user   = await db.Users.FindAsync(userId);
            if (user is null) return Results.NotFound();

            var isImpersonating = caller.FindFirst("isImpersonating")?.Value == "true";
            var impersonatedBy  = caller.FindFirst("impersonatedBy")?.Value;

            return Results.Ok(new UserProfileResponse(
                user.Id, user.Username, user.Email,
                user.Role.ToString(), user.TeamName,
                isImpersonating, impersonatedBy,
                user.CreatedAt));
        }).RequireAuthorization();

        // ── POST /api/auth/team-login ────────────────────────────────────────
        // Creates a team-scoped login (AppOwner or LeagueAdmin)
        group.MapPost("/team-login", async (
            CreateTeamLoginRequest req,
            AthenaXIDbContext db,
            TokenService tokenSvc,
            ClaimsPrincipal caller) =>
        {
            var callerRole = caller.FindFirst("role")?.Value;
            if (callerRole != nameof(UserRole.AppOwner) &&
                callerRole != nameof(UserRole.LeagueAdmin))
                return Results.Forbid();

            if (await db.Users.AnyAsync(u => u.Username == req.Username.Trim().ToLower()))
                return Results.Conflict(new { error = "Username already taken." });

            // Validate season exists
            var season = await db.Seasons.FindAsync(req.SeasonId);
            if (season is null)
                return Results.NotFound(new { error = "Season not found." });

            // Validate short code unique per season
            if (await db.FantasyTeams.AnyAsync(t =>
                    t.SeasonId == req.SeasonId &&
                    t.ShortCode == req.ShortCode.ToUpper()))
                return Results.Conflict(new { error = "Short code already used in this season." });

            // Create user
            var user = new User
            {
                Username     = req.Username.Trim().ToLower(),
                Email        = $"{req.Username.Trim().ToLower()}@athenaxi.local",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
                Role         = UserRole.TeamOwner,
                TeamName     = req.TeamName,
            };
            db.Users.Add(user);
            await db.SaveChangesAsync();

            // Create fantasy team identity
            var team = new FantasyTeam
            {
                UserId             = user.Id,
                SeasonId           = req.SeasonId,
                Name               = req.TeamName,
                ShortCode          = req.ShortCode.ToUpper(),
                ThemeColour        = req.ThemeColour,
                OwnerDisplayName   = req.OwnerDisplayName,
            };
            db.FantasyTeams.Add(team);
            await db.SaveChangesAsync();

            var (token, _) = tokenSvc.GenerateToken(user);
            return Results.Created($"/api/auth/team/{team.Id}", new TeamLoginResponse(
                user.Id, user.Username, team.Name,
                team.ShortCode, team.ThemeColour,
                team.OwnerDisplayName, team.SeasonId, token));
        }).RequireAuthorization();

        // ── POST /api/auth/impersonate ───────────────────────────────────────
        // AppOwner only — get a token scoped to another user
        group.MapPost("/impersonate", async (
            ImpersonateRequest req,
            AthenaXIDbContext db,
            TokenService tokenSvc,
            ClaimsPrincipal caller) =>
        {
            var callerRole = caller.FindFirst("role")?.Value;
            if (callerRole != nameof(UserRole.AppOwner))
                return Results.Forbid();

            var callerName = caller.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.UniqueName)?.Value
                          ?? "AppOwner";

            var target = await db.Users.FindAsync(req.TargetUserId);
            if (target is null)
                return Results.NotFound(new { error = "Target user not found." });

            // Cannot impersonate another AppOwner
            if (target.Role == UserRole.AppOwner)
                return Results.Forbid();

            var (token, expiresAt) = tokenSvc.GenerateToken(
                target,
                isImpersonating: true,
                impersonatedBy:  callerName);

            return Results.Ok(new AuthResponse(
                token, target.Username, target.Role.ToString(),
                target.Id, target.TeamName, expiresAt));
        }).RequireAuthorization();

        // ── POST /api/auth/change-password ───────────────────────────────────
        group.MapPost("/change-password", async (
            ChangePasswordRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            var userId = Guid.Parse(caller.FindFirst("userId")!.Value);
            var user   = await db.Users.FindAsync(userId);
            if (user is null) return Results.NotFound();

            if (!BCrypt.Net.BCrypt.Verify(req.CurrentPassword, user.PasswordHash))
                return Results.BadRequest(new { error = "Current password is incorrect." });

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.NewPassword);
            await db.SaveChangesAsync();

            return Results.Ok(new { message = "Password updated successfully." });
        }).RequireAuthorization();

        // ── GET /api/auth/users ──────────────────────────────────────────────
        // AppOwner only — list all users
        group.MapGet("/users", async (
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            var callerRole = caller.FindFirst("role")?.Value;
            if (callerRole != nameof(UserRole.AppOwner))
                return Results.Forbid();

            var users = await db.Users
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    Role = u.Role.ToString(),
                    u.TeamName,
                    u.IsActive,
                    u.CreatedAt
                })
                .OrderBy(u => u.CreatedAt)
                .ToListAsync();

            return Results.Ok(users);
        }).RequireAuthorization();

        // ── PUT /api/auth/users/{id}/deactivate ──────────────────────────────
        // AppOwner only
        group.MapPut("/users/{id:guid}/deactivate", async (
            Guid id,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            var callerRole = caller.FindFirst("role")?.Value;
            if (callerRole != nameof(UserRole.AppOwner))
                return Results.Forbid();

            var user = await db.Users.FindAsync(id);
            if (user is null) return Results.NotFound();
            if (user.Role == UserRole.AppOwner) return Results.Forbid();

            user.IsActive = false;
            await db.SaveChangesAsync();

            return Results.Ok(new { message = $"{user.Username} deactivated." });
        }).RequireAuthorization();
    }
}
