import { Injectable } from '@angular/core';
import { Shape, Kreis } from './shape';

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



}
