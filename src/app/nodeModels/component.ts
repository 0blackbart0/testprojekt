import { Node, BasicNode } from "./node";
import { ComponentDirectorService } from "../services/component-director.service";
import { NodeType, NodeSizes } from "../../assets/values";

export class StartNode extends BasicNode {

    // JSON Values
    greeting: string = '';

    // Developer Values
    childs: Node[] = [];
    Node: Node = null;
    director: ComponentDirectorService;


    constructor(director: ComponentDirectorService) {
        super(null, director);
        this.type = NodeType.STARTNODE;
        this.height = NodeSizes.STARTNODEHEIGHT;
        this.baseWidth = NodeSizes.BASICNODEWIDTH;
        this.left = NodeSizes.STARTNODELEFT;
    }

    getJsonString() {
      if (this.child === null) {
        // tslint:disable-next-line: max-line-length
        return '{"nodeType": "StartNode", "title":"' + this.title + '", "greeting":"' + this.greeting + '", "child":null}';
      } else {
        // tslint:disable-next-line: max-line-length
        return '{"nodeType": "StartNode", "title":"' + this.title + '", "greeting":"' + this.greeting + '", "child":' + this.child.getJsonString() + '}';
      }
    }

}

export class DividerNode extends Node {
  childs: Node[] = [];
  Node: Node = null;
  director: ComponentDirectorService;

  connectorFem = 0;

  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent);
    this.type = NodeType.DIVIDERNODE;
    this.director = director;
    this.width = 0;
    this.baseWidth = 0;
   // this.width = NodeSizes.BASICNODEWIDTH * 2;
   // this.baseWidth = NodeSizes.BASICNODEWIDTH * 2;
    this.height = NodeSizes.DIVIDERNODEHEIGHT;
  }

  addChild(child: DividerBranch) {
    this.width += child.width;
    this.baseWidth += child.baseWidth;
    this.childs.push(child);
  }
  getJsonString() {

    let mergedString: string = '';

    for (let i = 0; i < this.childs.length; i++) {

      const childString: string = this.childs[i].getJsonString();

      if (i === this.childs.length - 1) {
        mergedString = mergedString.concat(childString);
      } else {
        mergedString = mergedString.concat(childString, ', ');
      }
    }

    return '{"nodeType": "Divider", "childs":[' + mergedString + ']}';

  }

}

export class DividerBranch extends DividerNode {
  // JSON Values
  selectionText: string = '';

  // Developer Values

  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent, director);
    this.type = NodeType.DIVIDERBRANCH;
    this.width = NodeSizes.BASICNODEWIDTH;
    this.baseWidth = NodeSizes.BASICNODEWIDTH;
    this.height = NodeSizes.DIVIDERNODEHEIGHT;
  }

  getLeftBranch(): DividerBranch {
    const parent = this.parent as DividerNode;
    const index = parent.childs.indexOf(this);
    if (index === 0) {
      return null;
    } else {
      return parent.childs[index - 1] as DividerBranch;
    }
  }

  getJsonString() {

    if (this.child === null) {
      return '{"nodeType": "DividerBranch", "selectionText":"' + this.selectionText + '", "child":null}';
    } else {
      return '{"nodeType": "DividerBranch", "selectionText":"' + this.selectionText + '", "child":' + this.child.getJsonString() + '}';
    }
  }
}

export class Menu extends BasicNode {
  height = NodeSizes.MENUHEIGHT;
  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent, director);
    this.type = NodeType.MENU;
  }

  getJsonString() {
    return null;
  }

}

export class Dialog extends BasicNode {
  // JSON Values
  question: string = '';
  answer: string = '';

  // Developer Values

  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent, director);
    this.type = NodeType.DIALOG;
    this.height = NodeSizes.DIALOGHEIGHT;
  }

  getJsonString() {
    if (this.child === null) {
      // tslint:disable-next-line: max-line-length
      return '{"nodeType": "DialogNode", "title":"' + this.title + '", "question":"' + this.question + '", "answer":"' + this.answer + '","child":null}';
    } else {
      // tslint:disable-next-line: max-line-length
      return '{"nodeType": "DialogNode", "title":"' + this.title + '", "question":"' + this.question + '", "answer":"' + this.answer + '","child":' + this.child.getJsonString() + '}';
    }

  }
}

export class Monolog extends BasicNode {
  // JSON Values
  forwardText: string = '';

  // Developer Values

  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent, director);
    this.type = NodeType.MONOLOG;
    this.height = NodeSizes.MONOLOGHEIGHT;
  }

  getJsonString() {
    if (this.child === null) {
      // tslint:disable-next-line: max-line-length
      return '{"nodeType": "Monolog", "title":"' + this.title + '", "forwardText":"' + this.forwardText + '", "child":null}';
    } else {
      // tslint:disable-next-line: max-line-length
      return '{"nodeType": "Monolog", "title":"' + this.title + '", "forwardText":"' + this.forwardText + '", "child":' + this.child.getJsonString() + '}';
    }
  }

}

export class Link extends BasicNode {
  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent, director);
    this.type = NodeType.LINK;
    this.height = NodeSizes.LINKHEIGHT;
  }

  getJsonString() {
    return '{"nodeType": "Link", "title":"' + this.title + '", "child":null}'; // hier als child evtl titel des neuen Baums
  }
}
