import { Injectable } from '@angular/core';
import { Picture } from '../model/picture.model';
import { API_URL } from '../../env';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PicturesService {
  editedPic = new Subject<Picture>();

  GET_PICTURE_URL = `${API_URL}/pictures`;
  GET_NEW_PIC_URL = `${API_URL}/newpics`;
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  getData(): Observable<any> {
    return this.httpClient
      .get(this.GET_PICTURE_URL)
      .pipe(catchError(async (error) => new Error(error)));
  }

  getPicById(id): Observable<any> {
    return this.httpClient.post(this.GET_PICTURE_URL, id);
  }

  getNewPics(): Observable<any> {
    return this.httpClient
      .get(this.GET_NEW_PIC_URL)
      .pipe(catchError(async (error) => new Error(error)));
  }

}
