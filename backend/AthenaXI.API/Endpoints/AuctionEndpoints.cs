using System.Security.Claims;
using AthenaXI.Core.DTOs;
using AthenaXI.Core.Enums;
using AthenaXI.Core.Models;
using AthenaXI.Data;
using Microsoft.EntityFrameworkCore;

namespace AthenaXI.API.Endpoints;

public static class AuctionEndpoints
{
    public static void MapAuctionEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/auction").WithTags("Auction");

        // ── POST /api/auction/{sessionId}/start ───────────────────────────────
        group.MapPost("/{sessionId:guid}/start", async (
            Guid sessionId,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var session = await db.AuctionSessions
                .Include(a => a.PlayerSlots)
                .FirstOrDefaultAsync(a => a.Id == sessionId);

            if (session is null) return Results.NotFound();
            if (session.Status != AuctionStatus.NotStarted)
                return Results.BadRequest(new { error = "Auction already started or completed." });
            if (!session.PlayerSlots.Any())
                return Results.BadRequest(new { error = "No players in auction order. Upload auction order first." });

            session.Status    = AuctionStatus.InProgress;
            session.StartedAt = DateTime.UtcNow;

            // Set first player as Active
            var first = session.PlayerSlots.OrderBy(s => s.AuctionOrder).First();
            first.Status = AuctionSlotStatus.Active;

            // Update season status
            var season = await db.Seasons.FindAsync(session.SeasonId);
            if (season is not null) season.Status = SeasonStatus.AuctionPhase;

            await db.SaveChangesAsync();
            return Results.Ok(new { message = "Auction started.", currentPlayerSlotId = first.Id });
        }).RequireAuthorization();

        // ── GET /api/auction/session/{seasonId} ───────────────────────────────
        // Get current auction session state
        group.MapGet("/session/{seasonId:guid}", async (
            Guid seasonId,
            AthenaXIDbContext db) =>
        {
            var session = await db.AuctionSessions
                .Include(a => a.PlayerSlots).ThenInclude(s => s.Player)
                .FirstOrDefaultAsync(a => a.SeasonId == seasonId &&
                                          a.Status != AuctionStatus.Completed);

            if (session is null)
                return Results.Ok(new { id = (Guid?)null, status = "NoSession", message = "No auction session found for this season. Upload player pool and auction order first." });

            var active = session.PlayerSlots
                .FirstOrDefault(s => s.Status == AuctionSlotStatus.Active);

            CurrentPlayerResponse? current = null;
            if (active is not null)
            {
                // Get current highest bid
                var topBid = await db.AuctionBids
                    .Include(b => b.BiddingUser)
                    .Where(b => b.AuctionPlayerSlotId == active.Id)
                    .OrderByDescending(b => b.AmountCr)
                    .FirstOrDefaultAsync();

                string? leaderTeam   = null;
                string? leaderColour = null;
                if (topBid is not null)
                {
                    var ft = await db.FantasyTeams
                        .FirstOrDefaultAsync(f => f.UserId == topBid.BiddingUserId &&
                                                  f.SeasonId == seasonId);
                    leaderTeam   = ft?.Name;
                    leaderColour = ft?.ThemeColour;
                }

                 current = new CurrentPlayerResponse(
                    active.Id, active.PlayerId,
                    active.Player.Name, active.Player.IPLTeam,
                    active.Player.Role.ToString(),
                    active.Player.IsOverseas, active.Player.IsUncapped,
                    active.BasePriceCr, active.BidIncrementCr,
                    active.AuctionSet, active.SetDisplayName,
                    active.RtmTeam, active.Status.ToString(),
                    topBid?.AmountCr ?? active.BasePriceCr,
                    leaderTeam, leaderColour,
                    topBid?.BiddingUserId);
            }

            var slots = session.PlayerSlots;
            return Results.Ok(new AuctionSessionResponse(
                session.Id, session.SeasonId, session.Status.ToString(),
                session.CurrentPlayerIndex,
                slots.Count,
                slots.Count(s => s.Status == AuctionSlotStatus.Sold),
                slots.Count(s => s.Status == AuctionSlotStatus.Unsold),
                slots.Count(s => s.Status == AuctionSlotStatus.Pending),
                session.StartedAt, session.CompletedAt,
                current));
        }).AllowAnonymous();

