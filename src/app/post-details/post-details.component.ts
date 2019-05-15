import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../post-creation/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostService) { 
    this.getPosts();
  }

  ngOnInit() {
  }

  getPosts() {
    return this.postService.getPostByUserId().subscribe(
      posts => { this.posts = posts,console.log(JSON.stringify(posts));
       },
      err => { console.log(err) }
    );

  }
}
