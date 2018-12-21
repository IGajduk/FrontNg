import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/User';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User = new User();

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.user = <User>data;
    });
  }

  updateUs(userForm: NgForm) {
    this.user = {...this.user, ...userForm.value};
    this.usersService.updateUser(this.user._id, this.user).subscribe((res) => {
      this.user = res;
      this.router.navigate(['users', 'profile', this.user._id], {});
    });
  }


}
