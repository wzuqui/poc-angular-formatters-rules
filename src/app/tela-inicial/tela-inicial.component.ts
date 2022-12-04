import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { SelectionChangedEvent } from 'devextreme/ui/select_box';

import { xMenu } from '../menu';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.scss'],
})
export class TelaInicialComponent {
  public menu = new DataSource({
    group: 'categoria',
    store: new ArrayStore({
      data: xMenu,
    }),
  });

  constructor(private _route: Router) {}

  public onSelectionChanged(pEvento: SelectionChangedEvent): void {
    this._route.navigate([pEvento.selectedItem.id]);
  }
}
