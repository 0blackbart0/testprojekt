import { Component, OnInit, Input } from '@angular/core';
import { ComponentDirectorService } from '../component-director.service';
import { Menu, Dialog, Monolog, Link } from '../shapes/component';
import { JsonLoaderService } from '../json-loader.service';
import { ScalingService } from '../scaling.service';
import { Rechteck, Shape, Kreis, StartShape } from '../shapes/shape';
import { SubKreisLeft, SubKreisRight, SubKreisCenter, SubKreis } from '../shapes/subkreis';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() shape: Menu;

  constructor(public loader: JsonLoaderService,
              public director: ComponentDirectorService, public scaling: ScalingService, public dialog: MatDialog) { }

  ngOnInit() {
  }


  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    


    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  menuType(): string {

    let type: string = null;
    const childs: Shape[] = this.director.getChildFrom(this.shape);
    if ( this.shape.parent instanceof SubKreis) {
      type = 'kreisLeaf';
      if (childs.length !== 0) {
        type = 'kreisWithChild';
      }
    } else if ( this.shape.parent instanceof Rechteck || this.shape.parent instanceof StartShape) {
      type = 'rechteckLeaf';
      if (childs.length !== 0) {
        type = 'rechteckWithChild';
        if ( childs[0] instanceof Kreis ) {
          type += 'Kreis';
        }
      }
    }
    return type;
  }

  generateJSONString() {
    console.log(this.loader.generateString());
  }

  deleteTree() {
    if (!(this.director.LastSelected instanceof Rechteck )) {
      return;
    }
    const toDelete: Shape = this.director.LastSelected.parent;
    this.deleteBelow(toDelete);
  }

  deleteOuterKreis() {
    const subKreis: Shape = this.director.LastSelected;
    const kreis: Kreis = subKreis.parent as Kreis;
    if (  !((subKreis instanceof SubKreisLeft) ||  (subKreis instanceof SubKreisRight))) {
      return;
    }

    if (kreis.centerChilds.length === 0) {
      return;
    }
    let outerCenter: SubKreisCenter;
    this.deleteBelow(subKreis);
    if (subKreis instanceof SubKreisRight) {
      outerCenter = kreis.centerChilds[kreis.centerChilds.length - 1];
      subKreis.phantomLeft.width = outerCenter.phantomLeft.width;
    } else if ( subKreis instanceof SubKreisLeft) {
      outerCenter = kreis.centerChilds[0];
      subKreis.phantomRight.width = outerCenter.phantomRight.width;
    }

    this.director.replaceParents(outerCenter, subKreis);

    this.director.reziseDividerAfterReplace(subKreis);

    this.removeSubKreisCenter(outerCenter);
  }

  removeSubKreisCenter(toDelete: SubKreisCenter) {
    this.deleteBelow(toDelete);
    const kreis: Kreis = toDelete.parent as Kreis;
    let index = kreis.centerChilds.indexOf(toDelete);

    kreis.centerChilds.splice(index, 1);
    index = this.director.ShapeList.indexOf(toDelete);
    this.director.ShapeList.splice(index, 1);
    this.director.reziseDividerAfterDeleteCenter(toDelete);
    this.director.setSelected(this.director.getChildFrom(kreis)[0]);
    this.director.rearrangeAll(this.director.ShapeList[0]);
  }

  deleteSubKreisCenter() {
    const toDelete: Shape = this.director.LastSelected;
    if (!(toDelete instanceof SubKreisCenter )) {
      return;
    }
    this.removeSubKreisCenter(toDelete);
  }


  deleteSubTree() {
    this.deleteBelow(this.director.LastSelected);
  }

  deleteBelow(toDelete: Shape) {
    if (toDelete instanceof SubKreisCenter) {
      toDelete.phantomLeft.width = 0;
      toDelete.phantomRight.width = 0;
    }
    this.reziseAfterDelete(toDelete);
    this.director.deleteAll(toDelete);
    this.director.rearrangeAll(this.director.ShapeList[0]);
  }

  reziseAfterDelete(toDelete: Shape) {

    let deletedPhantomWidth = 0;
    let firstDividerSet = false;

    const childDividers: Shape[] = this.director.getChildDividers(toDelete);
    if ( childDividers.length === 0 ) {
      return;
    }
    let maxLeft = 0;
    for (const child of childDividers) {
      if (child.left > maxLeft) {
        maxLeft = child.left;
      }
    }
    deletedPhantomWidth = maxLeft - toDelete.left;




    if ( toDelete instanceof SubKreisLeft) {
      if ( toDelete.injected) {
        if ( (toDelete.parent as Kreis).centerChilds.length === 0) {
          this.director.getChildFrom(toDelete.parent)[1].phantomLeft.width -= deletedPhantomWidth;
        } else {
          (toDelete.parent as Kreis).centerChilds[0].phantomLeft.width -= deletedPhantomWidth;
        }

      } else {
        deletedPhantomWidth += toDelete.phantomRight.width;
        toDelete.phantomRight.width = 0;

      }

      firstDividerSet = true;
    } else if ( toDelete instanceof SubKreisRight) {
      deletedPhantomWidth += toDelete.phantomLeft.width;
      toDelete.phantomLeft.width = 0;
      firstDividerSet = true;
    } else if ( toDelete instanceof SubKreisCenter) {

      let minLeft = toDelete.left;
      for (const child of childDividers) {
        if (child.left < minLeft) {
          minLeft = child.left;
        }
      }
      const minDistance = toDelete.left - minLeft;

      toDelete.phantomLeft.width -= minDistance;
      if (toDelete.phantomLeft.width < 0 ) {
        toDelete.phantomLeft.width = 0;
      }
      toDelete.phantomRight.width -= deletedPhantomWidth;
      if (toDelete.phantomRight.width < 0) {
        toDelete.phantomRight.width = 0;
      }
      deletedPhantomWidth += minDistance;

      firstDividerSet = true;
    } else if ( toDelete instanceof Rechteck ) {
        toDelete = this.director.getParentDivider(toDelete);
        this.reziseAfterDelete(toDelete);
        return;
    }

    if (firstDividerSet) {
      this.reziseAfterDeleteRecursive(toDelete as SubKreis, deletedPhantomWidth);
    }

  }

  reziseAfterDeleteRecursive(lastDivider: SubKreis, deletedPhantomWidth: number) {


    let parentDivider: SubKreis = this.director.getParentOppositeDivider(lastDivider as SubKreis);

    if ( lastDivider.injected) {
      parentDivider = this.director.getParentDivider(lastDivider);
      lastDivider.injected = false;
    }
    if ( parentDivider === null ) {
      return;
    }

    if ( parentDivider instanceof SubKreisLeft) {
      if (parentDivider.injected) {
        const parentKreis: Kreis = parentDivider.parent as Kreis;

        if ( parentKreis.centerChilds.length === 0) {
          const childs: Shape[] = this.director.getChildFrom(parentKreis);
          childs[1].phantomLeft.width -= deletedPhantomWidth;
        } else {
          parentKreis.centerChilds[parentKreis.centerChilds.length - 1].phantomLeft.width -= deletedPhantomWidth;
        }
      } else {
        parentDivider.phantomRight.width -= deletedPhantomWidth;
      }
    } else if ( parentDivider instanceof SubKreisRight) {
      if (!(lastDivider instanceof SubKreisCenter)) {
        parentDivider.phantomLeft.width -= deletedPhantomWidth;
      }
    } else if ( parentDivider instanceof SubKreisCenter) {
      if (lastDivider instanceof SubKreisLeft) {
        parentDivider.phantomLeft.width -= deletedPhantomWidth;
      } else if (lastDivider instanceof SubKreisRight) {
        parentDivider.phantomRight.width -= deletedPhantomWidth;
      } else if ( lastDivider instanceof SubKreisCenter ) {
        parentDivider.phantomRight.width -= deletedPhantomWidth;
      }
    }

    this.reziseAfterDeleteRecursive(parentDivider, deletedPhantomWidth);
  }

  scale(scale: string) {
    let scalingAllowed = false;
    if (scale === '+') {
      scalingAllowed = this.scaling.increase();
    } else if (scale === '-') {
      scalingAllowed = this.scaling.decrease();
    }
    if ( scalingAllowed ) {

      for (const element of this.director.getShapeList()) {
        this.scaling.rezise(element, scale);
      }
      this.director.rearrangeAll(this.director.ShapeList[0]);
    }
  }


  replaceParent() {
    if (this.director.replaceActive) {
      this.director.replaceActive = false;
    } else {
      this.director.replaceActive = true;
    }

  }

  addKreis() {
    let tmp: Kreis = null;
    let subleft = null;
    let subright = null;
    let childs: Shape[] = [];
    childs = this.director.getChildFrom(this.director.LastSelected);
    childs = this.director.getChildFrom(childs[0]);
    if (childs.length === 0) {
      /////////   Einfügen als Leaf
      tmp = new Kreis(this.director.LastSelected, this.director);
      subleft = new SubKreisLeft(tmp, this.director);
      subright = new SubKreisRight(tmp, this.director);
      this.director.addShape(tmp);
      this.director.addShape(subleft);
      this.director.addShape(subright);
      this.director.resizeDivider(this.director.LastSelected);
      this.director.setSelected(subleft);
      tmp.setPosition();
      subleft.setPosition();
      subright.setPosition();
    } else if (childs.length === 1) {
      /////////// Einfügen in der Mitte
        tmp = new Kreis(this.director.LastSelected, this.director);
        subleft = new SubKreisLeft(tmp, this.director);
        subleft.setInjected();
        childs[0].parent = subleft;
        subright = new SubKreisRight(tmp, this.director);
        this.director.addShape(tmp);
        this.director.addShape(subleft);
        this.director.addShape(subright);
        this.director.resizeDivider(this.director.LastSelected);
        this.director.setSelected(subleft);
        tmp.setPosition();
        subleft.setPosition();
        subright.setPosition();
    }
    this.scaling.scaleNewShape(tmp);
    this.scaling.scaleNewShape(subleft);
    this.scaling.scaleNewShape(subright);
    this.director.rearrangeAll(this.director.ShapeList[0]);
    this.director.setPadding();
    this.director.resizeInjectedDivider(tmp);
  }

  addSubKreisCenter() {
    if (!(this.director.LastSelected instanceof SubKreis)) {
      return;
    }
    const parent: Shape = this.director.LastSelected.getParent();
    const childs: Shape[] = this.director.getChildFrom(parent);
    let subKreisRight: SubKreisRight;
    for (const child of childs) {
      if ( child instanceof SubKreisRight) {
        subKreisRight = child;
      }
    }
    const subKreisRightChild: Shape[] = this.director.getChildFrom(subKreisRight);
    const subKreisCenter: SubKreisCenter = new SubKreisCenter(parent, this.director);
    this.director.addShape(subKreisCenter);
    (parent as Kreis).addCenter(subKreisCenter);
    subKreisCenter.setValuesTo(subKreisRight);
    subKreisRight.left += subKreisRight.phantomLeft.width + subKreisRight.width;
    subKreisRight.phantomLeft.width = 0;
    if (subKreisRightChild.length === 1 ) {
      subKreisRightChild[0].parent = subKreisCenter;
    }
    this.director.reziseDividerAfterAddCenter(subKreisCenter);
    this.director.rearrangeAll(this.director.ShapeList[0]);
    this.director.sizePhantomOfSubKreisRightAfterCenterAdd(subKreisCenter);
    this.director.setPadding();
  }

  addRechteck() {
    let tmp: Shape = null;
    let childs: Shape[] = [];
    childs = this.director.getChildFrom(this.director.LastSelected);
    if (childs.length === 0) {
      /////////   Einfügen als Leaf
      tmp = new Rechteck(this.director.LastSelected, this.director);
      this.director.addShape(tmp);
      this.director.setSelected(tmp);
      tmp.setPosition();
    } else if (childs.length === 1) {
      /////////// Einfügen in der Mitte
      tmp = new Rechteck(this.director.LastSelected, this.director);
      childs[0].parent = tmp;
      this.director.addShape(tmp);
      this.director.setSelected(tmp);
      tmp.setPosition();
    }
    this.scaling.scaleNewShape(tmp);
    this.director.rearrangeAll(this.director.ShapeList[0]);
    this.director.setPadding();

  }

  addDialog() {
    let tmp: Shape = null;
    let childs: Shape[] = [];
    childs = this.director.getChildFrom(this.director.LastSelected);
    childs = this.director.getChildFrom(childs[0]);
    if (childs.length === 0) {
      /////////   Einfügen als Leaf
      tmp = new Dialog(this.director.LastSelected, this.director);
      this.director.addShape(tmp);
      this.director.setSelected(tmp);
      tmp.setPosition();
    } else if (childs.length === 1) {
      /////////// Einfügen in der Mitte
      tmp = new Dialog(this.director.LastSelected, this.director);
      childs[0].parent = tmp;
      this.director.addShape(tmp);
      this.director.setSelected(tmp);
      tmp.setPosition();
    }
    this.scaling.scaleNewShape(tmp);
    this.director.rearrangeAll(this.director.ShapeList[0]);
    this.director.setPadding();

  }

  addMonolog() {
    let tmp: Shape = null;
    let childs: Shape[] = [];
    childs = this.director.getChildFrom(this.director.LastSelected);
    childs = this.director.getChildFrom(childs[0]);
    if (childs.length === 0) {
      /////////   Einfügen als Leaf
      tmp = new Monolog(this.director.LastSelected, this.director);
      this.director.addShape(tmp);
      this.director.setSelected(tmp);
      tmp.setPosition();
    } else if (childs.length === 1) {
      /////////// Einfügen in der Mitte
      tmp = new Monolog(this.director.LastSelected, this.director);
      childs[0].parent = tmp;
      this.director.addShape(tmp);
      this.director.setSelected(tmp);
      tmp.setPosition();
    }
    this.scaling.scaleNewShape(tmp);
    this.director.rearrangeAll(this.director.ShapeList[0]);
    this.director.setPadding();

  }
  addLink() {
    let tmp: Shape = null;
    let childs: Shape[] = [];
    childs = this.director.getChildFrom(this.director.LastSelected);
    childs = this.director.getChildFrom(childs[0]);
    if (childs.length === 0) {
      /////////   Einfügen als Leaf
      tmp = new Link(this.director.LastSelected, this.director);
      this.director.addShape(tmp);
      this.director.setSelected(tmp);
      tmp.setPosition();
    } else if (childs.length === 1) {
      /////////// Einfügen in der Mitte
      return;
    }
    this.scaling.scaleNewShape(tmp);
    this.director.rearrangeAll(this.director.ShapeList[0]);
    this.director.setPadding();

  }
}


