import { Injectable } from '@angular/core';
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from 'querystring';
import { PostRate } from 'src/app/models/post-rate';
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
  rateThisPostUrl='http://localhost:8050/posts/addRate';
  constructor(private http: HttpClient) { }

  createPost(post: Post): Observable<any> {
    console.log('hhtp options post service ' + JSON.stringify(this.http.options));
    console.log(' post service ' + stringify(post));
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
    //return this.http.post(form, this.searchUrl);
  }

  rateThisPost(postRate: PostRate): Observable<any> {
    console.log('service postrate',postRate);
    return this.http.post(this.rateThisPostUrl, postRate);
  }
}
