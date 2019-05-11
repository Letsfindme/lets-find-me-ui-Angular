import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Im-here';
  expand: boolean = true;
  isLoggedIn: boolean = false;
  
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

  buttonMessage(message) {
    this.isLoggedIn = message;
    console.log(message)
  }

  reciveLoggedUser(data: any) {
    this.isLoggedIn= true;
  }

}
