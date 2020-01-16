import { Injectable } from '@angular/core';
import { NodeType } from 'src/assets/values';
import { StartNode, Monolog, Dialog, DividerBranch, Link, DividerNode } from '../nodeModels/component';
import { Node } from '../nodeModels/node';
import { ComponentDirectorService } from './component-director.service';
import { DrawService } from './draw.service';
import { ScalingService } from './scaling.service';
import { example1 } from '../../assets/dialog_lists/example_1';

@Injectable({
  providedIn: 'root'
})
export class JsonNodeListService {

  jsonNodeList: any[] = [];

  constructor(private director: ComponentDirectorService, private draw: DrawService, private scale: ScalingService) { }

  loadTree() {
    this.director.clearNodeList();
    this.scale.resetScaling();
    this.jsonNodeList.splice(0, this.jsonNodeList.length);
    this.jsonNodeList = example1.nodeList;
    this.nodeCrawler();
  }
  
  stringify() {
    this.scale.resetScaling();
    this.jsonNodeList.splice(0, this.jsonNodeList.length);

    let json;
    for (const node of this.director.nodeList) {
      if (node.type === NodeType.STARTNODE) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "title":"' + node.title +
      '", "childId":"' + node.childId + '", "parentId":"' + node.parentId + '", "greeting":"' + (node as StartNode).greeting + '"}';
      } else if (node.type === NodeType.MONOLOG) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "title":"' + node.title +
      '", "childId":"' + node.childId + '", "parentId":"' + node.parentId + '", "forwardText":"' + (node as Monolog).forwardText + '"}';
      } else if (node.type === NodeType.DIALOG) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "title":"' + node.title +
      '", "childId":"' + node.childId + '", "parentId":"' + node.parentId + '", "question":"' +
      (node as Dialog).question + '", "answer":"' + (node as Dialog).answer + '"}';
      } else if (node.type === NodeType.DIVIDERNODE) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "title":"' + node.title + '", "parentId":"' + node.parentId + '"}';
      } else if (node.type === NodeType.DIVIDERBRANCH) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "selectiontext":"' + (node as DividerBranch).selectionText +
        '", "parentId":"' + node.parentId + '", "childId":"' + node.childId + '"}';
      } else if (node.type === NodeType.LINK) {
        json = '{"id":"' + node.id + '", "type":"' + node.type + '", "parentId":"' + node.parentId + '"}';
      }

      if ( node.type !== NodeType.MENU) {
        const jsobj = JSON.parse(json);
        this.jsonNodeList.push(jsobj);
      }
    }

    console.log(JSON.stringify(this.jsonNodeList));
  }

  nodeCrawler() {
    const node = new StartNode(this.director);
    node.title = this.jsonNodeList[0].title;
    node.greeting = this.jsonNodeList[0].greeting;
    this.director.addNode(node);

    this.nodeCrawlerRecursive(node, this.jsonNodeList[0].childId);
    this.draw.drawTree();

  }

  nodeCrawlerRecursive(parent: Node, childId: number) {
    console.log( "id = " + childId);
    const jsonNode = this.getJsonNodeById(childId);
    let node: Node;

    if (jsonNode === null) {
      console.log("abbruch bei childid = " + childId);
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

        for ( const cId of childIds) {

          const dividerBranch = new DividerBranch(dividerNode, this.director);
          const jsonDividerBranch = this.getJsonNodeById(cId);
          console.log("dividerBranch: = " + jsonDividerBranch.id);
          dividerBranch.selectionText = jsonDividerBranch.selectionText;
          // dividerNode.childs.push(dividerBranch);
          dividerNode.addChild(dividerBranch);
          this.director.nodeList.push(dividerBranch);

          this.nodeCrawlerRecursive(dividerBranch, jsonDividerBranch.childId);
        }
        
        return;
    }
    this.nodeCrawlerRecursive(node, jsonNode.childId);
  }

  kjshfd() {
    let test = new Array;
    test.push(example1);
    console.log(test);
  }

  save() {
 //   const fs = require('fs');

/*
// specify the path to the file, and create a buffer with characters we want to write
    let path = '../assets/dialog_lists/test.json';
    let buffer = new Buffer('Those who wish to follow me\nI welcome with my hands\nAnd the red sun sinks at last');

// open the file in writing mode, adding a callback function where we do the actual writing
    fs.open(path, 'w', function(err, fd) {
    if (err) {
        throw 'could not open file: ' + err;
    }

    // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
        if (err) throw 'error writing file: ' + err;
        fs.close(fd, function() {
            console.log('wrote the file successfully');
        });
    });
});

*/
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
