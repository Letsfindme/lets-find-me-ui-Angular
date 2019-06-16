import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../models/login-info';

// noinspection JSAnnotator
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: any = {};
  @Output() emitLoggedUser = new EventEmitter<boolean>();
  isLoggedIn = true;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  darkModeActive: boolean;

  loading: boolean = false;
  color = 'accent';
  mode = 'determinate';
  intervalId: NodeJS.Timer;
  seconds = 0;
  message;
  show = false;
  error = '';
  username: string;
  password: string;

  constructor(private tokenStorage: TokenStorageService,

    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.router.navigate([''])
    }
  }

  login() {
    this.show = true;
    //this.intervalId = setInterval(() => this.counte(), 10);
    this.counte();
    this.attemptAuth();
  }

  attemptAuth() {
    setTimeout(() => {
      this.loginInfo = new AuthLoginInfo(
        this.form.username,
        this.form.password);
      this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          this.isLoggedIn = true;
          this.isLoginFailed = false;
          this.emitLoggedUser.emit(this.isLoggedIn);
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);
          this.roles = this.tokenStorage.getAuthorities();
          this.router.navigate(['']);
        },
        error => {
          this.isLoggedIn = false;
          this.isLoginFailed = true;
          this.errorMessage = error.error.message;
        }
      )
    }, 1000);
  }

  reloadPage() {
    window.location.reload();
  }

  counte() {
    setTimeout(() => {
      this.seconds++;
      if (this.seconds < 100) {
        this.counte();
      } else {
        this.loading = false;
        this.show = false;
        this.seconds = 0;
      }
    }, 1);
  }
}
