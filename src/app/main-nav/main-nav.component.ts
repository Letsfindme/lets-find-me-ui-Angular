import {Component, ViewEncapsulation} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import {PostCreationComponent} from '../post-creation/post-creation.component';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainNavComponent {
  TOKEN_KEY = 'AuthToken';
  loggedIn: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
    .pipe(
      map(result => result.matches)
    );
  authService: AuthService;

  constructor(public _router: Router,
              private breakpointObserver: BreakpointObserver) {}
              ngOnInit() {
              this.getToken();
    this.isHandset$.subscribe(isHandset => console.log(isHandset));
  }
  public getToken() {
    if(sessionStorage.getItem(this.TOKEN_KEY)){
      this.loggedIn = true;
    }else{
    this.loggedIn =  false;
    }
  }

  logout() {
    this.authService.logout();
    this._router.navigateByUrl('/login');
    //this.sidebarService.toggle();
    this.ngOnInit();
  }
}
