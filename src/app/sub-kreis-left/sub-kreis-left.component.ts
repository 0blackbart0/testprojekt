import { Component, OnInit, Input } from '@angular/core';
import { Shape } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';
import {ToolMenuSService} from '../tool-menu-s.service';
import { SubKreis } from '../shapes/subkreis';

@Component({
  selector: 'app-sub-kreis-left',
  templateUrl: './sub-kreis-left.component.html',
  styleUrls: ['./sub-kreis-left.component.css']
})
export class SubKreisLeftComponent implements OnInit {

  @Input() shape: SubKreis;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) { }

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
