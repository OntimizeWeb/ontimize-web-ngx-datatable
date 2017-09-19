import { ODataTableComponentModule } from './table/o-datatable.component';

import { OLightTableModule } from './light-table/o-light-table.component';
import { OLightTableButtonPanelModule } from './light-table/o-light-table-button-panel.component';
import { OLightTableColumnModule } from './light-table/o-light-table-column.component';

export * from './table/o-datatable.component';

export * from './light-table/o-light-table.component';
export * from './light-table/o-light-table-button-panel.component';
export * from './light-table/o-light-table-column.component';

export * from './table/o-datatable.component';
export * from './table/o-datatable-column.component';
export * from './table/header-components/header-components';
export * from './table/cell-renderer/cell-renderer';
export * from './table/cell-editor/cell-editor';

export const ODATATABLE_MODULES: any[] = [
  ODataTableComponentModule,
  OLightTableModule,
  OLightTableButtonPanelModule,
  OLightTableColumnModule
];
