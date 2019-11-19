import { Component, OnInit } from '@angular/core';
import { Shape, Rechteck, Kreis, Dreieck } from '../shape';
import { ComponentDirectorService } from '../component-director.service';

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

    if (typ === 'rechteck') {
      tmp = new Rechteck();
    } else if (typ === 'kreis') {
      tmp = new Kreis();
    } else if (typ === 'dreieck') {
      tmp = new Dreieck();
    }
    this.director.addShape(tmp);
  }

}
