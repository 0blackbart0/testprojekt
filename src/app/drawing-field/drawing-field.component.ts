import { Component, OnInit } from '@angular/core';
import {Shape } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';

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
  drawingFieldPaddingRight: number = 100;

  constructor(public director: ComponentDirectorService) {}





  test() {
    console.log("test erfolgreich");
  }
  ngOnInit() {
    this.ShapeList = this.director.getShapeList();
    this.director.setDrawingField(this);
  }

}
