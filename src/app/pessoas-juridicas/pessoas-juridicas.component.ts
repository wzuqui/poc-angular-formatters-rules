import { Component } from '@angular/core';
import type { EventInfo } from 'devextreme/events';
import type dxDataGrid from 'devextreme/ui/data_grid';
import type { Column, EditingStartEvent, EditorPreparingEvent, ToolbarPreparingInfo } from 'devextreme/ui/data_grid';

import { IPropriedade, RavexSolution } from '../generated/template';
import { CrudGeneric } from '../utils/crud-generic';
import { customizeColumns } from '../utils/customize-columns';
import { editorPreparingEventRegisterEscapeHandler } from '../utils/escape-handler';
import { onToolbarPreparing } from '../utils/toolbar-preparing';

@Component({
  selector: 'app-pessoas-juridicas',
  templateUrl: './pessoas-juridicas.component.html',
  styleUrls: ['./pessoas-juridicas.component.scss'],
})
export class PessoasJuridicasComponent extends CrudGeneric<RavexSolution.Safe.Domain.Entities.PessoaFisica, number> {
  constructor() {
    super('odata/PessoasJuridicas', RavexSolution.Safe.Domain.Entities.PessoaJuridica);
  }

  public customizeColumns(pEvento: Column[], pPropriedades: IPropriedade[]): void {
    if (pEvento.length === 0) {
      pEvento.push(
        ...pPropriedades.map(
          p =>
            ({
              dataField: p.Nome,
              caption: p.Etiqueta,
            } as Column),
        ),
      );
      customizeColumns(pEvento, pPropriedades);
    }
  }

  public onEditingStart(pEvento: EditingStartEvent<RavexSolution.Safe.Domain.Entities.PessoaFisica, number>): void {
    this.dxPopupTitle = pEvento.data ? 'Editar' : 'Adicionar';
  }

  public onEditorPreparing(
    pEvento: EditorPreparingEvent<RavexSolution.Safe.Domain.Entities.PessoaFisica, number>,
  ): void {
    editorPreparingEventRegisterEscapeHandler(pEvento);
    const xPropriedade = this.propriedades.find(p => p.Nome == pEvento.dataField);

    if (!xPropriedade) return;

    if (xPropriedade.Formulario) {
      const [xAdicionar, xEditar] = xPropriedade.Formulario;
      const xDesabilitar = pEvento.row?.isNewRow !== undefined ? !xAdicionar : !xEditar;
      pEvento.editorOptions.disabled = xDesabilitar;
    }
  }

  public onToolbarPreparing(
    pEvento: EventInfo<dxDataGrid<RavexSolution.Safe.Domain.Entities.PessoaFisica, number>> & ToolbarPreparingInfo,
  ): void {
    onToolbarPreparing('Pessoas Jurídicas', pEvento);
  }
}
