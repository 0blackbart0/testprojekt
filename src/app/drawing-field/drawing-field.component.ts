import { Component, OnInit } from '@angular/core';
import { Node } from '../nodes/node';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';

@Component({
  selector: 'app-drawing-field',
  templateUrl: './drawing-field.component.html',
  styleUrls: ['./drawing-field.component.css']
})
export class DrawingFieldComponent implements OnInit {

  selected: Node;
  nodeList: Node[] = [];
  drawingFieldPadding: number = 60;
  drawingFieldPaddingTop: number = 50;
  drawingFieldPaddingRight: number = 100;

  constructor(public director: ComponentDirectorService) {}






  ngOnInit() {
    this.nodeList = this.director.nodeList;
    this.director.setDrawingField(this);
  }

}
