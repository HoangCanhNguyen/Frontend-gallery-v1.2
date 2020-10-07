import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class ReplyService {
  SET_REPLY_URL = `${API_URL}/reply/create`;
  GET_REPLY_URL = `${API_URL}/reply`;

  GET_NOTIFICATION_REPLY_URL = `${API_URL}/notification/reply`;
  constructor(private httpClient: HttpClient) {}

  setReply(reply): Observable<any> {
    return this.httpClient.post(this.SET_REPLY_URL, reply);
  }

  getReply(reply_info): Observable<any> {
    return this.httpClient.post(this.GET_REPLY_URL, reply_info).pipe(
      catchError((error) => {
        return Observable.throw(error);
      })
    );
  }

  getNotificationReply(_id: string): Observable<any> {
    return this.httpClient.get(this.GET_NOTIFICATION_REPLY_URL + '/' + _id);
  }
}
