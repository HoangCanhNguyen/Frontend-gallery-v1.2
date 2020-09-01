import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomerComponent } from 'src/app/auth/customer/customer.component';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { Route, ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { UserModule } from 'src/app/shared/model/user.model';
import { Subject } from 'rxjs';
import { GetCarouselHeightService } from 'src/app/shared/service/get-carousel-height.service';

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
    private activatedRoute: ActivatedRoute,
    private getCarouselHeight: GetCarouselHeightService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     switch (this.activatedRoute.firstChild.snapshot.routeConfig.path) {
    //       case "home":
    //         this.fixed_top_class = true;
    //         this.sticky_class = false;
    //         break;
    //       case "list":
    //         this.fixed_top_class = false;
    //         this.sticky_class = true;
    //         break;
    //       case "artists":
    //         this.fixed_top_class = true;
    //         this.sticky_class = false;
    //         break;
    //       default:
    //         this.fixed_top_class = false;
    //         this.sticky_class = true;
    //     }
    //   }
    // });

    // this.getCarouselHeight.carouselHeight.subscribe((height) => {
    //   if (height > 0) {
    //     this.carouselHeight = height;
    //   }
    //   else {
    //     this.carouselHeight = 0;
    //     this.sticky_class = true;
    //     this.fixed_top_class = false;
    //   }
    // });


    this.authService.currentUser.subscribe((data) => {
      this.userInfo = data;
      this.username = this.userInfo["username"];
      this.role = this.userInfo.role;
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

  // @HostListener('window:scroll', ['$event'])
  // handleScroll(): void {
  //   if (this.carouselHeight > 0 && window.scrollY >= this.carouselHeight) {
  //     this.sticky_class = true;
  //     this.fixed_top_class = false;
  //     this.fixedNav = true;
  //   }
  //   else if (this.carouselHeight > 0 && window.scrollY < this.carouselHeight) {
  //     this.sticky_class = false;
  //     this.fixed_top_class = true;
  //     this.fixedNav = false;
  //   }
  //   else {
  //     this.fixedNav = false;
  //   }
  // }
}
