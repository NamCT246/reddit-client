import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request.url);

    let duplicate;

    if (
      request.url.indexOf('refresh') !== -1 ||
      request.url.indexOf('login') !== -1
    ) {
      return next.handle(request);
    }

    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({
    //     headers: request.headers.set('Content-Type', 'application/json'),
    //   });
    // }

    // this.addAuthToken(request, this.authService.getJwt());

    duplicate = request.clone({
      headers: request.headers.set(
        'Authorization',
        'Bearer ' + this.authService.getJwt()
      ),
    });

    return next.handle(duplicate);
  }

  private addAuthToken(request: HttpRequest<any>, jwt: string) {
    // If request are calling an outside domain, or no token is provided then do not add the token,
    if (
      !jwt ||
      !request.url.match(/^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/)
    ) {
      return request;
    }

    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + jwt),
    });
  }
}
