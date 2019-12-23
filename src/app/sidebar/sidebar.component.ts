import { Component, OnInit } from '@angular/core';
import { Shape } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { SubKreis } from '../shapes/subkreis';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  shape: Shape;

  kreisChilds: SubKreis[];

  sidebarOpen = false;
  constructor(public director: ComponentDirectorService) {
    this.director.sidebar = this;
    this.shape = director.LastSelected;
  }

  ngOnInit() {

  }


  addSubKreisCenter() {
    this.director.addSubKreisCenter();
    this.kreisChilds = this.director.getChildFrom(this.shape) as SubKreis[];
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
