import { Injectable } from "@angular/core";
import { Node } from "./nodes/node";
import { Menu, DividerBranch, DividerNode } from "./nodes/component";
import { DrawingFieldComponent } from "./drawing-field/drawing-field.component";
import { ScalingService } from "./scaling.service";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NodeType } from "../assets/strings";

@Injectable({
  providedIn: "root"
})
export class ComponentDirectorService {
  nodeList: Node[] = [];
  selected: Node;
  drawingField: DrawingFieldComponent = null;
  sidebar: SidebarComponent = null;

  constructor(private scaling: ScalingService) {}

  setDrawingField(field: DrawingFieldComponent) {
    this.drawingField = field;
  }

  setSelected(node: Node) {
    console.log("left= " + node.left);
    console.log("width= " + node.width);
    console.log("marginLeft= " + node.marginLeft);
    console.log("marginRight= " + node.marginRight);
    if (
      this.selected.parent !== null &&
      this.selected.parent.type === NodeType.DIVIDERNODE
    ) {
      this.selected.parent.selected = false;
    }
    this.selected.selected = false;

    if (node !== this.selected) {
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

      if ((node as DividerNode).childs[0].child !== null) {
        (node as DividerNode).childs[0].child.parent = (node as DividerNode).childs[0];
      }
    } else if (node.parent !== null && node.type !== NodeType.DIVIDERBRANCH) {
      node.child = node.parent.child;
      node.parent.child = node;

      if (node.child !== null) {
        node.child.parent = node;
      }
    }
    this.scaling.scaleNewNode(node);
    this.drawTree();
  }

  toggleMenu(parent: Node) {
    for (const menu of this.nodeList) {
      if (menu instanceof Menu) {
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
    for (const menu of this.nodeList) {
      if (menu instanceof Menu) {
        menu.parent.child = menu.child;
        if (menu.child !== null) {
          menu.child.parent = menu.parent;
        }

        this.nodeList.splice(this.nodeList.indexOf(menu), 1);
        this.drawTree();
      }
    }
  }

  basicArrange(node: Node) {
    node.width = node.baseWidth;
    if (node.parent !== null) {
      node.left =
        node.parent.left - (node.baseWidth - node.parent.baseWidth) / 2;
      node.top = node.parent.top + node.parent.height;
    }
    if (node instanceof DividerNode) {
      for (const child of node.childs) {
        this.basicArrange(child);
      }
    }
    if (node instanceof DividerBranch) {
      const tmp: DividerNode = node.parent as DividerNode;
      const childList: Node[] = tmp.childs;
      const index = childList.indexOf(node);
      node.left = node.parent.left + index * node.width;
      node.top = node.parent.top;
    }
    if (node.child !== null) {
      this.basicArrange(node.child);
    }
  }

  resizeDividerNodes(node: Node | null): number[] {
    if (node === null) {
      return;
    }
    let values = [0, 0];

    if (node.type !== NodeType.DIVIDERNODE) {
      return this.resizeDividerNodes(node.child);
    } else {
      for (const branch of (node as DividerNode).childs) {
        const child = branch as DividerBranch;

        if (this.hasChildDivider(child)) {
          const childDivider = this.getChildDividerNode(child);
          values = this.resizeDividerNodes(child);
          values[0] = child.left - childDivider.left;
          values[1] =
            childDivider.left + childDivider.width - child.left - child.width;

          child.marginLeft = values[0];
          child.marginRight = values[1];
          child.left += child.marginLeft;

          child.parent.width = child.parent.width + values[0] + values[1];
          child.parent.left -= values[0];
        } else {
          (child as DividerBranch).marginLeft = 0;
          (child as DividerBranch).marginRight = 0;
        }
      }
      return values;
    }
  }

  repositionDividerNodes(node: Node) {
    if (node.parent !== null && !(node instanceof DividerBranch)) {
      node.left = node.parent.left - (node.width - node.parent.width) / 2;
    }

    if (node.type === NodeType.DIVIDERNODE) {
      const dividerNode = node as DividerNode;

      for (const child of dividerNode.childs) {
        const leftBranch = (child as DividerBranch).getLeftBranch();
        if (leftBranch !== null) {
          child.left =
            leftBranch.left +
            leftBranch.width +
            leftBranch.marginRight +
            child.marginLeft;
        } else {
          child.left = child.parent.left + child.marginLeft;
        }

        this.repositionDividerNodes(child);
      }
    }
    if (node.child !== null) {
      this.repositionDividerNodes(node.child);
    }
  }

  prettier() {
    for (const node of this.nodeList) {
      if (node instanceof DividerNode && node.type === NodeType.DIVIDERNODE) {
        node.width =
          node.width -
          node.childs[0].marginLeft -
          node.childs[node.childs.length - 1].marginRight;
        node.left += node.childs[0].marginLeft;
        node.connectorFem =
          node.parent.left +
          node.parent.width / 2 -
          this.scaling.connectorSize / 2;
      }
    }
  }

  drawTree() {
    const startNode = this.nodeList[0];
    this.basicArrange(startNode);
    this.resizeDividerNodes(startNode);
    this.repositionDividerNodes(startNode);
    this.prettier();
    this.setPadding();
    this.basicArrange(startNode);
    this.resizeDividerNodes(startNode);
    this.repositionDividerNodes(startNode);
    this.prettier();
  }

  setPadding() {
    const startShape = this.nodeList[0];
    const paddingLeft = 40;
    let difference: number;

    const paddingRight = 40;
    let maxLeft = 0;

    const paddingBottom = 40;
    let maxTop = 0;

    let minLeft = startShape.left;
    for (const node of this.nodeList) {
      // padding left
      if (node.left < minLeft) {
        minLeft = node.left;
      }
      // padding right
      if (node.left + node.width > maxLeft) {
        maxLeft = node.left + node.width;
      }

      // padding bottom
      if (node.top + node.height > maxTop) {
        maxTop = node.top + node.height;
      }
    }

    //padding left
    if (minLeft <= paddingLeft) {
      difference = paddingLeft - minLeft;
      startShape.left += difference;
    } else {
      difference = minLeft - paddingLeft;
      startShape.left -= difference;
    }

    // padding right and bottom
    if (this.drawingField !== null) {
      this.drawingField.drawingFieldPaddingRight = maxLeft + paddingRight;
      this.drawingField.drawingFieldPaddingTop = maxTop + paddingBottom;
    }
  }

  getChildDividerNode(node: Node): DividerNode {
    if (node.child === null) {
      return null;
    }
    let ptr = node.child;

    while (ptr !== null && ptr.type !== NodeType.DIVIDERNODE) {
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
    if (ptr instanceof DividerNode && ptr.type === NodeType.DIVIDERNODE) {
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
