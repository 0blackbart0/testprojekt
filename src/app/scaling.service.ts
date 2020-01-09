import { Injectable, RootRenderer } from '@angular/core';
import { Node } from './nodes/node';



@Injectable({
  providedIn: 'root'
})
export class ScalingService {

  balance = 0;
  scale = 0.9;

  outerPadding = 0.2;
  componentPadding = 2;
  titleMarginBottom = 1.5;
  menuMarginTop = 5;
  branchMarginTop = 2;
  wrapperInnerPadding = 2;
  wrapperInnerPaddingHover = 3;
  borderRadius = 2;
  borderRadiusMedium = 1;
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
  connectorHeightFem = 5;

  buttonSize = 5;

  menuConnectorTop = -4;

  imgLinkWidth = 20;
  imgLinkHeight = 10;
  imgLinkLeft = 6;
  imgLinkTop = -1;

  left1 = 6.5;
  left2 = 12.5;
  left3 = 18.5;
  left4 = 24.5;

  top1_4 = -2;
  top2_3 = 1;


  leftU1 = 3.5;
  leftU2 = 9.5;
  leftU3 = 15.5;
  leftU4 = 21.5;
  leftU5 = 27.5;

  topU1_5 = -1.5;
  topU2_4 = 0.5;
  topU3 = 1.5;


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
    this.menuMarginTop *= Math.pow(this.scale, exponent);
    this.branchMarginTop *= Math.pow(this.scale, exponent);
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
    this.borderRadiusMedium *= Math.pow(this.scale, exponent);
    this.buttonSize *= Math.pow(this.scale, exponent);
    this.menuConnectorTop *= Math.pow(this.scale, exponent);

    this.left1 *= Math.pow(this.scale, exponent);
    this.left2 *= Math.pow(this.scale, exponent);
    this.left3 *= Math.pow(this.scale, exponent);
    this.left4 *= Math.pow(this.scale, exponent);

    this.top1_4 *= Math.pow(this.scale, exponent);
    this.top2_3 *= Math.pow(this.scale, exponent);

    this.leftU1 *= Math.pow(this.scale, exponent);
    this.leftU2 *= Math.pow(this.scale, exponent);
    this.leftU3 *= Math.pow(this.scale, exponent);
    this.leftU4 *= Math.pow(this.scale, exponent);
    this.leftU5 *= Math.pow(this.scale, exponent);

    this.topU1_5 *= Math.pow(this.scale, exponent);
    this.topU2_4 *= Math.pow(this.scale, exponent);
    this.topU3 *= Math.pow(this.scale, exponent);

    this.imgLinkWidth *= Math.pow(this.scale, exponent);
    this.imgLinkHeight *= Math.pow(this.scale, exponent);
    this.imgLinkLeft *= Math.pow(this.scale, exponent);
    this.imgLinkTop *= Math.pow(this.scale, exponent);



  }

  setCSSValues() {

    const body = document.body;

    body.style.setProperty('--outer-padding', this.outerPadding + 'vh');
    body.style.setProperty('--component-padding', this.componentPadding + 'vh');
    body.style.setProperty('--title-margin-bottom', this.titleMarginBottom + 'vh');
    body.style.setProperty('--menu-margin-top', this.menuMarginTop + 'vh');
    body.style.setProperty('--branch-margin-top', this.branchMarginTop + 'vh');
    body.style.setProperty('--wrapper-inner-padding', this.wrapperInnerPadding + 'vh');
    body.style.setProperty('--wrapper-inner-padding-hover', this.wrapperInnerPaddingHover + 'vh');
    body.style.setProperty('--chatbubble-padding-left', this.chatBubblePaddingLeft + 'vh');

    body.style.setProperty('--border-radius-small', this.borderRadiusSmall + 'vh');
    body.style.setProperty('--border-radius-medium', this.borderRadiusMedium + 'vh');

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
    body.style.setProperty('--button-size', this.buttonSize + 'vh');
    body.style.setProperty('--menu-connector-top', this.menuConnectorTop + 'vh');

    body.style.setProperty('--img-link-width', this.imgLinkWidth + 'vh');
    body.style.setProperty('--img-link-height', this.imgLinkHeight + 'vh');
    body.style.setProperty('--img-link-left', this.imgLinkLeft + 'vh');
    body.style.setProperty('--img-link-top', this.imgLinkTop + 'vh');

    body.style.setProperty('--left-1', this.left1 + 'vh');
    body.style.setProperty('--left-2', this.left2 + 'vh');
    body.style.setProperty('--left-3', this.left3 + 'vh');
    body.style.setProperty('--left-4', this.left4 + 'vh');

    body.style.setProperty('--top-1-4', this.top1_4 + 'vh');
    body.style.setProperty('--top-2-3', this.top2_3 + 'vh');


    body.style.setProperty('--left-u-1', this.leftU1 + 'vh');
    body.style.setProperty('--left-u-2', this.leftU2 + 'vh');
    body.style.setProperty('--left-u-3', this.leftU3 + 'vh');
    body.style.setProperty('--left-u-4', this.leftU4 + 'vh');
    body.style.setProperty('--left-u-5', this.leftU5 + 'vh');

    body.style.setProperty('--top-u-1-5', this.topU1_5 + 'vh');
    body.style.setProperty('--top-u-2-4', this.topU2_4 + 'vh');
    body.style.setProperty('--top-u-3', this.topU3 + 'vh');

  }

  rezise(node: Node, scale: string) {

    if ( scale === '+') {
      node.height /= this.scale;
      node.width /= this.scale;
    } else if ( scale === '-') {
      node.height *= this.scale;
      node.width *= this.scale;
    }
  }

  scaleNewNode(node: Node) {
    if ( this.balance < 0) {
      for (let i = 0; i < Math.abs(this.balance); i++) {
        node.height *= this.scale;
        node.width *= this.scale;
      }

    } else if ( this.balance > 0 ) {
      for (let i = 0; i < this.balance + 1; i++) {
        node.height /= this.scale;
        node.width /= this.scale;
      }
    }
  }
}
