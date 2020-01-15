import { Injectable } from "@angular/core";
import { Node } from "../nodeModels/node";
import { ComponentDirectorService } from "./component-director.service";
import { DividerNode, DividerBranch } from "../nodeModels/component";
import { NodeType } from "src/assets/values";
import { ScalingService } from "./scaling.service";

@Injectable({
  providedIn: "root"
})
export class DrawService {
  nodeList: Node[] = [];
  director: ComponentDirectorService;

  constructor(private scaling: ScalingService) {}

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

        if (this.director.hasChildDivider(child)) {
          const childDivider = this.director.getChildDividerNode(child);
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

    // padding left
    if (minLeft <= paddingLeft) {
      difference = paddingLeft - minLeft;
      startShape.left += difference;
    } else {
      difference = minLeft - paddingLeft;
      startShape.left -= difference;
    }

    // padding right and bottom
    if (this.director.drawingField !== null) {
      this.director.drawingField.drawingFieldPaddingRight =
        maxLeft + paddingRight;
      this.director.drawingField.drawingFieldPaddingTop =
        maxTop + paddingBottom;
    }
  }
}
