import { Component, Inject, Injector, forwardRef } from '@angular/core';
import { OTranslateService } from 'ontimize-web-ngx';
import { ODataTableColumnComponent, IDataTableCellRenderer } from '../o-datatable-column.component';

export const DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_BOOLEAN = [

  // true-value-type [string|number|icon|image]: type of value if true. Default: no value.
  'trueValueType: true-value-type',

  // true-value [string]: true value. Default: no value.
  'trueValue: true-value',

  // false-value-type [string|number|icon|image]: type of value if false. Default: no value.
  'falseValueType: false-value-type',

  // false-value [string]: false value. Default: no value.
  'falseValue: false-value',

  // false-value [number|boolean]: cellData value type. Default: boolean
  'dataType: data-type'
];

@Component({
  selector: 'o-datatable-cell-renderer-boolean',
  template: '',
  inputs: [
    ...DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_BOOLEAN
  ]
})
export class ODataTableCellRendererBooleanComponent implements IDataTableCellRenderer {

  public static DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_BOOLEAN = DEFAULT_INPUTS_O_DATATABLE_CELL_RENDERER_BOOLEAN;

  protected translateService: OTranslateService;
  protected trueValueType: string;
  protected trueValue: string;
  protected falseValueType: string;
  protected falseValue: string;
  protected dataType: string;

  constructor( @Inject(forwardRef(() => ODataTableColumnComponent)) tableColumn: ODataTableColumnComponent,
    protected injector: Injector) {
    tableColumn.registerRenderer(this);
    this.translateService = this.injector.get(OTranslateService);
  }

  public init(parameters: any) {
    if (typeof (parameters) !== 'undefined') {
      if (typeof (parameters.trueValueType) !== 'undefined') {
        this.trueValueType = parameters.trueValueType;
      }
      if (typeof (parameters.trueValue) !== 'undefined') {
        this.trueValue = parameters.trueValue;
      }
      if (typeof (parameters.falseValueType) !== 'undefined') {
        this.falseValueType = parameters.falseValueType;
      }
      if (typeof (parameters.falseValue) !== 'undefined') {
        this.falseValue = parameters.falseValue;
      }
      if (typeof (parameters.dataType) !== 'undefined') {
        this.dataType = parameters.dataType;
      }
    }
  }

  public render(cellData: any, rowData: any): string {
    return (this.hasCellDataTrueValue(cellData)) ?
      this.generateTemplate(this.trueValue, this.trueValueType) :
      this.generateTemplate(this.falseValue, this.falseValueType);
  }

  public handleCreatedCell(cellElement: any, rowData: any) {
    // nothing to do here
  }

  protected generateTemplate(value: string, type: string) {
    let template = '';
    switch (type) {
      case 'string':
        template = this.translateService.get(value);
        break;
      case 'number':
        template = value;
        break;
      case 'icon':
        template = '<md-icon class="material-icons">' + value + '</md-icon>';
        break;
      case 'image':
        template = '<img src="' + value + '" />';
        break;
    }
    return template;
  }

  protected hasCellDataTrueValue(cellData: any): boolean {
    let comparisonValue: boolean = undefined;
    switch (this.dataType) {
      case 'string':
        const stringVal = cellData.toString().toLowerCase();
        comparisonValue = (stringVal === 'true' || stringVal === 'yes');
        break;
      case 'number':
        comparisonValue = (cellData === 1);
        break;
      case 'boolean':
      case 'default':
        // boolean comparision as default value of dataType
        comparisonValue = (cellData === true);
        break;
    }
    return comparisonValue;
  }
}
