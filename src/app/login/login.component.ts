import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../models/login-info';
import { resolve } from 'dns';
import { promise } from 'protractor';
// noinspection JSAnnotator
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

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
    }
  }

  login() {
    this.show = true;
    //this.intervalId = setInterval(() => this.counte(), 10);
    this.counte();
    this.setTimeou();
  }

  setTimeou() {
    setTimeout(() => {
      this.loginInfo = new AuthLoginInfo(
        this.form.username,
        this.form.password);

      this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthorities();
          this.router.navigate(['user']);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
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