import { NgModule } from '@angular/core';

import { OTABLE_MODULES } from './src/components';

/**
 * Exports
 */
export * from './src/components';

@NgModule({
  imports: OTABLE_MODULES,
  exports: OTABLE_MODULES
})
export class ODataTableModule {
}
