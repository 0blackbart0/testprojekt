import { Injectable } from '@angular/core';
import { Shape, Kreis } from './shapes/shape';

@Injectable({
  providedIn: 'root'
})
export class ComponentDirectorService {

  ShapeList: Shape[] = [];
  LastSelected: Shape;

  constructor() { }

  getShapeList() {
    return this.ShapeList;
  }

  addShape(shape: Shape) {
    this.ShapeList.push(shape);
  }

  /* getChildFrom(shape: Shape): Shape[] {

    let child: Shape[] = [];

    for (const element of this.ShapeList) {
      if (element.parent === shape) {
        if (element.instanceOf() === 'kreis') {
          const subChild: Shape[] = [];
          for (const subElement of this.getChildFrom(element)) {
            subChild.push(subElement);
          }
          child = subChild;
        } else {
          child.push(element);
        }
      }
    }
    return child;
  } */

  getParentDivider(shape: Shape[]): Shape[] {
    const divider: Shape[] = [];

    return divider;
  }

  getChildFrom(shape: Shape): Shape[] {
    const childs: Shape[] = [];
    for (const element of this.ShapeList) {
      if (element.parent === shape) {
        childs.push(element);
      }
    }
    console.log(childs);
    return childs;
  }

  rearrangeAll(element: Shape) {

    const childs: Shape[] = this.getChildFrom(element);
    switch (childs.length) {
      case 0:
        break;
      case 1:
        childs[0].setPosition();
        this.rearrangeAll(childs[0]);
        break;
      default:
        for (const child of childs) {
          child.setPosition();
          this.rearrangeAll(child);
        }
    }

  }

  setSelected(shape: Shape) {
    this.LastSelected.selected = false;
    this.LastSelected = shape;
    shape.selected = true;
  }

}
