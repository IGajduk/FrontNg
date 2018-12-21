import {Component, Input, OnInit} from '@angular/core';
import {Coment} from '../../../../models/Coment';
import {ActivatedRoute} from '@angular/router';
import {CommentsService} from '../../../../services/comments.service';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit {
@Input() commentInput: Coment = new Coment();


  constructor(
    private commentService: CommentsService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => this.getUById(res));
  }

  private getUById(params) {
    if (params.id) {
      this.commentService.getCommentById(params.id).subscribe(res => {
        this.commentInput = res;
      });
    }
  }
}
