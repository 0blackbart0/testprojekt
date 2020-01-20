import { Component, OnInit } from "@angular/core";
import { ComponentDirectorService } from "../../services/component-director.service";
import { Node, BasicNode } from "../../nodeModels/node";
import { DividerBranch, DividerNode } from "src/app/nodeModels/component";
import { NodeType } from "src/assets/values";
import { DrawService } from "src/app/services/draw.service";
import { UndoService } from 'src/app/services/undo.service';

@Component({
  selector: "app-delete-dialog",
  templateUrl: "./delete-dialog.component.html",
  styleUrls: ["./delete-dialog.component.css"]
})
export class DeleteDialogComponent implements OnInit {

  nodeType = NodeType;

  constructor(
    public director: ComponentDirectorService,
    private draw: DrawService,
    public undo: UndoService
  ) {}

  ngOnInit() {}

  getDialogType(): string {
    const toDelete = this.director.selected;
    let type: string;

    if (toDelete instanceof DividerNode) {
      type = this.nodeType.DIVIDERNODE;
      if ((toDelete.parent as DividerNode).childs.length > 2) {
        type += "Multiple";
      }
    } else if (toDelete instanceof BasicNode) {
      type = this.nodeType.BASICNODE;
      if (toDelete.child !== null && toDelete.child.child === null) {
          type += "Leaf";
        }
    }

    return type;
  }

  deleteSingle(toDelete: Node) {
    this.director.deleteMenu();
    if (toDelete instanceof DividerBranch) {
      return;
    }

    this.director.deleteMenu();

    toDelete.parent.child = toDelete.child;
    toDelete.parent.childId = toDelete.childId;
    if (toDelete.child !== null) {
      toDelete.child.parent = toDelete.parent;
      toDelete.child.parentId = toDelete.parentId;
    }
    this.director.deleteNode(toDelete);
    this.draw.drawTree();
    this.undo.save();
  }

  deleteBranch() {
    this.director.deleteMenu();
    const toDelete = this.director.selected;
    const parentDivider = toDelete.parent as DividerNode;

    this.deleteSelfAndChilds(toDelete.child);
    parentDivider.childs.splice(parentDivider.childs.indexOf(toDelete), 1);
    this.director.deleteNode(toDelete);

    parentDivider.width -= toDelete.width;
    parentDivider.baseWidth -= toDelete.baseWidth;
    this.draw.drawTree();
    this.undo.save();
  }

  deleteTree() {
    this.director.deleteMenu();
    const toDelete = this.director.selected;
    if (toDelete instanceof DividerBranch) {
      toDelete.parent.parent.child = null;
      this.deleteSelfAndChilds(toDelete.parent);
      this.draw.drawTree();
      this.undo.save();
      return;
    }
    toDelete.parent.child = null;

    this.deleteSelfAndChilds(toDelete);
    this.draw.drawTree();
    this.undo.save();
  }

  deleteSelfAndChilds(toDelete: Node) {
    if (toDelete === null) {
      return;
    }

    if (
      toDelete instanceof DividerNode &&
      toDelete.type === NodeType.DIVIDERNODE
    ) {
      for (const child of toDelete.childs) {
        this.deleteSelfAndChilds(child);
      }
    } else {
      this.deleteSelfAndChilds(toDelete.child);
    }
    this.director.deleteNode(toDelete);
  }
}
