import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../post-creation/post.service';
import { PostContent } from 'src/app/models/PostContent.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post;
  postContent: PostContent;
  starCount: number;
  imageAvatar;
  mainImage;
  form: FormGroup;

 

  constructor(private postService: PostService,
    public _router: Router, private userService: UserService) {
  }

  

  async getImg() {
    this.mainImage = await this.getImageById(this.postContent.images[0]);
    this.getImageById(this.post.username).then( (image)=> {this.imageAvatar =image});
  }

  goTodetails() {
    this._router.navigate(['posts', this.post.id]);
  }

  getImageById(name: string): Promise<string | ArrayBuffer> {
    let reader = new FileReader();
    this.userService.getUserPhoto(name)
      .subscribe(blob => {
        reader.readAsDataURL(blob);
      });
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        let image = reader.result;
        if (image) {
          resolve(image);
        }
        resolve("try again :/");
      };
    });
  }

  ngOnInit() {
    this.postContent = this.post.postContent[0];
    this.starCount = this.post.starCount;
    this.getImg();
  }
}
