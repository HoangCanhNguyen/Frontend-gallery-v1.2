import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
 
@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    const token = localStorage.getItem("access_token")
    if (!token) {
      return next.handle(request)
    }
 
    request = request.clone({headers: request.headers.set('Authorization', `Bearer ${JSON.parse(token)}`)});
    return next.handle(request);
 
  }
}
