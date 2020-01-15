import { Injectable } from '@angular/core';
import { ComponentDirectorService } from './component-director.service';
import { Node } from '../nodeModels/node';

@Injectable({
  providedIn: 'root'
})
export class UndoService {

  director: ComponentDirectorService;

  nodeList1: Node[] = [];
  nodeList2: Node[] = [];


  usedIndex: number;

  flag = true;

  constructor() { }

  addNodeList(list: Node[]) {

  }

  undo() {
    if (this.flag) {
      this.nodeList1 = JSON.parse(JSON.stringify(this.director.nodeList));
      this.flag = false;
    } else {
      this.nodeList2 = JSON.parse(JSON.stringify(this.director.nodeList));
    }

  }
}
