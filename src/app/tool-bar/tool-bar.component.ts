import { Component, OnInit } from '@angular/core';
import { Shape, Rechteck, Kreis } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { SubKreis, SubKreisLeft, SubKreisRight, SubKreisCenter } from '../shapes/subkreis';
import { ScalingService } from '../scaling.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) { }

  ngOnInit() {
  }


  deleteSubTree() {
    const toDelete: Shape = this.director.LastSelected;
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
      deletedPhantomWidth += toDelete.phantomRight.width;
      toDelete.phantomRight.width = 0;
      firstDividerSet = true;
    } else if ( toDelete instanceof SubKreisRight) {
      deletedPhantomWidth += toDelete.phantomLeft.width;
      toDelete.phantomLeft.width = 0;
      firstDividerSet = true;
    } else if ( toDelete instanceof SubKreisCenter) {
      const tmp = (toDelete.phantomLeft.width + toDelete.phantomRight.width) / 2;
      deletedPhantomWidth += tmp;
      toDelete.phantomLeft.width = 0;
      toDelete.phantomRight.width = 0;
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


    const parentDivider: SubKreis = this.director.getParentOppositeDivider(lastDivider as SubKreis);

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
        this.rezise(element);
      }
      this.director.rearrangeAll(this.director.ShapeList[0]);
    }
  }

  rezise(element: Shape) {

    element.height *= this.scaling.scale;
    element.width *= this.scaling.scale;
    if ( element instanceof SubKreis) {
      (element as SubKreis).phantomRight.width *= this.scaling.scale;
      (element as SubKreis).phantomRight.height *= this.scaling.scale;
      (element as SubKreis).phantomLeft.width *= this.scaling.scale;
      (element as SubKreis).phantomLeft.height *= this.scaling.scale;
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
    if (childs.length === 0) {
      /////////   Einfügen als Leaf
      tmp = new Kreis(this.director.LastSelected);
      subleft = new SubKreisLeft(tmp);
      subright = new SubKreisRight(tmp);
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
        tmp = new Kreis(this.director.LastSelected);
        subleft = new SubKreisLeft(tmp);
        subleft.hasBeenInjected();
        childs[0].parent = subleft;
        subright = new SubKreisRight(tmp);
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
    this.director.setPaddingLeft();
    this.director.setPaddingBottom(tmp);
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
    const subKreisCenter: SubKreisCenter = new SubKreisCenter(parent);
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
    this.director.setPaddingLeft();
  }

  addRechteck() {
      let tmp: Shape = null;
      let childs: Shape[] = [];
      childs = this.director.getChildFrom(this.director.LastSelected);
      if (childs.length === 0) {
        /////////   Einfügen als Leaf
        tmp = new Rechteck(this.director.LastSelected);
        this.director.addShape(tmp);
        this.director.setSelected(tmp);
        tmp.setPosition();
      } else if (childs.length === 1) {
        /////////// Einfügen in der Mitte
        tmp = new Rechteck(this.director.LastSelected);
        childs[0].parent = tmp;
        this.director.addShape(tmp);
        this.director.setSelected(tmp);
        tmp.setPosition();
      }
      this.scaling.scaleNewShape(tmp);
      this.director.rearrangeAll(this.director.ShapeList[0]);
      this.director.setPaddingLeft();
      this.director.setPaddingBottom(tmp);

    }

}
