import { Component, OnInit } from '@angular/core';
import { ScalingService } from '../scaling.service';
import { ComponentDirectorService } from '../component-director.service';
import { ToolMenuSService } from '../tool-menu-s.service';

@Component({
  selector: 'app-scaling-menu',
  templateUrl: './scaling-menu.component.html',
  styleUrls: ['./scaling-menu.component.css']
})
export class ScalingMenuComponent implements OnInit {

  constructor(public scaling: ScalingService, public director: ComponentDirectorService, private menu: ToolMenuSService) { }

  ngOnInit() {
  }


  scale(scale: string) {
    this.menu.hideToolMenu();
    let scalingAllowed = false;
    if (scale === '+') {
      scalingAllowed = this.scaling.increase();
    } else if (scale === '-') {
      scalingAllowed = this.scaling.decrease();
    }
    if ( scalingAllowed ) {

      for (const element of this.director.getShapeList()) {
        this.scaling.rezise(element, scale);
      }
      this.director.rearrangeAll(this.director.ShapeList[0]);
      this.director.setPadding();
    }
  }

}
