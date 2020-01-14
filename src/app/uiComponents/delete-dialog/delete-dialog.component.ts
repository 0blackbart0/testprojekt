import { Component, OnInit } from "@angular/core";
import { ComponentDirectorService } from "../../services/component-director.service";
import { Node, BasicNode } from "../../nodeModels/node";
import { DividerBranch, DividerNode } from "src/app/nodeModels/component";
import { NodeType } from "src/assets/values";

@Component({
  selector: "app-delete-dialog",
  templateUrl: "./delete-dialog.component.html",
  styleUrls: ["./delete-dialog.component.css"]
})
export class DeleteDialogComponent implements OnInit {
  constructor(public director: ComponentDirectorService) {}

  ngOnInit() {}

  getDialogType(): string {
    const toDelete = this.director.selected;
    let type: string;

    if (toDelete instanceof DividerNode) {
      type = "dividerNode";
      if ((toDelete.parent as DividerNode).childs.length > 2) {
        type = "dividerNodeMultiple";
      }
    } else if (toDelete instanceof BasicNode) {
      type = "basicNode";
    }

    return type;
  }

  deleteSingle(toDelete: Node) {
    if (toDelete instanceof DividerBranch) {
      return;
    }
    this.director.deleteMenu();

    toDelete.parent.child = toDelete.child;
    if (toDelete.child !== null) {
      toDelete.child.parent = toDelete.parent;
    }
    this.director.deleteNode(toDelete);
    this.director.drawTree();
  }

  deleteBranch() {
    const toDelete = this.director.selected;
    const parentDivider = toDelete.parent as DividerNode;

    this.deleteSelfAndChilds(toDelete.child);
    parentDivider.childs.splice(parentDivider.childs.indexOf(toDelete), 1);
    this.director.deleteNode(toDelete);

    parentDivider.width -= toDelete.width;
    parentDivider.baseWidth -= toDelete.baseWidth;
    this.director.drawTree();
  }

  deleteTree() {
    const toDelete = this.director.selected;
    if (toDelete instanceof DividerBranch) {
      toDelete.parent.parent.child = null;
      this.deleteSelfAndChilds(toDelete.parent);
      return;
    }
    toDelete.parent.child = null;

    this.deleteSelfAndChilds(toDelete);
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
