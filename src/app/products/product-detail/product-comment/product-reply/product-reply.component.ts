import { Component, OnInit, Input } from '@angular/core';
import { ReplyService } from '../../../../shared/service/reply.service';
import { ReplyResponse } from 'src/app/shared/interface/replyResponse';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';

@Component({
  selector: 'app-product-reply',
  templateUrl: './product-reply.component.html',
  styleUrls: ['./product-reply.component.css'],
})
export class ProductReplyComponent implements OnInit {
  isReply: boolean;
  reply_list: ReplyResponse[] = [];
  @Input() replyInfo: any;

  reply: SetReply;
  replyForm: FormGroup;

  username: string;
  currentUser_avatar: string;
  currentUser_id: string

  constructor(
    private replyService: ReplyService,
    private authService: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.replyForm = new FormGroup({
      content: new FormControl(),
    });

    this.authService.currentUser.subscribe((user) => {
      if (user.username == '') {
        this.username = '';
      } else {
        this.username = user.username;
        this.currentUser_avatar = user.avatarURL;
        this.currentUser_id = user.id
      }
    });
  }

  onShowReply() {
    this.isReply = !this.isReply;
    if (this.isReply) {
      this.replyService
        .getReply({ cmt_id: this.replyInfo.cmt_id })
        .subscribe((res) => {
          this.reply_list = res;
        });
    }
  }

  onSetReply() {
    this.reply = {
      id: (this.reply_list.length + 1).toString(),
      username: this.username,
      cmt_id: this.replyInfo.cmt_id,
      pic_id: this.replyInfo.pic_id,
      content: this.replyForm.get('content').value,
      user_id: this.currentUser_id,
      avatarURL: this.currentUser_avatar
    };
  }

  onSubmit() {
    this.onSetReply();
    this.replyService.setReply(this.reply).subscribe((res) => {
      this.reply_list.push(res);
      this.replyForm.reset();
    });
  }
}

interface SetReply {
  username: string;
  id: string;
  cmt_id: string;
  pic_id: string;
  content: string;
  user_id: string;
  avatarURL: string
}
