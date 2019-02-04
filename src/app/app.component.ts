import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Im-here';
  expand: boolean = false;

  public reciveToggleMenu(event?: any) {
    this.expand = !this.expand;
}
}
