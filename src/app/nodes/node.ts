import { ComponentDirectorService } from '../component-director.service';
import { NodeType } from 'src/assets/strings';



export abstract class Node {

    // JSON Values
    title: string;
    type: string;
    // Developer Values

    selected: boolean;
    top: number;
    height: number;

    left: number;
    width: number;

    baseLeft: number;
    baseWidth: number;

    marginLeft = 0;
    marginRight = 0;

    parent: Node = null;
    child: Node = null;

    connectorActive: boolean = false;


    constructor(parent: Node) {
        this.title = 'Titel';
        this.parent = parent;
        this.left = 0;
        this.top = 2;
    }



    getParent(): Node { return this.parent; }

}

export class BasicNode extends Node {

    director: ComponentDirectorService;

    constructor(parent: Node, director: ComponentDirectorService) {

        super(parent);
        this.type = NodeType.BASICNODE;
        this.width = 36;
        this.baseWidth = 36;
        this.director = director;
        this.height = 50;
    }


}



export class StartNode extends Node {

    // JSON Values
    greeting: string = 'Hallo ich bin Bot MultOS, wie kann ich dir zu Diensten sein?';

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
