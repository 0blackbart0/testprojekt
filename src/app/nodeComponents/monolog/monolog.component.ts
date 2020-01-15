import { Component, OnInit, Input } from '@angular/core';
import { Monolog } from '../../nodeModels/component';
import { ComponentDirectorService } from '../../services/component-director.service';
import { ScalingService } from '../../services/scaling.service';
import { PlaceHolder } from 'src/assets/values';

@Component({
  selector: 'app-monolog',
  templateUrl: './monolog.component.html',
  styleUrls: ['./monolog.component.css']
})
export class MonologComponent implements OnInit {

  @Input() node: Monolog;
  placeholder = PlaceHolder;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) {}

  ngOnInit() {
  }

  toggleConnectorActive() {
    this.node.connectorActive = !this.node.connectorActive;
  }

  deselectConnectoractive() {
    this.node.connectorActive = false;
  }
}
