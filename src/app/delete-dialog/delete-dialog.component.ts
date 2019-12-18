import { Component, OnInit } from '@angular/core';
import { ComponentDirectorService } from '../component-director.service';
import { Shape } from '../shapes/shape';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public director: ComponentDirectorService) { }

  ngOnInit() {
  }

  deleteSingle() {
    this.director.deleteSingle(this.director.LastSelected);
  }

  deleteBelow() {
    this.director.deleteBelow(this.director.LastSelected);
  }

  deleteTree() {
    this.director.deleteTree();
  }
}