        // ── GET /api/auction/standings/{seasonId} ─────────────────────────────
        // Live budget + squad standings for big screen
        group.MapGet("/standings/{seasonId:guid}", async (
            Guid seasonId,
            AthenaXIDbContext db) =>
        {
            var teams = await db.FantasyTeams
                .Where(t => t.SeasonId == seasonId && t.IsActive)
                .ToListAsync();

            var userTeams = await db.UserTeams
                .Include(ut => ut.Players)
                .Where(ut => ut.SeasonId == seasonId)
                .ToDictionaryAsync(ut => ut.UserId);

            var standings = teams.Select(t =>
            {
                userTeams.TryGetValue(t.UserId, out var ut);
                return new AuctionStandingsRow(
                    t.Id, t.UserId, t.Name, t.ShortCode, t.ThemeColour,
                    ut?.BudgetRemainingCr ?? 0,
                    ut?.Players.Count ?? 0,
                    ut?.RtmSlotsRemaining ?? 0);
            }).OrderByDescending(s => s.BudgetRemainingCr);

            return Results.Ok(standings);
        }).AllowAnonymous();

        // ── POST /api/auction/bid ─────────────────────────────────────────────
        _ = group.MapPost("/bid", async (
            PlaceBidRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            var callerUserId = Guid.Parse(caller.FindFirst("userId")!.Value);
            // Admin can bid on behalf of a team by passing teamUserId
            var isAdmin = caller.IsInRole(nameof(UserRole.AppOwner)) || caller.IsInRole(nameof(UserRole.LeagueAdmin));
            var userId = (isAdmin && req.TeamUserId.HasValue)
                ? req.TeamUserId.Value
                : callerUserId;

            var session = await db.AuctionSessions
                .Include(a => a.Season).ThenInclude(s => s.Config)
                .FirstOrDefaultAsync(a => a.Id == req.AuctionSessionId);

            if (session is null || session.Status != AuctionStatus.InProgress)
                return Results.BadRequest(new { error = "No active auction session." });

            var slot = await db.AuctionPlayerSlots
                .FirstOrDefaultAsync(s => s.Id == req.AuctionPlayerSlotId &&
                                          s.Status == AuctionSlotStatus.Active);
            if (slot is null)
                return Results.BadRequest(new { error = "Player is not currently up for auction." });

            var ut = await db.UserTeams
                .Include(u => u.Players)
                .FirstOrDefaultAsync(u =>
                    u.UserId == userId && u.SeasonId == session.SeasonId);

            if (ut is null) return Results.Forbid();

            var config = session.Season.Config!;

            // Budget guard — skip for admin override bids
            if (!isAdmin || !req.TeamUserId.HasValue)
            {
                var playersNeeded = config.MinSquadSize - ut.Players.Count - 1;
                var minRequired = Math.Max(0, playersNeeded) * slot.BidIncrementCr;
                if (req.AmountCr > ut.BudgetRemainingCr - minRequired)
                    return Results.BadRequest(new
                    {
                        error = $"Insufficient budget. You need Rs.{minRequired}Cr for remaining squad slots."
                    });
            }

            // Minimum increment check
            var topBid = await db.AuctionBids
                .Where(b => b.AuctionPlayerSlotId == req.AuctionPlayerSlotId)
                .OrderByDescending(b => b.AmountCr)
                .FirstOrDefaultAsync();

            var minBid = topBid is null ? slot.BasePriceCr
                                        : topBid.AmountCr + slot.BidIncrementCr;

            if (req.AmountCr < minBid)
                return Results.BadRequest(new
                {
                    error = $"Bid must be at least ₹{minBid}Cr (current: ₹{topBid?.AmountCr ?? slot.BasePriceCr}Cr + ₹{slot.BidIncrementCr}Cr increment)."
                });

            // RTM validation
            if (req.IsRtm)
            {
                if (ut.RtmSlotsRemaining <= 0)
                    return Results.BadRequest(new { error = "No RTM slots remaining." });

                var team = await db.FantasyTeams
                    .FirstOrDefaultAsync(f => f.UserId == userId && f.SeasonId == session.SeasonId);

                if (team is null || slot.RtmTeam != team.ShortCode)
                    return Results.BadRequest(new { error = "This player's RTM belongs to a different team." });
            }

            var bid = new AuctionBid
            {
                AuctionSessionId = req.AuctionSessionId,
                AuctionPlayerSlotId = req.AuctionPlayerSlotId,
                BiddingUserId = userId,
                AmountCr = req.AmountCr,
                IsRtm = req.IsRtm,
                PlacedAt = DateTime.UtcNow,
            };
            db.AuctionBids.Add(bid);
            await db.SaveChangesAsync();

            var ft = await db.FantasyTeams
                .FirstOrDefaultAsync(f => f.UserId == userId && f.SeasonId == session.SeasonId);

            return Results.Ok(new BidResponse(
                bid.Id, bid.AmountCr,
                ft?.Name ?? "Unknown", ft?.ThemeColour ?? "#fff",
                bid.IsRtm, bid.PlacedAt));
        }).RequireAuthorization();

