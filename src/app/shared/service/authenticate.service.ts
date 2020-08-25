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

  GET_USER_ID_URL = `${API_URL}/user`;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<UserModule>;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private httpClient: HttpClient, public afAuth: AngularFireAuth) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  onUserRegister(userInfo): Observable<any> {
    return this.httpClient.post(
      this.USER_REGISTER_URL,
      userInfo.value,
      this.httpOptions
    );
  }

  onUserLogin(userInfo): Observable<any> {
    return this.httpClient
      .post(this.USER_LOGIN_URL, userInfo.value, this.httpOptions)
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
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
