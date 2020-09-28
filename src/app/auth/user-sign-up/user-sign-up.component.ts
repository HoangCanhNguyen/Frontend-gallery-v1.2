import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css'],
})
export class UserSignUpComponent implements OnInit {

  @ViewChild('signUpModalElement') signUpModalElement: ElementRef
  @Input() signUpModal: string;
  signUpForm: FormGroup;

  constructor(private _auth: AuthenticateService, private _snackBar: SnackbarNotiService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      raw_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this._auth.onUserRegister(this.signUpForm).subscribe((res) => {
      this._snackBar.onSuccess(res.msg)
      this.signUpModalElement.nativeElement.click()
    });
  }
}
