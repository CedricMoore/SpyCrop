import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'textline',
  templateUrl: './textline.component.html',
  styleUrls: ['./textline.component.scss']
})
export class TextlineComponent implements OnInit {

  constructor() { }

  @Input("value")
  public value: string = "";

  @Input("label")
  public label!: string;

  @Input("name")
  public name!: string;
  
  @Input("placeholder")
  public placeholder!: string;

  @Input("icon")
  public icon!: string;

  // generate an id for this instance if a label or placeholder is not present, used
  public guid: string = this.label?.replace(' ','') || this.placeholder?.replace(' ','') || "id" + Math.floor(Math.random() * 10000);

  @Output("iconClick")
  public iconClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  iconClicked(e: MouseEvent ): void {
    this.iconClick.emit(e);
  }

  ngOnInit(): void {
  }


}
