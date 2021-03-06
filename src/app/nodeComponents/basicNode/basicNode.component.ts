import { Component, OnInit, Input } from '@angular/core';
import { Node  } from '../../nodeModels/node';
import { ComponentDirectorService } from '../../services/component-director.service';
import { ScalingService } from '../../services/scaling.service';
import { PlaceHolder } from 'src/assets/values';

@Component({
  selector: 'app-basic-node',
  templateUrl: './basicNode.component.html',
  styleUrls: ['./basicNode.component.css']
})
export class BasicNodeComponent implements OnInit {

  @Input() node: Node;

  placeholder = PlaceHolder;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) {
  }

  ngOnInit() {
  }
}
