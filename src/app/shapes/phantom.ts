import { SubKreis, SubKreisLeft, SubKreisRight } from './subkreis';

export class Phantom {

    left: number;
    top: number;
    height = 15;
    width = 0;

    parent: SubKreis;

    constructor(parent: SubKreis) {
        this.parent = parent;
    }
    setPosition() {
        this.top = this.parent.top;
        this.left = this.parent.left;
    }
}
