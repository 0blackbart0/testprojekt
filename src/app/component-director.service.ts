import { Injectable } from '@angular/core';
import { Node, StartNode, DividerNode } from './nodes/node';
import { Menu } from './nodes/component';
import { DrawingFieldComponent } from './drawing-field/drawing-field.component';
import { ScalingService } from './scaling.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NodeType } from '../assets/strings';
import { DividerBranch } from './nodes/dividerBranch';
import { BasePortalHost } from '@angular/cdk/portal';



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
    console.log("left= " + node.left);
    console.log("width= " + node.width);
    console.log("marginLeft= " + node.marginLeft);
    console.log("marginRight= " + node.marginRight);
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


    if (node.type === NodeType.DIVIDERNODE) {

      (node as DividerNode).childs[0].child = node.parent.child;
      node.parent.child = node;

      if ( (node as DividerNode).childs[0].child !== null ) {
        (node as DividerNode).childs[0].child.parent = (node as DividerNode).childs[0];
      }

    } else if (node.parent !== null && node.type !== NodeType.DIVIDERBRANCH ) {
      node.child = node.parent.child;
      node.parent.child = node;

      if ( node.child !== null ) {
        node.child.parent = node;
      }
    }
    this.scaling.scaleNewNode(node);
   // this.arrange(this.nodeList[0]);
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
     // this.arrange(this.nodeList[0]);
    }
   }
  }

  arrange(node: Node) {

    node.width = node.baseWidth;
    if (node.parent !== null) {
      node.left = node.parent.left - ((node.baseWidth - node.parent.baseWidth) / 2);
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

  arrange2(node: Node) {

    if (node.parent !== null && !(node instanceof DividerBranch)) {
      node.left = node.parent.left - ((node.width - node.parent.width) / 2);

    }

    if ( node.type === NodeType.DIVIDERNODE) {
      const dividerNode = node as DividerNode;
      const rightBranch = dividerNode.childs[dividerNode.childs.length - 1];
      const distance = dividerNode.left + dividerNode.width -  (rightBranch.left + rightBranch.width + rightBranch.marginRight);

      for ( const child of dividerNode.childs) {
        
        const leftBranch = (child as DividerBranch).getLeftBranch();
        if ( leftBranch !== null) {

          child.left = leftBranch.left + leftBranch.marginLeft + leftBranch.marginRight; //TODO
          console.log(child.left);
        } else {
          child.left = child.parent.left + child.marginLeft;
          console.log(child.left);
        }

        this.arrange2(child);
      }
    }
    if ( node.child !== null ) {
      this.arrange2(node.child);
    }
  }


    bla(node: Node | null): number[] {

      let values = [0, 0];

      if ( node.type !== NodeType.DIVIDERNODE) {
        return this.bla(node.child);
      } else {
        for ( const branch of (node as DividerNode).childs) {

          const child = branch as DividerBranch;

          if ( this.hasChildDivider(child)) {

            values = this.bla(child);
            values[0] = child.left - this.getChildDividerNode(child).left;
            values[1] = this.getChildDividerNode(child).left + this.getChildDividerNode(child).width - child.left - child.width;

            child.marginLeft = values[0];
            child.marginRight = values[1];
            child.left += child.marginLeft;
            const rightBranch = child.getRightBranch();
            if ( rightBranch !== null) {
              rightBranch.left += values[0] + values[1];
            }
            child.parent.width = child.parent.width + values[0] + values[1];



          } else {
            (child as DividerBranch).marginLeft = 0;
            (child as DividerBranch).marginRight = 0;

          }
        }
        return values;
      }
    }

    


    getChildDividerNode(node: Node): DividerNode {

      if ( node.child === null ) {
        return null;
      }
      let ptr = node.child;

      while ( ptr !== null && ptr.type !== NodeType.DIVIDERNODE) {
        ptr = ptr.child;
      }

      return ptr as DividerNode;
    }

    hasChildDivider(node: Node): boolean {
      let flag = false;
      let ptr = node.child;
      while (ptr !== null && ptr.type !== NodeType.DIVIDERNODE) {
        ptr = ptr.child;
      }
      if ( ptr instanceof DividerNode && ptr.type === NodeType.DIVIDERNODE) {
        flag = true;
      }
      return flag;
    }

    getParentDividerBranch(node: Node): DividerBranch {
      let ptr = node.parent; // parent of Node

      while (ptr !== null && !(ptr instanceof DividerBranch)) {
        ptr = ptr.parent;
      }

      return ptr as DividerBranch;
    }
}
