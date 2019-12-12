import { Injectable } from '@angular/core';
import { Shape } from '../app/shapes/shape';
import { ComponentDirectorService } from '../app/component-director.service';
import { stringify } from 'querystring';



@Injectable({
  providedIn: 'root'
})
export class JsonLoaderService {

  ShapeList: Shape[] = [];

  constructor(private director: ComponentDirectorService) {
    this.ShapeList = this.director.getShapeList();
   }

  generateString(): string {

    const generatedString: string = this.ShapeList[0].getInfoString();
    const jsonString: string = JSON.parse(generatedString);

    return jsonString;
  }

}
