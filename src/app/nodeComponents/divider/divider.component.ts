import { Component, OnInit, Input } from "@angular/core";
import { Node } from "../../nodeModels/node";
import { ComponentDirectorService } from "../../services/component-director.service";
import { ScalingService } from "../../services/scaling.service";
import { DividerNode, DividerBranch } from "../../nodeModels/component";
import { DrawService } from "src/app/services/draw.service";

@Component({
  selector: "app-divider",
  templateUrl: "./divider.component.html",
  styleUrls: ["./divider.component.css"]
})
export class DividerComponent implements OnInit {
  @Input() node: DividerNode;

  constructor(
    public director: ComponentDirectorService,
    public scaling: ScalingService,
    private draw: DrawService
  ) {}

  ngOnInit() {}

  addBranch() {
    const center = new DividerBranch(this.node, this.director);
  //  this.node.childs.push(center);
    this.node.addChild(center);  
  this.director.addNode(center);

   /* this.node.width += center.width;
    this.node.baseWidth += this.node.parent.baseWidth;
*/
    this.draw.drawTree();
  }

  setParent(node: Node) {
    this.node.parent = node;
  }
}
