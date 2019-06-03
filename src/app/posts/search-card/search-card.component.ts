import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../post-creation/post.service';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  findGuidsForm: FormGroup;
  posts: Post[];



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
    return this.postService.getPostByUserId().subscribe(
      posts => {
        this.posts = posts;
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
