import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './shared/service/authenticate.service';
import * as AOS from 'aos'
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
    //add element on scrolling using AOS library
    let scrollRef = 0;
    AOS.init({
      delay: 50,
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
    window.addEventListener("scroll", function () {
      scrollRef <= 10 ? scrollRef++ : AOS.refresh();
    });

  }
}
