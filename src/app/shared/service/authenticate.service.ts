import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../env';
import { UserModule } from 'src/app/shared/model/user.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackbarNotiService } from './snackbar-noti.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  SET_USER_URL = `${API_URL}/users/register`;
  GET_USER_URL = `${API_URL}/users/login`;

  GET_USER_ID_URL = `${API_URL}/user`

  setUser: setUserInfo;
  getUser: getUserInfo;


  logged = new Subject<boolean>();

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<UserModule>;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(
    private httpClient: HttpClient,
    public afAuth: AngularFireAuth,
    private snackbarService: SnackbarNotiService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  setTokenOnHeaders() {
    const token = localStorage.getItem('currentUser');
    if (token) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        }),
      };
    } else {
      console.log('Token does not exist in headers');
    }
  }

  onSetUserInfo(userInfo) {
    this.setUser = {
      username: userInfo.get('username').value.toLowerCase(),
      password: userInfo.get('password').value.toLowerCase(),
      created_at: (new Date()).toString(),
      email: userInfo.get('email').value.toLowerCase(),
      role: userInfo.get('role').value
    };
    console.log(this.setUser);
  }

  onGetUserInfo(userInfo) {
    this.getUser = {
      username: userInfo.get('username').value.toLowerCase(),
      password: userInfo.get('password').value.toLowerCase(),
    };
  }

  setUserInfo(userInfo): Observable<any> {
    this.onSetUserInfo(userInfo);
    return this.httpClient.post(
      this.SET_USER_URL,
      this.setUser,
      this.httpOptions
    );
  }

  onGetUserById(id):Observable<any> {
    return this.httpClient.post(this.GET_USER_ID_URL, id, this.httpOptions)
  }

  onLogin(userInfo): Observable<any> {
    this.onGetUserInfo(userInfo);
    return this.httpClient
      .post(this.GET_USER_URL, this.getUser, this.httpOptions)
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.snackbarService.onStart('ĐĂNG NHẬP');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  
  loggedOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}

interface setUserInfo {
  username: string;
  created_at: string;
  password: string;
  email: string;
  role: string;
}

interface getUserInfo {
  username: string;
  password: string;
}

