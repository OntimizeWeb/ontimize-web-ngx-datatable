import { Component, OnInit, Inject, forwardRef, EventEmitter } from '@angular/core';
import { ODataTableComponent } from '../o-datatable.component';

export const DEFAULT_INPUTS_O_DATATABLE_OPTION = [
  'icon',
  'olabel: label',
  'iconPosition: icon-position'
];

export const DEFAULT_OUTPUTS_O_DATATABLE_OPTION = [
  'onClick'
];

@Component({
  selector: 'o-datatable-option',
  template: '',
  inputs: [
    ...DEFAULT_INPUTS_O_DATATABLE_OPTION
  ],
  outputs: [
    ...DEFAULT_OUTPUTS_O_DATATABLE_OPTION
  ]
})
export class ODataTableOptionComponent implements OnInit {

  public static DEFAULT_INPUTS_O_DATATABLE_OPTION = DEFAULT_INPUTS_O_DATATABLE_OPTION;
  public static DEFAULT_OUTPUTS_O_DATATABLE_OPTION = DEFAULT_OUTPUTS_O_DATATABLE_OPTION;

  public onClick: EventEmitter<Object> = new EventEmitter<Object>();

  protected table: ODataTableComponent;
  protected icon: string;
  protected olabel: string;
  protected iconPosition: string;

  constructor( @Inject(forwardRef(() => ODataTableComponent)) table: ODataTableComponent) {
    this.table = table;
  }

  public ngOnInit() {
    this.table.registerHeaderOption(this);
    if (this.iconPosition === undefined) {
      this.iconPosition = 'before';
    }
  }

  innerOnClick(event: any) {
    if (event && this.table) {
      this.table.toggleButtonActiveClass(event);
    }
    this.onClick.emit(event);
  }

}
