import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { API_URL } from '../../env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_UPLOAD_AVATAR_URL = `${API_URL}/user/avatar/upload`;

  constructor(private httpClient: HttpClient) { }

  onUploadAvatar(url): Observable<any> {
    return this.httpClient.post(this.USER_UPLOAD_AVATAR_URL, url)
  }
}
