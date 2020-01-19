import { Component, OnInit, Input } from '@angular/core';
import { Node  } from '../../nodeModels/node';
import { ComponentDirectorService } from '../../services/component-director.service';
import { ScalingService } from '../../services/scaling.service';
import { Dialog } from '../../nodeModels/component';
import { PlaceHolder } from 'src/assets/values';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() node: Dialog;

  placeholder = PlaceHolder;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) {
  }

  ngOnInit() {
  }

  setParent(node: Node) {
    this.node.parent = node;
  }

}
