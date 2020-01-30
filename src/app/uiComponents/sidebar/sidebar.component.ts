import { Component, OnInit } from '@angular/core';
import { ComponentDirectorService } from '../../services/component-director.service';
import { NodeType, PlaceHolder } from 'src/assets/values';
import { UndoService } from 'src/app/services/undo.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit {

  node;

  nodeType = NodeType;
  placeholder = PlaceHolder;

  sidebarOpen = false;
  constructor(public director: ComponentDirectorService, private undo: UndoService) {

    this.node = director.selected;
    director.setSideBar(this);
    undo.setSideBar(this);
  }

  ngOnInit() {

  }



  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;

    const sidebar = document.getElementById('sidebar');
    const scalingMenu = document.getElementById('scalingMenu');
    if (this.sidebarOpen) {
      sidebar.classList.add('slideIn');
      sidebar.classList.remove('slideOut');
      scalingMenu.classList.add('slideIn');
      scalingMenu.classList.remove('slideOut');


    } else {
      sidebar.classList.add('slideOut');
      sidebar.classList.remove('slideIn');
      scalingMenu.classList.add('slideOut');
      scalingMenu.classList.remove('slideIn');


    }

  }
}
