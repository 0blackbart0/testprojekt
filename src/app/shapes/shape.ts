import { SubKreis } from './subkreis';
import { Phantom } from './phantom';

export abstract class Shape {

    selected: boolean;
    left: number;
    top: number;
    height: number;
    width: number;
    parent: Shape = null;
    previousSplitter: Kreis = null;
    phantoms: Phantom[];

    abstract instanceOf(): string;

    constructor(parent: Shape) {
        this.parent = parent;
        this.left = 0;
        this.top = 2;
        this.phantoms = [];
    }

    getParent(): Shape { return this.parent; }


    setPosition() {
        this.left = this.parent.left - (this.width / 2) + (this.parent.width / 2);
        this.top = this.parent.top + this.parent.height + 1;
    }
}


export class Rechteck extends Shape {
    constructor(parent: Shape) {
        super(parent);
        this.width = 10;
        this.height = 10;
    }

    instanceOf(): string {
        return 'rechteck';
    }
}

export class Kreis extends Shape {

    subkreise: Shape[] = [];

    constructor(parent: Shape) {
        super(parent);
        this.width = 30;
        this.height = 5;
    }

    addSubkreis(subkreis: Shape) {
        this.subkreise.push(subkreis);
    }
    setPosition() {
        this.left = this.parent.left - (this.width / 2) + (this.parent.width / 2);
        this.top = this.parent.top + this.parent.height + 1;
    }

    instanceOf(): string {
        return 'kreis';
    }
}



export class StartShape extends Shape {
    constructor() {
        super(null);
        this.width = 10;
        this.height = 10;
        this.left = 60;
    }
    instanceOf(): string {
        return 'startShape';
    }
}
