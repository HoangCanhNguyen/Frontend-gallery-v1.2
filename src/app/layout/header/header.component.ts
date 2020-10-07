import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { UserModule } from 'src/app/shared/model/user.model';
import { Router } from '@angular/router';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';
import { PusherService } from 'src/app/shared/service/pusher.service';
import { CommentService } from 'src/app/shared/service/comment.service';
import { ReplyService } from 'src/app/shared/service/reply.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userInfo: any;
  username: string;
  id: string;
  role: string;
  modalType: string;

  showAccountDropdown: boolean = false;
  showNoti = false;
  showResponsiveAccDropdown: boolean = false;
  comment_noti_list: any = [];
  reply_noti_list: any = [];
  new_noti: number = 0;

  constructor(
    public authService: AuthenticateService,
    private route: Router,
    private snackBar: SnackbarNotiService,
    private _pusher: PusherService,
    private _commentService: CommentService,
    private _replyService: ReplyService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((data) => {
      this.userInfo = data;
      this.username = this.userInfo['username'];
      this.role = this.userInfo.role;
      this.id = this.userInfo.id;

      if (
        this.role === 'collector' ||
        this.role === 'artist' ||
        this.role === 'admin'
      ) {
        this._pusher.InitNotificationChannel(
          'comment-channel',
          'comment',
          this.id
        );
        this._commentService
          .getCommentNotification(this.id)
          .subscribe((res) => {
            this.comment_noti_list = res;
          });
        this._pusher.getCommentNoti().subscribe((res) => {
          this.comment_noti_list.unshift(res);
          this.new_noti += 1;
        });
      }

      this._pusher.InitNotificationChannel(
        'reply-channel',
        'reply',
        this.id
      );

      this._replyService.getNotificationReply(this.id).subscribe((res) => {
        if (res.length != 0) {
          this.reply_noti_list.push(res);
        }
      });

      if (this.role == 'user') {
        this._pusher.getCommentNoti().subscribe(
          res => {
            this.comment_noti_list.unshift(res);
            this.new_noti += 1;
            console.log(res);
            
          }
        )
      }
    });
  }

  onOpenModal() {
    this.modalType = 'exampleModalCenter';
  }

  onLogOut(): void {
    this.authService.onUserLogout().subscribe(
      (res) => {
        this.snackBar.onSuccess('ĐĂNG XUẤT');
      },
      (err) => {
        this.snackBar.onError();
      }
    );
    this.route.navigate(['home']);
  }

  onOpenNoti() {
    this.showNoti = !this.showNoti;
    this.showAccountDropdown = false;
    this.new_noti = 0;
  }
}
