import { SubKreis, SubKreisCenter } from './subkreis';
import { Phantom } from './phantom';

export abstract class Shape {

    selected: boolean;
    left: number;
    top: number;
    height: number;
    width: number;
    parent: Shape = null;
    previousSplitter: Kreis = null;
    phantomLeft: Phantom = null;
    phantomRight: Phantom = null;

    ///////
    name: string;


    abstract instanceOf(): string;

    constructor(parent: Shape) {
        this.parent = parent;
        this.left = 0;
        this.top = 2;
    }

    getParent(): Shape { return this.parent; }


    setPosition() {
        this.left = this.parent.left;
        this.top = this.parent.top + this.parent.height + 1;
    }
}


export class Rechteck extends Shape {
    constructor(parent: Shape) {
        super(parent);
        this.width = 40;
        this.height = 50;
    }

    instanceOf(): string {
        return 'rechteck';
    }


}

export class Kreis extends Shape {
    centerChilds: SubKreisCenter[] = [];
    constructor(parent: Shape) {
        super(parent);
        this.width = 80;
        this.height = 10;
    }

    addCenter(center: SubKreisCenter) {
        this.centerChilds.push(center);
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
        this.width = 40;
        this.height = 30;
        this.left = 60;
    }
    instanceOf(): string {
        return 'startShape';
    }
}
