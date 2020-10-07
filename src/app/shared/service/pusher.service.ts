import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { RegisterNoti } from '../model/register-noti.model';
import { CommentNotiModel } from '../model/comment-noti.model';

import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private RegistrationSubject: Subject<RegisterNoti> = new Subject<
    RegisterNoti
  >();
  private NotificationSubject: Subject<CommentNotiModel> = new Subject<
    CommentNotiModel
  >();

  private pusherClient: Pusher;

  constructor() {
    this.pusherClient = new Pusher('f9c2195a4cd9fefb3c71', { cluster: 'ap1' });

    const registration_channel = this.pusherClient.subscribe('vendor_register');

    registration_channel.bind('registration', (data) => {
      this.RegistrationSubject.next(
        new RegisterNoti(
          data.id,
          data.username,
          data.email,
          data.role,
          data.status
        )
      );
    });
  }

  InitNotificationChannel(channel: string, event: string,id: string) {
    const channel_name = `${channel}_`+id;
    console.log(channel_name);
    
    const comment_notification_channel = this.pusherClient.subscribe(channel_name);

    comment_notification_channel.bind(`${event}`, (data) => {
      this.NotificationSubject.next(
        new CommentNotiModel(
          data.pic_id,
          data.pic_title,
          data.created_at,
          data.commenter_username,
          data.category
        )
      );
    });
  }


  getRegisterNoti(): Observable<RegisterNoti> {
    return this.RegistrationSubject.asObservable();
  }

  getCommentNoti(): Observable<CommentNotiModel> {
    return this.NotificationSubject.asObservable();
  }
}
