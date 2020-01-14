import { Node, BasicNode } from "./node";
import { ComponentDirectorService } from "../services/component-director.service";
import { NodeType, NodeSizes } from "../../assets/values";

export class StartNode extends BasicNode {

    // JSON Values
    greeting: string;

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
    this.width = NodeSizes.BASICNODEWIDTH * 2;
    this.baseWidth = NodeSizes.BASICNODEWIDTH * 2;
    this.height = NodeSizes.DIVIDERNODEHEIGHT;
  }
}

export class DividerBranch extends DividerNode {
  // JSON Values
  selectionText;

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
}

export class Menu extends BasicNode {
  height = NodeSizes.MENUHEIGHT;
  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent, director);
    this.type = NodeType.MENU;
  }
}

export class Dialog extends BasicNode {
  // JSON Values
  question: string;
  answer: string;

  // Developer Values

  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent, director);
    this.type = NodeType.DIALOG;
    this.height = NodeSizes.DIALOGHEIGHT;
  }
}

export class Monolog extends BasicNode {
  // JSON Values
  forwardText: string;

  // Developer Values

  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent, director);
    this.type = NodeType.MONOLOG;
    this.height = NodeSizes.MONOLOGHEIGHT;
  }
}

export class Link extends BasicNode {
  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent, director);
    this.type = NodeType.LINK;
    this.height = NodeSizes.LINKHEIGHT;
  }
}