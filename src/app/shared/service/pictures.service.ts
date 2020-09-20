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

  GET_PICTURE_URL = `${API_URL}/pictures`;
  CREATE_NEW_PIC_URL = `${API_URL}/picture/create`;
  EDIT_PIC_URL = `${API_URL}/picture/update`;

  constructor(private httpClient: HttpClient, private uploadService: UploadImageService) {}

  getData(): Observable<any> {
    return this.httpClient
      .get(this.GET_PICTURE_URL)
      .pipe(catchError(async (error) => new Error(error)));
  }

  getPicById(id): Observable<any> {
    return this.httpClient.post(this.GET_PICTURE_URL, id);
  }

  onCreatePic(data){
    this.uploadService.onUploadPicture(data).then(
      () => {
        this.httpClient.post(this.CREATE_NEW_PIC_URL, data)        
      }
    )
    // return this.httpClient.post(this.CREATE_NEW_PIC_URL, data);
  }

  onEditPic(data): Observable<any> {
    return this.httpClient.put(this.EDIT_PIC_URL, data);
  }
}
