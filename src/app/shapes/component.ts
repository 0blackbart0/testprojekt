import { Shape, Rechteck } from './shape';

export class Dialog extends Rechteck {

    title: string;
    question: string;
    answer: string;
    constructor(parent: Shape) {
        super(parent);
        this.title = 'title';
        this.question = 'question';
        this.answer = 'answer';

        this.height = 70;
    }
    instanceOf(): string {
        return 'dialog';
    }

}
