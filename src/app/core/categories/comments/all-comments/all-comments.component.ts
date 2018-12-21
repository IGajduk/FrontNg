import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Coment} from '../../../../models/Coment';
import {CommentsService} from '../../../../services/comments.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css']
})
export class AllCommentsComponent implements OnInit {

  comments: Coment[] = [];

  constructor(
    private commentsService: CommentsService
  ) {
  }

  ngOnInit() {
    this.getComments();
  }
  private getComments() {
    this.commentsService.getAllComments().subscribe((res) => {
      this.comments = res ? res : [];
    });
  }

  removeComment(comment: Coment) {
    this.commentsService.deleteComment(comment._id).subscribe(() => {
      this.getComments();
    });
  }

  createComment(commentForm: NgForm) {
    this.commentsService.createComment(commentForm.value).subscribe((newComment) => {
      this.comments.push(newComment);
    });
  }

}
