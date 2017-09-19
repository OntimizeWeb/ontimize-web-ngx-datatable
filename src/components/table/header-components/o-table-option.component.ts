import { Component, OnInit, Inject, forwardRef, EventEmitter } from '@angular/core';
import { OTableComponent } from '../o-table.component';

export const DEFAULT_INPUTS_O_TABLE_OPTION = [
  'icon',
  'olabel: label',
  'iconPosition: icon-position'
];

export const DEFAULT_OUTPUTS_O_TABLE_OPTION = [
  'onClick'
];

@Component({
  selector: 'o-table-option',
  template: '',
  inputs: [
    ...DEFAULT_INPUTS_O_TABLE_OPTION
  ],
  outputs: [
    ...DEFAULT_OUTPUTS_O_TABLE_OPTION
  ]
})
export class OTableOptionComponent implements OnInit {

  public static DEFAULT_INPUTS_O_TABLE_OPTION = DEFAULT_INPUTS_O_TABLE_OPTION;
  public static DEFAULT_OUTPUTS_O_TABLE_OPTION = DEFAULT_OUTPUTS_O_TABLE_OPTION;

  public onClick: EventEmitter<Object> = new EventEmitter<Object>();

  protected table: OTableComponent;
  protected icon: string;
  protected olabel: string;
  protected iconPosition: string;

  constructor( @Inject(forwardRef(() => OTableComponent)) table: OTableComponent) {
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
