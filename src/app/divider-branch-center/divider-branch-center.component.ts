import { Component, OnInit, Input } from '@angular/core';
import { ComponentDirectorService } from '../component-director.service';
import { DividerBranch } from '../nodes/dividerBranch';

@Component({
  selector: 'app-divider-branch-center',
  templateUrl: './divider-branch-center.component.html',
  styleUrls: ['./divider-branch-center.component.css']
})
export class DividerBranchCenterComponent implements OnInit {

  @Input() node: DividerBranch;
  constructor(public director: ComponentDirectorService) { }

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
