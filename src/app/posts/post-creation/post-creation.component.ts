import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';
import { PostService } from './post.service';
import { Post } from '../../models/post.model';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { TokenStorageService } from '../../auth/token-storage.service';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {
  post: Post;
  postForm: FormGroup;
  imageToShow: string | ArrayBuffer;
  //postContent: [];
  constructor(
    private postCrationService: PostService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private userService: UserService
  ) {
    this.postForm = this.fb.group({
      title: '',
      category: '',
      postContent: this.fb.array([
        this.fb.group({ 
          text: '' 
        })
      ]),
      username: ''
    });
  }

  ngOnInit() {
    this.getImageByUserId(sessionStorage.getItem('AuthUsername'))
  }

  addPostContent() {
    this.postContents.push(
      this.fb.group({ 
        text: '' 
      })
    );
  }

  get postContents() {
    return this.postForm.get('postContent') as FormArray;
  }

  async onSubmit() {
    this.postForm.get('username').setValue(this.tokenStorage.getUsername());
    this.createPost(this.postForm.value);
  }

  createPost(postForm) {
    this.postCrationService.createPost(postForm).subscribe(post =>{
      console.log('post success');
    });
  }

  getImageByUserId(name: string) {
    this.userService.getUserPhoto(name)
      .subscribe(blob => {
        this.createImageFromBlob(blob);
        let img = document.getElementById('user-profile');
        let url = URL.createObjectURL(blob);
        img.style.backgroundImage = `url(${url})`;
        img.style.borderRadius = '50%';
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
