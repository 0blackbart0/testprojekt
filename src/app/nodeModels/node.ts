import { ComponentDirectorService } from '../services/component-director.service';
import { NodeType, NodeSizes } from 'src/assets/values';



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
    }


    deselectConnectorActive() {
        this.connectorActive = false;
      }
    selectConnectorActive() {
        this.connectorActive = true;
    }

    getParent(): Node { return this.parent; }

}

export class BasicNode extends Node {

    director: ComponentDirectorService;

    constructor(parent: Node, director: ComponentDirectorService) {

        super(parent);
        this.type = NodeType.BASICNODE;
        this.width = NodeSizes.BASICNODEWIDTH;
        this.baseWidth = NodeSizes.BASICNODEWIDTH;
        this.director = director;
    }


}
