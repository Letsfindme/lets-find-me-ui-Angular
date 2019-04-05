import {Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/map';
import {PostCreationService} from './post-creation.service';
import {Post} from './post.model';
import {FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {
  post: Post;
  postForm: FormGroup;

  constructor(
    private postCrationService: PostCreationService,
    private fb: FormBuilder
  ) {
    this.post = new Post();
    this.postForm = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      fGroup: this.fb.group({
        name: [''],
        pass: ['']
      })
    });
  }

  onSubmit(): void {
    console.log(this.myForm.controls.fGroup.value);
    console.log(this.myForm.value);
    console.log(this.myForm.controls.fGroup.get('pass').value);
  }
  createPost() {
    this.postCrationService.createPost(this.post)
      .subscribe(post => this.post = post);
  }
}
