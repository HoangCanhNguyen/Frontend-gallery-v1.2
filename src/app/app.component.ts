import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './shared/service/authenticate.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  showHeader = true;
  showFooter = true;

  constructor(private authenticate: AuthenticateService) {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.authenticate.onGetUserInfo();
    }
  }

  ngOnInit() {
  }
}
