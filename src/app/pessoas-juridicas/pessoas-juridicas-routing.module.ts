import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PessoasJuridicasComponent } from './pessoas-juridicas.component';

const xPessoasJuridicasRoutes: Routes = [
  {
    path: '',
    component: PessoasJuridicasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(xPessoasJuridicasRoutes)],
  exports: [RouterModule],
})
export class PessoasJuridicasRoutingModule {}
