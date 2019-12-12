import { Shape, Rechteck } from './shape';
import { ComponentDirectorService } from '../component-director.service';

export class Dialog extends Rechteck {

    title: string;
    question: string;
    answer: string;
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
