import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../post-creation/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

 @Input() post: Post;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
  }

  getPosts() {
    return this.postService.getPostByUserId().subscribe(
      posts => { this.post = posts,console.log(JSON.stringify(posts));
       },
      err => { console.log(err) }
    );
  }

}
