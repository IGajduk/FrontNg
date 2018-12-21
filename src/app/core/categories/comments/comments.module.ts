import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { AllCommentsComponent } from './all-comments/all-comments.component';
import { SingleCommentComponent } from './single-comment/single-comment.component';

import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [EditCommentComponent, AllCommentsComponent, SingleCommentComponent],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    FormsModule
  ]
})
export class CommentsModule { }
