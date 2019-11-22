import { Component, OnInit } from '@angular/core';
import {Shape, Rechteck, Kreis } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';

@Component({
  selector: 'app-drawing-field',
  templateUrl: './drawing-field.component.html',
  styleUrls: ['./drawing-field.component.css']
})
export class DrawingFieldComponent implements OnInit {

  selected: Shape;
  ShapeList: Shape[] = [];

  constructor(private director: ComponentDirectorService) { }

  ngOnInit() {
    this.ShapeList = this.director.getShapeList();
  }

  get drawingField(): DrawingFieldComponent {
    return this;
  }

}
