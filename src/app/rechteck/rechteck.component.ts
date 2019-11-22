import { Component, OnInit, HostListener, EventEmitter, Input, Output } from '@angular/core';
import { Rechteck, Shape  } from '../shapes/shape';
import { DrawingFieldComponent } from '../drawing-field/drawing-field.component';
import { ComponentDirectorService } from '../component-director.service';

@Component({
  selector: 'app-rechteck',
  templateUrl: './rechteck.component.html',
  styleUrls: ['./rechteck.component.css']
})
export class RechteckComponent implements OnInit {

  @Input() shape: Shape;

  constructor(public director: ComponentDirectorService) {
  }

  ngOnInit() {
  }

  setParent(shape: Shape) {
    this.shape.parent = shape;
  }
}
