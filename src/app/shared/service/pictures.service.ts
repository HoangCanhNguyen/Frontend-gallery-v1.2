import { Injectable } from '@angular/core';
import { Picture } from '../model/picture.model';
import { API_URL } from '../../env';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UploadImageService } from './upload-image.service';

@Injectable({
  providedIn: 'root',
})
export class PicturesService {
  editedPic = new Subject<Picture>();
  firebase_upload_url: string;

  GET_PICTURE_URL = `${API_URL}/pictures`;
  PIC_URL = `${API_URL}/picture/method`;
  GET_PICTURE_BY_ARTIST = `${API_URL}/picture`

  constructor(
    private httpClient: HttpClient,
    private uploadService: UploadImageService
  ) {}

  getData(): Observable<any> {
    return this.httpClient
      .get(this.GET_PICTURE_URL)
      .pipe(catchError(async (error) => new Error(error)));
  }

  getPicById(id): Observable<any> {
    return this.httpClient.post(this.GET_PICTURE_URL, id);
  }

  onCreatePic(data): Observable<any> {
    return this.httpClient.post(this.PIC_URL, data);
  }

  onEditPic(data): Observable<any> {
    return this.httpClient.put(this.PIC_URL, data);
  }

  onGetPicByArtist(artist: string): Observable<any> {
    return this.httpClient.get(this.GET_PICTURE_BY_ARTIST +'/' + artist)
  }
}
