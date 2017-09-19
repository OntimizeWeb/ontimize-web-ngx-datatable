import { NgModule } from '@angular/core';

import { ODATATABLE_MODULES } from './src/components';

/**
 * Exports
 */
export * from './src/components';

@NgModule({
  imports: ODATATABLE_MODULES,
  exports: ODATATABLE_MODULES
})
export class ODataTableModule {
}
