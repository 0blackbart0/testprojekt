import { Component, OnInit } from '@angular/core';
import {Shape, Rechteck, Kreis } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { Phantom } from '../shapes/phantom';

@Component({
  selector: 'app-drawing-field',
  templateUrl: './drawing-field.component.html',
  styleUrls: ['./drawing-field.component.css']
})
export class DrawingFieldComponent implements OnInit {

  selected: Shape;
  ShapeList: Shape[] = [];
  drawingFieldPadding: number = 60;
  drawingFieldPaddingTop: number = 50;
  constructor(public director: ComponentDirectorService) { }

  ngOnInit() {
    this.ShapeList = this.director.getShapeList();
    this.director.setDrawingField(this);
  }

}
