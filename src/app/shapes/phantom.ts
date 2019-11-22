import { SubKreis, SubKreisLeft } from './subkreis';

export class Phantom {
    left: number;
    top: number;
    height: number;
    width: number;

    parent: SubKreis;

    constructor(parent: SubKreis) {
        this.top = parent.top;
        this.left = parent.left;
        this.height = parent.height;
        this.width = parent.width ;
        console.log(parent.phantoms.length);
    }


}
