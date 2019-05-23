import { Component, ViewEncapsulation, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class MainNavComponent {
  TOKEN_KEY = 'AuthToken';
  @Input() isLoggedIn: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset,Breakpoints.Tablet])
    .pipe(
      map(result => result.matches)
    );

  constructor(public _router: Router,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService) { }

  ngOnInit() {
    this.getToken();
    console.log(Breakpoints);
  }

  public getToken() {
    if (sessionStorage.getItem(this.TOKEN_KEY)) {
      return this.isLoggedIn = true;
    } else {
      return this.isLoggedIn = false;
    }
  }

  get isLogged(): boolean {
    return this.isLoggedIn;
  }
  
  set isLogged(boolean: boolean) {
    console.log('nav set logged')
    this.isLoggedIn = true;
  }

  logout() {
    this._router.navigateByUrl('/login');
    this.authService.logout();
  }
}
