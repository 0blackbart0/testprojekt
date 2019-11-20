import { Component, OnInit, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { Kreis, Shape,  } from '../shape';
import { DrawingFieldComponent } from '../drawing-field/drawing-field.component';
import { ComponentDirectorService } from '../component-director.service';

@Component({
  selector: 'app-kreis',
  templateUrl: './kreis.component.html',
  styleUrls: ['./kreis.component.css']
})
export class KreisComponent implements OnInit {

  @Input() shape: Shape;

  constructor(private director: ComponentDirectorService) {
    this.shape = new Kreis();
  }


  setSelected() {

    this.director.LastSelected.selected = false;
    this.director.LastSelected = this.shape;
    this.shape.selected = true;
  }

  ngOnInit() {
  }

  setParent(shape: Shape) {
    this.shape.parent = shape;
  }
}
