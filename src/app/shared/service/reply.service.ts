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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  setReply(reply): Observable<any> {
    return this.httpClient.post(this.SET_REPLY_URL, reply, this.httpOptions);
  }

  getReply(reply_info): Observable<any> {
    return this.httpClient
      .post(this.GET_REPLY_URL, reply_info, this.httpOptions)
      .pipe(
        catchError((error) => {
          return Observable.throw(error);
        })
      );
  }
}
