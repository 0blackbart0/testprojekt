import { ComponentDirectorService } from '../component-director.service';
import { DividerNode, Node } from './node';

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

   getRightBranch(): DividerBranch {
    const index = (this.parent as DividerNode).childs.indexOf(this);
    const length = (this.parent as DividerNode).childs.length;
    if ( index < length - 1) {
        return ((this.parent as DividerNode).childs[index + 1] as DividerBranch);
    } else {
        return null;
    }
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
