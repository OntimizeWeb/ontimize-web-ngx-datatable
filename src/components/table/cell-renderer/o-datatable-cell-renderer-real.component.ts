import { Component, OnInit, Inject, Injector, forwardRef } from '@angular/core';

import {
  ODataTableCellRendererIntegerComponent,
  DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_INTEGER
} from './o-datatable-cell-renderer-integer.component';

import { ODataTableColumnComponent, IDataTableCellRenderer } from '../o-datatable-column.component';

export const DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_REAL = [

  ...DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_INTEGER,

  // decimal-separator [string]: decimal separator. Default: dot (.).
  'decimalSeparator: decimal-separator',

  // decimal-digits [number]: number of decimal digits. Default: 2.
  'decimalDigits: decimal-digits'

];

@Component({
  selector: 'o-datatable-cell-renderer-real',
  template: '',
  inputs: [
    ...DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_REAL
  ]
})
export class ODataTableCellRendererRealComponent extends ODataTableCellRendererIntegerComponent implements OnInit, IDataTableCellRenderer {

  public static DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_REAL = DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_REAL;

  protected decimalSeparator: string;
  protected decimalDigits: number;


  constructor( @Inject(forwardRef(() => ODataTableColumnComponent)) tableColumn: ODataTableColumnComponent,
    protected injector: Injector) {
    super(tableColumn, injector);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.tableColumn.updateRendererType('real');
  }

  public init(parameters: any) {
    super.init(parameters);
    if (typeof (parameters) !== 'undefined') {
      if (typeof (parameters.decimalSeparator) !== 'undefined') {
        this.decimalSeparator = parameters.decimalSeparator;
      }
      if (typeof (parameters.decimalDigits) !== 'undefined') {
        this.decimalDigits = parameters.decimalDigits;
      }
    }
  }

  public render(cellData: any, rowData: any): string {
    return '<div o-number-value="' + ((typeof (cellData) !== 'undefined') ? cellData : 0) + '">' +
      this.numberService.getRealValue(cellData, this.grouping, this.thousandSeparator, this.decimalSeparator, this.decimalDigits) +
      '</div>';
  }

  public handleCreatedCell(cellElement: any, rowData: any) {
    // nothing to do here
  }

}
