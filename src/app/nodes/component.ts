import { Node, BasicNode } from './node';
import { ComponentDirectorService } from '../component-director.service';

export class Menu extends BasicNode {

    height = 13;
    constructor(parent: Node, director: ComponentDirectorService) {
        super(parent, director);

        this.type = 'menu';
    }

}

export class Dialog extends BasicNode {

    // JSON Values
    question: string;
    answer: string;

    // Developer Values

    constructor(parent: Node, director: ComponentDirectorService) {
        super(parent, director);

        this.type = 'dialog';

        this.question = 'Frage';
        this.answer = 'Antwort';

        this.height = 55;
    }


}

export class Monolog extends BasicNode {

    // JSON Values
    forwardText: string;

    // Developer Values

    constructor(parent: Node, director: ComponentDirectorService) {
        super(parent, director);

        this.type = 'monolog';

        this.forwardText = 'Ich leite sie gerne weiter';
        this.height = 35;
    }


}

export class Link extends BasicNode {
    constructor(parent: Node, director: ComponentDirectorService) {
        super(parent, director);

        this.type = 'link';

        this.height = 20;
        this.title = 'Verlinkung';
    }

}
