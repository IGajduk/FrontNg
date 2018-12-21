import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllCommentsComponent} from './all-comments/all-comments.component';
import {EditCommentComponent} from './edit-comment/edit-comment.component';
import {SingleCommentComponent} from './single-comment/single-comment.component';

const routes: Routes = [
  {path: '', component: AllCommentsComponent},
  {path: 'edit/:id', component: EditCommentComponent},
  {path: 'single/:id', component: SingleCommentComponent},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
