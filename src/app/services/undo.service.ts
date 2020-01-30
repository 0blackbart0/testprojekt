import { Injectable } from '@angular/core';
import { ComponentDirectorService } from './component-director.service';
import { JsonNodeListService } from './json-node-list.service';
import { SidebarComponent } from '../uiComponents/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class UndoService {

  director: ComponentDirectorService;
  jsonNode: JsonNodeListService;
  sideBar: SidebarComponent;

  nodeLists: string[] = [];

  index = 0;

  usedIndex: number;

  constructor() { }


  setSideBar(sideBar: SidebarComponent) {
    this.sideBar = sideBar;
  }

  undo() {
    if ( this.index === this.nodeLists.length - 1) {
      return;
    }
    this.index++;
    this.director.clearNodeList();
    this.jsonNode.loadNodeListFromString (this.nodeLists[this.index]);
    this.jsonNode.parse();
    this.sideBar.node = this.director.nodeList[0];
  }

  redo() {
    if ( this.index === 0) {
      return;
    }
    this.index--;
    this.director.clearNodeList();
    this.jsonNode.loadNodeListFromString(this.nodeLists[this.index]);
    this.jsonNode.parse();
    this.sideBar.node = this.director.nodeList[0];
  }

  save() {
    if ( this.index !== 0) {
      this.nodeLists.splice(0, this.index);
      this.index = 0;
    }
    const newNodeList = this.jsonNode.stringify(this.director.nodeList);
    this.nodeLists.splice(0, 0, newNodeList);
  }
}
