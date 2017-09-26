import { Component, Inject, forwardRef, EventEmitter } from '@angular/core';
import { ObservableWrapper } from 'ontimize-web-ngx';
import { ODataTableColumnComponent, IDataTableCellEditor } from '../o-datatable-column.component';

@Component({
  selector: 'o-datatable-cell-editor-integer',
  template: '',
  outputs: [
    'onFocus',
    'onBlur',
    'onSubmit'
  ]
})
export class ODataTableCellEditorIntegerComponent implements IDataTableCellEditor {

  public onFocus: EventEmitter<any> = new EventEmitter();
  public onBlur: EventEmitter<any> = new EventEmitter();
  public onSubmit: EventEmitter<any> = new EventEmitter();

  protected tableColumn: ODataTableColumnComponent;
  protected insertTableInput: any;

  constructor( @Inject(forwardRef(() => ODataTableColumnComponent)) tableColumn: ODataTableColumnComponent) {
    this.tableColumn = tableColumn;
    this.tableColumn.registerEditor(this);
  }

  public init(parameters: any) {
    // nothing to initialize here
  }

  public getHtml(data: any): string {
    let html = '<input type="number" ';
    if (typeof (data) !== 'undefined') {
      html += 'value="' + data + '" ';
    }
    html += 'onclick="event.stopPropagation();" ondblclick="event.stopPropagation();" />';
    return html;
  }

  public handleCellFocus(cellElement: any, data: any) {
    this.create(cellElement, data);
  }

  public handleCellBlur(cellElement: any) {
    this.performInsertion(cellElement);
  }

  public create(cellElement: any, data: any) {
    let input = cellElement.find('input');
    if (input.length === 0) {
      cellElement.addClass('editing');
      cellElement.html(this.getHtml(data));
      input = cellElement.find('input');
      input.width(input.width() - 24);
      input.bind('keypress', (e) => {
        let code = e.keyCode || e.which;
        if (code === 13) {
          ObservableWrapper.callEmit(this.onSubmit, { editor: this });
          this.performInsertion(cellElement);
        }
      });
      input.bind('focus', (e) => {
        ObservableWrapper.callEmit(this.onFocus, { editor: this });
      });
      input.bind('focusout', (e) => {
        ObservableWrapper.callEmit(this.onBlur, { editor: this });
        this.performInsertion(cellElement);
      });
      input.focus();
      input.select();
    }
  }

  public destroy(cellElement: any) {
    let input = cellElement.find('input');
    if (input.length > 0) {
      cellElement.removeClass('editing');
      input.remove();
    }
  }

  public performInsertion(cellElement: any) {
    let input = cellElement.find('input');
    if (input.length > 0) {
      let newValue = parseInt(input.val());
      if (isNaN(newValue)) {
        newValue = 0;
      }
      this.destroy(cellElement);
      this.tableColumn.updateCell(cellElement, newValue);
    }
  }

  public createEditorForInsertTable(cellElement: any, data: any) {
    cellElement.html(this.getHtml(data));
    this.insertTableInput = cellElement.find('input');
    this.insertTableInput.bind('keydown', (e) => {
      let code = e.keyCode || e.which;
      if (code === 13 /*|| code === 9*/) {
        ObservableWrapper.callEmit(this.onSubmit, { insertTable: true, editor: this });
      }
    });
    this.insertTableInput.bind('focus', (e) => {
      ObservableWrapper.callEmit(this.onFocus, { insertTable: true, editor: this });
    });
    this.insertTableInput.bind('focusout', (e) => {
      ObservableWrapper.callEmit(this.onBlur, { insertTable: true, editor: this });
    });
  }

  public getInsertTableValue(): any {
    let value = undefined;
    if (typeof (this.insertTableInput) !== 'undefined') {
      value = parseInt(this.insertTableInput.val());
      if (isNaN(value)) {
        value = 0;
      }
    }
    return value;
  }

}
