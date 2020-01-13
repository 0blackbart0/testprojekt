import { Component, OnInit, Input } from '@angular/core';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';
import { DividerBranch } from '../nodes/component';
import { PlaceHolder } from 'src/assets/strings';

@Component({
  selector: 'app-divider-branch',
  templateUrl: './divider-branch.component.html',
  styleUrls: ['./divider-branch.component.css']
})
export class DividerBranchComponent implements OnInit {

  @Input() node: DividerBranch;
  selectionTextPlaceholder;
  constructor(public director: ComponentDirectorService, public scaling: ScalingService) {
    this.selectionTextPlaceholder = PlaceHolder.SELECTIONTEXT;
   }

  ngOnInit() {
  }

  toggleConnectorActive() {
    this.node.connectorActive = !this.node.connectorActive;
  }

  deselectConnectoractive() {
    this.node.connectorActive = false;
  }
}
