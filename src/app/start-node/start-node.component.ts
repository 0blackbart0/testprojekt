import { Component, OnInit, Input } from '@angular/core';
import { StartNode} from '../nodes/component';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';
import { PlaceHolder } from 'src/assets/strings';

@Component({
  selector: 'app-start-node',
  templateUrl: './start-node.component.html',
  styleUrls: ['./start-node.component.css']
})
export class StartNodeComponent implements OnInit {
  @Input() node: StartNode;

  titlePlaceholder;
  greetingPlaceHolder;


  constructor(
    public director: ComponentDirectorService,
    public scaling: ScalingService
  ) {
    this.node = new StartNode(director);
    this.node.selected = true;
    this.director.selected = this.node;
    this.director.addNode(this.node);
    this.director.addMenu(this.node);
    this.titlePlaceholder = PlaceHolder.TITLE;
    this.greetingPlaceHolder = PlaceHolder.GREETING;
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
