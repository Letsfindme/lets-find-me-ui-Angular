import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { Address } from '../models/address';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserServiceService,
    private tokenStorage: TokenStorageService) {
    this.userForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      address: this.fb.array([
        this.initAddress(),
      ])
    });

    this.userService.getUsers(this.tokenStorage.getUsername()).subscribe(
      userData => {
        this.user = userData;
        this.userForm.patchValue(userData)
        console.log('userdata ', userData);
        console.log('address ', this.user.address);
      }
    );



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
    // this.user.address.forEach(address => {
    //   address.user = this.user.username;
      
    // });
    //this.user.address[0].user=this.userForm.controls['address'].get[0].user,
    console.log('submit user ',this.user);
    
    this.userService.updateUser(this.user).subscribe(data =>
      {
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

}
