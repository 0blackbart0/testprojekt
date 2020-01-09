import { Injectable } from '@angular/core';
import { Node, StartNode, DividerNode } from './nodes/node';
import { Menu } from './nodes/component';
import { DrawingFieldComponent } from './drawing-field/drawing-field.component';
import { ScalingService } from './scaling.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NodeType } from '../assets/strings';
import { DividerBranch } from './nodes/dividerBranch';


@Injectable({
  providedIn: 'root'
})
export class ComponentDirectorService {
  nodeList: Node[] = [];
  selected: Node;
  drawingField: DrawingFieldComponent = null;
  sidebar: SidebarComponent = null;

  constructor(private scaling: ScalingService) { }

  setDrawingField(field: DrawingFieldComponent) {
    this.drawingField = field;
  }

  setSelected(node: Node) {
    if ( this.selected.parent !== null && this.selected.parent.type === NodeType.DIVIDERNODE) {
      this.selected.parent.selected = false;
    }
    this.selected.selected = false;

    if ( node !== this.selected ) {
      this.selected.connectorActive = false;
    }
    this.selected = node;
    node.selected = true;
  }

  addNode(node: Node) {
    this.selected.connectorActive = false;
    this.deleteMenu();
    this.nodeList.push(node);


    if (node.type === 'dividerNode') {
      node.parent.child = node;

    } else if (node.parent !== null && node.type !== 'dividerBranch' ) {
      node.child = node.parent.child;
      node.parent.child = node;

      if ( node.child !== null ) {
        node.child.parent = node;
      }
    }
    this.scaling.scaleNewNode(node);
    this.arrange(this.nodeList[0]);
  }

  toggleMenu(parent: Node) {
    for ( const menu of this.nodeList ) {
      if ( menu instanceof Menu) {
        this.deleteMenu();
        return;
      }
    }
    this.addMenu(parent);
  }

  addMenu(parent: Node) {
    this.addNode(new Menu(parent, this));
  }

  deleteMenu() {
   for ( const menu of this.nodeList ) {
    if ( menu instanceof Menu ) {
      menu.parent.child = menu.child;
      if (menu.child !== null) {
        menu.child.parent = menu.parent;
      }

      this.nodeList.splice(this.nodeList.indexOf(menu), 1);
      this.arrange(this.nodeList[0]);
    }
   }
  }

  arrange(node: Node) {

      if (node.parent !== null) {
        node.left = node.parent.left - ((node.width - node.parent.width) / 2);
        node.top = node.parent.top + node.parent.height;
      }
      if ( node instanceof DividerNode) {
        for ( const child of node.childs) {
          this.arrange(child);
        }
      }
      if (node instanceof DividerBranch) {
        const tmp: DividerNode = node.parent as DividerNode;
        const childList: Node[] = tmp.childs;
        const index = childList.indexOf(node);
        node.left = node.parent.left + index * node.width;
        node.top = node.parent.top;
      }
      if ( node.child !== null ) {
        this.arrange(node.child);
      }
    }
}
