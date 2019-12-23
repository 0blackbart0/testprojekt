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
    dialogConfig.autoFocus = false;



    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

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

  callJsonLoader() {
    console.log('generateJson aufgerufen');
    console.log(this.loader.generateJson());
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
    this.director.deleteBelow(subKreis);
    if (subKreis instanceof SubKreisRight) {
      outerCenter = kreis.centerChilds[kreis.centerChilds.length - 1];
      subKreis.phantomLeft.width = outerCenter.phantomLeft.width;
    } else if ( subKreis instanceof SubKreisLeft) {
      outerCenter = kreis.centerChilds[0];
      subKreis.phantomRight.width = outerCenter.phantomRight.width;
    }

    this.director.replaceParents(outerCenter, subKreis);

    this.director.reziseDividerAfterReplace(subKreis);

    this.director.removeSubKreisCenter(outerCenter);
  }



  


  deleteSubTree() {
    this.director.deleteBelow(this.director.LastSelected);
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



  addRechteck() {
    let tmp: Shape = null;
    let childs: Shape[] = [];
    childs = this.director.getChildFrom(this.director.LastSelected);
    if (childs.length === 0) {
      /////////   Einfügen als Leaf
      //tmp = new Rechteck(this.director.LastSelected, this.director);
      this.director.addShape(tmp);
      this.director.setSelected(tmp);
      tmp.setPosition();
    } else if (childs.length === 1) {
      /////////// Einfügen in der Mitte
      //tmp = new Rechteck(this.director.LastSelected, this.director);
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


