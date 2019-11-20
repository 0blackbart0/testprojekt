import { Component, OnInit, Input } from '@angular/core';
import { Rechteck, StartShape , Shape} from '../shape';
import { ComponentDirectorService } from '../component-director.service';

@Component({
  selector: 'app-start-shape',
  templateUrl: './start-shape.component.html',
  styleUrls: ['./start-shape.component.css']
})
export class StartShapeComponent implements OnInit {


  @Input() shape: Shape;


  setSelected() {
    this.director.LastSelected.selected = false;
    this.director.LastSelected = this.shape;
    this.shape.selected = true;
  }

  constructor(private director: ComponentDirectorService) {
    this.shape = new StartShape();
    this.shape.left = 52;
    this.shape.selected = true;
    this.director.LastSelected = this.shape;
   }

  ngOnInit() {
  }

}
