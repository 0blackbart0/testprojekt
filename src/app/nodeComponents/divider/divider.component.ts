import { Component, OnInit, Input } from '@angular/core';
import { Node  } from '../../nodeModels/node';
import { ComponentDirectorService } from '../../services/component-director.service';
import { ScalingService } from '../../services/scaling.service';
import { DividerNode } from '../../nodeModels/component';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.css']
})
export class DividerComponent implements OnInit {

  @Input() node: DividerNode;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) { }

  ngOnInit() {
  }

  setParent(node: Node) {
    this.node.parent = node;
  }
}
