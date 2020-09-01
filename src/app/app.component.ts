import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './shared/service/authenticate.service';
import { throwIfEmpty } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  showHeader = true;
  showFooter = true;

  constructor(private authenticate: AuthenticateService, private activatedRoute: ActivatedRoute, private router: Router) {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.authenticate.onGetUserInfo();
    }
  }

  ngOnInit() {
    // delete Header and Footer in Console page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.activatedRoute.firstChild.snapshot.routeConfig.path === "console") {
          this.showHeader = false;
          this.showFooter = false;
        } else {
          this.showHeader = true;
          this.showFooter = true;
        }
      }
    });
  }
}
