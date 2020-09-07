import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../env';
import { UserModule } from 'src/app/shared/model/user.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  USER_REGISTER_URL = `${API_URL}/user/register`;
  USER_LOGIN_URL = `${API_URL}/user/login`;
  USER_LOGOUT_URL = `${API_URL}/user/logout`;

  VENDOR_LOGIN_URL = `${API_URL}/vendor/login`;
  VENDOR_LOGOUT_URL = `${API_URL}/vendor/logout`;

  GET_USER_ID_URL = `${API_URL}/user`;
  GET_USER_INFO = `${API_URL}/info`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  currentUser = new BehaviorSubject<any>('');
  isVendorLogedIn = new BehaviorSubject<any>('');

  isAuthenticated = false;
  isVendor = false;

  constructor(private httpClient: HttpClient, public afAuth: AngularFireAuth) {}

  onGetUserInfo() {
    return this.httpClient.get(this.GET_USER_INFO).subscribe((res) => {
      this.currentUser.next(res);
      this.isVendorLogedIn.next(res)
    });
  }

  onUserRegister(userInfo): Observable<any> {
    return this.httpClient.post(this.USER_REGISTER_URL, userInfo.value);
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
          this.onGetUserInfo();
          this.isAuthenticated = true;
        })
      );
  }

  onUserLogout(): Observable<any> {
    return this.httpClient.get(this.USER_LOGOUT_URL).pipe(
      map((res) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.currentUser.next('');
        this.isAuthenticated = false;
      })
    );
  }

  onVendorLogin(vendorInfo): Observable<any> {
    return this.httpClient
      .post(this.VENDOR_LOGIN_URL, vendorInfo.value, this.httpOptions)
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
          this.onGetUserInfo();
          this.isAuthenticated = true;
          this.isVendor = true;
          this.isVendorLogedIn.next(this.isVendor);
        })
      );
  }

  onVendorLogout(): Observable<any> {
    return this.httpClient.get(this.VENDOR_LOGOUT_URL).pipe(
      map((res) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.currentUser.next('');
        this.isAuthenticated = false;
        this.isVendor = false;
        this.isVendorLogedIn.next(this.isVendor);
      })
    );
  }

  loginStatus() {
    return this.isAuthenticated;
  }

  VendorLoginStatus() {
    return this.isVendor;
  }

  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider());
  // }

  // FacebookAuth() {
  //   return this.AuthLogin(new auth.FacebookAuthProvider());
  // }

  // AuthLogin(provider) {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {})
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }
}
