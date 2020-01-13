import { Component, OnInit } from '@angular/core';
import { ComponentDirectorService } from '../../services/component-director.service';
import { Node } from '../../nodeModels/node';

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
   console.log('lösch eionzelnd');
  }

  deleteBelow() {
    console.log('lösch unter dir');
  }

  deleteTree() {
    console.log('lösch Baum');
  }
}
