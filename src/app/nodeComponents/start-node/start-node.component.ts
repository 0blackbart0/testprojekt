import { Component, OnInit, Input } from '@angular/core';
import { StartNode} from '../../nodeModels/component';
import { ComponentDirectorService } from '../../services/component-director.service';
import { ScalingService } from '../../services/scaling.service';
import { PlaceHolder } from 'src/assets/values';

@Component({
  selector: 'app-start-node',
  templateUrl: './start-node.component.html',
  styleUrls: ['./start-node.component.css']
})
export class StartNodeComponent implements OnInit {
  @Input() node: StartNode;

  placeholder = PlaceHolder;


  constructor(
    public director: ComponentDirectorService,
    public scaling: ScalingService
  ) {
  }

  ngOnInit() {
    this.node.connectorActive = true;
  }

  toggleConnectorActive() {
    this.node.connectorActive = !this.node.connectorActive;
  }

  deselectConnectoractive() {
    this.node.connectorActive = false;
  }
}
