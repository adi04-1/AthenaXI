import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'leaderboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'team',
    loadComponent: () => import('./team-builder/team-builder.component').then(m => m.TeamBuilderComponent),
    // canActivate: [authGuard]  // uncomment Day 4
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('./leaderboard/leaderboard.component').then(m => m.LeaderboardComponent)
  },
  {
    path: 'transfers',
    loadComponent: () => import('./transfers/transfers.component').then(m => m.TransfersComponent),
    // canActivate: [authGuard]  // uncomment Day 4
  },
  {
    path: '**',
    redirectTo: 'leaderboard'
  }
];
