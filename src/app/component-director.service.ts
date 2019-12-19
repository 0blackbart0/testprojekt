import { Injectable } from '@angular/core';
import { Shape, Kreis, StartShape, Rechteck } from './shapes/shape';
import { SubKreis, SubKreisLeft, SubKreisRight, SubKreisCenter } from './shapes/subkreis';
import { DrawingFieldComponent } from './drawing-field/drawing-field.component';
import { ScalingService } from './scaling.service';
import { Menu } from './shapes/component';
import { SidebarComponent } from './sidebar/sidebar.component';


@Injectable({
  providedIn: 'root'
})
export class ComponentDirectorService {



  ShapeList: Shape[] = [];
  LastSelected: Shape;
  replaceActive = false;
  drawingField: DrawingFieldComponent = null;
  sidebar: SidebarComponent = null;

  constructor(private scaling: ScalingService) { }

  getShapeList() {
    return this.ShapeList;
  }

  addShape(shape: Shape) {
    this.ShapeList.push(shape);
  }

  setDrawingField(field: DrawingFieldComponent) {
    this.drawingField = field;
  }

  addMenu() {
    let tmp: Shape = null;
    let childs: Shape[] = [];
    childs = this.getChildFrom(this.LastSelected);
    if (childs.length === 0) {
      /////////   Einfügen als Leaf
      tmp = new Menu(this.LastSelected, this);
      this.addShape(tmp);
      tmp.setPosition();
    } else if (childs.length === 1) {
      /////////// Einfügen in der Mitte
      tmp = new Menu(this.LastSelected, this);
      childs[0].parent = tmp;
      this.addShape(tmp);
      tmp.setPosition();
    }
    this.scaling.scaleNewShape(tmp);
    this.rearrangeAll(this.ShapeList[0]);
    this.setPadding();

  }


  sizePhantomOfSubKreisRightAfterCenterAdd(subCenter: SubKreisCenter) {
    const parentKreis: Shape = subCenter.parent;
    const children: Shape[] = this.getChildFrom(parentKreis);
    let subRight: SubKreisRight = null;
    for (const child of children) {
      if (child instanceof SubKreisRight) {
        subRight = child;
      }
    }
    const childDividers: Shape[] = this.getChildDividers(subCenter as Shape);
    if ( childDividers.length === 0 ) {
      return;
    }
    let maxLeft = 0;
    let maxLeftWidth = 0;
    for (const child of childDividers) {
      if (child.left > maxLeft) {
        maxLeft = child.left;
        maxLeftWidth = child.width;
      }
    }
    const distance = (maxLeft + maxLeftWidth) - subRight.left;
    subRight.phantomLeft.width += distance;
    this.rearrangeAll(this.ShapeList[0]);
  }

  resizeInjectedDivider(element: Kreis) {
    let childDividers: Shape[] = this.getChildDividers(element);
    if (childDividers.length <= 2) {
      return;
    }
    const subRight: SubKreisRight = this.getChildFrom(element)[1] as SubKreisRight;
    childDividers = this.getChildDividers(this.getChildFrom(element)[0]);
    let maxLeft = 0;
    let maxLeftWidth = 0;
    for (const child of childDividers) {
      if (child.left > maxLeft) {
        maxLeft = child.left;
        maxLeftWidth = child.width;
      }
    }


    if ( maxLeft === subRight.left && childDividers.length === 4) {
      subRight.phantomLeft.width += (subRight.width / 2);
    } else {
      subRight.phantomLeft.width += ((maxLeft + maxLeftWidth) - subRight.left);
    }


    subRight.phantomLeft.left = subRight.left + subRight.phantomRight.width;
    subRight.phantomLeft.top = subRight.top;

    subRight.setPosition();



  }

