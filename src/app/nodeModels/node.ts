import { ComponentDirectorService } from '../services/component-director.service';
import { NodeType, NodeSizes } from 'src/assets/values';



export abstract class Node {

    static counterId: number = 0;

    // JSON Values
    title: string = '';
    type: string;
    // Developer Values

    id: number;
    childId: number;
    parentId: number;


    selected: boolean;
    top: number;
    height: number;

    left: number;
    width: number;

    baseWidth: number;

    marginLeft = NodeSizes.BASEMARGIN;
    marginRight = NodeSizes.BASEMARGIN;

    parent: Node = null;
    child: Node = null;

    connectorActive: boolean = false;


    constructor(parent: Node) {
        this.parent = parent;
        this.left = NodeSizes.BASELEFT;
        this.top = NodeSizes.STARTNODETOP;

        if ( this.parent !== null ) {
            this.parentId = parent.id;
        } else {
            this.parentId = null;
        }
        this.id = Node.counterId++;
    }


    deselectConnectorActive() {
        this.connectorActive = false;
      }
    selectConnectorActive() {
        this.connectorActive = true;
    }

    getParent(): Node { return this.parent; }
    abstract getJsonString();

}

export abstract class BasicNode extends Node {

    director: ComponentDirectorService;

    constructor(parent: Node, director: ComponentDirectorService) {

        super(parent);
        this.type = NodeType.BASICNODE;
        this.width = NodeSizes.BASICNODEWIDTH;
        this.baseWidth = NodeSizes.BASICNODEWIDTH;
        this.director = director;
    }

    abstract getJsonString();

}
