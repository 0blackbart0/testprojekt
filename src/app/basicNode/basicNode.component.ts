import { Component, OnInit, Input } from '@angular/core';
import { Node  } from '../nodes/node';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';

@Component({
  selector: 'app-basic-node',
  templateUrl: './basicNode.component.html',
  styleUrls: ['./basicNode.component.css']
})
export class BasicNodeComponent implements OnInit {

  @Input() node: Node;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) {
  }

  ngOnInit() {
  }

  setParent(node: Node) {
    this.node.parent = node;
  }
}
