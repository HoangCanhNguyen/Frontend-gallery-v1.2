import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-collector-login',
  templateUrl: './artist-collector-login.component.html',
  styleUrls: ['./artist-collector-login.component.css'],
})
export class ArtistCollectorLoginComponent implements OnInit {
  hide = true;
  isArtist = false;

  constructor(
    private authService: AuthenticateService,
    private snackbarSerivce: SnackbarNotiService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((res) => {
      if (res.role === 'artist') {
        this.isArtist = true;
      } else {
        this.isArtist = false;
      }
    });
  }

  onSubmitLogInForm(form: NgForm) {
    this.authService.onVendorLogin(form).subscribe(
      (res) => {
        this.snackbarSerivce.onSuccess('ĐĂNG NHẬP');
      },
      (err) => {
        this.snackbarSerivce.onServerError(err);
      }
    );
  }
}
