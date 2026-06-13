using AthenaXI.Core.DTOs;
using AthenaXI.Core.Enums;
using AthenaXI.Core.Models;
using AthenaXI.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AthenaXI.API.Endpoints;

public static class NotificationEndpoints
{
    public static void MapNotificationEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/notifications").WithTags("Notifications");

        // ── GET /api/notifications/my ─────────────────────────────────────────
        group.MapGet("/my", async (
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            var userId = Guid.Parse(caller.FindFirst("userId")!.Value);

            var notifications = await db.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .Take(50)
                .Select(n => new NotificationResponse(
                    n.Id, n.Title, n.Body,
                    n.Type.ToString(), n.IsRead, n.CreatedAt))
                .ToListAsync();

            return Results.Ok(notifications);
        }).RequireAuthorization("AnyLoggedIn");

        // ── GET /api/notifications/unread-count ───────────────────────────────
        group.MapGet("/unread-count", async (
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            var userId = Guid.Parse(caller.FindFirst("userId")!.Value);
            var count  = await db.Notifications
                .CountAsync(n => n.UserId == userId && !n.IsRead);
            return Results.Ok(new { count });
        }).RequireAuthorization("AnyLoggedIn");

        // ── PUT /api/notifications/{id}/read ──────────────────────────────────
        group.MapPut("/{id:guid}/read", async (
            Guid id,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            var userId = Guid.Parse(caller.FindFirst("userId")!.Value);
            var notif  = await db.Notifications
                .FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

            if (notif is null) return Results.NotFound();
            notif.IsRead = true;
            await db.SaveChangesAsync();
            return Results.Ok(new { message = "Marked as read." });
        }).RequireAuthorization("AnyLoggedIn");

        // ── PUT /api/notifications/read-all ───────────────────────────────────
        group.MapPut("/read-all", async (
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            var userId = Guid.Parse(caller.FindFirst("userId")!.Value);
            await db.Notifications
                .Where(n => n.UserId == userId && !n.IsRead)
                .ExecuteUpdateAsync(s => s.SetProperty(n => n.IsRead, true));
            return Results.Ok(new { message = "All notifications marked as read." });
        }).RequireAuthorization("AnyLoggedIn");

        // ── POST /api/notifications/send ──────────────────────────────────────
        // Admin sends manual notification
        group.MapPost("/send", async (
            SendNotificationRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            if (!Enum.TryParse<NotificationType>(req.Type, out var type))
                type = NotificationType.GeneralAlert;

            List<Guid> targetUserIds;

            if (req.UserId.HasValue)
            {
                targetUserIds = [req.UserId.Value];
            }
            else
            {
                // Broadcast to all active users
                targetUserIds = await db.Users
                    .Where(u => u.IsActive)
                    .Select(u => u.Id)
                    .ToListAsync();
            }

            var notifications = targetUserIds.Select(uid => new Notification
            {
                UserId    = uid,
                Title     = req.Title,
                Body      = req.Body,
                Type      = type,
                IsRead    = false,
            }).ToList();

            db.Notifications.AddRange(notifications);
            await db.SaveChangesAsync();

            return Results.Ok(new { message = $"Notification sent to {notifications.Count} user(s)." });
        }).RequireAuthorization("AdminOrOwner");
    }

    // ── Static helper — used by other services ────────────────────────────────
    public static async Task SendAsync(
        AthenaXIDbContext db,
        Guid userId,
        string title,
        string body,
        NotificationType type)
    {
        db.Notifications.Add(new Notification
        {
            UserId = userId,
            Title  = title,
            Body   = body,
            Type   = type,
        });
        await db.SaveChangesAsync();
    }

    public static async Task BroadcastAsync(
        AthenaXIDbContext db,
        string title,
        string body,
        NotificationType type)
    {
        var userIds = await db.Users
            .Where(u => u.IsActive && u.Role == UserRole.TeamOwner)
            .Select(u => u.Id)
            .ToListAsync();

        db.Notifications.AddRange(userIds.Select(uid => new Notification
        {
            UserId = uid,
            Title  = title,
            Body   = body,
            Type   = type,
        }));
        await db.SaveChangesAsync();
    }

    private static bool IsAdminOrOwner(ClaimsPrincipal caller)
    {
        return caller.IsInRole(nameof(UserRole.AppOwner))
        || caller.IsInRole(nameof(UserRole.LeagueAdmin));
    }
}
