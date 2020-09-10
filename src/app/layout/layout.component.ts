import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../shared/service/authenticate.service';
import { PreloadService } from '../shared/service/preload.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  isAdmin = false;
  showPreload: boolean = false;

  constructor(private authService: AuthenticateService, private preloadService: PreloadService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((vendor) => {
      if (vendor.role === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });

    this.preloadService.preloadSubject.subscribe((res => {
      this.showPreload = res
    }))
  }
}
