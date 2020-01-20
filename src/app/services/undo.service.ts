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

  //
  inUndoDirection = true;

  usedIndex: number;

  constructor() { }


  undo() {
    if ( this.index === 0 ) {
      this.save();
      this.index++;
    }

    if ( this.index < this.nodeLists.length) {
      if ( !this.inUndoDirection) {
        this.index++;
      }
      this.director.clearNodeList();
      this.jsonNode.loadNodeListFromString (this.nodeLists[this.index]);
      this.jsonNode.parse();
      this.index++;
      this.inUndoDirection = true;
    }
  }

  redo() {
    if ( this.index > 0 ) {
      if (this.inUndoDirection) {
        this.index--;
      }
      this.director.clearNodeList();
      this.jsonNode.loadNodeListFromString(this.nodeLists[this.index - 1]);
      this.jsonNode.parse();
      this.index--;
      this.inUndoDirection = false;
    }
  }

  save() {
    if ( this.index !== 0) {
      const tmp = this.nodeLists[this.index];

      this.index = 0;

      this.nodeLists.splice(0, this.nodeLists.length);
      this.inUndoDirection = true;
      this.nodeLists.push(tmp);
    }
    const newNodeList = this.jsonNode.stringify(this.director.nodeList);
    this.nodeLists.splice(0, 0, newNodeList);
  }
}
