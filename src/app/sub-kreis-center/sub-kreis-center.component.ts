import { Component, OnInit, Input } from '@angular/core';
import { Shape } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { SubKreis } from '../shapes/subkreis';

@Component({
  selector: 'app-sub-kreis-center',
  templateUrl: './sub-kreis-center.component.html',
  styleUrls: ['./sub-kreis-center.component.css']
})
export class SubKreisCenterComponent implements OnInit {

  @Input() shape: SubKreis;
  constructor(public director: ComponentDirectorService) { }

  ngOnInit() {
  }


  toggleConnectorActive() {
    this.shape.connectorActive = !this.shape.connectorActive;

  }

  deselectConnectoractive() {
    this.shape.connectorActive = false;
  }
}
