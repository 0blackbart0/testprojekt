import { Shape, Rechteck } from './shape';

export class Dialog extends Rechteck {

    title: string;
    question: string;
    answer: string;
    constructor(parent: Shape) {
        super(parent);
        this.question = 'Frage';
        this.answer = 'Antwort';

        this.height = 55;
    }
    instanceOf(): string {
        return 'dialog';
    }

}
