import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../post-creation/post.service';
import { PostContent } from 'src/app/models/PostContent.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post;
  postContent: PostContent;
  starCount: number;

  constructor(private postService: PostService,
    public _router: Router) {
  }

  ngOnInit() {
    this.postContent = this.post.postContent[0];
    this.starCount = this.post.starCount;
  }

  goTodetails() {
    this._router.navigate(['posts', this.post.id]);
  }
}
