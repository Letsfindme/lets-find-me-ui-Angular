import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../posts/post-creation/post.service';
import { Post } from '../models/post.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostCardResaultComponent } from '../posts/post-card-resault/post-card-resault.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  findGuidsForm: FormGroup;
  posts: Post[];

  @Output() emitter = new EventEmitter<Post[]>();



  constructor(private postService: PostService,
    private fb: FormBuilder, private router: Router
  ) {
    this.findGuidsForm = this.fb.group({
      firstName:'',
      Category:'',
      City:'',
      visitor:'',
      me:''
    })
    this.getPosts();
  }

  ngOnInit() {
  }

  getPosts() {
    return this.postService.findPaginated().subscribe(
      posts => {
        this.posts = posts.content;
      },
      err => {
         console.log(err) 
      }
    );
  }

  findGuids() {
    this.postService.searchForm = this.findGuidsForm.value;
    this.router.navigate(['/searchResault']);
  }
}