  resizeDivider(element: Shape) {
    const divider: SubKreis = this.getParentDivider(element) as SubKreis;

    let firstDividerSet = false;

    if ( element instanceof Rechteck) {
      if (divider === null) {
        return;
      }
      element = divider;
    }

    // Erstes Element anpassen, da dieses anders behandelt wird. Bsp. Außnahme von Rechtecken
    if (element instanceof SubKreisLeft) {
      element.phantomRight.width += (element.width / 2);
      firstDividerSet = true;
      element.phantomRight.left = element.left + element.phantomRight.width;
      element.phantomRight.top = element.top;
      element.setPosition();

    } else if (element instanceof SubKreisRight) {

      element.phantomLeft.width += (element.width / 2);
      firstDividerSet = true;
      element.phantomLeft.left = element.left;
      element.phantomLeft.top = element.top;
      element.setPosition();
    } else if ( element instanceof SubKreisCenter) {
      firstDividerSet = true;
      element.phantomRight.width += (element.width / 2);
      element.phantomLeft.width += (element.width / 2);
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
    if (divider instanceof SubKreisLeft ) {
      divider.phantomRight.width += (element.width );
      divider.phantomRight.left -= (element.width );
      element.phantomLeft.left -= (element.width );
    } else if (divider instanceof SubKreisRight) {
      if (!(element instanceof SubKreisCenter)) {
        divider.phantomLeft.width += (element.width );
        divider.phantomLeft.left -= (element.width );
        element.phantomRight.left += (element.width );
      }
    } else if (divider instanceof SubKreisCenter) {
      if (element instanceof SubKreisRight) {
        divider.phantomRight.width += element.width;
        divider.phantomRight.left += element.width;
      } else if (element instanceof SubKreisLeft) {
        divider.phantomLeft.width += element.width;
        divider.phantomLeft.left -= element.width;
      } else if ( element instanceof SubKreisCenter) {
        divider.phantomRight.width += element.width;
        divider.phantomRight.left += element.width;
      }
    }
    this.resizeDividerRecursive(divider);
  }

}

resizeDividerAfterDeleteCenterRecursive(element: SubKreis) {
  if (element === null) {
    return;
  }
  const divider: SubKreis = this.getParentOppositeDivider(element);

  if ( divider != null) {
    if (divider instanceof SubKreisLeft ) {
      divider.phantomRight.width -= (element.width );
      divider.phantomRight.left += (element.width );
      element.phantomLeft.left += (element.width );
    } else if (divider instanceof SubKreisRight) {
      if (!(element instanceof SubKreisCenter)) {
        divider.phantomLeft.width -= (element.width );
        divider.phantomLeft.left += (element.width );
        element.phantomRight.left -= (element.width );
      }
    } else if (divider instanceof SubKreisCenter) {
      if (element instanceof SubKreisRight) {
        divider.phantomRight.width -= element.width;
        divider.phantomRight.left -= element.width;
      } else if (element instanceof SubKreisLeft) {
        divider.phantomLeft.width -= element.width;
        divider.phantomLeft.left += element.width;
      } else if ( element instanceof SubKreisCenter) {
        divider.phantomRight.width -= element.width;
        divider.phantomRight.left -= element.width;
      }
    }
    this.resizeDividerAfterDeleteCenterRecursive(divider);
  }

}

  reziseDividerAfterDeleteCenter(element: SubKreis) {
    if (element === null) {
      return;
    }
    const parentDivider: SubKreis = this.getParentDivider(element);

    if (parentDivider === null) {
      return;
    }
    if (!(parentDivider instanceof SubKreisRight)) {
      parentDivider.phantomRight.width -= parentDivider.width;
    }
    this.resizeDividerAfterDeleteCenterRecursive(parentDivider);
  }

  reziseDividerAfterAddCenter(element: SubKreis) {
    if (element === null) {
      return;
    }
    const parentDivider: SubKreis = this.getParentDivider(element);

    if (parentDivider === null) {
      return;
    }
    if (!(parentDivider instanceof SubKreisRight)) {
      parentDivider.phantomRight.width += parentDivider.width;
    }
    this.resizeDividerRecursive(parentDivider);
  }


  reziseDividerAfterReplace(subKreis: SubKreisLeft | SubKreisRight) {
    const measurements = this.measureDistances(subKreis);
    return null;
  }

