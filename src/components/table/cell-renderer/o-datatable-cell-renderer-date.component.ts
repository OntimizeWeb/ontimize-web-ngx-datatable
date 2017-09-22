import { Component, Inject, Injector, forwardRef } from '@angular/core';
import { MomentService } from 'ontimize-web-ng2';
import { ODataTableColumnComponent, ITableCellRenderer } from '../o-datatable-column.component';

export const DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_DATE = [
  // format [string]: date format. See MomentJS (http://momentjs.com/).
  'format'
];

@Component({
  selector: 'o-datatable-cell-renderer-date',
  template: '',
  inputs: [
    ...DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_DATE
  ]
})
export class ODataTableCellRendererDateComponent implements ITableCellRenderer {

  public static DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_DATE = DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_DATE;

  protected momentService: MomentService;
  protected format: string;

  constructor( @Inject(forwardRef(() => ODataTableColumnComponent)) protected tableColumn: ODataTableColumnComponent,
    protected injector: Injector) {
    tableColumn.registerRenderer(this);
    this.momentService = this.injector.get(MomentService);
  }

  public ngOnInit() {
    this.tableColumn.updateRendererType('date');
  }

  public init(parameters: any) {
    if (typeof (parameters) !== 'undefined') {
      if (typeof (parameters.format) !== 'undefined') {
        this.format = parameters.format;
      }
    }
  }

  public render(cellData: any, rowData: any): string {
    return '<div o-timestamp-value="' + ((typeof (cellData) !== 'undefined') ? cellData : 0) + '">' +
      ((typeof (cellData) !== 'undefined') ? this.momentService.parseDate(cellData, this.format) : '') +
      '</div>';
  }

  public handleCreatedCell(cellElement: any, rowData: any) {
    // nothing to do here
  }

}
