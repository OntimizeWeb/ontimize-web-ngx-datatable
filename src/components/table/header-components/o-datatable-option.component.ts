import { Component, OnInit, Inject, forwardRef, EventEmitter } from '@angular/core';
import { ODataTableComponent } from '../o-datatable.component';

export const DEFAULT_INPUTS_O_TABLE_OPTION = [
  'icon',
  'olabel: label',
  'iconPosition: icon-position'
];

export const DEFAULT_OUTPUTS_O_TABLE_OPTION = [
  'onClick'
];

@Component({
  selector: 'o-datatable-option',
  template: '',
  inputs: [
    ...DEFAULT_INPUTS_O_TABLE_OPTION
  ],
  outputs: [
    ...DEFAULT_OUTPUTS_O_TABLE_OPTION
  ]
})
export class ODataTableOptionComponent implements OnInit {

  public static DEFAULT_INPUTS_O_TABLE_OPTION = DEFAULT_INPUTS_O_TABLE_OPTION;
  public static DEFAULT_OUTPUTS_O_TABLE_OPTION = DEFAULT_OUTPUTS_O_TABLE_OPTION;

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
    this.onClick.emit(event);
  }

}
