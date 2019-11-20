import { Component, OnInit, HostListener, EventEmitter, Input, Output } from '@angular/core';
import { Rechteck, Shape  } from '../shape';
import { DrawingFieldComponent } from '../drawing-field/drawing-field.component';
import { ComponentDirectorService } from '../component-director.service';

@Component({
  selector: 'app-rechteck',
  templateUrl: './rechteck.component.html',
  styleUrls: ['./rechteck.component.css']
})
export class RechteckComponent implements OnInit {

  @Input() shape: Shape = null;

  constructor(private director: ComponentDirectorService) {
    this.shape = new Rechteck();
  }

  setSelected() {
    this.director.LastSelected.selected = false;
    this.director.LastSelected = this.shape;
    this.shape.selected = true;
  }

  ngOnInit() {
  }

  setParent(shape: Shape) {
    this.shape.parent = shape;
  }
}