        // ── POST /api/auction/sold ────────────────────────────────────────────
        // Admin marks player as SOLD — triggers budget deduction + player assignment
        group.MapPost("/sold", async (
            MarkSoldRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var slot = await db.AuctionPlayerSlots
                .Include(s => s.Player)
                .FirstOrDefaultAsync(s => s.Id == req.AuctionPlayerSlotId &&
                                          s.Status == AuctionSlotStatus.Active);
            if (slot is null) return Results.BadRequest(new { error = "Player not currently active." });

            var session = await db.AuctionSessions
                .Include(a => a.Season).ThenInclude(s => s.Config)
                .FirstOrDefaultAsync(a => a.Id == req.AuctionSessionId);
            if (session is null) return Results.NotFound();

             var winnerTeam = await db.FantasyTeams
                .FirstOrDefaultAsync(f => f.UserId == req.WinningUserId &&
                                          f.SeasonId == session.SeasonId);
            if (winnerTeam is null) return Results.NotFound(new { error = $"Winning team not found for userId {req.WinningUserId}." });

            var ut = await db.UserTeams
                .Include(u => u.Players)
                .FirstOrDefaultAsync(u =>
                    u.UserId == req.WinningUserId && u.SeasonId == session.SeasonId);
            if (ut is null) return Results.NotFound(new { error = "UserTeam not found." });

            var config = session.Season.Config!;

            // Composition validation
            if (ut.Players.Count >= config.MaxSquadSize)
                return Results.BadRequest(new { error = $"Team already has maximum {config.MaxSquadSize} players." });

            // Overseas check
            if (slot.Player.IsOverseas)
            {
                var overseasCount = await db.UserTeamPlayers
                    .Include(p => p.Player)
                    .CountAsync(p => p.UserTeamId == ut.Id && p.Player.IsOverseas);
                if (overseasCount >= config.MaxOverseasPlayers)
                    return Results.BadRequest(new { error = $"Overseas limit ({config.MaxOverseasPlayers}) reached for this team." });
            }

            // Deduct budget
            ut.BudgetRemainingCr -= req.FinalPriceCr;
            ut.UpdatedAt          = DateTime.UtcNow;

            // RTM slot deduction
            if (req.WasRtm) ut.RtmSlotsRemaining = Math.Max(0, ut.RtmSlotsRemaining - 1);

            // Assign player to team
            db.UserTeamPlayers.Add(new UserTeamPlayer
            {
                UserTeamId       = ut.Id,
                PlayerId         = slot.PlayerId,
                Slot             = TeamSlot.PlayingXI,
                PurchasedPriceCr = req.FinalPriceCr,
            });

            // Mark slot sold
            slot.Status = AuctionSlotStatus.Sold;

            // Log result
            db.AuctionResults.Add(new AuctionResult
            {
                AuctionSessionId = req.AuctionSessionId,
                PlayerId         = slot.PlayerId,
                WinningUserId    = req.WinningUserId,
                FinalPriceCr     = req.FinalPriceCr,
                WasRtm           = req.WasRtm,
                WentUnsold       = false,
                ResolvedAt       = DateTime.UtcNow,
            });

            // Advance to next player
            await AdvanceToNextPlayer(session, db);
            await db.SaveChangesAsync();

            return Results.Ok(new
            {
                message       = $"{slot.Player.Name} sold to {winnerTeam.Name} for ₹{req.FinalPriceCr}Cr.",
                playerName    = slot.Player.Name,
                winningTeam   = winnerTeam.Name,
                finalPriceCr  = req.FinalPriceCr,
                budgetLeft    = ut.BudgetRemainingCr,
            });
        }).RequireAuthorization();

