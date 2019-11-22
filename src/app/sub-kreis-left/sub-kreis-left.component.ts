import { Component, OnInit, Input } from '@angular/core';
import { Shape } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';

@Component({
  selector: 'app-sub-kreis-left',
  templateUrl: './sub-kreis-left.component.html',
  styleUrls: ['./sub-kreis-left.component.css']
})
export class SubKreisLeftComponent implements OnInit {

  @Input() shape: Shape;

  constructor(public director: ComponentDirectorService) { }

  ngOnInit() {
  }

}
