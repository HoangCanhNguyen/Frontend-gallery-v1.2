import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../shared/service/authenticate.service';
import { Router } from '@angular/router';
import { SnackbarNotiService } from '../shared/service/snackbar-noti.service';
import { UserModule } from '../shared/model/user.model';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
})
export class ConsoleComponent implements OnInit {
  isOpened = true;

  vendorInfo: UserModule;

  constructor(
    private authService: AuthenticateService,
    private route: Router,
    private snackBar: SnackbarNotiService
  ) {}

  isLogedIn = false;

  ngOnInit(): void {
    this.authService.onGetUserInfo()
    this.authService.isVendorLogedIn.subscribe((vendorStatus) => {
      this.isLogedIn = vendorStatus;
    });
    this.authService.currentUser.subscribe((res) => {
      this.vendorInfo = {
        id: res.id,
        username: res.username,
      };
      console.log(this.vendorInfo);
    });
  }

  onLogoutVendor() {
    this.authService.onVendorLogout().subscribe((succ) => {
      this.snackBar.onSuccess('ĐĂNG XUẤT');
      this.route.navigate(['console']);
    });
  }

  onNavigateToArtistDetail() {
    this.route.navigate(['/artists', this.vendorInfo.id, this.vendorInfo.username])
  }
}
