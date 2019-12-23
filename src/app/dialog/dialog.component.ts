import { Component, OnInit, Input } from '@angular/core';
import { Node  } from '../nodes/node';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';
import { Dialog } from '../nodes/component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() node: Dialog;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) {
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
