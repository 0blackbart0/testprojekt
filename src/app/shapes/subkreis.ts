import { Shape, Kreis } from './shape';

export abstract class SubKreis extends Kreis {

    constructor(parent: Shape) {
        super(parent);
        this.width = 15;
        this.height = 5;
    }
    instanceOf(): string {
        return 'subKreis';
    }
}

export class SubKreisLeft extends SubKreis {
    instanceOf(): string {
        return 'subKreisLeft';
    }
    setPosition() {
        this.left = this.parent.left;
        this.top = this.parent.top;
    }
}

export class SubKreisRight extends SubKreis {
    instanceOf(): string {
        return 'subKreisRight';
    }
    setPosition() {
        this.left = this.parent.left + this.parent.width / 2;
        this.top = this.parent.top;
    }
}
