import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';
import { CommentModule } from '../../../shared/model/comment.model';
import { CommentService } from '../../../shared/service/comment.service';

import { Reply } from '../../../shared/interface/reply';
import { CommentResponse } from '../../../shared/interface/commentRespone';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.css'],
})
export class ProductCommentComponent implements OnInit {
  @Input() parent_id: any;

  sub: Subscription;
  commentForm: FormGroup;

  currentRate: number = 5;
  isComment: boolean = false;
  isReply: boolean = false;
  loginStatus: boolean = false;

  comment: CommentModule;
  reply: Reply;
  cmt_list: CommentResponse[] = [];

  currentUser_avatar_url: string;
  currentUser_id: string;
  username: string;
  role: string;
  creator_name: string;

  constructor(
    private authService: AuthenticateService,
    private snackbarService: SnackbarNotiService,
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      content: new FormControl(),
    });

    this.commentService
      .getComment({ pic_id: this.parent_id })
      .subscribe((res) => {
        this.cmt_list = res;
      });

    this.authService.currentUser.subscribe((user) => {
      if (user == '') {
        this.username = '';
      } else {
        this.username = user.username;
        this.role = user.role;
      }
    });

    this.sub = this.route.params.subscribe(() => {
      this.creator_name = this.route.snapshot.data.pictureByIdResolver.creator_name;
    });
  }

  onOpenCommentSection() {
    if (this.username !== '') {
      this.isComment = !this.isComment;
    } else {
      this.snackbarService.onLoginError();
    }
  }

  onSetCommentInformation() {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser_avatar_url = user.avatarURL;
      this.currentUser_id = user.id;
    });

    this.comment = {
      creator_name: this.creator_name,
      username: this.username,
      pic_id: this.parent_id,
      content: this.commentForm.get('content').value,
      user_id: this.currentUser_id,
      star: this.currentRate.toString(),
      avatarURL: this.currentUser_avatar_url,
      created_at: new Date().toLocaleString(),
    };
  }

  onSetReply(cmt_id) {
    return (this.reply = {
      cmt_id: (this.cmt_list.length - cmt_id).toString(),
      pic_id: this.parent_id,
      user_id: this.currentUser_id,
    });
  }

  onSubmit() {
    this.onSetCommentInformation();
    this.commentService.onCreateComment(this.comment).subscribe((res) => {
      this.cmt_list.push(res);
      this.commentForm.reset();
      this.isComment = false;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }
}
