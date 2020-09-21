import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';
import { LoginComponent } from 'src/app/auth/customer/login/login.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('retypePw') retypePassword: ElementRef;

  errorMessage: string = null;

  hide = true;
  seller = false;
  artist = false;

  signUpForm: FormGroup;

  constructor(
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<SignupComponent>,
    private authService: AuthenticateService,
    private snackbarService: SnackbarNotiService
  ) { }

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      raw_password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onOpenlogin(): void {
    this.dialogRef.close();
    const modalDialog = this.matDialog.open(LoginComponent);
  }

  // verifyPassword(): void {
  //   const pw = this.signUpForm.get('password').value;
  //   const verifyPw = this.signUpForm.get('verifyPw').value;
  //   if (pw !== verifyPw) {
  //     this.errorMessage = 'Không khớp! Vui lòng nhập lại!';
  //   } else {
  //     this.errorMessage = null;
  //   }
  // }
  onSubmit(): void {
    this.authService.onUserRegister(this.signUpForm).subscribe(
      (res) => {
        this.snackbarService.onSuccess('ĐĂNG KÝ');
        this.dialogRef.close();
      },
      (err) => {
        this.snackbarService.onError(err);
      }
    );
  }

  close() {
    this.dialogRef.close()
  }
}
