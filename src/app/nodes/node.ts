import { ComponentDirectorService } from '../component-director.service';
import { NodeType, PlaceHolder } from 'src/assets/strings';



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
