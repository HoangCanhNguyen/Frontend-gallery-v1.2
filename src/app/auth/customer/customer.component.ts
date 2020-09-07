import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { SignupComponent } from 'src/app/auth/customer/signup/signup.component'
import {LoginComponent} from 'src/app/auth/customer/login/login.component'
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '87vh';
    dialogConfig.width = '30vw';
    dialogConfig.id = 'signup'
    dialogConfig.position = { top: '100px' };
    this.matDialog.open(SignupComponent, dialogConfig);
  }

  onOpenlogin(): void {
    this.dialogRef.close()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '68vh';
    dialogConfig.width = '25vw';
    dialogConfig.id = 'login'
    dialogConfig.position = { top: '140px' };
    this.matDialog.open(LoginComponent, dialogConfig);
  }


  close() {
    this.dialogRef.close()
  }
}
