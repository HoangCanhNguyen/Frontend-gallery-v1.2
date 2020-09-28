import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../shared/service/authenticate.service';
import { SnackbarNotiService } from '../shared/service/snackbar-noti.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @Input() modal: string;

  Form: FormGroup;
  modalType: string;
  @ViewChild('loginModal') loginModal: ElementRef;

  constructor(
    private _auth: AuthenticateService,
    private _snackBar: SnackbarNotiService
  ) {}

  ngOnInit(): void {
    this.Form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      raw_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    this._auth.onUserLogin(this.Form).subscribe(
      (res) => {
        this._snackBar.onSuccess('ĐĂNG NHẬP');
        this.loginModal.nativeElement.click();
      },
      (err) => {
        this._snackBar.onLoginError();
      }
    );
  }

  onOpenSignUp() {
    this.loginModal.nativeElement.click();
    this.modalType = 'sign-up-modal';
  }
}
