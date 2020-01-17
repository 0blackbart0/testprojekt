import { Injectable } from '@angular/core';
import { ComponentDirectorService } from './component-director.service';
import { Node } from '../nodeModels/node';
import { JsonNodeListService } from './json-node-list.service';

@Injectable({
  providedIn: 'root'
})
export class UndoService {

  director: ComponentDirectorService;
  jsonNode: JsonNodeListService;

  nodeList1: string = '';
  nodeList2: string = '';

  nodeList: string[] = [];

  usedIndex: number;

  constructor() { }

  addNodeList(list: Node[]) {

  }

  undo() {
    this.director.clearNodeList();
    this.jsonNode.parse();
  }

  save() {

    
    this.nodeList1 = this.nodeList2;
    this.nodeList2 = this.jsonNode.stringify(this.director.nodeList);
  }
}
