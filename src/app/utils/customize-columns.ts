import { Column } from 'devextreme/ui/data_grid';
import { Properties as dxTextBoxOptions } from 'devextreme/ui/text_box';
import { IPropriedade } from '../generated/template';

export function customizeColumns(
  pColumns: Column[],
  pPropriedades: IPropriedade[],
): void {
  for (const xColumn of pColumns) {
    const xPropriedade = pPropriedades.find(p => p.Nome == xColumn.dataField);

    if (!xPropriedade) continue;

    xColumn.caption = xPropriedade.Etiqueta;
    xColumn.visibleIndex = xPropriedade.Ordem;
    xColumn.visible = xPropriedade.Visivel;
    xColumn.allowExporting = xPropriedade.Visivel;
    xColumn.allowFiltering = xPropriedade.Visivel;
    xColumn.allowSearch = xPropriedade.Visivel;

    switch (xPropriedade.Tipo) {
      case 'DateTimeOffset':
        xColumn.alignment = 'center';
        xColumn.dataType = 'datetime';
        break;
      case 'string':
        if (xPropriedade.Mascara) {
          xColumn.alignment = 'right';
        }
        if (xPropriedade.Mascaras) {
          xColumn.alignment = 'right';
        }
        break;
    }

    xColumn.formItem = {};
    customizeFormItem(xColumn, xPropriedade);
  }

  function customizeFormItem(
    pColumn: Column,
    pPropriedade: IPropriedade,
  ): void {
    const xFormItem = pColumn.formItem;
    if (!xFormItem) return;

    if (pPropriedade.Formulario) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const [adicionar] = pPropriedade.Formulario;
      xFormItem.visible = adicionar;
      pColumn.allowEditing = adicionar;
    }
    xFormItem.isRequired = pPropriedade.Obrigatorio;
    xFormItem.visibleIndex = pPropriedade.Ordem ?? 999;
    const xEditorOptions = {} as dxTextBoxOptions;
    try {
      switch (pPropriedade.Tipo) {
        case 'string':
          xFormItem.editorType = 'dxTextBox';
          break;
        default:
          // ignored
          break;
      }

      if (!pColumn.validationRules) {
        pColumn.validationRules = [];
      }

      if (pPropriedade.ComprimentoMinimo) {
        pColumn.validationRules.push({
          min: pPropriedade.ComprimentoMinimo,
          type: 'stringLength',
        });
      }
      if (pPropriedade.ComprimentoMaximo) {
        pColumn.validationRules.push({
          max: pPropriedade.ComprimentoMaximo,
          type: 'stringLength',
        });
      }
      if (pPropriedade.Mascara) {
        xEditorOptions.mask = pPropriedade.Mascara;
        xEditorOptions.useMaskedValue = true;
      }
      if (pPropriedade.Mascaras) {
        // todo fazer um cursor com next, previous
        // todo ou fazer um obter mask pela length
      }
    } finally {
      xFormItem.editorOptions = xEditorOptions;
    }
  }
}
