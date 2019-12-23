import { Component, OnInit, Input } from '@angular/core';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';
import { DividerBranch } from '../nodes/dividerBranch';

@Component({
  selector: 'app-divider-branch-right',
  templateUrl: './divider-branch-right.component.html',
  styleUrls: ['./divider-branch-right.component.css']
})
export class DividerBranchRightComponent implements OnInit {

  @Input() node: DividerBranch;
  constructor(public director: ComponentDirectorService, public scaling: ScalingService) { }

  ngOnInit() {
  }

  toggleConnectorActive() {
    this.node.connectorActive = !this.node.connectorActive;
    if (!this.node.connectorActive) {
    }
  }

  deselectConnectoractive() {
    this.node.connectorActive = false;
  }
}
