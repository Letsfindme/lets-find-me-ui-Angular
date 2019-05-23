import { Component, OnInit } from '@angular/core';
import { PostService } from '../post-creation/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
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
