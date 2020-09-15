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
  CREATE_NEW_PIC_URL = `${API_URL}/picture/create`;

  constructor(private httpClient: HttpClient) {}

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

  onCreatePic(data): Observable<any> {
    return this.httpClient.post(this.CREATE_NEW_PIC_URL, data);
  }
}
