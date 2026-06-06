import { Routes } from '@angular/router';
import { authGuard, adminGuard, appOwnerGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    redirectTo: 'leaderboard',
    pathMatch: 'full'
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('./leaderboard/leaderboard.component').then(m => m.LeaderboardComponent)
  },
  {
    path: 'team',
    loadComponent: () => import('./team-builder/team-builder.component').then(m => m.TeamBuilderComponent),
    canActivate: [authGuard]
  },
  {
    path: 'auction',
    loadComponent: () => import('./auction/room/auction-room.component').then(m => m.AuctionRoomComponent),
    canActivate: [authGuard]
  },
  {
    path: 'transfers',
    loadComponent: () => import('./transfers/transfers.component').then(m => m.TransfersComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'season-setup',
    loadComponent: () => import('./season-setup/season-setup.component').then(m => m.SeasonSetupComponent),
    canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: 'leaderboard'
  }
];
