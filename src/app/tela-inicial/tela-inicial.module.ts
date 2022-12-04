import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DevExtremeModule } from 'devextreme-angular';

import { TelaInicialRoutingModule } from './tela-inicial-routing.module';
import { TelaInicialComponent } from './tela-inicial.component';

@NgModule({
  declarations: [TelaInicialComponent],
  imports: [CommonModule, DevExtremeModule, TelaInicialRoutingModule],
})
export class TelaInicialModule {}
