import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.css']
})
export class PreloadComponent implements OnInit {
  showPreload: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent: RouterEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.showPreload = true;
      }
      else if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
        this.showPreload = false;
      }
    })
  }

  ngOnInit(): void {
  }

}
