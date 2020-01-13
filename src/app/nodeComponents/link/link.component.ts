import { Component, OnInit, Input } from '@angular/core';
import { Link } from '../../nodeModels/component';
import { ComponentDirectorService } from '../../services/component-director.service';
import { ScalingService } from '../../services/scaling.service';
import { PlaceHolder } from 'src/assets/strings';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @Input() node: Link;
  titlePlaceholder;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) {
    this.titlePlaceholder = PlaceHolder.LINKTITLE;
   }

  ngOnInit() {
  }

}
