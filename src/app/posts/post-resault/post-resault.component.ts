import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post-creation/post.service';

@Component({
  selector: 'app-post-resault',
  templateUrl: './post-resault.component.html',
  styleUrls: ['./post-resault.component.scss']
})
export class PostResaultComponent implements OnInit {
  posts: Post[];

  @Input() formvalue;

  constructor(private postService: PostService) {
    this.formvalue = this.postService.searchForm;
    postService.findGuids(this.formvalue).subscribe(
      posts => {
        this.posts = posts;
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit() {

  }

}
