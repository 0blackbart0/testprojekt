import { Component, OnInit, Input } from "@angular/core";
import { ComponentDirectorService } from "../../services/component-director.service";
import {
  Menu,
  Monolog,
  Dialog,
  DividerNode,
  DividerBranch,
  StartNode
} from "../../nodeModels/component";
import { Node } from "../../nodeModels/node";
import { ScalingService } from "../../services/scaling.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteDialogComponent } from "../../uiComponents/delete-dialog/delete-dialog.component";
import { NodeType } from "src/assets/strings";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  @Input() node: Menu;
  menuType;

  constructor(
    public director: ComponentDirectorService,
    public scaling: ScalingService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  getMenuType(): string {
    let type: string = null;
    if ( this.node.parent instanceof DividerBranch) {
      type = 'branchLeaf';
      if (this.node.child !== null) {
        type = 'branchWithChild';
      }
    } else {
      type = 'basicNodeLeaf';
      if (this.node.child !== null) {
        type = 'basicNodeWithChild';
        if ( this.node.child instanceof DividerNode) {
          type += 'Divider';
        }
      } else if (this.node.parent instanceof StartNode) {
        if (this.node.child === null) {
          type = 'startNodeLeaf';
        } else {
          type = 'basicNodeWithChild';
        }
      }
    }
    return type;
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {});
  }

  addDividerNode() {
    const tmp: DividerNode = new DividerNode(
      this.director.selected,
      this.director
    );
    const left: Node = new DividerBranch(tmp, this.director);
    const right: Node = new DividerBranch(tmp, this.director);

    tmp.childs.push(left);
    tmp.childs.push(right);
    this.director.addNode(tmp);
    this.director.addNode(left);
    this.director.addNode(right);
  }

  addBranch() {
    if (this.director.selected.type !== NodeType.DIVIDERBRANCH) {
      return;
    }

    const parentDividerNode: DividerNode = this.director.selected
      .parent as DividerNode;
    const center = new DividerBranch(parentDividerNode, this.director);
    parentDividerNode.childs.push(center);
    this.director.addNode(center);

    parentDividerNode.width += center.width;
    parentDividerNode.baseWidth += parentDividerNode.parent.baseWidth;

    this.director.drawTree();
  }

  addDialog() {
    this.director.addNode(new Dialog(this.director.selected, this.director));
  }

  addMonolog() {
    this.director.addNode(new Monolog(this.director.selected, this.director));
  }
  addLink() {
  }
}
