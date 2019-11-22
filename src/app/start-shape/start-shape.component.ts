import { Component, OnInit, Input } from '@angular/core';
import { Rechteck, StartShape , Shape} from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';

@Component({
  selector: 'app-start-shape',
  templateUrl: './start-shape.component.html',
  styleUrls: ['./start-shape.component.css']
})
export class StartShapeComponent implements OnInit {


  @Input() shape: Shape;

  constructor(public director: ComponentDirectorService) {
    this.shape = new StartShape();
    this.shape.selected = true;
    this.director.LastSelected = this.shape;
    this.director.addShape(this.shape);
   }

  ngOnInit() {
  }

}
