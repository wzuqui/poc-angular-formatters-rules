import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PessoasFisicaComponent } from './pessoas-fisicas.component';

const xPessoasFisicasRoutes: Routes = [
  {
    path: '',
    component: PessoasFisicaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(xPessoasFisicasRoutes)],
  exports: [RouterModule],
})
export class PessoasFisicasRoutingModule {}
