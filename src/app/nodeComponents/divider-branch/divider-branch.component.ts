import { Component, OnInit, Input } from '@angular/core';
import { ComponentDirectorService } from '../../services/component-director.service';
import { ScalingService } from '../../services/scaling.service';
import { DividerBranch } from '../../nodeModels/component';
import { PlaceHolder } from 'src/assets/values';

@Component({
  selector: 'app-divider-branch',
  templateUrl: './divider-branch.component.html',
  styleUrls: ['./divider-branch.component.css']
})
export class DividerBranchComponent implements OnInit {

  @Input() node: DividerBranch;
  placeholder = PlaceHolder;
  constructor(public director: ComponentDirectorService, public scaling: ScalingService) {
   }

  ngOnInit() {
  }

}
