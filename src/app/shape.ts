export abstract class Shape {

    selected: boolean;
    left: number;
    top: number;

    parent: Shape = null;
    previousSplitter: Kreis = null;
    ancestorList: Shape[] = [];
    abstract instanceOf(): string;

    constructor() {
        this.left = 0;
        this.top = 2;
    }

    getAncestors() {

        let tmp: Shape = null;
        while (tmp.instanceOf() !== 'startShape') {
            tmp = tmp.getParent();
            this.ancestorList.push(tmp);
        }
    }


    getPreviousSplitter(): Shape {
        let tmp: Shape = null;

        while (tmp.instanceOf() !== 'kreis' || tmp !== null) {
            tmp = tmp.getParent();
        }

        return tmp;
    }

    setParent(parent: Shape) {
        this.parent = parent;
    }
    getParent(): Shape { return this.parent; }

    setPosition() {
        console.log("left ist: " + this.parent.left);
        this.left = this.parent.left;
        this.top = this.parent.top + 10;
    }
}

export class Rechteck extends Shape {
    instanceOf(): string {
        return 'rechteck';
    }
}

export class Kreis extends Shape {
    instanceOf(): string {
        return 'kreis';
    }


}

export class StartShape extends Shape {
    instanceOf(): string {
        return 'startShape';
    }
}
