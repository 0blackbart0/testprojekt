import { Component, OnInit } from '@angular/core';
import { Shape, Rechteck, Kreis } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { SubKreis, SubKreisLeft, SubKreisRight } from '../shapes/subkreis';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(private director: ComponentDirectorService) { }

  ngOnInit() {
  }

  addShape(typ: string) {


      let tmp: Shape = null;

      let subleft = null;
      let subright = null;

      let childs: Shape[] = [];
      childs = this.director.getChildFrom(this.director.LastSelected);
      if (childs.length === 0) {

        if (typ === 'rechteck') {
          tmp = new Rechteck(this.director.LastSelected);
          this.director.addShape(tmp);
          this.director.setSelected(tmp);
        } else if (typ === 'subKreis') {
          tmp = new Kreis(this.director.LastSelected);
          subleft = new SubKreisLeft(tmp);
          subright = new SubKreisRight(tmp);
          this.director.addShape(tmp);
          this.director.addShape(subleft);
          this.director.addShape(subright);
          this.director.setSelected(subleft);
        }
        tmp.setPosition();
        if (typ === 'subKreis') {
          subleft.setPosition();
          subright.setPosition();
        }
      } else if (childs.length === 1) {
        ////////// Der shit funktioniert noch nicht.. muss noch die position in der liste erausfinden und eintragen an der stelle.
        if (typ === 'rechteck') {
          tmp = new Rechteck(this.director.LastSelected);
          childs[0].parent = tmp;
          this.director.addShape(tmp);
          this.director.setSelected(tmp);
        } else if (typ === 'subKreis') {
          tmp = new Kreis(this.director.LastSelected);
          subleft = new SubKreisLeft(tmp);
          childs[0].parent = subleft;
          subright = new SubKreisRight(tmp);
          this.director.addShape(tmp);
          this.director.addShape(subleft);
          this.director.addShape(subright);
          this.director.setSelected(subleft);
        }
        tmp.setPosition();
        if (typ === 'subKreis') {
          subleft.setPosition();
          subright.setPosition();
        }
        this.director.rearrangeAll(this.director.ShapeList[0]);
      }
    }

}
