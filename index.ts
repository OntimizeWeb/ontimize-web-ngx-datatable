import { NgModule } from '@angular/core';

import { ODataTableComponentModule } from './src/components/table/o-datatable.component';
import { OLightTableModule } from './src/components/light-table/o-light-table.component';
import { OLightTableButtonPanelModule } from './src/components/light-table/o-light-table-button-panel.component';
import { OLightTableColumnModule } from './src/components/light-table/o-light-table-column.component';

export const ODATATABLE_MODULES: any[] = [
  ODataTableComponentModule,
  OLightTableModule,
  OLightTableButtonPanelModule,
  OLightTableColumnModule
];

export * from './src/components/light-table/o-light-table.component';
export * from './src/components/light-table/o-light-table-button-panel.component';
export * from './src/components/light-table/o-light-table-column.component';

export * from './src/components/table/o-datatable.component';
export * from './src/components/table/o-datatable-column.component';
export * from './src/components/table/header-components/header-components';
export * from './src/components/table/cell-renderer/cell-renderer';
export * from './src/components/table/cell-editor/cell-editor';


@NgModule({
  imports: ODATATABLE_MODULES,
  exports: ODATATABLE_MODULES
})
export class ODataTableModule {
}
