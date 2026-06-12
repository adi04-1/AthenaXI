import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'leaderboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent) },
  { path: 'leaderboard', loadComponent: () => import('./leaderboard/leaderboard.component').then(m => m.LeaderboardComponent) },
  { path: 'team', loadComponent: () => import('./team-builder/team-builder.component').then(m => m.TeamBuilderComponent), canActivate: [authGuard] },
  { path: 'auction', loadComponent: () => import('./auction/room/auction-room.component').then(m => m.AuctionRoomComponent), canActivate: [authGuard] },
  { path: 'transfers', loadComponent: () => import('./transfers/transfers.component').then(m => m.TransfersComponent), canActivate: [authGuard] },
  { path: 'notifications', loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent), canActivate: [authGuard] },

  // ── Admin — full-screen layout with child routes ──────────────────────────
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'seasons', pathMatch: 'full' },
      { path: 'seasons', loadComponent: () => import('./admin/seasons/seasons.component').then(m => m.SeasonsAdminComponent) },
      { path: 'players', loadComponent: () => import('./admin/players/players.component').then(m => m.PlayersAdminComponent) },
      { path: 'auction', loadComponent: () => import('./admin/auction-lobby/auction-lobby.component').then(m => m.AuctionLobbyComponent) },
      { path: 'notifications', loadComponent: () => import('./admin/notifications-admin/notifications-admin.component').then(m => m.NotificationsAdminComponent) },
    ]
  },

  // Keep old /season-setup as redirect
  { path: 'season-setup', redirectTo: 'admin/seasons', pathMatch: 'full' },
  { path: '**', redirectTo: 'leaderboard' }
];
