import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../post-creation/post.service';
import { PostContent } from 'src/app/models/PostContent.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post;
  postContent: PostContent;
  starCount: number;
  imageToShow;
  image;
  
  constructor(private postService: PostService,
    public _router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.postContent = this.post.postContent[0];
    this.starCount = this.post.starCount;
    this.getImageByUserId(this.post.username);
  }

  goTodetails() {
    this._router.navigate(['posts', this.post.id]);
  }

  getImageByUserId(name: string) {
    this.userService.getUserPhoto(name)
      .subscribe(blob => {
        this.createImageFromBlob(blob);
        this.image = blob;
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
