import {Component, Input, OnInit} from '@angular/core';


import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/User';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {

  @Input() userInput: User = new User();

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => this.getUById(res));
  }

  private getUById(params) {
    if (params.id) {
      this.usersService.getUserById(params.id).subscribe(res => {
        this.userInput = res;
      });
    }
  }
}
