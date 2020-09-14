import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { RegisterNoti } from '../model/register-noti.model';

import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private subject: Subject<RegisterNoti> = new Subject<RegisterNoti>();
  private pusherClient: Pusher;

  constructor() {
    this.pusherClient = new Pusher('f9c2195a4cd9fefb3c71', { cluster: 'ap1' });

    const channel = this.pusherClient.subscribe('vendor_register');

    channel.bind('registration', (data) => {
      this.subject.next(
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

  getRegisterNoti(): Observable<RegisterNoti> {
    return this.subject.asObservable();
  }
}
