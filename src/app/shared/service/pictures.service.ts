import { Injectable } from '@angular/core';
import { Picture } from '../model/picture.model';
import { API_URL } from '../../env';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PicturesService {
  picturesList: Picture[] = [];

  GET_ALL_URL = `${API_URL}/pictures`;
  GET_BY_ID_URL = `${API_URL}/getbyid`;
  GET_NEW_PIC_URL = `${API_URL}/newpics`;
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  getData(): Observable<any> {
    return this.httpClient
      .get(this.GET_ALL_URL)
      .pipe(catchError(async (error) => new Error(error)));
  }

  getPicById(id) {
    return this.httpClient.post(this.GET_BY_ID_URL, id, this.httpOptions);
  }

  getNewPics(): Observable<any> {
    return this.httpClient
      .get(this.GET_NEW_PIC_URL)
      .pipe(catchError(async (error) => new Error(error)));
  }
}
