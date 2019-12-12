import { Shape, Kreis } from './shape';
import { Phantom } from './phantom';
import { ComponentDirectorService } from '../component-director.service';

export abstract class SubKreis extends Kreis {

    injected = false;
    selectionText = 'Auswahltext';
    constructor(parent: Shape, director: ComponentDirectorService) {
        super(parent, director);
        this.width = 36;
        this.height = 15;
        this.setPhantom();
    }

    getInfoString(): string {

        let resultString: string = '';
        this.childs = this.director.getChildFrom(this);

        if (this.childs.length < 1) {
            return '{"name":"branch","childs":null}';
        }

        for (this.shape of this.childs) {

            const childStringOfShape = this.shape.getInfoString();
            resultString = resultString.concat(childStringOfShape);
        }

        return '{"name":"branch","childs":[' + resultString + ']}';
    }


    instanceOf(): string {
        return 'subKreis';
    }
    setPhantom() {
        this.phantomLeft = new Phantom(this);
        this.phantomRight = new Phantom(this);
    }

    setInjected() {
        this.injected = true;
    }

    getTotalCenterWidth(element: SubKreisCenter): number {
        let totalCenterWidth = 0;
        for (const center of (element.parent as Kreis).centerChilds) {
            if (center === element ) {
                break;
            } else {
                totalCenterWidth += center.width;
                totalCenterWidth += center.phantomLeft.width;
                totalCenterWidth += center.phantomRight.width;
            }
        }
        return totalCenterWidth;
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

export class SubKreisCenter extends SubKreis {
    instanceOf(): string {
        return 'subKreisCenter';
    }

    setPosition() {
        const totalCenterWidth = this.getTotalCenterWidth(this);
        this.left = this.parent.left + this.width + this.phantomLeft.width + totalCenterWidth;
        this.top = this.parent.top;
        this.phantomLeft.left = this.left - this.phantomLeft.width;
        this.phantomLeft.top = this.top;
        this.phantomRight.left = this.left + this.width;
        this.phantomRight.top = this.top;
    }




    setValuesTo(subKreis: SubKreis) {
        this.height = subKreis.height;
        this.width = subKreis.width;
        this.left = subKreis.left;
        this.top = subKreis.top;
        this.phantomLeft.height = subKreis.phantomLeft.height;
        this.phantomLeft.width = subKreis.phantomLeft.width;
        this.phantomRight.height = subKreis.phantomLeft.height;
        this.phantomLeft.left = subKreis.phantomLeft.left;
        this.phantomLeft.top = subKreis.phantomLeft.top;
    }
}

export class SubKreisRight extends SubKreis {

    instanceOf(): string {
        return 'subKreisRight';
    }
    setPosition() {

        let totalCenterWidth = 0;
        for (const center of (this.parent as Kreis).centerChilds) {
            totalCenterWidth += center.width;
            totalCenterWidth += center.phantomLeft.width;
            totalCenterWidth += center.phantomRight.width;
        }
        this.left = this.parent.left + this.width + this.phantomLeft.width + totalCenterWidth;
        this.top = this.parent.top;
        this.phantomLeft.left = this.left - this.phantomLeft.width;
        this.phantomLeft.top = this.top;
    }
}

