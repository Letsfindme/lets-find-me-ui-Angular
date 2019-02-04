import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Output() toggleMenu = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openMenu() {
    this.toggleMenu.emit('true');
}
}
