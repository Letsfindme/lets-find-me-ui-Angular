import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-card-resault',
  templateUrl: './post-card-resault.component.html',
  styleUrls: ['./post-card-resault.component.scss']
})
export class PostCardResaultComponent implements OnInit {

  @Input() post: Post;
  
  constructor() {
  }

  ngOnInit() {
  }
}
