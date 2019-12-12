import { Injectable, RootRenderer } from '@angular/core';
import { Shape } from './shapes/shape';
import { SubKreis, SubKreisLeft, SubKreisRight } from './shapes/subkreis';

@Injectable({
  providedIn: 'root'
})
export class ScalingService {

  balance = 0;
  scale = 0.9;

  outerPadding = 0.2;
  componentPadding = 2;
  titleMarginBottom = 1.5;
  wrapperInnerPadding = 2;
  wrapperInnerPaddingHover = 3;
  borderRadius = 2;
  borderRadiusSmall = 0.5;
  borderWeightMedium = 0.5;
  borderWeightThick = 0.7;
  borderBottomSeperator = 0.3;
  labelSize = 2.5;
  fontSizeHeader = 3;
  fontSizeText = 2;
  chatBubblePaddingLeft = 0.6;
  triangleLong = 5;
  triangleShort = 3.5;
  connectorSize = 10;
  connectorRadius = 5;
  connectorBorder = 1;
  connectorHeightFem = 5.5;




  constructor() { }

  increase(): boolean {
    if ( this.balance < 10 ) {
      this.balance++;
      this.scaleCSS(-1);
      this.setCSSValues();
      return true;
    }
    return false;
  }

  decrease() {
    if (this.balance > -15 ) {

      this.balance--;
      this.scaleCSS(1);
      this.setCSSValues();
      return true;
    }
    return false;
  }

  scaleCSS(exponent: number) {

    this.outerPadding *= Math.pow(this.scale, exponent);
    this.componentPadding *= Math.pow(this.scale, exponent);
    this.titleMarginBottom *= Math.pow(this.scale, exponent);
    this.wrapperInnerPadding *= Math.pow(this.scale, exponent);
    this.wrapperInnerPaddingHover *= Math.pow(this.scale, exponent);
    this.borderRadius *= Math.pow(this.scale, exponent);
    this.borderBottomSeperator *= Math.pow(this.scale, exponent);
    this.borderRadiusSmall *= Math.pow(this.scale, exponent);
    this.labelSize *= Math.pow(this.scale, exponent);
    this.fontSizeText *= Math.pow(this.scale, exponent);
    this.fontSizeHeader *= Math.pow(this.scale, exponent);
    this.borderWeightMedium *= Math.pow(this.scale, exponent);
    this.triangleLong *= Math.pow(this.scale, exponent);
    this.triangleShort *= Math.pow(this.scale, exponent);
    this.borderWeightThick *= Math.pow(this.scale, exponent);
    this.chatBubblePaddingLeft *= Math.pow(this.scale, exponent);
    this.connectorSize *= Math.pow(this.scale, exponent);
    this.connectorRadius *= Math.pow(this.scale, exponent);
    this.connectorBorder *= Math.pow(this.scale, exponent);
    this.connectorHeightFem *= Math.pow(this.scale, exponent);


  }

  setCSSValues() {

    const body = document.body;

    body.style.setProperty('--outer-padding', this.outerPadding + 'vh');
    body.style.setProperty('--component-padding', this.componentPadding + 'vh');
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
    body.style.setProperty('--connector-size', this.connectorSize + 'vh');
    body.style.setProperty('--connector-radius', this.connectorRadius + 'vh');
    body.style.setProperty('--connector-border', this.connectorBorder + 'vh');
    body.style.setProperty('--connector-height-fem', this.connectorHeightFem + 'vh');

    body.style.setProperty('--font-size-header', this.fontSizeHeader + 'vh');
    body.style.setProperty('--font-size-text', this.fontSizeText + 'vh');
    body.style.setProperty('--label-size', this.labelSize + 'vh');

  }

  rezise(element: Shape, scale: string) {

    if ( scale === '+') {
      element.height /= this.scale;
      element.width /= this.scale;
      if ( element instanceof SubKreis) {
        (element as SubKreis).phantomRight.width /= this.scale;
        (element as SubKreis).phantomRight.height /= this.scale;
        (element as SubKreis).phantomLeft.width /= this.scale;
        (element as SubKreis).phantomLeft.height /= this.scale;
      }
    } else if ( scale === '-') {
      element.height *= this.scale;
      element.width *= this.scale;
      if ( element instanceof SubKreis) {
        (element as SubKreis).phantomRight.width *= this.scale;
        (element as SubKreis).phantomRight.height *= this.scale;
        (element as SubKreis).phantomLeft.width *= this.scale;
        (element as SubKreis).phantomLeft.height *= this.scale;
      }
    }
  }

  scaleNewShape(shape: Shape) {
    if ( this.balance < 0) {
      for (let i = 0; i < Math.abs(this.balance); i++) {
        shape.height *= this.scale;
        shape.width *= this.scale;
        if (shape instanceof SubKreisLeft) {
          (shape as SubKreisLeft).phantomRight.height *= this.scale;
          (shape as SubKreisLeft).phantomRight.width *= this.scale;
        }
        if (shape instanceof SubKreisRight) {
          (shape as SubKreisRight).phantomLeft.height *= this.scale;
          (shape as SubKreisRight).phantomLeft.width *= this.scale;
        }
      }

    } else if ( this.balance > 0 ) {
      for (let i = 0; i < this.balance + 1; i++) {
        shape.height /= this.scale;
        shape.width /= this.scale;
        if (shape instanceof SubKreisLeft) {
          (shape as SubKreisLeft).phantomRight.height /= this.scale;
          (shape as SubKreisLeft).phantomRight.width /= this.scale;
        }
        if (shape instanceof SubKreisRight) {
          (shape as SubKreisRight).phantomLeft.height /= this.scale;
          (shape as SubKreisRight).phantomLeft.width /= this.scale;
        }
      }
    }
  }
}
