import { ComponentDirectorService } from '../component-director.service';
import { DividerNode, Node } from './node';

export class DividerBranch extends DividerNode {

    injected = false;
    selectionText = 'Auswahltext';
    constructor(parent: Node, director: ComponentDirectorService) {
        super(parent, director);
        this.type = 'dividerBranch';
        this.width = 36;
        this.height = 15;
    }


}
