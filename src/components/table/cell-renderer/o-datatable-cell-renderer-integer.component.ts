import { Component, OnInit, Inject, Injector, forwardRef } from '@angular/core';
import { NumberService, Util } from 'ontimize-web-ng2';
import { ODataTableColumnComponent, IDataTableCellRenderer } from '../o-datatable-column.component';

export const DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_INTEGER = [

  // grouping [no|yes]: grouping thousands. Default: yes.
  'grouping',

  // thousand-separator [string]: thousands separator when grouping. Default: comma (,).
  'thousandSeparator: thousand-separator'

];

@Component({
  selector: 'o-datatable-cell-renderer-integer',
  template: '',
  inputs: [
    ...DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_INTEGER
  ]
})
export class ODataTableCellRendererIntegerComponent implements OnInit, IDataTableCellRenderer {

  public static DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_INTEGER = DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_INTEGER;

  protected numberService: NumberService;
  protected grouping: any;
  protected thousandSeparator: string;

  constructor( @Inject(forwardRef(() => ODataTableColumnComponent)) protected tableColumn: ODataTableColumnComponent,
    protected injector: Injector) {
    tableColumn.registerRenderer(this);
    this.numberService = this.injector.get(NumberService);
  }

  public ngOnInit() {
    this.grouping = Util.parseBoolean(this.grouping, true);
    this.tableColumn.updateRendererType('integer');
  }

  public init(parameters: any) {
    if (typeof (parameters) !== 'undefined') {
      if (typeof (parameters.grouping) !== 'undefined') {
        this.grouping = parameters.grouping;
      }
      if (typeof (parameters.thousandSeparator) !== 'undefined') {
        this.thousandSeparator = parameters.thousandSeparator;
      }
    }
  }

  public render(cellData: any, rowData: any): string {
    return '<div o-number-value="' + ((typeof (cellData) !== 'undefined') ? cellData : 0) + '">' +
      this.numberService.getIntegerValue(cellData, this.grouping, this.thousandSeparator) +
      '</div>';
  }

  public handleCreatedCell(cellElement: any, rowData: any) {
    // nothing to do here
  }

}
