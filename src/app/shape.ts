export abstract class Shape {
    left: number;
    top: number;

    parent: Shape;
    abstract instanceOf(): string;
}

export class Rechteck extends Shape {
    instanceOf(): string {
        return 'rechteck';
    }
    constructor() {
        super();
    }
}

export class Kreis extends Shape {
    instanceOf(): string {
        return 'kreis';
    }
}

export class Dreieck extends Shape {
    instanceOf(): string {
        return 'dreieck';
    }
}
