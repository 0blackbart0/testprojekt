import { Component, OnInit, Input } from '@angular/core';
import { Shape } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';
import { ToolMenuSService } from '../tool-menu-s.service';

@Component({
  selector: 'app-sub-kreis-right',
  templateUrl: './sub-kreis-right.component.html',
  styleUrls: ['./sub-kreis-right.component.css']
})
export class SubKreisRightComponent implements OnInit {

  @Input() shape: Shape;
  constructor(public director: ComponentDirectorService, public scaling: ScalingService, public toolMenuS:ToolMenuSService) { }

  ngOnInit() {
  }

}
