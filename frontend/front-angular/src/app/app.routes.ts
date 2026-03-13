import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/payment/payment').then((m) => m.Payment),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
