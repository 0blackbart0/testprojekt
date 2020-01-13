import { Component, OnInit, Input } from '@angular/core';
import { Monolog } from '../nodes/component';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';
import { PlaceHolder } from 'src/assets/strings';

@Component({
  selector: 'app-monolog',
  templateUrl: './monolog.component.html',
  styleUrls: ['./monolog.component.css']
})
export class MonologComponent implements OnInit {

  @Input() node: Monolog;
  titlePlaceholder;
  forwardTextPlaceholder;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) {
    this.titlePlaceholder = PlaceHolder.TITLE;
    this.forwardTextPlaceholder = PlaceHolder.FORWARDTEXT;
   }

  ngOnInit() {
  }

  toggleConnectorActive() {
    this.node.connectorActive = !this.node.connectorActive;
  }

  deselectConnectoractive() {
    this.node.connectorActive = false;
  }
}
