import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';
import { CommentModule } from '../../../shared/model/comment.model';
import { CommentService } from '../../../shared/service/comment.service';

import { Reply } from '../../../shared/interface/reply';
import { CommentResponse } from '../../../shared/interface/commentRespone';
@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.css'],
})
export class ProductCommentComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  currentRate = 5;
  isComment = false;
  isReply = false;

  commentForm: FormGroup;
  comment: CommentModule;
  reply: Reply;
  cmt_list: CommentResponse[] = [];

  isEmpty = false;

  username: string;
  loginStatus = false;

  @Input() parent_id: any;

  constructor(
    private authService: AuthenticateService,
    private snackbarService: SnackbarNotiService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      content: new FormControl(),
    });

    this.commentService.getComment({"pic_id": this.parent_id}).subscribe((res) => {
      this.cmt_list = res;
    });

    this.authService.currentUser.subscribe((user) => {
      if (user == null) {
        this.username = '';
      } else {
        this.username = user.username;
      }
    });
  }

  onCreateComment() {
    if (this.username != '') {
      this.isComment = !this.isComment;
    } else {
      this.snackbarService.onLoginError();
    }
  }

  onSetCommentInformation() {
    this.comment = {
      username: this.username,
      pic_id: this.parent_id,
      content: this.commentForm.get('content').value,
      user_id: '0',
      star: this.currentRate.toString(),
    };
  }

  onSetReply(cmt_id) {
    return (this.reply = {
      cmt_id: (this.cmt_list.length - cmt_id - 1).toString(),
      pic_id: this.parent_id,
      user_id: '0',
    });
  }

  onSubmit() {
    this.onSetCommentInformation();
    console.log(this.comment);
    
    // this.commentService.setComment(this.comment).subscribe((res) => {
    //   this.cmt_list.push(res);
    //   this.isComment = false;
    //   this.commentForm.reset();
    // });
  }
}

