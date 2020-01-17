import { Component, OnInit, Input } from "@angular/core";
import { ComponentDirectorService } from "../../services/component-director.service";
import {
  Menu,
  Monolog,
  Dialog,
  DividerNode,
  DividerBranch,
  StartNode,
  Link
} from "../../nodeModels/component";
import { ScalingService } from "../../services/scaling.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeleteDialogComponent } from "../../uiComponents/delete-dialog/delete-dialog.component";
import { MenuType } from "src/assets/values";
import { UndoService } from 'src/app/services/undo.service';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  @Input() node: Menu;
  dialogImg = '../../assets/button_icons/icon_dialog.png';
  monologImg = '../../assets/button_icons/icon_monolog.png';
  dividerImg = '../../assets/button_icons/icon_verzweigung.png';
  linkImg = '../../assets/button_icons/icon_verlinkung.png';
  deleteImg = '../../assets/button_icons/icon_delete.png';

  menuType = MenuType;

  constructor(
    public director: ComponentDirectorService,
    public scaling: ScalingService,
    public dialog: MatDialog,
    public undo: UndoService
  ) {}

  ngOnInit() {}

  getMenuType(): string {
    let type: string = null;
    if ( this.node.parent instanceof DividerBranch) {
      type = MenuType.BRANCHLEAF;
      if (this.node.child !== null) {
        type = MenuType.BRANCHWITHCHILD;
      }
    } else if (this.node.parent instanceof StartNode) {

        type = MenuType.STARTNODELEAF;
        if ( this.node.child !== null) {
            type = MenuType.STARTNODEWITHCHILD;
            if ( this.node.child instanceof DividerNode) {
              type = MenuType.STARTNODEWITHCHILDDIVIDER;
            }
          }
      } else if (this.node.child !== null) {
        type = MenuType.BASICNODEWITHCHILD;
        if ( this.node.child instanceof DividerNode) {
          type = MenuType.BASICNODEWITHCHILDDIVIDER;
        }
      } else {
        type = MenuType.BASICNODELEAF;
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
    //this.undo.save();
    const tmp: DividerNode = new DividerNode(
      this.director.selected,
      this.director
    );
    const left = new DividerBranch(tmp, this.director);
    const right = new DividerBranch(tmp, this.director);

    tmp.addChild(left);
    tmp.addChild(right);

    this.director.addNode(tmp);
    this.director.addNode(left);
    this.director.addNode(right);
    this.undo.save();
  }

  addDialog() {
    //this.undo.save();
    this.director.addNode(new Dialog(this.director.selected, this.director));
    this.undo.save();
  }

  addMonolog() {
    //this.undo.save();
    this.director.addNode(new Monolog(this.director.selected, this.director));
    this.undo.save();
  }
  addLink() {
    //this.undo.save();
    this.director.addNode(new Link(this.director.selected, this.director));
    this.undo.save();

  }

}
