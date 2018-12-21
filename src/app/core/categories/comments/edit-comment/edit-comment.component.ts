import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Coment} from '../../../../models/Coment';
import {CommentsService} from '../../../../services/comments.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  comment: Coment = new Coment();

  constructor(
    private activatedRoute: ActivatedRoute,
    private commentsService: CommentsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.comment = <Coment>data;
    });
  }

  updateComent(commentForm: NgForm) {
    this.comment = {...this.comment, ...commentForm.value};
    this.commentsService.updateComment(this.comment._id, this.comment).subscribe((res) => {
      this.comment = res;
      this.router.navigate([`comments/single/${this.comment._id}`], {});
    });
  }


}
