import { Shape, Rechteck } from './shape';
import { ComponentDirectorService } from '../component-director.service';

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

}
