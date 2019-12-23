import { Injectable } from '@angular/core';
import { Node } from './nodes/node';
import { ComponentDirectorService } from '../app/component-director.service';
import { stringify } from 'querystring';



@Injectable({
  providedIn: 'root'
})
export class JsonLoaderService {

  NodeList: Node[] = [];

  constructor(private director: ComponentDirectorService) {
    this.NodeList = this.director.nodeList;
   }

}
