import { Shape, Kreis } from './shape';
import { Phantom } from './phantom';

export abstract class SubKreis extends Kreis {

    constructor(parent: Shape) {
        super(parent);
        this.width = 15;
        this.height = 5;
    }
    instanceOf(): string {
        return 'subKreis';
    }
    abstract addPhantom();
}

export class SubKreisLeft extends SubKreis {

    constructor(parent: Shape) {
        super(parent);
        this.left = parent.left;
    }
    addPhantom()  {
        const phantom = new Phantom(this);
        this.phantoms.push(phantom);
        this.left -= this.width;
    }
    instanceOf(): string {
        return 'subKreisLeft';
    }
    setPosition() {
        this.left = this.parent.left - (this.phantoms.length * this.width);
        this.top = this.parent.top;
        let numberOfPhantoms: number = this.phantoms.length;
        for (const phantom of this.phantoms) {
            phantom.left = this.left + (numberOfPhantoms * this.width);
            numberOfPhantoms--;
        }
    }
}

export class SubKreisRight extends SubKreis {
    addPhantom()  {
        const phantom = new Phantom(this);
        this.phantoms.push(phantom);
        this.left += this.width;
    }
    instanceOf(): string {
        return 'subKreisRight';
    }
    setPosition() {
        this.left = this.parent.left + this.width + (this.phantoms.length * this.width);
        this.top = this.parent.top;
        let numberOfPhantoms: number = this.phantoms.length;
        for (const phantom of this.phantoms) {
            phantom.left = this.left - (numberOfPhantoms * this.width);
            numberOfPhantoms--;
        }
    }
}

