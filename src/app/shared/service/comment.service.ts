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



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  setComment(cmt): Observable<any> {
    return this.httpClient.post(this.COMMENT_URL, cmt, this.httpOptions);
  }

  getComment(pic_id): Observable<any> {
    return this.httpClient.post(
      this.COMMENT_URL,
      pic_id,
      this.httpOptions
    ).pipe(
      catchError((error) => {
        return Observable.throw(error);
      })
    );
  }


}
