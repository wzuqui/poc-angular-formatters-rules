import DataSource from 'devextreme/data/data_source';
import ODataStore from 'devextreme/data/odata/store';
import type { EventInfo } from 'devextreme/events';
import type dxDataGrid from 'devextreme/ui/data_grid';
import type {
  Column,
  EditingStartEvent,
  EditorPreparingEvent,
  Properties,
  ToolbarPreparingInfo,
} from 'devextreme/ui/data_grid';
import type { Properties as PropertiesProperties } from 'devextreme/ui/popup';

import type { IPropriedade } from '../generated/template';
import type { ICrud } from '../types';
import { customizeColumns } from './customize-columns';

type OnContentReady = NonNullable<PropertiesProperties['onContentReady']>;
type OnContentReadyEvent = Parameters<OnContentReady>[0];

export abstract class CrudGeneric<TEntity, TKey extends number> implements ICrud<TEntity, number> {
  public dxDataGridProperties: Properties<TEntity, number>;
  public dxPopupTitle: string = 'Adicionar';
  public propriedades: IPropriedade[];

  constructor(pUrl: string, pEntity: new () => { Propriedades(): IPropriedade[] }) {
    this.propriedades = new pEntity().Propriedades();
    this.dxDataGridProperties = {
      customizeColumns: (pEvento: Column<TEntity, TKey>[]): void => {
        customizeColumns(pEvento, this.propriedades);
        this.customizeColumns(pEvento, this.propriedades);
      },
      dataSource: new DataSource({
        store: new ODataStore({
          version: 4,
          url: pUrl,
          key: 'Id',
          keyType: 'Int32',
        }),
      }),
      editing: {
        popup: {
          onContentReady: (pEvento: OnContentReadyEvent): void => {
            try {
              pEvento.component.option('title', this.dxPopupTitle);
            } finally {
              this.dxPopupTitle = 'Adicionar';
            }
          },
        },
      },
    };
  }

  public abstract customizeColumns(pEvento: Column[], pPropriedades: IPropriedade[]): void;

  public abstract onEditingStart(pEvento: EditingStartEvent<TEntity, number>): void;

  public abstract onEditorPreparing(pEvento: EditorPreparingEvent<TEntity, number>): void;

  public abstract onToolbarPreparing(pEvento: EventInfo<dxDataGrid<TEntity, number>> & ToolbarPreparingInfo): void;
}
