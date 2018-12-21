import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../models/User';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: User[] = [];

  constructor(
    private usersService: UsersService) {
  }

  ngOnInit() {
    this.getUsers();
  }
  private getUsers() {
    this.usersService.getAllUsers().subscribe((res) => {
      console.log(res);
      this.users = res ? res : [];
    });
  }

  removeUser(user: User) {
    this.usersService.deleteUser(user._id).subscribe(() => {
      this.getUsers();
    });
  }

  createUs(userForm: NgForm) {
    this.usersService.createUser(userForm.value).subscribe((newUser) => {
      this.users.push(newUser);
    });
  }


}
