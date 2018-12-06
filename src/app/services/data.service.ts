import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../model/user";


@Injectable({
  providedIn: 'root'
})



export class DataserviceService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Appel au back end pour récupération des liens du jour avec une requête GET.
   */
  public getDailyLinks(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/user');
  }

  /**
   * Envoi d'une requête POST au back end pour créer un nouveau lien
   * @param newLink le nouveau lien à sauvegarder
   */
  public createNewLink(newLink: User): Observable<User> {
    return this.httpClient.post<User>('http://localhost:8080/user', newLink);
  }
}