        // ── POST /api/auction/unsold ──────────────────────────────────────────
        group.MapPost("/unsold", async (
            MarkUnsoldRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var slot = await db.AuctionPlayerSlots
                .Include(s => s.Player)
                .FirstOrDefaultAsync(s => s.Id == req.AuctionPlayerSlotId &&
                                          s.Status == AuctionSlotStatus.Active);
            if (slot is null) return Results.BadRequest(new { error = "Player not currently active." });

            var session = await db.AuctionSessions
                .FirstOrDefaultAsync(a => a.Id == req.AuctionSessionId);
            if (session is null) return Results.NotFound();

            // Mark unsold — goes back into pool (stays Pending for recall)
            slot.Status = AuctionSlotStatus.Unsold;

            db.AuctionResults.Add(new AuctionResult
            {
                AuctionSessionId = req.AuctionSessionId,
                PlayerId         = slot.PlayerId,
                WentUnsold       = true,
                ResolvedAt       = DateTime.UtcNow,
            });

            await AdvanceToNextPlayer(session, db);
            await db.SaveChangesAsync();

            return Results.Ok(new
            {
                message    = $"{slot.Player.Name} marked unsold — back in pool.",
                playerName = slot.Player.Name,
            });
        }).RequireAuthorization();

        // ── POST /api/auction/recall-unsold ───────────────────────────────────
        // Recall a specific unsold player back into auction
        group.MapPost("/recall-unsold/{slotId:guid}", async (
            Guid slotId,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var slot = await db.AuctionPlayerSlots
                .Include(s => s.Player)
                .FirstOrDefaultAsync(s => s.Id == slotId &&
                                          s.Status == AuctionSlotStatus.Unsold);
            if (slot is null) return Results.BadRequest(new { error = "Player not found in unsold pool." });

            var session = await db.AuctionSessions
                .FirstOrDefaultAsync(a => a.Id == slot.AuctionSessionId &&
                                          a.Status == AuctionStatus.InProgress);
                if (session is null)
                    return Results.Ok(new { id = (Guid?)null, status = "NoSession", message = "No auction session found for this season. Upload player pool and auction order first." });
            // Check no other player is currently active
            var activeSlot = await db.AuctionPlayerSlots
                .AnyAsync(s => s.AuctionSessionId == session.Id &&
                               s.Status == AuctionSlotStatus.Active);
            if (activeSlot)
                return Results.BadRequest(new { error = "Resolve current player before recalling unsold." });

            // Remove old unsold result so it can be re-resolved
            var oldResult = await db.AuctionResults
                .FirstOrDefaultAsync(r => r.AuctionSessionId == session.Id &&
                                          r.PlayerId == slot.PlayerId && r.WentUnsold);
            if (oldResult is not null) db.AuctionResults.Remove(oldResult);

            slot.Status = AuctionSlotStatus.Active;
            await db.SaveChangesAsync();

            return Results.Ok(new
            {
                message    = $"{slot.Player.Name} recalled from unsold pool.",
                playerName = slot.Player.Name,
                slotId     = slot.Id,
            });
        }).RequireAuthorization();

