import { Component, OnInit, Input } from '@angular/core';
import { Rechteck, StartShape , Shape} from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';

@Component({
  selector: 'app-start-shape',
  templateUrl: './start-shape.component.html',
  styleUrls: ['./start-shape.component.css']
})
export class StartShapeComponent implements OnInit {


  @Input() shape: StartShape;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) {
    this.shape = new StartShape();
    this.shape.selected = true;
    this.director.LastSelected = this.shape;
    this.director.addShape(this.shape);
    this.scaling.scaleNewShape(this.shape);
   }

  ngOnInit() {
  }

  toggleConnectorActive() {
    this.shape.connectorActive = !this.shape.connectorActive;
    if (this.director.LastSelected !== this.shape) {
      this.director.LastSelected.connectorActive = false;
    }
  }

  deselectConnectoractive() {
    this.shape.connectorActive = false;
  }

}
