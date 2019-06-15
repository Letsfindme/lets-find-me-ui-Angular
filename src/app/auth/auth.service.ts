import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { JwtResponse } from '../models/jwt-response';
import { AuthLoginInfo } from '../models/login-info';
import { SignUpInfo } from '../models/signup-info';
import { TokenStorageService } from './token-storage.service';
import { stringify } from 'querystring';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://letsfindme.online:8050/api/auth/signin';
  private signupUrl = 'http://letsfindme.online:8050/api/auth/signup';
  private postUrl = 'http://letsfindme.online:8050/posts/create';
  constructor(private tokenStorage: TokenStorageService,
    private http: HttpClient) {
  }

  private loggedIn = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.loggedIn.next(true);
    }
  }

  get isLoggedIn() {
    this.ngOnInit();
    return this.loggedIn.asObservable();
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  create(post: any): Observable<string> {
    console.log('auth sercive post is:' + stringify(post))
    return this.http.post<string>(this.postUrl, post, httpOptions)
  }

  logout() {
    sessionStorage.clear()
    //return  window.location.reload();
  }

  isTokenExpired(token?: string): boolean {
    //if(!token) token = this.getToken();
    if (!token) return true;

    //const date = this.getTokenExpirationDate(token);
    //if(date === undefined) return false;
    //return !(date.valueOf() > new Date().valueOf());
  }
}
