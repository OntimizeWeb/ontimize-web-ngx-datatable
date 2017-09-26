import { Component, OnInit, Inject, forwardRef, EventEmitter, Injector } from '@angular/core';
import { OTranslateService } from 'ontimize-web-ngx';
import { ODataTableComponent } from '../o-datatable.component';

export const DEFAULT_INPUTS_O_DATATABLE_BUTTON = [
  'icon',
  'olabel: label'
];

export const DEFAULT_OUTPUTS_O_DATATABLE_BUTTON = [
  'onClick'
];

@Component({
  selector: 'o-datatable-button',
  template: '',
  inputs: [
    ...DEFAULT_INPUTS_O_DATATABLE_BUTTON
  ],
  outputs: [
    ...DEFAULT_OUTPUTS_O_DATATABLE_BUTTON
  ]
})
export class ODataTableButtonComponent implements OnInit {

  public static DEFAULT_INPUTS_O_DATATABLE_BUTTON = DEFAULT_INPUTS_O_DATATABLE_BUTTON;
  public static DEFAULT_OUTPUTS_O_DATATABLE_BUTTON = DEFAULT_OUTPUTS_O_DATATABLE_BUTTON;

  public onClick: EventEmitter<Object> = new EventEmitter<Object>();

  protected table: ODataTableComponent;
  protected translateService: OTranslateService;
  protected icon: string;
  protected olabel: string;


  constructor(protected injector: Injector, @Inject(forwardRef(() => ODataTableComponent)) table: ODataTableComponent) {
    this.table = table;
    this.translateService = injector.get(OTranslateService);
  }

  public ngOnInit() {
    this.table.registerHeaderButton(this);
    if (typeof this.olabel !== 'undefined' && this.olabel.length > 0) {
      this.olabel = this.translateService.get(this.olabel);
    }
    if (typeof this.icon === 'undefined') {
      this.icon = 'priority_high';
    }
  }

  public getLabel() {
    return this.olabel;
  }

  public getIcon() {
    return this.icon;
  }

  innerOnClick() {
    this.onClick.emit();
  }
}
