import { ComponentDirectorService } from '../component-director.service';
import { DividerBranchCenter, DividerBranchLeft } from './dividerBranch';
import { NodeType } from 'src/assets/strings';
import { ScalingService } from '../scaling.service';
import { DividerBranchLeftComponent } from '../divider-branch-left/divider-branch-left.component';


export abstract class Node {

    // JSON Values
    title: string;
    type: string;
    // Developer Values

    selected: boolean;
    left: number;
    top: number;
    height: number;
    width: number;

    parent: Node = null;
    child: Node = null

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

    Node: Node = null;
    childs: Node[];
    director: ComponentDirectorService;

    constructor(parent: Node, director: ComponentDirectorService) {

        super(parent);
        this.type = 'basicNode';
        this.width = 36;
        this.director = director;
        this.height = 50;
    }


}

export class DividerNode extends Node {

    childs: Node[] = [];
    Node: Node = null;
    director: ComponentDirectorService;



    constructor(parent: Node, director: ComponentDirectorService) {
        super(parent);
        this.type = 'dividerNode';
        this.director = director;
        this.width = 36 * 2;
        this.height = 15;
    }

    addCenter(center: DividerBranchCenter) {
        this.childs.splice(1 , 0, center);
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
    }
}
