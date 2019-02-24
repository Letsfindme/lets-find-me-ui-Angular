import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Im-here';
  expand: boolean = false;
  constructor(private router: Router) {
  }
  public toggleMenu(event?: any) {
    this.expand = !this.expand;
    this.title = event;
  }
  loginPage(): void {
    this.router.navigate(['login']);
    this.expand = !this.expand;
  }
}
