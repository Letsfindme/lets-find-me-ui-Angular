import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {UserServiceService} from '../user-service.service';
import {User} from '../models/user.model';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns = ['id', 'username', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource<User>();
  constructor(private router: Router, private userService: UserServiceService,
    private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.userService.getUsers(this.tokenStorage.getUsername()).subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }
}
