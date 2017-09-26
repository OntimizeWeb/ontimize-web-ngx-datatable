import { Component, Inject, forwardRef, Injector } from '@angular/core';
import { ODataTableColumnComponent, IDataTableCellRenderer } from '../o-datatable-column.component';
import { OTranslateService, Util } from 'ontimize-web-ngx';

export const DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_STRING = [
  'translate'
];

@Component({
  selector: 'o-datatable-cell-renderer-string',
  template: '',
  inputs: [
    ...DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_STRING
  ],
})
export class ODataTableCellRendererStringComponent implements IDataTableCellRenderer {

  public static DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_STRING = DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_STRING;

  protected translate: any;
  protected translateService: OTranslateService;

  constructor(
    @Inject(forwardRef(() => ODataTableColumnComponent)) protected tableColumn: ODataTableColumnComponent,
    protected injector: Injector
  ) {
    tableColumn.registerRenderer(this);
    this.translateService = this.injector.get(OTranslateService);
  }

  public ngOnInit() {
    this.tableColumn.updateRendererType('string');
    this.translate = Util.parseBoolean(this.translate, false);
    this.init(undefined);
  }

  public init(parameters: any) {
    if (typeof (parameters) !== 'undefined') {
      if (typeof (parameters.translate) !== 'undefined') {
        this.translate = parameters.translate;
      }
    }
  }

  public render(cellData: any, rowData: any): string {
    let value = '';
    if (typeof (cellData) !== 'undefined') {
      value = this.translate ? this.translateService.get(String(cellData)) : String(cellData);
    }
    return value;
  }

  public handleCreatedCell(cellElement: any, rowData: any) {
    // nothing to do here
  }

}
