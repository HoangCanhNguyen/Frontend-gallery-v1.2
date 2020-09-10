import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../shared/service/authenticate.service';
import { Router } from '@angular/router';
import { SnackbarNotiService } from '../shared/service/snackbar-noti.service';
import { PreloadService } from '../shared/service/preload.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
  
  isOpened = true;

  showPreload: boolean = false;

  constructor(
    private authService: AuthenticateService,
    private route: Router,
    private snackBar: SnackbarNotiService,
    private preloadService: PreloadService
  ) { }

  isLogedIn = false

  ngOnInit(): void {
    this.authService.isVendorLogedIn.subscribe(
      (vendorStatus) => {
        this.isLogedIn = vendorStatus
      }
    )

    this.preloadService.preloadSubject.subscribe((res => {
      this.showPreload = res
    }))
  }

  onLogoutVendor() {
    this.authService.onVendorLogout().subscribe(
      (succ) => {
        this.snackBar.onSuccess("ĐĂNG XUẤT")
        this.route.navigate(['console'])
      } 
    )
  }

}
