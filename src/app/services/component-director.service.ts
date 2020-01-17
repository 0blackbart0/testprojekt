import { Injectable } from "@angular/core";
import { Node } from "../nodeModels/node";
import { Menu, DividerBranch, DividerNode, StartNode } from "../nodeModels/component";
import { DrawingFieldComponent } from "../drawing-field/drawing-field.component";
import { ScalingService } from "./scaling.service";
import { SidebarComponent } from "../uiComponents/sidebar/sidebar.component";
import { NodeType } from "../../assets/values";
import { DrawService } from "./draw.service";
import { UndoService } from './undo.service';
import { JsonNodeListService } from './json-node-list.service';


@Injectable({
  providedIn: "root"
})
export class ComponentDirectorService {
  nodeList: Node[] = [];
  selected: Node;
  drawingField: DrawingFieldComponent = null;
  sidebar: SidebarComponent = null;

  constructor(private scaling: ScalingService, private draw: DrawService, private undo: UndoService, jsonNode: JsonNodeListService) {
    draw.nodeList = this.nodeList;
    draw.director = this;
    undo.director = this;
    undo.jsonNode = jsonNode;
    jsonNode.director = this;
    jsonNode.draw = draw;
    jsonNode.scaling = scaling;

    const startNode = new StartNode(this);
    startNode.selected = true;
    this.selected = startNode;
    this.addNode(startNode);
    this.undo.save();
  }

  setDrawingField(field: DrawingFieldComponent) {
    this.drawingField = field;
  }

  setSelected(node: Node) {
    if (this.selected instanceof DividerBranch) {
      this.selected.parent.selected = false;
    }
    if (node instanceof DividerBranch) {
      node.parent.selected = true;
    }

    this.selected.selected = false;

    if (node !== this.selected) {
      this.selected.connectorActive = false;
    }

    this.selected = node;
    if (node instanceof DividerBranch) {
      this.sidebar.node = node.parent;
    } else {
      this.sidebar.node = node;
    }
    node.selected = true;
  }

  addNode(node: Node) {
    this.selected.connectorActive = false;
    this.deleteMenu();
    this.nodeList.push(node);

    if (node.type === NodeType.DIVIDERNODE) {
      (node as DividerNode).childs[0].child = node.parent.child;
      if ( node.parent.child !== null ) {
        (node as DividerNode).childs[0].childId = node.parent.child.id;
      }


      node.parent.child = node;
      node.parent.childId = node.id;

      if ((node as DividerNode).childs[0].child !== null) {
        (node as DividerNode).childs[0].child.parent = (node as DividerNode).childs[0];
        (node as DividerNode).childs[0].child.parentId = (node as DividerNode).childs[0].id;
      }
    } else if (node.parent !== null && node.type !== NodeType.DIVIDERBRANCH) {
      node.child = node.parent.child;
      node.childId = node.parent.childId;

      node.parent.child = node;
      node.parent.childId = node.id;

      if (node.child !== null) {
        node.child.parent = node;
        node.child.parentId = node.id;
      }
    }
    this.scaling.scaleNewNode(node);
    this.draw.drawTree();



  }

  deleteNode(toDelete: Node) {
    const index = this.nodeList.indexOf(toDelete);
    this.nodeList.splice(index, 1);
  }

  clearNodeList() {
    this.nodeList.splice(0, this.nodeList.length);
  }

  addMenu(parent: Node) {
    this.addNode(new Menu(parent, this));
  }

  deleteMenu() {
    for (const menu of this.nodeList) {
      if (menu instanceof Menu) {
        menu.parent.child = menu.child;
        menu.parent.childId = menu.childId;
        if (menu.child !== null) {
          menu.child.parent = menu.parent;
          menu.child.parentId = menu.parentId;
        }

        this.nodeList.splice(this.nodeList.indexOf(menu), 1);
        this.draw.drawTree();
      }
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
