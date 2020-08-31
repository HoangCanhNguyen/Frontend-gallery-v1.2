import { Component } from '@angular/core';
import { AuthenticateService } from './shared/service/authenticate.service';
import { throwIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';

  constructor(private authenticate: AuthenticateService) {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.authenticate.onGetUserInfo();
    }
  }
}
