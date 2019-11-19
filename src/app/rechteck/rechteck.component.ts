import { Component, OnInit, HostListener, EventEmitter, Input, Output } from '@angular/core';
import { Rechteck, Shape,  } from '../shape';
import { DrawingFieldComponent } from '../drawing-field/drawing-field.component';

@Component({
  selector: 'app-rechteck',
  templateUrl: './rechteck.component.html',
  styleUrls: ['./rechteck.component.css']
})
export class RechteckComponent implements OnInit {

  shape: Shape;
  @Output() voted = new EventEmitter<Shape>();

  constructor() {
    this.shape = new Rechteck();
    console.log('wann?');
  }

  @HostListener('click') onClick() {
    this.voted.emit(this.shape);
  }

  ngOnInit() {
  }

  setParent(shape: Shape) {
    this.shape.parent = shape;
  }
}
