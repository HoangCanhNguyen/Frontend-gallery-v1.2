import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../env';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  COMMENT_URL = `${API_URL}/comments`;
  COMMENT_CREATION_URL = `${API_URL}/comment/create`;

  GET_NOTI_COMMENT_URL = `${API_URL}/notification/comment/`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  onCreateComment(cmt): Observable<any> {
    return this.httpClient.post(
      this.COMMENT_CREATION_URL,
      cmt,
      this.httpOptions
    );
  }

  getComment(pic_id): Observable<any> {
    return this.httpClient
      .post(this.COMMENT_URL, pic_id, this.httpOptions)
      .pipe(
        catchError((error) => {
          return Observable.throw(error);
        })
      );
  }

  getCommentNotification(_id: string): Observable<any> {
    return this.httpClient.get(this.GET_NOTI_COMMENT_URL + _id);
  }

  getCommentById(_id): Observable<any> {
    return this.httpClient.get(this.COMMENT_URL + '/' + _id);
  }
}
