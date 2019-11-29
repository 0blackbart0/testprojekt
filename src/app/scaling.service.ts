import { Injectable } from '@angular/core';
import { Shape } from './shapes/shape';
import { SubKreisLeft, SubKreisRight } from './shapes/subkreis';

@Injectable({
  providedIn: 'root'
})
export class ScalingService {

  balance = 0;
  scale: number;
  constructor() { }

  increase() {
    this.scale = 1.1;
    this.balance++;
  }

  decrease() {
    this.scale = 0.9;
    this.balance--;
  }

  scaleNewShape(shape: Shape) {
    if ( this.balance < 0) {
      for (let i = 0; i < Math.abs(this.balance); i++) {
        shape.height *= 0.9;
        shape.width *= 0.9;
        if (shape instanceof SubKreisLeft) {
          (shape as SubKreisLeft).phantomRight.height *= 0.9;
          (shape as SubKreisLeft).phantomRight.width *= 0.9;
        }
        if (shape instanceof SubKreisRight) {
          (shape as SubKreisRight).phantomLeft.height *= 0.9;
          (shape as SubKreisRight).phantomLeft.width *= 0.9;
        }
      }

    } else if ( this.balance > 0 ) {
      for (let i = 0; i < this.balance; i++) {
        shape.height *= 1.1;
        shape.width *= 1.1;
        if (shape instanceof SubKreisLeft) {
          (shape as SubKreisLeft).phantomRight.height *= 1.1;
          (shape as SubKreisLeft).phantomRight.width *= 1.1;
        }
        if (shape instanceof SubKreisRight) {
          (shape as SubKreisRight).phantomLeft.height *= 1.1;
          (shape as SubKreisRight).phantomLeft.width *= 1.1;
        }
      }
    }
  }
}
