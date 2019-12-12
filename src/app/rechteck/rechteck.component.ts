import { Component, OnInit, Input } from '@angular/core';
import { Shape  } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';
import {ToolMenuSService} from '../tool-menu-s.service';

@Component({
  selector: 'app-rechteck',
  templateUrl: './rechteck.component.html',
  styleUrls: ['./rechteck.component.css']
})
export class RechteckComponent implements OnInit {

  @Input() shape: Shape;
  name = "hallo";
  constructor(public director: ComponentDirectorService, public scaling: ScalingService, public toolMenuS:ToolMenuSService) {
  }

  ngOnInit() {
  }

  setParent(shape: Shape) {
    this.shape.parent = shape;
  }
}
