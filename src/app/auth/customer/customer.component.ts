import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { SignupComponent } from 'src/app/auth/customer/signup/signup.component'
import { LoginComponent } from 'src/app/auth/customer/login/login.component'
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  constructor(
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<CustomerComponent>
  ) { }

  ngOnInit(): void { }

  onOpenSignUp(): void {
    this.dialogRef.close()
    this.matDialog.open(SignupComponent);
  }

  onOpenlogin(): void {
    this.dialogRef.close()
    this.matDialog.open(LoginComponent);
  }


  close() {
    this.dialogRef.close()
  }
}
