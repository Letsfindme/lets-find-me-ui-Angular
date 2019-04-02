import {Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/map';
import {PostCreationService} from './post-creation.service';
import {Post} from './post.model';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.css']
})
export class PostCreationComponent implements OnInit {
  post: Post;

  constructor(
    private postCrationService: PostCreationService
  ) {
    this.post = new Post();
  }

  ngOnInit() {
  }

  createPost() {
    this.postCrationService.createPost(this.post)
      .subscribe(post => this.post = post);
  }
}
