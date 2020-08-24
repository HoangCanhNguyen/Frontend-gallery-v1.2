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

  reply: SetReply
  replyForm: FormGroup;

  username: string
  constructor(private replyService: ReplyService, private authService: AuthenticateService) {}

  ngOnInit(): void {
    this.replyForm = new FormGroup({
      content: new FormControl(),
    });
    this.authService.currentUser.subscribe((user) => {
      if (user == null) {
        this.username = '';
      } else {
        this.username = user.username;
      }
    });
  }

  onSetReply() {
    this.reply = {
      reply_id: "0",
      username: this.username,
      cmt_id: this.replyInfo.cmt_id,
      pic_id: this.replyInfo.pic_id,
      content: this.replyForm.get("content").value,
      posted: "0",
      user_id: "0"
    }
  }

  onShowReply() {
    this.isReply = !this.isReply;
    if (this.isReply) {
      this.replyService.getReply(this.replyInfo).subscribe((res) => {
        this.reply_list = res;
      });
    }
  }

  onSubmit() {
    this.onSetReply()
    this.replyService.setReply(this.reply).subscribe(res => {
      this.reply_list.push(res)
      this.replyForm.reset()
    })
  }
}

interface SetReply {
  username: string;
  reply_id: string;
  cmt_id: string;
  pic_id: string;
  content: string;
  posted: string;
  user_id: string;
}
