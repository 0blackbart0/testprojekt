import { Component, OnInit, Input } from '@angular/core';
import { ComponentDirectorService } from '../component-director.service';
import { Menu, Monolog } from '../nodes/component';
import { Node } from '../nodes/node';
import { JsonLoaderService } from '../json-loader.service';
import { ScalingService } from '../scaling.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

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
      // this.director.rearrangeAll(this.director.nodeList[0]);
    }
  }

  addDividerNode() {
    console.log("addDividerNode");
  }



  addBasicNode() {
    console.log("addBasicNode");
  }

  addDialog() {
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

