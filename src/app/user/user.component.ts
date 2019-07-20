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
        this.getImageByUserId(this.user.id);
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
    //this.getImageByUserId(this.user.id);
  }

  onSubmit() {
    this.user.lastname = this.userForm.controls['lastname'].value;
    this.user.address = this.userForm.controls['address'].value;
    // this.user.address.forEach(address => {
    //   address.user = this.user.username;
    // });
    //this.user.address[0].user=this.userForm.controls['address'].get[0].user,
    this.userService.updateUser(this.user).subscribe(data => {
      console.log('data from back ', data);
    })
  }

  private convertAddressToForm(userAddress: Address): FormGroup {
    return this.fb.group({
      address: [userAddress.street],
      city: [userAddress.city],
      postcode: [userAddress.postcode]
    })
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    const file = new FormData();
    file.append('file', this.selectedFile, this.selectedFile.name);
    this.postService.saveImage(file, this.user.id)
      .subscribe(event => {
        console.log(event); // handle event here
      });
    //this.getImageByUserId(this.user.id);
  }

  getImageByUserId(id: number) {
    this.userService.getUserPhoto(id)
      .subscribe(blob => {
        this.createImageFromBlob(blob);
        this.image = blob;
        let img = document.getElementById('user-profile');
        let url = URL.createObjectURL(blob);
        img.style.backgroundImage = `url(${url})`;
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
