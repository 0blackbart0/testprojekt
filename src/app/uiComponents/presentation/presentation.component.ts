import { Component, OnInit } from "@angular/core";
import { ComponentDirectorService } from "src/app/services/component-director.service";
import { JsonNodeListService } from "src/app/services/json-node-list.service";
import { example1, example2 } from "../../../assets/dialog_lists/example_1";
import { DrawService } from "src/app/services/draw.service";

@Component({
  selector: "app-presentation",
  templateUrl: "./presentation.component.html",
  styleUrls: ["./presentation.component.css"]
})
export class PresentationComponent implements OnInit {
  constructor(
    public director: ComponentDirectorService,
    public jsonNode: JsonNodeListService,
    public draw: DrawService
  ) {}

  ngOnInit() {}

  createJSON() {
    console.log("test");
    const nodeString: string = this.director.nodeList[0].getJsonString();
    const jsonObject = JSON.parse(nodeString);
    console.log(nodeString);
    console.log(jsonObject);
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
}
