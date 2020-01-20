import { Injectable } from '@angular/core';
import { NodeType, NodeSizes } from 'src/assets/values';
import { StartNode, Monolog, Dialog, DividerBranch, Link, DividerNode } from '../nodeModels/component';
import { Node } from '../nodeModels/node';
import { ComponentDirectorService } from './component-director.service';
import { DrawService } from './draw.service';
import { ScalingService } from './scaling.service';
import { UndoService } from './undo.service';

@Injectable({
  providedIn: 'root'
})
export class JsonNodeListService {

  jsonNodeList: any[] = [];

  director: ComponentDirectorService;
  draw: DrawService;
  scaling: ScalingService;
  undo: UndoService;

  oldBalance: number;
  constructor() { }

  loadTreeFromJson(tree: any[]) {
    this.director.clearNodeList();
    this.scaling.resetScaling(NodeSizes.BASICSCALEBALANCE);
    this.jsonNodeList = tree;
    this.parse();
    this.undo.save();
  }

  stringify(nodeList: Node[]): string {
    this.jsonNodeList.splice(0, this.jsonNodeList.length);

    let json;
    for (const node of nodeList) {

      node.title = this.replaceBadCharacter(node.title);

      if (node.type === NodeType.STARTNODE) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "title":"' + node.title +
      '", "childId":"' + node.childId + '", "parentId":"' + node.parentId + '", "greeting":"'
      + this.replaceBadCharacter((node as StartNode).greeting) + '"}';
      } else if (node.type === NodeType.MONOLOG) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "title":"' + node.title +
      '", "childId":"' + node.childId + '", "parentId":"' + node.parentId + '", "forwardText":"'
      + this.replaceBadCharacter((node as Monolog).forwardText) + '"}';
      } else if (node.type === NodeType.DIALOG) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "title":"' + node.title +
      '", "childId":"' + node.childId + '", "parentId":"' + node.parentId + '", "question":"' +
      this.replaceBadCharacter((node as Dialog).question) + '", "answer":"' +
      this.replaceBadCharacter((node as Dialog).answer) + '"}';
      } else if (node.type === NodeType.DIVIDERNODE) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "title":"' + node.title + '", "parentId":"' + node.parentId + '"}';
      } else if (node.type === NodeType.DIVIDERBRANCH) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "selectionText":"' +
        this.replaceBadCharacter((node as DividerBranch).selectionText) +
        '", "parentId":"' + node.parentId + '", "childId":"' + node.childId + '"}';
      } else if (node.type === NodeType.LINK) {
        json = '{"id":"' + node.id +
        '", "type":"' + node.type +
        '", "title":"' + node.title +
        '", "parentId":"' + node.parentId + '"}';
      }

      if ( node.type !== NodeType.MENU) {
        json = json.replace('\n', ' ');
        const jsobj = JSON.parse(json);
        this.jsonNodeList.push(jsobj);
      }
    }

    console.log(JSON.stringify(this.jsonNodeList));
    return JSON.stringify(this.jsonNodeList);
  }

  loadNodeListFromString(nodeListAsString: string ) {
    this.jsonNodeList.splice(0, this.jsonNodeList.length);
    this.jsonNodeList = JSON.parse(nodeListAsString);
  }

  parse() {
    this.oldBalance = this.scaling.resetScaling(NodeSizes.BASICSCALEBALANCE);
    const node = new StartNode(this.director);
    node.title = this.jsonNodeList[0].title;
    node.greeting = this.jsonNodeList[0].greeting;
    this.scaling.resetScaling(this.oldBalance);
    this.director.addNode(node);

    this.parseRecursive(node, this.jsonNodeList[0].childId);
    this.draw.drawTree();
  }

  parseRecursive(parent: Node, childId: number) {
    const jsonNode = this.getJsonNodeById(childId);
    let node: Node;

    if (jsonNode === null) {
      return;
    }
    switch ( jsonNode.type ) {
      case NodeType.MONOLOG:
        const monolog = new Monolog (parent, this.director);
        monolog.title = jsonNode.title;
        monolog.forwardText = jsonNode.forwardText;
        this.director.addNode(monolog);
        parent.child = monolog;
        node = monolog;
        break;
      case NodeType.DIALOG:
        const dialog = new Dialog (parent, this.director);
        dialog.title = jsonNode.title;
        dialog.question = jsonNode.question;
        dialog.answer = jsonNode.answer;
        this.director.addNode(dialog);
        parent.child = dialog;
        node = dialog;
        break;
      case NodeType.LINK:
        const link = new Link(parent, this.director);
        link.title = jsonNode.title;
        this.director.addNode(link);
        parent.child = link;
        return;
      case NodeType.DIVIDERNODE:
        const childIds: number[] = this.getJsonChildsId(jsonNode.id);
        const dividerNode = new DividerNode(parent, this.director);
        dividerNode.title = jsonNode.title;

        dividerNode.parent.child = dividerNode;
        dividerNode.parent.childId = dividerNode.id;
        this.director.nodeList.push(dividerNode);
        this.scaling.scaleNewNode(dividerNode);

        for ( const cId of childIds) {

          const dividerBranch = new DividerBranch(dividerNode, this.director);
          const jsonDividerBranch = this.getJsonNodeById(cId);
          dividerBranch.selectionText = jsonDividerBranch.selectionText;
          this.scaling.scaleNewNode(dividerBranch);
          dividerNode.addChild(dividerBranch);
          this.director.nodeList.push(dividerBranch);

          this.parseRecursive(dividerBranch, jsonDividerBranch.childId);
        }
        return;
    }
    this.parseRecursive(node, jsonNode.childId);
  }

  replaceBadCharacter(value: string): string {
    value = value.split("\\").join("");
    value = value.split('"').join('\\"');
    value = value.split("'").join('\\"');
    value = value.split("\n").join(" \\n");
    return value;
  }


  getJsonNodeById(id: number): any {

    let jsonNode = null;
    for ( const node of this.jsonNodeList ) {
      if ( node.id === id ) {
        jsonNode = node;
      }
    }
    return jsonNode;
  }

  getJsonChildsId(id: number): number[] {

    const childIds: number[] = [];
    for ( const node of this.jsonNodeList ) {
      if ( node.parentId === id) {
        childIds.push(node.id);
      }
    }
    return childIds;
  }


}
