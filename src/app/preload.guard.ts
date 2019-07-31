import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './auth/token-storage.service';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class PreloadGuard implements Resolve<any> {
  user;
  constructor(private tokenStorage: TokenStorageService,
    private userService: UserService){}
  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
      let username = this.tokenStorage.getUsername();
      return this.userService.getUsers(username)
  }
}
