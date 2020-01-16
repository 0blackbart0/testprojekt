import { Injectable } from '@angular/core';
import { NodeType } from 'src/assets/values';
import { StartNode, Monolog, Dialog, DividerBranch } from '../nodeModels/component';
import { ComponentDirectorService } from './component-director.service';

@Injectable({
  providedIn: 'root'
})
export class JsonNodeListService {

  jsonNodeList: any[] = [];

  constructor(private director: ComponentDirectorService) { }

  stringify() {

    let json;
    for (const node of this.director.nodeList) {

      if (node.type === NodeType.STARTNODE) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "title":"' + node.title +
      '", "childId":"' + node.childId + '", "parentId":"' + node.parentId + '", "greeting":"' + (node as StartNode).greeting + '"}';
      }

      if (node.type === NodeType.MONOLOG) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "title":"' + node.title +
      '", "childId":"' + node.childId + '", "parentId":"' + node.parentId + '", "forwardText":"' + (node as Monolog).forwardText + '"}';
      }

      if (node.type === NodeType.DIALOG) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "title":"' + node.title +
      '", "childId":"' + node.childId + '", "parentId":"' + node.parentId + '", "question":"' +
      (node as Dialog).question + '", "answer":"' + (node as Dialog).answer + '"}';
      }

      if (node.type === NodeType.DIVIDERNODE) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "title":"' + node.title + '", "parentId":"' + node.parentId + '"}';
      }

      if (node.type === NodeType.DIVIDERBRANCH) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "selectiontext":"' + (node as DividerBranch).selectionText +
        '", "parentId":"' + node.parentId + '", "childId":"' + node.childId + '"}';
      }

      if (node.type === NodeType.LINK) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "parentId":"' + node.parentId + '"}';
      }

      if ( node.type !== NodeType.MENU) {
        const jsobj = JSON.parse(json);
        this.jsonNodeList.push(jsobj);
      }

  
    }
    console.log(this.jsonNodeList);
  }

  nodeCrawler() {
    let node = new StartNode(this.director);
    node.title = this.jsonNodeList[0].title;
    node.greeting = this.jsonNodeList[0].greeting;
    this.director.addNode(node);
  }

}
