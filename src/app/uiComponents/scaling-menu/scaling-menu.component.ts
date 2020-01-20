import { Component, OnInit } from "@angular/core";
import { ScalingService } from "../../services/scaling.service";
import { ComponentDirectorService } from "../../services/component-director.service";
import { DrawService } from 'src/app/services/draw.service';
import { JsonNodeListService } from 'src/app/services/json-node-list.service';
import { UndoService } from 'src/app/services/undo.service';

import { Node } from 'src/app/nodeModels/node';
import { example1, example2 } from 'src/assets/dialog_lists/example_1';
@Component({
  selector: "app-scaling-menu",
  templateUrl: "./scaling-menu.component.html",
  styleUrls: ["./scaling-menu.component.css"]
})
export class ScalingMenuComponent implements OnInit {

  NodeList: Node[] = [];
  jsonObject;

  constructor(
    public scaling: ScalingService,
    public director: ComponentDirectorService,
    public draw: DrawService,
    public jsonNode: JsonNodeListService,
    public undo: UndoService
  ) {
    window.addEventListener("wheel", event => {
      if (event.ctrlKey) {
        event.preventDefault();
        if (event.deltaY > 0) {
          this.scale("-");
        } else {
          this.scale("+");
        }
      }
    });
  }

  loadExample(value: number) {
    switch (value) {
      case 1:
        this.jsonNode.loadTreeFromJson(example1.nodeList);
        break;
      case 2:
        this.jsonNode.loadTreeFromJson(example2.nodeList);
        break;
    }
  }

  ngOnInit() {}

  scale(scale: string) {
    let scalingAllowed = false;
    if (scale === "+") {
      scalingAllowed = this.scaling.increase();
    } else if (scale === "-") {
      scalingAllowed = this.scaling.decrease();
    }
    if (scalingAllowed) {
      for (const element of this.director.nodeList) {
        this.scaling.rezise(element, scale);
      }
    }
    this.draw.drawTree();
  }

  createJSON() {

    this.NodeList = this.director.nodeList;

    const nodeString: string = this.NodeList[0].getJsonString();

    this.jsonObject = JSON.parse(nodeString);

    console.log(this.jsonObject);
  }

}
