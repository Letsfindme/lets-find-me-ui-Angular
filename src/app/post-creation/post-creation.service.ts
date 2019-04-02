import {Injectable} from '@angular/core';
import {Post} from './post.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PostCreationService {

  constructor(private http: HttpClient) { }

  createPost(post: Post): Observable<any> {
    return this.http.post('/post/', post);
}
}
