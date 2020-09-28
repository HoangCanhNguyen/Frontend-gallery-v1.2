import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackbarNotiService {

  constructor(private _snackBar: MatSnackBar) { }

  onSuccess(msg: string) {
    this._snackBar.open(msg, 'THÀNH CÔNG', {
      duration: 2500,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }



  onLoginError() {
    this._snackBar.open('HÃY ĐĂNG NHẬP', 'KHÔNG THÀNH CÔNG', {
      duration: 2500,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  
  onError() {
    this._snackBar.open('ĐÃ XẢY RA LỖI', 'KHÔNG THÀNH CÔNG', {
      duration: 2500,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  onServerError(err) {
    this._snackBar.open(err.error.msg, 'KHÔNG THÀNH CÔNG', {
      duration: 2500,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

}
