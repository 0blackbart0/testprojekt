import { Component, OnInit, Input } from '@angular/core';
import { Shape  } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';
import { Dialog } from '../shapes/component';
import { ToolMenuSService } from '../tool-menu-s.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() shape: Dialog;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService, public toolMenuS: ToolMenuSService) {
  }

  ngOnInit() {
  }

  setParent(shape: Shape) {
    this.shape.parent = shape;
  }

  toggleConnectorActive() {
    this.shape.connectorActive = !this.shape.connectorActive;

  }

  deselectConnectoractive() {
    this.shape.connectorActive = false;
  }
}
