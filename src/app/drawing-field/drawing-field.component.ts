import { Component, OnInit } from '@angular/core';
import {Shape, Rechteck, Kreis } from '../shapes/shape';
import { ComponentDirectorService } from '../component-director.service';
import { Phantom } from '../shapes/phantom';

@Component({
  selector: 'app-drawing-field',
  templateUrl: './drawing-field.component.html',
  styleUrls: ['./drawing-field.component.css']
})
export class DrawingFieldComponent implements OnInit {

  selected: Shape;
  ShapeList: Shape[] = [];
  drawingFieldPadding: number = 60;
  drawingFieldPaddingTop: number = 50;
  constructor(public director: ComponentDirectorService) { }

  sidebarOpen = false;

  ngOnInit() {
    this.ShapeList = this.director.getShapeList();
    this.director.setDrawingField(this);
  }

  showSidebar() {
    this.sidebarOpen = true;
  }

  hideSidebar() {
    this.sidebarOpen = false;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;

    const sidebar = document.getElementById('sidebar');
    if (this.sidebarOpen) {
      sidebar.classList.remove('slideOut');
      sidebar.classList.add('slideIn');
    } else {
      sidebar.classList.remove('slideIn');
      sidebar.classList.add('slideOut');
    }

  }
}
