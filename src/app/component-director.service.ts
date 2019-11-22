import { Injectable } from '@angular/core';
import { Shape, Kreis, StartShape } from './shapes/shape';
import { SubKreis, SubKreisLeft, SubKreisRight } from './shapes/subkreis';

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

  resizeDivider(element: Shape) {
   
    /*
    for (const divider of this.getParentDivider(element)) {
      (divider as SubKreis).addPhantom();
    }*/
    
    const dividers: SubKreis[] = (this.getParentDivider(element) as SubKreis[]);
    const masterDivider: SubKreis = dividers[dividers.length - 1];
    let innerDividerSet = false;
    let outside = 0;
    let inside = 0;

    for ( const divider of dividers) {
      if ( divider.instanceOf() === masterDivider.instanceOf()) {
        divider.addPhantom();
        outside++;
      }
      if ( divider.instanceOf() !== masterDivider.instanceOf() && !(innerDividerSet)) {
        divider.addPhantom();
        innerDividerSet = true;
        inside++;
      }
    }
    if ( inside > outside && outside !== 0) {
          masterDivider.addPhantom();
    }
  }
  getParentDivider(element: Shape): Shape[] {
    const divider: Shape[] = [];
    if (!(element instanceof StartShape)) {
     element = element.parent;
    }
    while (element.parent !== null ) {
      if (element instanceof SubKreis) {
        divider.push(element);
      }
      element = element.getParent();
    }
    return divider;
  }

  getChildFrom(shape: Shape): Shape[] {
    const childs: Shape[] = [];
    for (const element of this.ShapeList) {
      if (element.parent === shape) {
        childs.push(element);
      }
    }
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
