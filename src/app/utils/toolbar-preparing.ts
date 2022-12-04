import { EventInfo } from 'devextreme/events';
import { Properties } from 'devextreme/ui/button';
import dxDataGrid, { ToolbarPreparingInfo } from 'devextreme/ui/data_grid';
import { Item } from 'devextreme/ui/toolbar';

export function onToolbarPreparing<TEntity>(
  pEvento: EventInfo<dxDataGrid<TEntity, number>> & ToolbarPreparingInfo,
): void {
  const xItens = pEvento.toolbarOptions.items;
  if (!xItens) {
    return;
  }
  const xSearchPanel = removerItem('searchPanel');
  if (xSearchPanel) {
    xSearchPanel.location = 'after';
  }

  const xAddRowButton = removerItem('addRowButton');
  if (xAddRowButton) {
    xAddRowButton.showText = 'always';
    xAddRowButton.options.text = 'Adicionar';
    xAddRowButton.options.stylingMode = 'text';
  }

  const xExportButton = removerItem('exportButton');
  if (xExportButton) {
    xExportButton.showText = 'always';
    xExportButton.options.text = xExportButton.options.hint;
    xExportButton.options.stylingMode = 'text';
  }

  const xColumnChooserButton = removerItem('columnChooserButton');
  if (xColumnChooserButton) {
    xColumnChooserButton.showText = 'always';
    xColumnChooserButton.options.stylingMode = 'text';
  }

  const xRefreshButton = {
    location: 'after',
    widget: 'dxButton',
    options: {
      text: 'Atualizar',
      icon: 'refresh',
      onClick: () => pEvento.component.refresh(),
      stylingMode: 'text',
    } as Properties,
  };

  pEvento.toolbarOptions.items = [
    {
      ...xAddRowButton,
      location: 'before',
    },
    {
      ...xRefreshButton,
      location: 'before',
    },
    {
      ...xColumnChooserButton,
      location: 'before',
    },
    {
      location: 'before',
      template: 'separator',
    },
    {
      ...xExportButton,
      location: 'before',
    },
    {
      ...xSearchPanel,
      location: 'after',
    },
  ] as Item[];

  function removerItem(pName: string): (Omit<Item, 'options'> & { options: Properties }) | undefined {
    if (!xItens) {
      return undefined;
    }
    const xIndex = xItens.findIndex(p => p.name === pName);
    try {
      return xItens[xIndex];
    } finally {
      xItens.splice(xIndex, 1);
    }
  }
}
