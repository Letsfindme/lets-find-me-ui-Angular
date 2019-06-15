import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostContent } from 'src/app/models/PostContent.model';

@Component({
  selector: 'app-post-card-resault',
  templateUrl: './post-card-resault.component.html',
  styleUrls: ['./post-card-resault.component.scss']
})
export class PostCardResaultComponent implements OnInit {

  @Input() post: Post;
  postContent: PostContent;
  constructor() {
  }

  ngOnInit() {
    this.postContent = this.post.postContent[0];
  }
}
