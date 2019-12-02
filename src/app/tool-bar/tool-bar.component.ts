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
