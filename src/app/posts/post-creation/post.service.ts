import { Injectable } from '@angular/core';
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from 'querystring';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class PostService {
  postUrl = 'http://localhost:8080/posts/create';
  getPostsUrl = "http://localhost:8080/posts";
  constructor(private http: HttpClient) { }

  createPost(post: Post): Observable<any> {
    console.log('hhtp options post service ' + JSON.stringify(this.http.options));
    console.log(' post service ' + stringify(post));
    return this.http.post(this.postUrl, post, httpOptions);
  }
  getConfig() {
    return this.http.get("url");
  }
  getPostByUserId(): Observable<any> {
    return this.http.get(this.getPostsUrl);
  }
}
