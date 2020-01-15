import { Component, OnInit, Input } from "@angular/core";
import { Link } from "../../nodeModels/component";
import { ComponentDirectorService } from "../../services/component-director.service";
import { ScalingService } from "../../services/scaling.service";
import { PlaceHolder } from "src/assets/values";
import { DrawService } from "src/app/services/draw.service";

@Component({
  selector: "app-link",
  templateUrl: "./link.component.html",
  styleUrls: ["./link.component.css"]
})
export class LinkComponent implements OnInit {
  @Input() node: Link;
  titlePlaceholder;

  constructor(
    public director: ComponentDirectorService,
    public scaling: ScalingService,
    private draw: DrawService
  ) {
    this.titlePlaceholder = PlaceHolder.LINKTITLE;
  }

  ngOnInit() {}

  deleteLink() {
    this.node.parent.child = null;
    this.director.deleteNode(this.node);
    this.draw.drawTree();
  }
}
