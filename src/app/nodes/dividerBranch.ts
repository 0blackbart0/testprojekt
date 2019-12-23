import { ComponentDirectorService } from '../component-director.service';
import { DividerNode, Node } from './node';

export abstract class DividerBranch extends DividerNode {

    injected = false;
    selectionText = 'Auswahltext';
    constructor(parent: Node, director: ComponentDirectorService) {
        super(parent, director);
        this.type = 'dividerBranch';
        this.width = 36;
        this.height = 15;
    }


}

export class DividerBranchLeft extends DividerBranch {

    constructor(parent: Node, director: ComponentDirectorService) {
        super(parent, director);
        this.type = 'dividerBranchLeft';
    }
}

export class DividerBranchCenter extends DividerBranch {
    constructor(parent: Node, director: ComponentDirectorService) {
        super(parent, director);
        this.type = 'dividerBranchCenter';
    }
}

export class DividerBranchRight extends DividerBranch {
    constructor(parent: Node, director: ComponentDirectorService) {
        super(parent, director);
        this.type = 'dividerBranchRight';
    }
}

