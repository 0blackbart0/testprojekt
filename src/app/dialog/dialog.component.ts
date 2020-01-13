import { Component, OnInit, Input } from '@angular/core';
import { Node  } from '../nodes/node';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';
import { Dialog } from '../nodes/component';
import { PlaceHolder } from 'src/assets/strings';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() node: Dialog;
  titlePlaceholder;
  questionPlaceholder;
  answerPlaceholder;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) {
    this.titlePlaceholder = PlaceHolder.TITLE;
    this.questionPlaceholder = PlaceHolder.QUESTION;
    this.answerPlaceholder = PlaceHolder.ANSWER;
  }

  ngOnInit() {
  }

  setParent(node: Node) {
    this.node.parent = node;
  }

  toggleConnectorActive() {
    this.node.connectorActive = !this.node.connectorActive;
    if (!this.node.connectorActive) {
    }

  }

  deselectConnectoractive() {
    this.node.connectorActive = false;
  }
}