        // ── POST /api/auction/admin-correct ───────────────────────────────────
        // Admin correction — reassign sold player before auction completes
        group.MapPost("/admin-correct", async (
            AdminCorrectRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var session = await db.AuctionSessions
                .FirstOrDefaultAsync(a => a.Id == req.AuctionSessionId &&
                                          a.Status == AuctionStatus.InProgress);
            if (session is null)
                return Results.Ok(new { id = (Guid?)null, status = "NoSession", message = "No auction session found for this season. Upload player pool and auction order first." });

            // Find existing result
            var result = await db.AuctionResults
                .FirstOrDefaultAsync(r => r.AuctionSessionId == req.AuctionSessionId &&
                                          r.PlayerId == req.PlayerId && !r.WentUnsold);
            if (result is null) return Results.NotFound(new { error = "No sold result found for this player." });

            // Refund original winner
            if (result.WinningUserId.HasValue)
            {
                var oldUt = await db.UserTeams
                    .Include(u => u.Players)
                    .FirstOrDefaultAsync(u =>
                        u.UserId == result.WinningUserId && u.SeasonId == session.SeasonId);
                if (oldUt is not null)
                {
                    oldUt.BudgetRemainingCr += result.FinalPriceCr ?? 0;
                    var toRemove = oldUt.Players.FirstOrDefault(p => p.PlayerId == req.PlayerId);
                    if (toRemove is not null) db.UserTeamPlayers.Remove(toRemove);
                }
            }

            // Assign to new winner
            var newUt = await db.UserTeams
                .Include(u => u.Players)
                .FirstOrDefaultAsync(u =>
                    u.UserId == req.NewWinningUserId && u.SeasonId == session.SeasonId);
            if (newUt is null) return Results.NotFound(new { error = "New winning team not found." });

            newUt.BudgetRemainingCr -= req.NewPriceCr;
            db.UserTeamPlayers.Add(new UserTeamPlayer
            {
                UserTeamId       = newUt.Id,
                PlayerId         = req.PlayerId,
                Slot             = TeamSlot.PlayingXI,
                PurchasedPriceCr = req.NewPriceCr,
            });

            // Update result
            result.WinningUserId = req.NewWinningUserId;
            result.FinalPriceCr  = req.NewPriceCr;
            result.ResolvedAt    = DateTime.UtcNow;

            await db.SaveChangesAsync();

            return Results.Ok(new
            {
                message      = "Auction corrected successfully.",
                playerId     = req.PlayerId,
                newWinnerId  = req.NewWinningUserId,
                newPriceCr   = req.NewPriceCr,
                reason       = req.Reason,
            });
        }).RequireAuthorization();

        // ── POST /api/auction/{sessionId}/complete ────────────────────────────
        group.MapPost("/{sessionId:guid}/complete", async (
            Guid sessionId,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var session = await db.AuctionSessions
                .FirstOrDefaultAsync(a => a.Id == sessionId);
            if (session is null) return Results.NotFound();

            var activeSlot = await db.AuctionPlayerSlots
                .AnyAsync(s => s.AuctionSessionId == sessionId &&
                               s.Status == AuctionSlotStatus.Active);
            if (activeSlot)
                return Results.BadRequest(new { error = "Resolve the current player before completing auction." });

            session.Status      = AuctionStatus.Completed;
            session.CompletedAt = DateTime.UtcNow;

            // Move season to TeamSelectionPhase
            var season = await db.Seasons.FindAsync(session.SeasonId);
            if (season is not null) season.Status = SeasonStatus.TeamSelectionPhase;

            await db.SaveChangesAsync();

            return Results.Ok(new { message = "Auction completed. Teams can now assign C/VC/Impact Player." });
        }).RequireAuthorization();

        // ── GET /api/auction/results/{sessionId} ──────────────────────────────
        group.MapGet("/results/{sessionId:guid}", async (
            Guid sessionId,
            AthenaXIDbContext db) =>
        {
            var session = await db.AuctionSessions
                .FirstOrDefaultAsync(a => a.Id == sessionId);
            if (session is null) return Results.NotFound();

            var results = await db.AuctionResults
                .Include(r => r.Player)
                .Where(r => r.AuctionSessionId == sessionId)
                .OrderBy(r => r.ResolvedAt)
                .ToListAsync();

            var userIds = results
                .Where(r => r.WinningUserId.HasValue)
                .Select(r => r.WinningUserId!.Value)
                .Distinct().ToList();

            var teams = await db.FantasyTeams
                .Where(f => userIds.Contains(f.UserId) && f.SeasonId == session.SeasonId)
                .ToDictionaryAsync(f => f.UserId);

            // Build playerId -> slotId map for recall
            var slotMap = await db.AuctionPlayerSlots
                .Where(s => s.AuctionSessionId == sessionId)
                .ToDictionaryAsync(s => s.PlayerId, s => s.Id);

            var response = results.Select(r =>
            {
                teams.TryGetValue(r.WinningUserId ?? Guid.Empty, out var ft);
                slotMap.TryGetValue(r.PlayerId, out var slotId);
                return new AuctionResultResponse(
                    r.PlayerId, r.Player.Name, r.Player.IPLTeam, r.Player.Role.ToString(),
                    ft?.Id, ft?.Name, ft?.ShortCode,
                    r.FinalPriceCr, r.WasRtm, r.WentUnsold, r.ResolvedAt, slotId);
            });

            return Results.Ok(response);
        }).AllowAnonymous();

