import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostContent } from 'src/app/models/PostContent.model';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post-creation/post.service';
import { PostRate } from 'src/app/models/post-rate';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  filtersLoaded: Promise<boolean>;
  post: Post;
  postContent: PostContent;
  postRate: PostRate;
  starCount: number;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  ratingClicked: number;
  imageToShow: string | ArrayBuffer;

  constructor(private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute) {
      ;
  }

  async getPostByIdUrl() {
    this.route.params.subscribe(userId =>
      this.postService.getPostByUserId(userId['id']).subscribe(
        post => {
          this.post = post;
          this.starCount = this.post.starCount;
          this.postContent = post.postContent[0];
          this.filtersLoaded = Promise.resolve(true);
          this.getImageByUserId(post.username);
        },
        err => {
        }
      )
    );
  }

  ngOnInit() {
    this.getPostByIdUrl();
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/img/1.jpg',
        medium: 'assets/img/1.jpg',
        big: 'assets/img/1.jpg'
      }
    ];
  }

  mystars(event) {
  }

  ratingComponentClick(event: any): void {
    this.postRate = new PostRate();
    this.post.starCount = event.rating;
    this.postRate.postid = this.post.id;
    this.postRate.username = this.post.username;
    this.postRate.rate = event.rating;
    this.postService.rateThisPost(this.postRate).subscribe(
      err => {

      }
    );
  }

  // getPostValue() {
  //   this.post = this.postDetailsService.post;
  // }

  getImageByUserId(name: string) {
    this.userService.getUserPhoto(name)
      .subscribe(blob => {
        this.createImageFromBlob(blob);
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
