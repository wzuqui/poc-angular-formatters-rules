import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DevExtremeModule } from 'devextreme-angular';

import { PessoasFisicasRoutingModule } from './pessoas-fisicas-routing.module';
import { PessoasFisicaComponent } from './pessoas-fisicas.component';

@NgModule({
  declarations: [PessoasFisicaComponent],
  imports: [CommonModule, DevExtremeModule, PessoasFisicasRoutingModule],
})
export class PessoasFisicasModule {}
