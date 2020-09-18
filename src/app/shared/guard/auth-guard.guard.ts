import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import decode from 'jwt-decode';

import { AuthenticateService } from '../service/authenticate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      const tokenPayload = decode(token);
      const expectedRole = route.data.expectedRole;
      if (
        !this.authService.loginStatus() &&
        expectedRole !== tokenPayload.user_claims.role
      ) {
        this.router.navigate(['/home'])
        return false;
      } else {
        return true;
      }
    } else {
      window.alert('Vui lòng đăng nhập/đăng kí để thực hiện chức năng này!')
      this.router.navigate(['/home']);
    }
  }
}
