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

  nodeLists: string[] = [];

  index = 0;

  usedIndex: number;

  constructor() { }


  undo() {
    if ( this.index === this.nodeLists.length - 1) {
      return;
    }
    this.index++;
    this.director.clearNodeList();
    this.jsonNode.loadNodeListFromString (this.nodeLists[this.index]);
    this.jsonNode.parse();
  }

  redo() {
    if ( this.index === 0) {
      return;
    }
    this.index--;
    this.director.clearNodeList();
    this.jsonNode.loadNodeListFromString(this.nodeLists[this.index]);
    this.jsonNode.parse();
  }

  save() {
    if ( this.index !== 0) {
      const tmp = this.nodeLists[this.index];
      this.nodeLists.splice(0, this.index);
      this.index = 0;
    }
    const newNodeList = this.jsonNode.stringify(this.director.nodeList);
    this.nodeLists.splice(0, 0, newNodeList);
  }
}
