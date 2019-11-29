import { Component, OnInit, Input } from '@angular/core';
import { Shape } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';

@Component({
  selector: 'app-sub-kreis-center',
  templateUrl: './sub-kreis-center.component.html',
  styleUrls: ['./sub-kreis-center.component.css']
})
export class SubKreisCenterComponent implements OnInit {

  @Input() shape: Shape;
  constructor(public director: ComponentDirectorService) { }

  ngOnInit() {
  }

}
