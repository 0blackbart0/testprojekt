import { Component, OnInit, Input } from '@angular/core';
import { Shape } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';
import { ToolMenuSService } from '../tool-menu-s.service';
import { SubKreis } from '../shapes/subkreis';

@Component({
  selector: 'app-sub-kreis-right',
  templateUrl: './sub-kreis-right.component.html',
  styleUrls: ['./sub-kreis-right.component.css']
})
export class SubKreisRightComponent implements OnInit {

  @Input() shape: SubKreis;
  constructor(public director: ComponentDirectorService, public scaling: ScalingService, public toolMenuS:ToolMenuSService) { }

  ngOnInit() {
  }

  toggleConnectorActive() {
    this.shape.connectorActive = !this.shape.connectorActive;

  }

  deselectConnectoractive() {
    this.shape.connectorActive = false;
  }
}
