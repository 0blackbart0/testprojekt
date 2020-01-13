import { Node, BasicNode } from './node';
import { ComponentDirectorService } from '../component-director.service';
import { NodeType} from '../../assets/strings';

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
 selectionText = 'Auswahltext';

 // Developer Values


 constructor(parent: Node, director: ComponentDirectorService) {
     super(parent, director);
     this.type = 'dividerBranch';
     this.width = 36;
     this.height = 15;
     this.baseWidth = 36;
 }

getLeftBranch(): DividerBranch {
    const parent = this.parent as DividerNode;
    const index = parent.childs.indexOf(this);
    if ( index === 0) {
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

        this.type = 'dialog';

        this.question = 'Frage';
        this.answer = 'Antwort';

        this.height = 55;
    }


}

export class Monolog extends BasicNode {

    // JSON Values
    forwardText: string;

    // Developer Values

    constructor(parent: Node, director: ComponentDirectorService) {
        super(parent, director);

        this.type = 'monolog';

        this.forwardText = 'Ich leite sie gerne weiter';
        this.height = 35;
    }


}

export class Link extends BasicNode {
    constructor(parent: Node, director: ComponentDirectorService) {
        super(parent, director);

        this.type = 'link';

        this.height = 20;
        this.title = 'Verlinkung';
    }

}