        // ── GET /api/auction/bids/{slotId} ────────────────────────────────────
        // Get all bids for a player slot
        group.MapGet("/bids/{slotId:guid}", async (
            Guid slotId,
            AthenaXIDbContext db) =>
        {
            var bids = await db.AuctionBids
                .Include(b => b.BiddingUser)
                .Where(b => b.AuctionPlayerSlotId == slotId)
                .OrderByDescending(b => b.AmountCr)
                .ToListAsync();

            var seasonId = (await db.AuctionPlayerSlots
                .Include(s => s.AuctionSession)
                .FirstOrDefaultAsync(s => s.Id == slotId))
                ?.AuctionSession.SeasonId;

            var teamMap = seasonId.HasValue
                ? await db.FantasyTeams
                    .Where(f => f.SeasonId == seasonId)
                    .ToDictionaryAsync(f => f.UserId)
                : [];

            var response = bids.Select(b =>
            {
                teamMap.TryGetValue(b.BiddingUserId, out var ft);
                return new BidResponse(
                    b.Id, b.AmountCr,
                    ft?.Name ?? b.BiddingUser.Username,
                    ft?.ThemeColour ?? "#888",
                    b.IsRtm, b.PlacedAt);
            });

            return Results.Ok(response);
        }).AllowAnonymous();
        // ── POST /api/auction/{sessionId}/send-invites ────────────────────────
        // Admin sends invite notifications to all teams in the season
        group.MapPost("/{sessionId:guid}/send-invites", async (
            Guid sessionId,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            if (!IsAdminOrOwner(caller)) return Results.Forbid();

            var session = await db.AuctionSessions
                .Include(a => a.Season)
                .FirstOrDefaultAsync(a => a.Id == sessionId);
            if (session is null) return Results.NotFound();

            var teams = await db.FantasyTeams
                .Where(t => t.SeasonId == session.SeasonId && t.IsActive)
                .ToListAsync();

            if (!teams.Any())
                return Results.BadRequest(new { error = "No teams registered for this season." });

            // Remove existing invites and resend
            var existing = await db.AuctionInvites
                .Where(i => i.AuctionSessionId == sessionId).ToListAsync();
            db.AuctionInvites.RemoveRange(existing);

            var invites = teams.Select(t => new AuctionInvite
            {
                AuctionSessionId = sessionId,
                FantasyTeamId    = t.Id,
                UserId           = t.UserId,
                Status           = AuctionInviteStatus.Pending,
                SentAt           = DateTime.UtcNow,
            }).ToList();

            db.AuctionInvites.AddRange(invites);

            // Send notification to each team
            foreach (var team in teams)
            {
                db.Notifications.Add(new Notification
                {
                    UserId = team.UserId,
                    Title  = "🔨 Auction Invite",
                    Body   = $"You're invited to join the {session.Season.Name} auction. Open the app to accept!",
                    Type   = NotificationType.AuctionStartingSoon,
                });
            }

            // Update season status
            session.Season.Status = SeasonStatus.ReadyForAuction;
            await db.SaveChangesAsync();

            return Results.Ok(new { message = $"Invites sent to {teams.Count} teams.", count = teams.Count });
        }).AllowAnonymous();

