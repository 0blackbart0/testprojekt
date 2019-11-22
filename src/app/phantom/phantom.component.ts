import { Component, OnInit, Input } from '@angular/core';
import { Phantom } from '../shapes/phantom';

@Component({
  selector: 'app-phantom',
  templateUrl: './phantom.component.html',
  styleUrls: ['./phantom.component.css']
})
export class PhantomComponent implements OnInit {

  @Input() phantom: Phantom;
  constructor() { }

  ngOnInit() {
  }

}
