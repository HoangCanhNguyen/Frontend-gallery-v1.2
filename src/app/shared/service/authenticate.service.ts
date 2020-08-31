import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../env';
import { UserModule } from 'src/app/shared/model/user.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, throwIfEmpty } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  USER_REGISTER_URL = `${API_URL}/user/register`;
  USER_LOGIN_URL = `${API_URL}/user/login`;
  USER_LOGOUT_URL =  `${API_URL}/user/logout`

  GET_USER_ID_URL = `${API_URL}/user`;
  GET_USER_INFO = `${API_URL}/info`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  currentUser = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient, public afAuth: AngularFireAuth) {}

  onGetUserInfo() {
    return this.httpClient.get(this.GET_USER_INFO).subscribe((res) => {
      this.currentUser.next(res);
    });
  }

  onUserRegister(userInfo): Observable<any> {
    return this.httpClient.post(
      this.USER_REGISTER_URL,
      userInfo.value,
    );
  }

  onUserLogin(userInfo): Observable<any> {
    return this.httpClient
      .post(this.USER_LOGIN_URL, userInfo.value, this.httpOptions)
      .pipe(
        map((res) => {
          localStorage.setItem(
            'access_token',
            JSON.stringify(res['access_token'])
          );
          localStorage.setItem(
            'refresh_token',
            JSON.stringify(res['refresh_token'])
          );
          this.onGetUserInfo()
        })
      );
  }

  onUserLogout():Observable<any> { 
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    this.currentUser.next('')
    return this.httpClient.get(this.USER_LOGOUT_URL)
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {})
      .catch((error) => {
        window.alert(error);
      });
  }
}