        // ── GET /api/auction/{sessionId}/lobby ────────────────────────────────
        // Get lobby state — invite statuses, accepted count, can-start flag
        group.MapGet("/{sessionId:guid}/lobby", async (
            Guid sessionId,
            AthenaXIDbContext db) =>
        {
            var session = await db.AuctionSessions
                .Include(a => a.Season)
                .FirstOrDefaultAsync(a => a.Id == sessionId);
            if (session is null) return Results.NotFound();

            var invites = await db.AuctionInvites
                .Include(i => i.FantasyTeam)
                .Where(i => i.AuctionSessionId == sessionId)
                .ToListAsync();

            var accepted  = invites.Count(i => i.Status == AuctionInviteStatus.Accepted);
            var pending   = invites.Count(i => i.Status == AuctionInviteStatus.Pending);
            var declined  = invites.Count(i => i.Status == AuctionInviteStatus.Declined);
            var canStart  = accepted >= 1; // min 1 team accepted

            var inviteResponses = invites.Select(i => new AuctionInviteResponse(
                i.Id, i.AuctionSessionId, i.FantasyTeamId,
                i.FantasyTeam.Name, i.FantasyTeam.ShortCode,
                i.FantasyTeam.ThemeColour, i.Status.ToString(),
                i.SentAt, i.RespondedAt)).ToList();

            return Results.Ok(new AuctionLobbyResponse(
                session.Id, session.Season.Name, session.Status.ToString(),
                invites.Count, accepted, pending, declined,
                canStart, inviteResponses));
        }).AllowAnonymous();

        // ── POST /api/auction/invite/respond ─────────────────────────────────
        // Team owner accepts or declines invite
        group.MapPost("/invite/respond", async (
            RespondToInviteRequest req,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            var userId = Guid.Parse(caller.FindFirst("userId")!.Value);

            var invite = await db.AuctionInvites
                .Include(i => i.FantasyTeam)
                .FirstOrDefaultAsync(i => i.Id == req.InviteId && i.UserId == userId);

            if (invite is null)
                return Results.NotFound(new { error = "Invite not found." });

            invite.Status      = req.Accept ? AuctionInviteStatus.Accepted : AuctionInviteStatus.Declined;
            invite.RespondedAt = DateTime.UtcNow;
            await db.SaveChangesAsync();

            return Results.Ok(new
            {
                message = req.Accept
                    ? $"✅ {invite.FantasyTeam.Name} joined the auction!"
                    : $"❌ {invite.FantasyTeam.Name} declined the invite.",
                status  = invite.Status.ToString()
            });
        }).RequireAuthorization();

        // ── GET /api/auction/my-invite/{seasonId} ─────────────────────────────
        // Team owner checks their own invite status
        group.MapGet("/my-invite/{seasonId:guid}", async (
            Guid seasonId,
            AthenaXIDbContext db,
            ClaimsPrincipal caller) =>
        {
            var userId = Guid.Parse(caller.FindFirst("userId")!.Value);

            var team = await db.FantasyTeams
                .FirstOrDefaultAsync(t => t.UserId == userId && t.SeasonId == seasonId);
            if (team is null) return Results.NotFound(new { error = "No team found." });

            var session = await db.AuctionSessions
                .FirstOrDefaultAsync(a => a.SeasonId == seasonId);
            if (session is null)
                return Results.Ok(new { id = (Guid?)null, status = "NoSession", message = "No auction session found for this season. Upload player pool and auction order first." });

            var invite = await db.AuctionInvites
                .FirstOrDefaultAsync(i => i.AuctionSessionId == session.Id && i.FantasyTeamId == team.Id);

            if (invite is null) return Results.Ok(new { status = "NoInvite" });

            return Results.Ok(new AuctionInviteResponse(
                invite.Id, invite.AuctionSessionId, invite.FantasyTeamId,
                team.Name, team.ShortCode, team.ThemeColour,
                invite.Status.ToString(), invite.SentAt, invite.RespondedAt));
        }).RequireAuthorization();
    }
    
    // ── Helper — advance to next pending player ───────────────────────────────
    private static async Task AdvanceToNextPlayer(AuctionSession session, AthenaXIDbContext db)
    {
        session.CurrentPlayerIndex++;

        var next = await db.AuctionPlayerSlots
            .Where(s => s.AuctionSessionId == session.Id &&
                        s.Status == AuctionSlotStatus.Pending)
            .OrderBy(s => s.AuctionOrder)
            .FirstOrDefaultAsync();

        if (next is not null)
            next.Status = AuctionSlotStatus.Active;
    }

    private static bool IsAdminOrOwner(ClaimsPrincipal caller)
    {
        return caller.IsInRole(nameof(UserRole.AppOwner))
        || caller.IsInRole(nameof(UserRole.LeagueAdmin));
    }
}
