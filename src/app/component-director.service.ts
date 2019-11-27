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
    const divider: SubKreis = this.getParentDivider(element) as SubKreis;

    let firstDividerSet = false;

    if ( element.instanceOf() === 'rechteck') {
      if (divider === null) {
        return;
      }
      element = divider;
    }

    // Erstes Element anpassen, da dieses anders behandelt wird. Bsp. Außnahme von Rechtecken
    if (element.instanceOf() === 'subKreisLeft') {
      element.phantomRight.width += (element.width / 2);
      firstDividerSet = true;
      element.phantomRight.left = element.left + element.phantomRight.width;
      element.phantomRight.top = element.top;
      element.setPosition();

    } else if (element.instanceOf() === 'subKreisRight') {

      element.phantomLeft.width += (element.width / 2);
      firstDividerSet = true;
      element.phantomLeft.left = element.left;
      element.phantomLeft.top = element.top;
      element.setPosition();
    }


    // als nächstes der erste Parent divider der in die entgegengesetzte Richtung zeigt
    if (firstDividerSet) {
      this.resizeDividerRecursive(element as SubKreis);
    }
  }

  resizeDividerRecursive(element: SubKreis) {
    if (element === null) {
      return;
    }
    const divider: SubKreis = this.getParentOppositeDivider(element);

    if ( divider != null) {
      if (divider.instanceOf() === 'subKreisLeft') {
        divider.phantomRight.width += (element.width );
        divider.phantomRight.left -= (element.width );
        element.phantomLeft.left -= (element.width );

      } else if (divider.instanceOf() === 'subKreisRight') {
        divider.phantomLeft.width += (element.width );
        divider.phantomLeft.left -= (element.width );
        element.phantomRight.left += (element.width );
      }
      this.resizeDividerRecursive(divider);
    }

  }
  getParentDividers(element: Shape): Shape[] {
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

  getParentDivider(element: Shape): Shape {
    if (!(element instanceof StartShape)) {
     element = element.parent;
    }
    while (element.parent !== null ) {
      if (element instanceof SubKreis) {
        return element;
      }
      element = element.getParent();
    }
    return null;
  }

  getParentOppositeDivider(element: SubKreis): SubKreis {

    let opDivider: SubKreis = null;
    let pointer: Shape = element.getParent();
    while (pointer !== null) {

      if (pointer instanceof SubKreis && element.instanceOf() !== pointer.instanceOf()) {
        opDivider = pointer as SubKreis;
        break;
      }
      pointer = pointer.getParent();
    }
    return opDivider;
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

  getChildDividers(element: SubKreis): SubKreis {
    
    return element;
  }

  rearrangeAll(element: Shape) {

    const childs: Shape[] = this.getChildFrom(element);
    for (const child of childs) {
      child.setPosition();
      this.rearrangeAll(child);
    }


  }

  setSelected(shape: Shape) {
    this.LastSelected.selected = false;
    this.LastSelected = shape;
    shape.selected = true;
  }

}
