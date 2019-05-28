import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../post-creation/post.service';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.scss']
})
export class PostShowComponent implements OnInit {

  posts: Post[];
  
  constructor(private postService: PostService) {
    this.getPosts();
  }

  ngOnInit() {
  }

  getPosts() {
    return this.postService.getPostByUserId().subscribe(
      posts => { this.posts = posts;
       },
      err => { console.log(err) }
    );
  }
}