  measureDistances(subkreis: SubKreisLeft | SubKreisRight): number[] {

    const childDividers: Shape[] = this.getChildDividers(subkreis);
    if ( childDividers.length === 0 ) {
      return;
    }
    let maxLeft = 0;
    for (const child of childDividers) {
      if (child.left > maxLeft) {
        maxLeft = child.left;
      }
    }
    const overFlowRight = maxLeft - subkreis.left;

    let minLeft = subkreis.left;
    for (const child of childDividers) {
      if (child.left < minLeft) {
        minLeft = child.left;
      }
    }
    const overFlowLeft = subkreis.left - minLeft;

    return [overFlowLeft, overFlowRight];

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

  getParentDivider(element: Shape): SubKreis {
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
    // liefert den letzten gegenüberliegenden Divider zurükck
     // oder den nächsten CenterDivider

    let opDivider: SubKreis = null;
    let pointer: Shape = element.getParent();
    while (pointer !== null) {

      if (pointer instanceof SubKreis &&
          ( element.instanceOf() !== pointer.instanceOf() ||
          (element.instanceOf() === pointer.instanceOf() && element instanceof SubKreisCenter))) {
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

    const paddingLeft = 60;
    let difference: number;

    let minDistanceLeft: number = this.getShapeList()[0].left;

    for (const shape of this.getShapeList()) {
      if (shape.left < minDistanceLeft) {
        minDistanceLeft = shape.left;
      }
    }

    if (minDistanceLeft < paddingLeft) {
      difference = paddingLeft - minDistanceLeft;
      this.ShapeList[0].left += difference;

    } else if (minDistanceLeft > paddingLeft) {
      difference = minDistanceLeft -  paddingLeft;
      this.ShapeList[0].left -= difference;
    }

    this.rearrangeAll(this.ShapeList[0]);
  }


  setPaddingBottom() {
    let maxDistanceTop: number = 0;
    const paddingBottom: number = 20;

    for (const shape of this.getShapeList()) {
      if (shape.top + shape.height > maxDistanceTop) {
        maxDistanceTop = shape.top + shape.height;

      }
    }

    this.drawingField.drawingFieldPaddingTop = maxDistanceTop + paddingBottom;

  }

  setPaddingRight() {
    let maxDistanceLeft: number = 0;
    const paddingRight: number = 60;

    for (const shape of this.getShapeList()) {
      if (shape.left + shape.width > maxDistanceLeft) {
        maxDistanceLeft = shape.left + shape.width;

      }
    }
    this.drawingField.drawingFieldPaddingRight = maxDistanceLeft + paddingRight;
  }

  setPadding() {
    this.setPaddingLeft();
    this.setPaddingBottom();
    this.setPaddingRight();
  }


  replaceParents(fromShape: SubKreisCenter, toShape: SubKreis) {


    let childsShape: Shape[] = [];
    childsShape = this.getChildFrom(fromShape);
    if (childsShape.length === 0) {
      return;
    }
    childsShape[0].parent = toShape;
    this.rearrangeAll(this.ShapeList[0]);
  }




///////////////// DEPRECATED////////////////////
  replaceParent(shape: Shape) {

    const lastSelected = this.LastSelected;

    if (lastSelected instanceof StartShape || lastSelected instanceof Kreis) {
      this.replaceActive = false;
      return;
    }

    let childsLastSelected: Shape[] = [];
    let childsShape: Shape[]        = [];
    childsLastSelected  = this.getChildFrom(lastSelected);
    childsShape = this.getChildFrom(shape);
    lastSelected.parent = shape;
    let pointer: Shape = lastSelected;
    if (childsShape.length === 1) {

    if ( childsLastSelected.length === 1) {

      while ( this.getChildFrom(pointer).length >= 1 ) {
        pointer = this.getChildFrom(pointer)[0];
      }
    }
    childsShape[0].parent = pointer;

    ///////
    const childDividers: Shape[] = this.getChildDividers(lastSelected);
    // TODO

    //////

    }
    this.replaceActive = false;
    this.rearrangeAll(this.ShapeList[0]);
  }

  setSelected(shape: Shape) {
      if (this.replaceActive) {
        this.replaceParent(shape);
      }
      this.LastSelected.selected = false;
      if ( shape !== this.LastSelected) {
        this.LastSelected.connectorActive = false;
      }
      this.LastSelected = shape;
      shape.selected = true;
      if ( shape instanceof SubKreis ) {
        this.sidebar.shape = shape.parent;
        this.sidebar.kreisChilds = this.getChildFrom(shape.parent) as SubKreis[];
      } else {
        this.sidebar.shape = shape;
      }
  }

  deleteMenu() {
    for ( const element of this.getShapeList()) {
      if ( element.instanceOf() === 'menu') {
        this.deleteSingle(element);
      }
    }
  }

  deleteSingle(element: Shape) {
    const parent: Shape = element.parent;
    const child: Shape[] = this.getChildFrom(element);

    if ( child.length === 1) {
      child[0].parent = parent;
    }
    const index = this.ShapeList.indexOf(element);
    this.ShapeList.splice(index, 1);
    this.rearrangeAll(this.ShapeList[0]);
  }



  deleteAll(element: Shape) {
    const childs: Shape[] = this.getChildFrom(element);
    for (const child of childs) {
      const index = this.ShapeList.indexOf(child);
      this.ShapeList.splice(index, 1);
      this.deleteAll(child);
    }
  }

  deleteBelow(toDelete: Shape) {
    if (toDelete instanceof SubKreisCenter) {
      toDelete.phantomLeft.width = 0;
      toDelete.phantomRight.width = 0;
    }
    this.reziseAfterDelete(toDelete);
    this.deleteAll(toDelete);
    this.rearrangeAll(this.ShapeList[0]);
  }

  reziseAfterDelete(toDelete: Shape) {

    let deletedPhantomWidth = 0;
    let firstDividerSet = false;

    const childDividers: Shape[] = this.getChildDividers(toDelete);
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
          this.getChildFrom(toDelete.parent)[1].phantomLeft.width -= deletedPhantomWidth;
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
        toDelete = this.getParentDivider(toDelete);
        this.reziseAfterDelete(toDelete);
        return;
    }

    if (firstDividerSet) {
      this.reziseAfterDeleteRecursive(toDelete as SubKreis, deletedPhantomWidth);
    }

  }

  reziseAfterDeleteRecursive(lastDivider: SubKreis, deletedPhantomWidth: number) {


    let parentDivider: SubKreis = this.getParentOppositeDivider(lastDivider as SubKreis);

    if ( lastDivider.injected) {
      parentDivider = this.getParentDivider(lastDivider);
      lastDivider.injected = false;
    }
    if ( parentDivider === null ) {
      return;
    }

    if ( parentDivider instanceof SubKreisLeft) {
      if (parentDivider.injected) {
        const parentKreis: Kreis = parentDivider.parent as Kreis;

        if ( parentKreis.centerChilds.length === 0) {
          const childs: Shape[] = this.getChildFrom(parentKreis);
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

  removeSubKreisCenter(toDelete: SubKreisCenter) {
    this.deleteBelow(toDelete);
    const kreis: Kreis = toDelete.parent as Kreis;
    let index = kreis.centerChilds.indexOf(toDelete);

    kreis.centerChilds.splice(index, 1);
    index = this.ShapeList.indexOf(toDelete);
    this.ShapeList.splice(index, 1);
    this.reziseDividerAfterDeleteCenter(toDelete);
    this.setSelected(this.getChildFrom(kreis)[0]);
    this.rearrangeAll(this.ShapeList[0]);
  }

  deleteTree() {
    if (!(this.LastSelected instanceof Rechteck )) {
      return;
    }
    const toDelete: Shape = this.LastSelected.parent;
    this.deleteBelow(toDelete);
  }

  addSubKreisCenter() {
    if (!(this.LastSelected instanceof SubKreis)) {
      return;
    }
    const parent: Shape = this.LastSelected.getParent();
    const childs: Shape[] = this.getChildFrom(parent);
    let subKreisRight: SubKreisRight;
    for (const child of childs) {
      if ( child instanceof SubKreisRight) {
        subKreisRight = child;
      }
    }
    const subKreisRightChild: Shape[] = this.getChildFrom(subKreisRight);
    const subKreisCenter: SubKreisCenter = new SubKreisCenter(parent, this);
    this.addShape(subKreisCenter);
    (parent as Kreis).addCenter(subKreisCenter);
    subKreisCenter.setValuesTo(subKreisRight);
    subKreisRight.left += subKreisRight.phantomLeft.width + subKreisRight.width;
    subKreisRight.phantomLeft.width = 0;
    if (subKreisRightChild.length === 1 ) {
      subKreisRightChild[0].parent = subKreisCenter;
    }
    this.reziseDividerAfterAddCenter(subKreisCenter);
    this.rearrangeAll(this.ShapeList[0]);
    this.sizePhantomOfSubKreisRightAfterCenterAdd(subKreisCenter);
    this.setPadding();
  }

}
