import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DevExtremeModule } from 'devextreme-angular';

import { PessoasJuridicasRoutingModule } from './pessoas-juridicas-routing.module';
import { PessoasJuridicasComponent } from './pessoas-juridicas.component';

@NgModule({
  declarations: [PessoasJuridicasComponent],
  imports: [CommonModule, DevExtremeModule, PessoasJuridicasRoutingModule],
})
export class PessoasJuridicasModule {}
