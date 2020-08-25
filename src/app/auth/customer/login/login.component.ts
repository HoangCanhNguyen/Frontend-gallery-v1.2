import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';
import { SignupComponent } from 'src/app/auth/customer/signup/signup.component'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthenticateService,
    private snackbarSerivce: SnackbarNotiService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      raw_password: new FormControl()
    });
  }

  onOpenSignUp(): void {
    this.dialogRef.close()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '87vh';
    dialogConfig.width = '30vw';
    dialogConfig.id = 'signup'
    dialogConfig.position = { top: '100px' };
    const modalDialog = this.matDialog.open(SignupComponent, dialogConfig);
  }

  onSubmit() {
    this.authService.onUserLogin(this.loginForm).subscribe(
      (res) => {
        this.snackbarSerivce.onStart('ĐĂNG NHẬP');
        this.dialogRef.close()
      },
      (err) => {
        this.snackbarSerivce.onError(err)
      }
    );
  }

  google() {
    this.authService.GoogleAuth();
  }

  facebook() {
    this.authService.FacebookAuth();
  }
}
