import { Component, OnInit, Input } from '@angular/core';
import { Node  } from '../../nodeModels/node';
import { ComponentDirectorService } from '../../services/component-director.service';
import { ScalingService } from '../../services/scaling.service';
import { Dialog } from '../../nodeModels/component';
import { PlaceHolder } from 'src/assets/values';

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
