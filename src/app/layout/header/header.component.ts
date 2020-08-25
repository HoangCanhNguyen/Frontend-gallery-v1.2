import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomerComponent } from 'src/app/auth/customer/customer.component';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { GetCarouselHeightService } from 'src/app/shared/service/getCarouselHeight.service';
import { Route, ActivatedRoute, Params } from '@angular/router';
import { UserModule } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('stickyHeader') stickyHeader: HTMLElement;
  sticky = false;
  logoImage =
    'https://musea.qodeinteractive.com/wp-content/uploads/2019/09/logo-light.png';

  userIcon: string;
  carouselHeight = 0;

  showModal: boolean;
  registerForm: FormGroup;
  role: string;

  isLoggedIn = false;
  user: UserModule;
  username: string;
  id: any

  constructor(
    public matDialog: MatDialog,
    public authService: AuthenticateService,
    private _snackBar: MatSnackBar,
    private getCarouselHeightService: GetCarouselHeightService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
    this.getCarouselHeightService.carouselHeight.subscribe((height) => {
      if (height > 0) {
        this.carouselHeight = height;
        this.logoImage =
          'https://musea.qodeinteractive.com/wp-content/uploads/2019/09/logo-light.png';
        this.userIcon =
          'https://cdn2.iconfinder.com/data/icons/user-interface-180/128/User-Interface-209-512.png';
      } else {
        this.carouselHeight = 0;
        this.sticky = true;
        this.logoImage =
          'https://musea.qodeinteractive.com/wp-content/uploads/2019/09/logo-dark.png';
        this.userIcon =
          'https://mpng.subpng.com/20191210/cal/transparent-people-icon-user-icon-ui-icon-5df0a40caf3689.5204044715760517247177.jpg';
        document.getElementById('fixed').classList.remove('fixed-top');
      }
    });

    this.authService.currentUser.subscribe((user) => {
      if (user == null) {
        this.username = '';
      } else {
        this.username = user.username;
        this.role = user.role;
        this.isLoggedIn = true;
        this.id = user.id
      }
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
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(): void {
    if (
      (this.carouselHeight > 0 &&
        document.body.scrollTop > this.carouselHeight) ||
      (this.carouselHeight > 0 &&
        document.documentElement.scrollTop > this.carouselHeight) ||
      (this.carouselHeight === 0 &&
        document.body.scrollTop === this.carouselHeight) ||
      (this.carouselHeight === 0 &&
        document.documentElement.scrollTop === this.carouselHeight)
    ) {
      this.sticky = true;
      this.logoImage =
        'https://musea.qodeinteractive.com/wp-content/uploads/2019/09/logo-dark.png';
    } else {
      this.sticky = false;
      this.logoImage =
        'https://musea.qodeinteractive.com/wp-content/uploads/2019/09/logo-light.png';
    }
  }
}
