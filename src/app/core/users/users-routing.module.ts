import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllUsersComponent} from './all-users/all-users.component';
import {SingleUserComponent} from './single-user/single-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';

const routes: Routes = [
  {path: '', component: AllUsersComponent},
  {path: 'profile/:id', component: SingleUserComponent},
  {path: 'edit/:id', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
