import { Shape, Rechteck } from './shape';
import { ComponentDirectorService } from '../component-director.service';

export class Menu extends Rechteck {

    height = 13;
    typeOfMenu(): string {
        return this.parent.instanceOf();
    }

    instanceOf(): string {
        return 'menu';
    }

    getInfoString(): string {

        return null;
    }

}

export class Dialog extends Rechteck {

    // JSON Values
    question: string;
    answer: string;

    // Developer Values

    constructor(parent: Shape, director: ComponentDirectorService) {
        super(parent, director);
        this.question = 'Frage';
        this.answer = 'Antwort';

        this.height = 55;
    }
    instanceOf(): string {
        return 'dialog';
    }

    getInfoString(): string {

        this.childs = this.director.getChildFrom(this);

        let resultString: string = '';

        if (this.childs.length < 1) {
            // tslint:disable-next-line: max-line-length
            return '{"name":"dialog", "title":"' + this.title + '", "question":"' + this.question + '", "answer":"' + this.answer + '", "childs":null}';
        }

        for (this.shape of this.childs) {

            const childStringOfShape = this.shape.getInfoString();
            if (childStringOfShape === null) {
                // tslint:disable-next-line: max-line-length
                return '{"name":"dialog", "title":"' + this.title + '", "question":"' + this.question + '", "answer":"' + this.answer + '", "childs":null}';

            }
            resultString = resultString.concat(childStringOfShape);
        }


        // tslint:disable-next-line: max-line-length
        return '{"name":"dialog", "title":"' + this.title + '", "question":"' + this.question + '", "answer":"' + this.answer + '", "childs":[' + resultString + ']}';

    }

}

export class Monolog extends Rechteck {

    // JSON Values
    forwardText: string;

    // Developer Values

    constructor(parent: Shape, director: ComponentDirectorService) {
        super(parent, director);
        this.forwardText = 'Ich leite sie gerne weiter';
        this.height = 35;
    }
    instanceOf(): string {
        return 'monolog';
    }

    getInfoString(): string {

        this.childs = this.director.getChildFrom(this);

        let resultString: string = '';

        if (this.childs.length < 1) {
            return '{"name":"monolog", "title":"' + this.title + '", "text":"' + this.forwardText + '", "childs":null}';
        }

        for (this.shape of this.childs) {

            const childStringOfShape = this.shape.getInfoString();
            if (childStringOfShape === null) {
                return '{"name":"monolog", "title":"' + this.title + '", "text":"' + this.forwardText + '", "childs":null}';
            }
            resultString = resultString.concat(childStringOfShape);
        }

        return '{"name":"monolog", "title":"' + this.title + '", "text":"' + this.forwardText + '", "childs":[' + resultString + ']}';
    }

}

export class Link extends Rechteck {
    constructor(parent: Shape, director: ComponentDirectorService) {
        super(parent, director);
        this.height = 20;
        this.title = 'Verlinkung';
    }

    instanceOf(): string {
        return 'link';
    }


    //TODO
    getInfoString(): string {
        return '{"name":"link","title":"' + this.title + '"}';
    }
}
