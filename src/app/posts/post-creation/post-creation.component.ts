import { Component, OnInit, HostListener, ElementRef, Renderer2, ViewChild } from '@angular/core';

import 'rxjs/add/operator/map';
import { PostService } from './post.service';
import { Post } from '../../models/post.model';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from '../../auth/token-storage.service';
import { UserService } from 'src/app/user/user.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {
  post: Post;
  postForm: FormGroup;
  imageToShow;
  private file: File | null = null;
  images: String[] = [];
  uploadError: string;
  error: string;
  imageSrc;

  @ViewChild('image') private image: ElementRef;


// if (files.length === 0)
    //   return;
   // @ViewChild('fileInput') fileInput: ElementRef;
    // var mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.message = "Only images are supported.";
    //   return;
    // } 
    // clearFile() {
    //   this.form.get('avatar').setValue(null);
    //   this.fileInput.nativeElement.value = '';
    // }

    // createForm() {
    //   this.form = this.fb.group({
    //     name: ['',],
    //     avatar: null
    //   });
    // } 
    
  //postContent: [];
  constructor(
    private renderer: Renderer2,
    private postService: PostService,
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


  onSelectedFile(event) {
    const myId = uuid.v4();
    this.images.push(myId);
    const file = new FormData();
    const productImage = event.target.files[0];
    this.createImageFromBlob(productImage);
    file.append('file', productImage, myId);

    this.postService.saveImage(file, myId).subscribe(
      response => {
        this.uploadError = '';
        this.appendThump(myId)
      }
    );
  }

  appendThump(myId) {
    const li: HTMLLIElement = this.renderer.createElement('li');
    const img: HTMLImageElement = this.renderer.createElement('img');
    img.src = this.imageToShow;
    this.renderer.addClass(img, 'product-image');
    const a: HTMLAnchorElement = this.renderer.createElement('a');
    a.innerText = 'Delete';
    a.id =  myId
    this.renderer.addClass(a, 'delete-btn');
    a.addEventListener('click', this.deleteProductImage.bind(this, a));
    this.renderer.appendChild(this.image.nativeElement, li);
    this.renderer.appendChild(li, a);
    this.renderer.appendChild(li, img);
  }

  triggerFile(fileInput) {
    fileInput.click();
  }

  onFileChanged(event) {
    let img = document.getElementById('user-profile');
    this.onSelectedFile(event);
  }

  // onSubmit1() {
  //   const formData = new FormData();
  //   // formData.append('productName', this.productForm.get('productName').value);
  //   // formData.append('price', this.productForm.get('price').value);
  //   // formData.append('sku', this.productForm.get('sku').value);
  //   this.postService.saveImage(formData, 'ds').subscribe(
  //     response => {
  //       if (res.status === 'success') {

  //       }
  //     },
  //     err => this.error = err
  //   );
  // }

  deleteProductImage(filename, a) {
    this.postService.deleteImage(a.srcElement.id)
    .subscribe(
      res => {
         a.srcElement.parentElement.remove();
      },
      err => this.error = err
    );
  }

  writeValue(value: null) {
    // clear file input
    this.image.nativeElement.value = '';
    this.file = null;
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
    this.createPost(this.postForm.value, this.images);
  }

  createPost(postForm, images) {
    this.postCrationService.createPost(postForm, images).subscribe(post => {
      //console.log('post success');
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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      // this.selectedFile = new ImageSnippet(event.target.result, file);
      // this.selectedFile.pending = true;
      // this.imageService.uploadImage(this.selectedFile.file).subscribe(
      //   (res) => {
      //     this.onSuccess();
      //   },
      //   (err) => {
      //     this.onError();
      //   })
    });
    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.getImageByUserId(sessionStorage.getItem('AuthUsername'))
  }
}
