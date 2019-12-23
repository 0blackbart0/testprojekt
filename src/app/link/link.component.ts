import { Component, OnInit, Input } from '@angular/core';
import { Link } from '../nodes/component';
import { ComponentDirectorService } from '../component-director.service';
import { ScalingService } from '../scaling.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @Input() node: Link;

  constructor(public director: ComponentDirectorService, public scaling: ScalingService) { }

  ngOnInit() {
  }

}
