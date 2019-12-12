import { SubKreis, SubKreisCenter } from './subkreis';
import { Phantom } from './phantom';
import { ComponentDirectorService } from '../component-director.service';
import { Direct } from 'protractor/built/driverProviders';
import { CommonModule } from '@angular/common';

export abstract class Shape {

    title: string;

    selected: boolean;
    left: number;
    top: number;
    height: number;
    width: number;
    parent: Shape = null;
    previousSplitter: Kreis = null;
    phantomLeft: Phantom = null;
    phantomRight: Phantom = null;
    connectorActive: boolean = false;

    ///////
    name: string;
    abstract getInfoString(): string;


    abstract instanceOf(): string;

    constructor(parent: Shape) {
        this.title = 'Titel';
        this.parent = parent;
        this.left = 0;
        this.top = 2;
    }

    getParent(): Shape { return this.parent; }


    setPosition() {
        this.left = this.parent.left;
        this.top = this.parent.top + this.parent.height;
    }
}

// TODO: einrückungen, new Line etc

export class Rechteck extends Shape {

    shape: Shape = null;
    childs: Shape[];
    director: ComponentDirectorService;

    constructor(parent: Shape, director: ComponentDirectorService) {

        super(parent);
        this.width = 36;
        this.director = director;
        this.width = 30;
        this.height = 50;
    }

    instanceOf(): string {
        return 'rechteck';
    }

    getInfoString(): string {

        this.childs = this.director.getChildFrom(this);

        let resultString: string = '';

        if (this.childs.length < 1) {
            return '{"name":"rechteck", "childs":null}';
        }

        for (this.shape of this.childs) {

            const childStringOfShape = this.shape.getInfoString();
            resultString = resultString.concat(childStringOfShape);
        }

        return '{"name":"rechteck", "childs":[' + resultString + ']}';
    }

}

export class Kreis extends Shape {

    childs: Shape[] = [];
    shape: Shape = null;
    director: ComponentDirectorService;


    centerChilds: SubKreisCenter[] = [];
    constructor(parent: Shape, director: ComponentDirectorService) {
        super(parent);
        this.width = 36 * 2;
        this.height = 15;
        this.director = director;
    }

    addCenter(center: SubKreisCenter) {
        this.centerChilds.push(center);
    }
    setPosition() {
        this.left = this.parent.left - (this.width / 2) + (this.parent.width / 2);
        this.top = this.parent.top + this.parent.height;
    }

    instanceOf(): string {
        return 'kreis';
    }

    getInfoString(): string {

        let resultString: string = '';
        this.childs = this.director.getChildFrom(this);

        if (this.childs.length < 1) {
            return '{"name":"divider","childs":null}';
        }

        for (let i = 0; i < this.childs.length; i++) {

            const childStringOfShape = this.childs[i].getInfoString();

            if (i === 0) {
                resultString = resultString.concat(childStringOfShape);
            } else {
                resultString = resultString.concat(',', childStringOfShape);
            }
        }

        return '{"name":"divider","childs":[' + resultString + ']}';
    }
}

export class StartShape extends Shape {

    question: string;
    childs: Shape[] = [];
    shape: Shape = null;
    greeting: string = 'Hallo ich bin Bot MultOS, wie kann ich dir zu Diensten sein?';
    director: ComponentDirectorService;


    getInfoString(): string {

        this.childs = this.director.getChildFrom(this);

        let resultString: string = '';

        if (this.childs.length < 1) {
            return '{"name": "startshape","childs":null}';
        }

        for (this.shape of this.childs) {

            const childStringOfShape = this.shape.getInfoString();
            resultString = resultString.concat(childStringOfShape);
        }
        return '{"name": "startshape","childs":[' + resultString + ']}';
    }


    constructor(director: ComponentDirectorService) {
        super(null);
        this.director = director;
        this.width = 36;
        this.height = 30;
        this.left = 60;
    }

    instanceOf(): string {
        return 'startShape';
    }
}
