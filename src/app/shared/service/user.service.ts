import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { API_URL } from '../../env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_UPLOAD_AVATAR_URL = `${API_URL}/user/avatar/upload`;
  ADMIN_GET_ALL_ACCOUNT_INFO_URL = `${API_URL}/admin/account/manager`

  constructor(private httpClient: HttpClient) { }

  onUploadAvatar(url): Observable<any> {
    return this.httpClient.post(this.USER_UPLOAD_AVATAR_URL, url)
  }

  onGetAllAccount(): Observable<any> {
    return this.httpClient.get(this.ADMIN_GET_ALL_ACCOUNT_INFO_URL)
  }

}
