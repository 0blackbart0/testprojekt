import { Shape, Rechteck } from './shape';
import { ComponentDirectorService } from '../component-director.service';

export class Dialog extends Rechteck {

    // JSON Values
    question: string;
    answer: string;

    // Developer Values
    director: ComponentDirectorService;

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
