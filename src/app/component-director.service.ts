import { Injectable } from '@angular/core';
import { Node } from './nodes/node';
import { DrawingFieldComponent } from './drawing-field/drawing-field.component';
import { ScalingService } from './scaling.service';
import { SidebarComponent } from './sidebar/sidebar.component';


@Injectable({
  providedIn: 'root'
})
export class ComponentDirectorService {



  nodeList: Node[] = [];
  selected: Node;
  drawingField: DrawingFieldComponent = null;
  sidebar: SidebarComponent = null;

  constructor(private scaling: ScalingService) { }

  addNode(node: Node) {
    this.nodeList.push(node);
  }

  setDrawingField(field: DrawingFieldComponent) {
    this.drawingField = field;
  }
}
