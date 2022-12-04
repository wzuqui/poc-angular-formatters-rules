import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

import { NotFoundComponent } from './not-found/not-found.component';

const xAppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tela-inicial',
    pathMatch: 'full',
  },
  {
    canActivate: [MsalGuard],
    loadChildren: () => import('./tela-inicial/tela-inicial.module').then(p => p.TelaInicialModule),
    path: 'tela-inicial',
  },
  {
    canActivate: [MsalGuard],
    loadChildren: () => import('./pessoas-fisicas/pessoas-fisicas.module').then(p => p.PessoasFisicasModule),
    path: 'pessoas-fisicas',
  },
  {
    canActivate: [MsalGuard],
    loadChildren: () => import('./pessoas-juridicas/pessoas-juridicas.module').then(p => p.PessoasJuridicasModule),
    path: 'pessoas-juridicas',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(xAppRoutes)],
})
export class AppRoutingModule {}
