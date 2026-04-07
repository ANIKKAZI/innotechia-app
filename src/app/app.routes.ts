import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login').then((m) => m.Login),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about').then((m) => m.About),
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services').then((m) => m.Services),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/detail').then((m) => m.Detail),
  },
];
