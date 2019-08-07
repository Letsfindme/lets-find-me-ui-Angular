import { Injectable } from '@angular/core';
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from 'querystring';
import { PostRate } from 'src/app/models/post-rate';
import { PostContent } from 'src/app/models/PostContent.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class PostService {

  searchForm;
  posts: Post[];
  postUrl = 'http://localhost:8050/posts/create';
  getPostsUrl = "http://localhost:8050/findPaginated?p=1";
  searchUrl = "http://localhost:8050/posts";
  getPostByIdUrl = "http://localhost:8050/posts/";
  rateThisPostUrl = 'http://localhost:8050/posts/addRate';
  photoUrl = 'http://localhost:8050/images/';

  constructor(private http: HttpClient) { }

  createPost(post: Post, images: String[]): Observable<any> {
    post.postContent[0].images = images
    return this.http.post(this.postUrl, post, httpOptions);
  }

  getConfig() {
    return this.http.get("url");
  }

  findPaginated(): Observable<any> {
    return this.http.get(this.getPostsUrl);
  }

  getPostByUserId(userId: String): Observable<any> {
    return this.http.get(this.getPostByIdUrl + userId);
  }

  findGuids(form: any): Observable<any> {
    return this.http.get(this.searchUrl);
  }

  rateThisPost(postRate: PostRate): Observable<any> {
    return this.http.post(this.rateThisPostUrl, postRate);
  }

  saveImage(image: FormData, id): Observable<any> {
    return this.http
      .post(`http://localhost:8050/images?id=${id}`, image, { observe: "response" });
  }

  getUserPhoto(id): Observable<Blob> {
    return this.http
      .get(`http://localhost:8050/images?id=${id}`, { responseType: 'blob' });
  }

  getImageByUserId(fileName?: string): Observable<Blob> {
    return this.http
      .get(this.photoUrl + fileName, { responseType: 'blob' });
  }


  deleteImage(fileName: String) {
    return this.http
      .delete(this.photoUrl + fileName);
  }
}
