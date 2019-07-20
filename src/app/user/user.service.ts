import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  imageToShow: any;
  url;
  constructor(private http: HttpClient) { }
  private userUrl = 'http://localhost:8050/user/profile/';

  public getUsers(username: string): Observable<User> {
    return this.http.get<User>(this.userUrl + username);
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user);
  }

  getUserPhoto(id: number): Observable<Blob> {
    console.log('getUserPhoto ', id);

    return this.http
      .get(`http://localhost:8050/images?id=${id}`, { responseType: 'blob' });
  }

  saveUserPhotoToService(id) {
    console.log('saveUserPhotoToService', id);
    this.getUserPhoto(id)
      .subscribe(blob => {
        this.createImageFromBlob(blob);
        this.url = URL.createObjectURL(blob);
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
    console.log('image from blob', this.imageToShow);
  }
  userImage() {
    return this.imageToShow;
  }
}
