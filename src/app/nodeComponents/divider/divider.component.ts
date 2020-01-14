import { Component, OnInit, Input } from "@angular/core";
import { Node } from "../../nodeModels/node";
import { ComponentDirectorService } from "../../services/component-director.service";
import { ScalingService } from "../../services/scaling.service";
import { DividerNode, DividerBranch } from "../../nodeModels/component";
import { NodeType } from "src/assets/values";

@Component({
  selector: "app-divider",
  templateUrl: "./divider.component.html",
  styleUrls: ["./divider.component.css"]
})
export class DividerComponent implements OnInit {
  @Input() node: DividerNode;

  constructor(
    public director: ComponentDirectorService,
    public scaling: ScalingService
  ) {}

  ngOnInit() {}

  addBranch() {
    const center = new DividerBranch(this.node, this.director);
    this.node.childs.push(center);
    this.director.addNode(center);

    this.node.width += center.width;
    this.node.baseWidth += this.node.parent.baseWidth;

    this.director.drawTree();
  }

  setParent(node: Node) {
    this.node.parent = node;
  }
}
