import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';
import { CommentModule } from '../../../shared/model/comment.model';
import { CommentService } from '../../../shared/service/comment.service';

import { Reply } from '../../../shared/interface/reply';
import { CommentResponse } from '../../../shared/interface/commentRespone';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.css'],
})
export class ProductCommentComponent implements OnInit {
  @Input() parent_id: any;

  currentRate = 5;
  isComment = false;
  isReply = false;

  commentForm: FormGroup;
  comment: CommentModule;
  reply: Reply;
  cmt_list: CommentResponse[] = [];

  numCmt = new BehaviorSubject<number>(0)

  currentUser_avatar_url: string;
  currentUser_id: string;
  username: string;
  loginStatus = false;

  constructor(
    private authService: AuthenticateService,
    private snackbarService: SnackbarNotiService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      content: new FormControl(),
    });

    this.commentService
      .getComment({ pic_id: this.parent_id })
      .subscribe((res) => {
        this.cmt_list = res;
        this.numCmt.next(this.cmt_list.length)
      });

    this.authService.currentUser.subscribe((user) => {
      if (user == '') {
        this.username = '';
      } else {
        this.username = user.username;
      }
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
      username: this.username,
      pic_id: this.parent_id,
      content: this.commentForm.get('content').value,
      user_id: this.currentUser_id,
      star: this.currentRate.toString(),
      avatarURL: this.currentUser_avatar_url,
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
    this.commentService.onCreateComment(this.comment).subscribe((res) => {
      this.cmt_list.push(res);
      this.commentForm.reset();
      this.isComment = false;
    });
  }
}
