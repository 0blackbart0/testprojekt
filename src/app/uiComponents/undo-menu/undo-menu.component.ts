import { Component, OnInit } from '@angular/core';
import { UndoService } from 'src/app/services/undo.service';

@Component({
  selector: 'app-undo-menu',
  templateUrl: './undo-menu.component.html',
  styleUrls: ['./undo-menu.component.css']
})
export class UndoMenuComponent implements OnInit {

  constructor( public undo: UndoService ) { }

  ngOnInit() {
  }

}
