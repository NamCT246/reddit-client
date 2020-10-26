import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { switchMap, catchError, finalize, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginResponsePayload } from './login/login-response.payload';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  refreshTokenInProgress = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url.indexOf('refresh') !== -1 ||
      request.url.indexOf('login') !== -1
    ) {
      return next.handle(request);
    }

    const jwt = this.authService.getJwt();

    if (jwt) {
      request = this.addAuthToken(request, jwt);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 403) {
          return this.handleAuthErrors(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = true;

      // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
      this.refreshTokenSubject.next(null);

      return this.authService.callRefreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponsePayload) => {
          this.refreshTokenSubject.next(
            refreshTokenResponse.authenticationToken
          );
          return next.handle(
            this.addAuthToken(req, refreshTokenResponse.authenticationToken)
          );
        }),
        finalize(() => (this.refreshTokenInProgress = false))
      );
    }
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
