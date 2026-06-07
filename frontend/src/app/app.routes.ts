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
    loadComponent: () => import('./leaderboard/leaderboard/leaderboard').then(m => m.Leaderboard)
  },
  {
    path: 'team',
    loadComponent: () => import('./team-builder/team-builder/team-builder').then(m => m.TeamBuilder),
    canActivate: [authGuard]
  },
  {
    path: 'auction',
    loadComponent: () => import('./auction/room/auction-room/auction-room').then(m => m.AuctionRoom),
    canActivate: [authGuard]
  },
  {
    path: 'transfers',
    loadComponent: () => import('./transfers/transfers/transfers').then(m => m.Transfers),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin/admin').then(m => m.Admin),
    canActivate: [adminGuard]
  },
  {
    path: 'season-setup',
    loadComponent: () => import('./season-setup/season-setup/season-setup').then(m => m.SeasonSetup),
    canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: 'leaderboard'
  }
];
