import { Component, OnInit } from '@angular/core';
import { Node } from '../nodes/node';
import { ComponentDirectorService } from '../component-director.service';
import { DividerBranch } from '../nodes/dividerBranch';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  node: Node;

  sidebarOpen = false;
  constructor(public director: ComponentDirectorService) {
    this.director.sidebar = this;
    this.node = director.selected;
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
