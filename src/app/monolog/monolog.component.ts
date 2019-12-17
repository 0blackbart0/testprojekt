import { Component, OnInit, Input } from '@angular/core';
import { Monolog } from '../shapes/component';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';

@Component({
  selector: 'app-monolog',
  templateUrl: './monolog.component.html',
  styleUrls: ['./monolog.component.css']
})
export class MonologComponent implements OnInit {

  @Input() shape: Monolog;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) {
   }

  ngOnInit() {
  }

  toggleConnectorActive() {
    this.shape.connectorActive = !this.shape.connectorActive;
    if (!this.shape.connectorActive) {
      this.director.deleteMenu();
    }
  }

  deselectConnectoractive() {
    this.shape.connectorActive = false;
  }
}
