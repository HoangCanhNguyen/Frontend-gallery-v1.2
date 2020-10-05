import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { UserModule } from 'src/app/shared/model/user.model';
import { Router } from '@angular/router';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userInfo: any;
  username: string;
  id: string;
  role: string;
  modalType: string;

  showAccountDropdown: boolean = false;
  showNoti = false;
  showResponsiveAccDropdown: boolean = false;

  constructor(
    public authService: AuthenticateService,
    private route: Router,
    private snackBar: SnackbarNotiService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((data) => {
      this.userInfo = data;
      this.username = this.userInfo['username'];
      this.role = this.userInfo.role;
      this.id = this.userInfo.id;
    });
  }

  onSubmit(): void { }

  onOpenModal() {
    this.modalType = 'exampleModalCenter';
  }

  onLogOut(): void {
    this.authService.onUserLogout().subscribe(
      (res) => {
        this.snackBar.onSuccess('ĐĂNG XUẤT');
      },
      (err) => {
        this.snackBar.onError();
      }
    );
    this.route.navigate(['home']);
  }
}
