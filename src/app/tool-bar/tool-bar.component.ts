import { Component, OnInit } from '@angular/core';
import { Shape, Rechteck, Kreis } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { SubKreis, SubKreisLeft, SubKreisRight } from '../shapes/subkreis';
import { ScalingService } from '../scaling.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(private director: ComponentDirectorService, public scaling: ScalingService) { }

  ngOnInit() {
  }



  scale(scale: string) {
    if (scale === '+') {
      this.scaling.increase();
    } else if (scale === '-') {
      this.scaling.decrease();
    }
    for (const element of this.director.getShapeList()) {
      this.rezise(element);
    }
    this.director.rearrangeAll(this.director.ShapeList[0]);

  }

  rezise(element: Shape) {
    element.height *= this.scaling.scale;
    element.width *= this.scaling.scale;
    if ( element instanceof SubKreisLeft) {
      (element as SubKreisLeft).phantomRight.width *= this.scaling.scale;
      (element as SubKreisLeft).phantomRight.height *= this.scaling.scale;
    }
    if ( element instanceof SubKreisRight) {
      (element as SubKreisRight).phantomLeft.width *= this.scaling.scale;
      (element as SubKreisRight).phantomLeft.height *= this.scaling.scale;
    }
  }

  addKreis() {
    let tmp: Shape = null;
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
