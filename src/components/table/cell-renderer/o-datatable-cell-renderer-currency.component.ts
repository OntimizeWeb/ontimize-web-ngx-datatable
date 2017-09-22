import { Component, OnInit, Inject, Injector, forwardRef } from '@angular/core';

import {
  ODataTableCellRendererRealComponent,
  DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_REAL
} from './o-datatable-cell-renderer-real.component';

import { ODataTableColumnComponent, ITableCellRenderer } from '../o-datatable-column.component';
import { CurrencyService } from 'ontimize-web-ng2';

export const DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_CURRENCY = [

  ...DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_REAL,

  // currency-symbol [string]: currency symbol. Default: dollar ($).
  'currencySymbol: currency-symbol',

  // currency-symbol-position [left|right]: position of the currency symbol. Default: left.
  'currencySymbolPosition: currency-symbol-position'

];

@Component({
  selector: 'o-datatable-cell-renderer-currency',
  template: '',
  inputs: [
    ...DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_CURRENCY
  ]
})
export class ODataTableCellRendererCurrencyComponent extends ODataTableCellRendererRealComponent implements OnInit, ITableCellRenderer {

  public static DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_CURRENCY = DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_CURRENCY;

  protected currencyService: CurrencyService;
  protected currencySymbol: string;
  protected currencySymbolPosition: string;


  constructor( @Inject(forwardRef(() => ODataTableColumnComponent)) tableColumn: ODataTableColumnComponent,
    protected injector: Injector) {
    super(tableColumn, injector);
    this.currencyService = this.injector.get(CurrencyService);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.tableColumn.updateRendererType('currency');
    if (typeof (this.currencySymbol) === 'undefined') {
      this.currencySymbol = this.currencyService.symbol;
    }
    if (typeof (this.currencySymbolPosition) === 'undefined') {
      this.currencySymbolPosition = this.currencyService.symbolPosition;
    }
  }

  public init(parameters: any) {
    super.init(parameters);
    if (typeof (parameters) !== 'undefined') {
      if (typeof (parameters.currencySymbol) !== 'undefined') {
        this.currencySymbol = parameters.currencySymbol;
      }
      if (typeof (parameters.currencySymbolPosition) !== 'undefined') {
        this.currencySymbolPosition = parameters.currencySymbolPosition;
      }
    }
  }

  public render(cellData: any, rowData: any): string {
    const value = this.currencyService.getCurrencyValue(cellData, this.currencySymbol, this.currencySymbolPosition, this.grouping,
      this.thousandSeparator, this.decimalSeparator, this.decimalDigits);
    return '<div o-number-value="' + ((typeof (cellData) !== 'undefined') ? cellData : 0) + '">' +
      value +
      '</div>';
  }

  public handleCreatedCell(cellElement: any, rowData: any) {
    // nothing to do here
  }

}
