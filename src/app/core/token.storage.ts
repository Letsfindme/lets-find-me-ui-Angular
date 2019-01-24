import { Injectable } from '@angular/core';


const TOKEN_KEY = 'tok ';

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
    console.log(token);
    console.log('jessay de souvgarder le token');
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
    console.log(TOKEN_KEY);
    console.log('getItem(TOKEN_KEY)');
  }
}
