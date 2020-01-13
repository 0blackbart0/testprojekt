import { Component, OnInit } from '@angular/core';
import { Node } from '../nodeModels/node';
import { ComponentDirectorService } from '../services/component-director.service';
import { ScalingService } from '../services/scaling.service';

@Component({
  selector: 'app-drawing-field',
  templateUrl: './drawing-field.component.html',
  styleUrls: ['./drawing-field.component.css']
})
export class DrawingFieldComponent implements OnInit {

  selected: Node;
  nodeList: Node[] = [];
  drawingFieldPaddingTop: number;
  drawingFieldPaddingRight: number;

  constructor(public director: ComponentDirectorService) {}

  ngOnInit() {
    this.director.setDrawingField(this);
    this.nodeList = this.director.nodeList;
  }

}
