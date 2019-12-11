import { Injectable, RootRenderer } from '@angular/core';
import { Shape } from './shapes/shape';
import { SubKreis, SubKreisLeft, SubKreisRight } from './shapes/subkreis';

@Injectable({
  providedIn: 'root'
})
export class ScalingService {

  balance = 0;
  scale: number;

  outerPadding = 0.2;
  titleMarginBottom = 1.5;
  wrapperInnerPadding = 2;
  wrapperInnerPaddingHover = 3;
  borderRadius = 5;
  borderRadiusSmall = 2.5;
  borderWeightMedium = 0.5;
  borderWeightThick = 0.7;
  borderBottomSeperator = 0.3;
  labelSize = 2.5;
  fontSizeHeader = 3;
  fontSizeText = 2;
  chatBubblePaddingLeft = 0.6;
  triangleLong = 5;
  triangleShort = 3.5;



  constructor() { }

  increase(): boolean {
    if ( this.balance < 10 ) {
      this.scale = 1.1;
      this.balance++;
      this.scaleCSS();
      return true;
    }
    return false;
  }

  decrease() {
    if (this.balance > -15 ) {
      this.scale = 0.9;
      this.balance--;
      this.scaleCSS();
      return true;
    }
    return false;
  }

  scaleCSS() {

    this.outerPadding *= this.scale;
    this.titleMarginBottom *= this.scale;
    this.wrapperInnerPadding *= this.scale;
    this.wrapperInnerPaddingHover *= this.scale;
    this.borderRadius *= this.scale;
    this.borderBottomSeperator *= this.scale;
    this.borderRadiusSmall *= this.scale;
    this.labelSize *= this.scale;
    this.fontSizeText *= this.scale;
    this.fontSizeHeader *= this.scale;
    this.borderWeightMedium *= this.scale;
    this.triangleLong *= this.scale;
    this.triangleShort *= this.scale;
    this.borderWeightThick *= this.scale;
    this.chatBubblePaddingLeft *= this.scale;


    const body = document.body;

    body.style.setProperty('--outer-padding', this.outerPadding + 'vh');
    body.style.setProperty('--title-margin-bottom', this.titleMarginBottom + 'vh');
    body.style.setProperty('--wrapper-inner-padding', this.wrapperInnerPadding + 'vh');
    body.style.setProperty('--wrapper-inner-padding-hover', this.wrapperInnerPaddingHover + 'vh');
    body.style.setProperty('--chatbubble-padding-left', this.chatBubblePaddingLeft + 'vh');

    body.style.setProperty('--border-radius-small', this.borderRadiusSmall + 'vh');
    body.style.setProperty('--border-weight-medium', this.borderWeightMedium + 'vh');
    body.style.setProperty('--border-weight-thick', this.borderWeightThick + 'vh');
    body.style.setProperty('--border-radius', this.borderRadius + 'vh');
    body.style.setProperty('--border-bottom-seperator', this.borderBottomSeperator + 'vh');

    body.style.setProperty('--triangle-short', this.triangleShort + 'vh');
    body.style.setProperty('--triangle-long', this.triangleLong + 'vh');

    body.style.setProperty('--font-size-header', this.fontSizeHeader + 'vh');
    body.style.setProperty('--font-size-text', this.fontSizeText + 'vh');
    body.style.setProperty('--label-size', this.labelSize + 'vh');


    body.style.setProperty('--font-size-header', this.fontSizeHeader + 'vh');
    body.style.setProperty('--font-size-header', this.fontSizeHeader + 'vh');
  }

  rezise(element: Shape) {

    element.height *= this.scale;
    element.width *= this.scale;
    if ( element instanceof SubKreis) {
      (element as SubKreis).phantomRight.width *= this.scale;
      (element as SubKreis).phantomRight.height *= this.scale;
      (element as SubKreis).phantomLeft.width *= this.scale;
      (element as SubKreis).phantomLeft.height *= this.scale;
    }
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
      for (let i = 0; i < this.balance + 1; i++) {
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
