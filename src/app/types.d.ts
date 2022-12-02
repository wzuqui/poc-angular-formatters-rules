import type { EventInfo } from 'devextreme/events';
import type dxDataGrid from 'devextreme/ui/data_grid';
import type {
  Column,
  EditingStartEvent,
  EditorPreparingEvent,
  Properties,
  ToolbarPreparingInfo,
} from 'devextreme/ui/data_grid';
import type { IPropriedade } from './generated/template';

interface ICrud<TRowData = unknown, TKey = unknown> {
  dxDataGridProperties: Properties<TRowData, TKey>;
  customizeColumns(pEvento: Column[], pPropriedades: IPropriedade[]): void;
  onEditingStart(pEvento: EditingStartEvent<TRowData, TKey>): void;
  onEditorPreparing(pEvento: EditorPreparingEvent<TRowData, TKey>): void;
  onToolbarPreparing(pEvento: EventInfo<dxDataGrid> & ToolbarPreparingInfo): void;
}
