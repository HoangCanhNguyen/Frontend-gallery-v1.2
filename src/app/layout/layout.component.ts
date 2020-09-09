import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../shared/service/authenticate.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  isAdmin = false;

  constructor(private authService: AuthenticateService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((vendor) => {
      if (vendor.role === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }
}
