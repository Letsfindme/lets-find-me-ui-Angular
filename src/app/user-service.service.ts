import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './models/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {}

  private userUrl = 'http://letsfindme.online:8050/profile';

  public getUsers(username: string): Observable <User[]> {
    return this.http.get<User[]>(this.userUrl +"/"+username);
  }
}
