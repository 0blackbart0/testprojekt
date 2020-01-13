import { Node, BasicNode } from "./node";
import { ComponentDirectorService } from "../services/component-director.service";
import { NodeType } from "../../assets/strings";

export class StartNode extends Node {

    // JSON Values
    greeting: string;

    // Developer Values
    childs: Node[] = [];
    Node: Node = null;
    director: ComponentDirectorService;


    constructor(director: ComponentDirectorService) {
        super(null);
        this.type = NodeType.STARTNODE;
        this.director = director;
        this.width = 36;
        this.height = 30;
        this.left = 60;

        this.baseWidth = 36;
        this.baseLeft = 60;
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
    this.width = 36 * 2;
    this.baseWidth = 36 * 2;
    this.height = 15;
  }
}

export class DividerBranch extends DividerNode {
  // JSON Values
  selectionText;

  // Developer Values

  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent, director);
    this.type = NodeType.DIVIDERBRANCH;
    this.width = 36;
    this.height = 15;
    this.baseWidth = 36;
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
  height = 13;
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
    this.height = 55;
  }
}

export class Monolog extends BasicNode {
  // JSON Values
  forwardText: string;

  // Developer Values

  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent, director);
    this.type = NodeType.MONOLOG;
    this.height = 35;
  }
}

export class Link extends BasicNode {
  constructor(parent: Node, director: ComponentDirectorService) {
    super(parent, director);
    this.type = NodeType.LINK;
    this.height = 20;
  }
}
