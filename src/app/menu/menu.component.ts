import { Component, OnInit, Input } from '@angular/core';
import { ComponentDirectorService } from '../component-director.service';
import { Menu, Monolog, Dialog, DividerNode, DividerBranch } from '../nodes/component';
import { Node } from '../nodes/node';
import { JsonLoaderService } from '../json-loader.service';
import { ScalingService } from '../scaling.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NodeType } from 'src/assets/strings';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() node: Menu;

  constructor(public loader: JsonLoaderService,
              public director: ComponentDirectorService, public scaling: ScalingService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  getMenuType(): string {
    return 'basicDividerLeaf';
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

    });
  }



  scale(scale: string) {
    let scalingAllowed = false;
    if (scale === '+') {
      scalingAllowed = this.scaling.increase();
    } else if (scale === '-') {
      scalingAllowed = this.scaling.decrease();
    }
    if ( scalingAllowed ) {

      for (const element of this.director.nodeList) {
        this.scaling.rezise(element, scale);
      }
    }
  }

  addDividerNode() {
    const tmp: DividerNode = new DividerNode(this.director.selected, this.director);
    const left: Node = new DividerBranch(tmp, this.director);
    const right: Node = new DividerBranch(tmp, this.director);


    tmp.childs.push(left);
    tmp.childs.push(right);
    this.director.addNode(tmp);
    this.director.addNode(left);
    this.director.addNode(right);
  }

  addBasicNode() {
    console.log("addBasicNode");
  }

  addBranch() {
    if (this.director.selected.type !== NodeType.DIVIDERBRANCH) {
      return;
    }

    const parentDividerNode: DividerNode = this.director.selected.parent as DividerNode;
    const center = new DividerBranch(parentDividerNode, this.director);
    parentDividerNode.childs.push(center);
    this.director.addNode(center);

    parentDividerNode.width += center.width;
    parentDividerNode.baseWidth += parentDividerNode.parent.baseWidth;

    this.director.drawTree();
  }

  addDialog() {
    this.director.addNode(new Dialog(this.director.selected, this.director));
    console.log("addDialog");
  }

  addMonolog() {
    this.director.addNode(new Monolog(this.director.selected, this.director));
    console.log("addMonolog");
  }
  addLink() {
    console.log("addLink");
  }
}

