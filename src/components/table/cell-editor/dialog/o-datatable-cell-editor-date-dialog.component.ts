import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'o-datatable-cell-editor-date-dialog',
  templateUrl: './o-datatable-cell-editor-date-dialog.component.html',
  styleUrls: ['./o-datatable-cell-editor-date-dialog.component.scss'],
  inputs: [
    'data',
    'label'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODataTableCellEditorDateDialog {

  protected _date: any;
  protected _label: string;
  @ViewChild('form')
  protected form: OFormComponent;

  constructor(protected dialogRef: MdDialogRef<ODataTableCellEditorDateDialog>) { }

  initialize(parameters: Object): any {
    this.date = parameters['data'];
    this.label = parameters['label'];
  }

  ngAfterViewInit() {
    if (this.form) {
      this.form.setInsertMode();
    }
  }

  getDateValue() {
    if (this.form) {
      return this.form.getDataValue('dateInput').value;
    }
    return undefined;
  }

  get date(): any {
    return this._date;
  }

  set date(val: any) {
    this._date = val instanceof Date ? val : new Date(val);
  }

  get label(): string {
    return this._label;
  }

  set label(val: string) {
    this._label = val;
  }
}
