import { Component, OnInit } from '@angular/core';
import { Node } from '../nodeModels/node';
import { ComponentDirectorService } from '../services/component-director.service';
import { NodeType } from '../../assets/values';
import { StartNode } from '../nodeModels/component';

@Component({
  selector: 'app-drawing-field',
  templateUrl: './drawing-field.component.html',
  styleUrls: ['./drawing-field.component.css']
})
export class DrawingFieldComponent implements OnInit {

  nodeType = NodeType;

  selected: Node;
  nodeList: Node[] = [];
  drawingFieldPaddingTop: number;
  drawingFieldPaddingRight: number;

  constructor(public director: ComponentDirectorService) {
    const startNode = new StartNode(director);
    startNode.selected = true;
    director.selected = startNode;
    director.addNode(startNode);
    director.addMenu(startNode);
  }

  ngOnInit() {
    this.director.setDrawingField(this);
    this.nodeList = this.director.nodeList;
  }

}
