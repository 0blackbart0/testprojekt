import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Kreis, Shape,  } from '../shape';
import { DrawingFieldComponent } from '../drawing-field/drawing-field.component';

@Component({
  selector: 'app-kreis',
  templateUrl: './kreis.component.html',
  styleUrls: ['./kreis.component.css']
})
export class KreisComponent implements OnInit {

  shape: Shape;
  @Output() voted = new EventEmitter<Shape>();

  constructor() {
    this.shape = new Kreis();
    console.log('Jetzt?');
  }

  ngOnInit() {
  }

  @HostListener('click') onClick() {
    this.voted.emit(this.shape);
  }

  setParent(shape: Shape) {
    this.shape.parent = shape;
  }
}
