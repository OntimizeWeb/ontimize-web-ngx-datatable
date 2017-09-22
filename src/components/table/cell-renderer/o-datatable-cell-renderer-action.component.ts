import { Component, OnInit, Inject, Injector, forwardRef, EventEmitter } from '@angular/core';
import { OTranslateService } from 'ontimize-web-ng2';
import { ODataTableColumnComponent, ITableCellRenderer } from '../o-datatable-column.component';


export const DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_ACTION = [
  // action [detail|delete|edit]: action to perform. Default: no value.
  'action',

  // edition-mode [string]: edition mode. Default: none
  'editionMode : edition-mode',

  // render-type [string|icon|image|button]: type of value to render. Default: 'icon'.
  'renderType: render-type',

  // render-value [string]: value to render. Default: it depends of render-type.
  'renderValue: render-value',

  // action-title[string]: title for action cell
  'actionTitle : action-title'
];

export const DEFAULT_OUTPUTS_O_TABLE_CELL_RENDERER_ACTION = [
  'onClick'
];

@Component({
  selector: 'o-datatable-cell-renderer-action',
  template: '',
  inputs: [
    ...DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_ACTION
  ],
  outputs: [
    ...DEFAULT_OUTPUTS_O_TABLE_CELL_RENDERER_ACTION
  ]
})
export class ODataTableCellRendererActionComponent implements OnInit, ITableCellRenderer {

  public static DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_ACTION = DEFAULT_INPUTS_O_TABLE_CELL_RENDERER_ACTION;
  public static DEFAULT_OUTPUTS_O_TABLE_CELL_RENDERER_ACTION = DEFAULT_OUTPUTS_O_TABLE_CELL_RENDERER_ACTION;

  public static ACTION_DETAIL = 'detail';
  public static ACTION_DELETE = 'delete';
  public static ACTION_EDIT = 'edit';

  protected static DEFAULT_RENDER_TYPE = 'icon';
  protected static DEFAULT_RENDER_VALUES = {
    'detail': 'search',
    'delete': 'delete',
    'edit': 'edit'
  };
  protected static EDIT_SAVE_ICON = 'done';
  protected static EDIT_CANCEL_ICON = 'clear';

  protected tableColumn: ODataTableColumnComponent;
  protected translateService: OTranslateService;
  protected action: string;
  protected editionMode: string;
  protected renderType: string;
  protected renderValue: string;
  protected actionTitle: string;
  onClick: EventEmitter<Object> = new EventEmitter<Object>();

  constructor( @Inject(forwardRef(() => ODataTableColumnComponent)) tableColumn: ODataTableColumnComponent,
    protected injector: Injector) {
    this.tableColumn = tableColumn;
    this.tableColumn.registerRenderer(this);
    this.translateService = this.injector.get(OTranslateService);
    this.renderType = ODataTableCellRendererActionComponent.DEFAULT_RENDER_TYPE;
  }

  public ngOnInit() {
    if ((typeof (this.renderValue) === 'undefined') &&
      ODataTableCellRendererActionComponent.DEFAULT_RENDER_VALUES.hasOwnProperty(this.action)) {
      this.renderValue = ODataTableCellRendererActionComponent.DEFAULT_RENDER_VALUES[this.action];
    }
    if (this.renderType === 'icon' && this.tableColumn.width === undefined) {
      // using width = 2 because padding-left and right is 24 so total width will be 50
      this.tableColumn.setWidth('2px');
    }
  }

  public init(parameters: any) {
    if (typeof (parameters) !== 'undefined') {
      if (typeof (parameters.action) !== 'undefined') {
        this.action = parameters.action;
      }
      if (typeof (parameters.editionMode) !== 'undefined') {
        this.editionMode = parameters.editionMode;
      }
      if (typeof (parameters.renderType) !== 'undefined') {
        this.renderType = parameters.renderType;
      }
      if (typeof (parameters.renderValue) !== 'undefined') {
        this.renderValue = parameters.renderValue;
      } else if (ODataTableCellRendererActionComponent.DEFAULT_RENDER_VALUES.hasOwnProperty(this.action)) {
        this.renderValue = ODataTableCellRendererActionComponent.DEFAULT_RENDER_VALUES[this.action];
      }
    }
  }

