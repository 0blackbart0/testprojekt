import { Injectable } from '@angular/core';
import { Shape, Kreis, StartShape } from './shapes/shape';
import { SubKreis, SubKreisLeft, SubKreisRight } from './shapes/subkreis';
import { DrawingFieldComponent } from './drawing-field/drawing-field.component';
import { concat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentDirectorService {


  ShapeList: Shape[] = [];
  LastSelected: Shape;
  drawingField: DrawingFieldComponent = null;

  constructor() { }

  getShapeList() {
    return this.ShapeList;
  }

  addShape(shape: Shape) {
    this.ShapeList.push(shape);
  }

  setDrawingField(field: DrawingFieldComponent) {
    this.drawingField = field;
  }

  resizeInjectedDivider(element: Kreis) {
    const childDividers: Shape[] = this.getChildDividers(element);
    if (childDividers.length <= 2) {
      return;
    }
    const subRight: SubKreisRight = this.getChildFrom(element)[1] as SubKreisRight;
    let maxLeft = 0;
    let maxLeftWidth = 0;
    console.log(subRight.instanceOf());
    for (const child of childDividers) {
      if (child.left > maxLeft) {
        maxLeft = child.left;
        maxLeftWidth = child.width;
      }
    }
    console.log(('subright.left' + subRight.left));
    console.log(('maxleft' + maxLeft));


    subRight.phantomLeft.width += ((maxLeft + maxLeftWidth) - subRight.left);

    subRight.phantomLeft.left = subRight.left + subRight.phantomRight.width;
    subRight.phantomLeft.top = subRight.top;

    subRight.setPosition();



  }

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

  getChildDividers(element: Shape): Shape[] {

    let childDividers: Shape[] = [];
    const currentChildren: Shape[] = this.getChildFrom(element);

    for (const child of currentChildren) {
      if ( child instanceof SubKreis) {
        childDividers.push(child);
      }
      childDividers = childDividers.concat(this.getChildDividers(child));
    }
    return childDividers;

  }

  rearrangeAll(element: Shape) {

    const childs: Shape[] = this.getChildFrom(element);
    for (const child of childs) {
      child.setPosition();
      this.rearrangeAll(child);
    }
  }
  setPaddingLeft() {
    let minDistanceLeft: number = 52;
    for (const shape of this.getShapeList()) {
      if (shape.left < minDistanceLeft) {
        minDistanceLeft = shape.left;
      }
    }
    if (minDistanceLeft < 5) {
      this.ShapeList[0].left += 10;
      this.rearrangeAll(this.ShapeList[0]);
    }
  }
  setPaddingBottom(element: Shape) {
    let maxDistanceTop: number = 0;
    const height: number = element.height;
    for (const shape of this.getShapeList()) {
      if (shape.top > maxDistanceTop) {
        maxDistanceTop = shape.top;
      }
    }
    if ( (this.drawingField.drawingFieldPaddingTop - maxDistanceTop) <= this.drawingField.drawingFieldPadding) {
      this.drawingField.drawingFieldPaddingTop += height + 1;
    }
  }

  setSelected(shape: Shape) {
    this.LastSelected.selected = false;
    this.LastSelected = shape;
    shape.selected = true;
  }



}
