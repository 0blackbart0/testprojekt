import { Injectable } from '@angular/core';
import { Node, StartNode } from './nodes/node';
import { Menu } from './nodes/component';
import { DrawingFieldComponent } from './drawing-field/drawing-field.component';
import { ScalingService } from './scaling.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NodeType } from '../assets/strings';


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
    if (node.parent !== null) {
      node.child = node.parent.child;
      node.parent.child = node;
      if ( node.child !== null ) {
        node.child.parent = node;
      }
    }
  }



  addMenu(parent: Node) {
    this.addNode(new Menu(parent, this));
  }



  deleteMenu() {
   for ( const menu of this.nodeList ) {
    if ( menu instanceof Menu ) {


      this.nodeList.splice(this.nodeList.indexOf(menu), 1);
    }
   }
  }

  arange(nodePtr: Node) {

    if ( nodePtr.child === null) {
      return;
    }


  }

  setDrawingField(field: DrawingFieldComponent) {
    this.drawingField = field;
  }

  checkNotNull(node: Node): boolean {
    if (node !== null ) {
      return true;
    } else {
      return false;
    }
  }
}
