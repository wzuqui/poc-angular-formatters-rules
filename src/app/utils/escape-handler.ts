import { EditorPreparingEvent } from 'devextreme/ui/data_grid';

export function editorPreparingEventRegisterEscapeHandler<TEntity, TKey>(
  pEvento: EditorPreparingEvent<TEntity, TKey>,
): void {
  if (pEvento.parentType === 'dataRow') {
    pEvento.editorOptions.onInitialized = (pArg: {
      component: { registerKeyHandler: (arg0: string, arg1: () => void) => void };
    }): void => {
      pArg.component.registerKeyHandler('escape', function () {
        pEvento.component.cancelEditData();
      });
    };
  }
}
