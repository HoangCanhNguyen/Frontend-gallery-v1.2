import {
  Component,
  OnInit,
} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomerComponent } from 'src/app/auth/customer/customer.component';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { UserModule } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  fixed_top_class = true;
  sticky_class = false;
  fixedNav = false;
  carouselHeight = 0;

  showModal: boolean;
  role: string;

  isLoggedIn = false;
  user: UserModule;
  userInfo: any;
  username: string;
  id: any;

  constructor(
    public matDialog: MatDialog,
    public authService: AuthenticateService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((data) => {
      this.userInfo = data;
      this.username = this.userInfo["username"];
      this.role = this.userInfo.role
      this.id = this.userInfo.id
    });


  }

  openCustomerModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '485px';
    dialogConfig.width = '520';
    dialogConfig.position = { top: '140px' };
    const modalDialog = this.matDialog.open(CustomerComponent, dialogConfig);
  }

  onSubmit(): void { }

  onLogOut(): void {
    this.authService.onUserLogout()
  }

}
