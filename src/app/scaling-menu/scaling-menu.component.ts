import { Component, OnInit } from '@angular/core';
import { ScalingService } from '../scaling.service';
import { ComponentDirectorService } from '../component-director.service';

@Component({
  selector: 'app-scaling-menu',
  templateUrl: './scaling-menu.component.html',
  styleUrls: ['./scaling-menu.component.css']
})
export class ScalingMenuComponent implements OnInit {

  constructor(public scaling: ScalingService, public director: ComponentDirectorService) {

    window.addEventListener("wheel", event => {
      if (event.ctrlKey) {
        event.preventDefault();
        if (event.deltaY > 0 ) {
          this.scale('-');
        } else {
          this.scale('+');
        }
      }


    });
   }

  ngOnInit() {
  }


  scale(scale: string) {
    let scalingAllowed = false;
    if (scale === '+') {
      scalingAllowed = this.scaling.increase();
    } else if (scale === '-') {
      scalingAllowed = this.scaling.decrease();
    }
    if ( scalingAllowed ) {

      for (const element of this.director.nodeList) {
        this.scaling.rezise(element, scale);
      }
    }
    this.director.drawTree();
  }

}
