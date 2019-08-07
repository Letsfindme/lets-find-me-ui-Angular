import { Component, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { Address } from '../models/address';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../posts/post-creation/post.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  selectedFile: File
  userName: string;
  image: any;
  imageToShow: any;
  imageSrc;
  userId;

  constructor(private fb: FormBuilder,
    private postService: PostService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private tokenStorage: TokenStorageService) {
    this.userName = this.tokenStorage.getUsername();
    this.userForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      address: this.fb.array([
        this.initAddress(),
      ])
    });

    this.userService.getUsers(this.userName).subscribe(
      userData => {
        this.user = userData;
        this.userForm.patchValue(userData);
        this.getImageByUserId(this.user.username);
        // this.userService.saveUserPhotoToService(userData.id);
        // let img = document.getElementById('user-profile');
        // let url = this.userService.url;
        // img.style.backgroundImage = `url(${url})`;
        // this.imageToShow = this.userService.userImage();
      });
    // if (this.user.address != null) {
    //   this.user.address.forEach(userAddress => {
    //     this.addressForm.push(this.convertAddressToForm(userAddress));
    //   });
    // }
  }

  get addressForm(): FormArray {
    return this.userForm.get('address') as FormArray;
  }

  initAddress() {
    // initialize our address
    return this.fb.group({
      street: ['', Validators.required],
      city: [''],
      postcode: ['']
    });
  }

  addAddress() {
    // add address to the list
    const control = <FormArray>this.userForm.controls['address'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.userForm.controls['address'];
    control.removeAt(i);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.user.lastname = this.userForm.controls['lastname'].value;
    this.user.address = this.userForm.controls['address'].value;
    this.userService.updateUser(this.user).subscribe()
  }

  private convertAddressToForm(userAddress: Address): FormGroup {
    return this.fb.group({
      address: [userAddress.street],
      city: [userAddress.city],
      postcode: [userAddress.postcode]
    })
  }

  triggerFile(fileInput) {
    fileInput.click();
  }

  onFileChanged(event) {
    let img = document.getElementById('user-profile');
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload() {
    const file = new FormData();
    file.append('file', this.selectedFile, this.user.username);
    this.postService.saveImage(file, this.user.username).subscribe();
  }

  getImageByUserId(name: string) {
    this.userService.getUserPhoto(name)
      .subscribe(blob => {
        this.createImageFromBlob(blob);
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageSrc = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