  public render(cellData: any, rowData: any): string {
    let actionTitleKey = this.actionTitle;
    if (!this.actionTitle && (typeof (this.action) !== 'undefined')) {
      actionTitleKey = this.action.toUpperCase();
    }
    let actionTranslated = (typeof (actionTitleKey) !== 'undefined') ? this.translateService.get(actionTitleKey) : '';
    let result = '<div class="o-table-row-action" title="' + actionTranslated + '">';
    switch (this.renderType) {
      case 'string':
        result += this.translateService.get(this.renderValue);
        break;
      case 'icon':
        result += '<md-icon class="material-icons">' + this.renderValue + '</md-icon>';
        break;
      case 'image':
        result += '<img src="' + this.renderValue + '" />';
        break;
      case 'button':
        result += '<button type="button" md-raised-button>';
        result += '<span class="o-button-text">' + this.translateService.get(this.renderValue) + '</span>';
        result += '</button>';
        break;
    }
    result += '</div>';
    return result;
  }

  public handleCreatedCell(cellElement: any, rowData: any) {
    cellElement.bind('click', (e) => {
      e.stopPropagation();
      this.onClick.emit(rowData);
      if (typeof (this.action) !== 'undefined') {
        switch (this.action.toLowerCase()) {
          case ODataTableCellRendererActionComponent.ACTION_DETAIL:
            this.tableColumn.viewDetail(rowData);
            break;
          case ODataTableCellRendererActionComponent.ACTION_DELETE:
            this.tableColumn.remove(rowData);
            break;
          case ODataTableCellRendererActionComponent.ACTION_EDIT:
            if (this.editionMode === 'inline') {
              this.handleInlineEditActionClick(cellElement, rowData);
            } else {
              this.tableColumn.editDetail(rowData);
            }
            break;
        }
      }
    });
  }


  protected handleInlineEditActionClick(cellElement: any, rowData: any) {
    cellElement.bind('click', (e) => {
      e.stopPropagation();

      // render editors
      this.tableColumn.renderRowEditors(cellElement);

      // render actions
      cellElement.html(this.renderEditActions());
      cellElement.find('.o-table-row-action-edit-cancel').bind('click', (e) => {
        e.stopPropagation();

        // render renderers
        this.tableColumn.renderRowRenderers(cellElement, rowData);

        // hide edit buttons
        cellElement.html(this.render(undefined, undefined));
        this.handleCreatedCell(cellElement, rowData);
      });
      cellElement.find('.o-table-row-action-edit-save').bind('click', (e) => {
        e.stopPropagation();

        // save
        let av = this.tableColumn.getRowEditorsAttrValues(cellElement);
        if (typeof (av) !== 'undefined') {
          for (let i in av) {
            if (rowData.hasOwnProperty(i)) {
              rowData[i] = av[i];
            }
          }
          this.tableColumn.updateRow(cellElement, av);
        }

        // render renderers
        this.tableColumn.renderRowRenderers(cellElement, rowData);

        // hide edit buttons
        cellElement.html(this.render(undefined, undefined));
        this.handleCreatedCell(cellElement, rowData);
      });
    });
  }

  protected renderEditActions() {
    let html = '<md-icon class="o-table-row-action-edit-cancel material-icons" title="' + this.translateService.get('CANCEL') + '">' +
      ODataTableCellRendererActionComponent.EDIT_CANCEL_ICON +
      '</md-icon>' +
      '<md-icon class="o-table-row-action-edit-save material-icons" title="' + this.translateService.get('SAVE') + '">' +
      ODataTableCellRendererActionComponent.EDIT_SAVE_ICON +
      '</md-icon>';
    return html;
  }

}
