import { Shape, Kreis } from './shape';
import { Phantom } from './phantom';

export abstract class SubKreis extends Kreis {

    constructor(parent: Shape) {
        super(parent);
        this.width = 30;
        this.height = 10;
        this.setPhantom();
    }
    instanceOf(): string {
        return 'subKreis';
    }
    setPhantom() {
        this.phantomLeft = new Phantom(this);
        this.phantomRight = new Phantom(this);
    }
}

export class SubKreisLeft extends SubKreis {

    instanceOf(): string {
        return 'subKreisLeft';
    }
    setPosition() {
        this.left = this.parent.left - this.phantomRight.width;
        this.top = this.parent.top;
        this.phantomRight.left = this.left + this.width;
        this.phantomRight.top = this.top;
    }
}

export class SubKreisRight extends SubKreis {

    instanceOf(): string {
        return 'subKreisRight';
    }
    setPosition() {
        this.left = this.parent.left + this.width + this.phantomLeft.width;
        this.top = this.parent.top;
        this.phantomLeft.left = this.left - this.phantomLeft.width;
        this.phantomLeft.top = this.top;
    }
}

