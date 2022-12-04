import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TelaInicialComponent } from './tela-inicial.component';

const xPessoasJuridicasRoutes: Routes = [
  {
    path: '',
    component: TelaInicialComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(xPessoasJuridicasRoutes)],
  exports: [RouterModule],
})
export class TelaInicialRoutingModule {}
