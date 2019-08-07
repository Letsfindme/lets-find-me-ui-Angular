import { Component, ViewEncapsulation, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class MainNavComponent {
  TOKEN_KEY = 'AuthToken';
  imageToShow;
  image;
  user;
  didLoad = false;
  @Input() isLoggedIn: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches)
    );

  constructor(public _router: Router,
    public route: ActivatedRoute,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService) { }


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
    this.isLoggedIn = true;
  }

  logout() {
    this._router.navigateByUrl('/login');
    this.authService.logout();
  }

  getImageByUserId() {
    if (!this.didLoad) {
      this.userService.getUserPhoto(sessionStorage.getItem("AuthUsername"))
        .subscribe(blob => {
          this.createImageFromBlob(blob);
        });
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
    this.didLoad = true;
  }


  ngOnInit() {
    this.getToken();
    this.getImageByUserId()
  }
}
