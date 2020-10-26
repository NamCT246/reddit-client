import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { ToasterService } from '../toaster/toaster.service';
import { LoginResponsePayload } from './login/login-response.payload';
import { LoginRequestPayload } from './login/login-request.payload';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:8080/api/auth';

  private userSubject: BehaviorSubject<LoginResponsePayload>;
  readonly user: Observable<LoginResponsePayload>;

  constructor(
    private ngLocalStorage: LocalStorageService,
    private httpClient: HttpClient,
    private toaster: ToasterService,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<LoginResponsePayload>(null);
    this.user = this.userSubject.asObservable();
  }

  public get currentUser(): LoginResponsePayload {
    return this.userSubject.value;
  }

  getUsername(): string {
    return this.ngLocalStorage.retrieve('username');
  }

  getRefreshToken(): string {
    return this.ngLocalStorage.retrieve('refreshToken');
  }

  getExpiredAt(): string {
    return this.ngLocalStorage.retrieve('expiredAt');
  }

  getJwt(): string {
    return this.ngLocalStorage.retrieve('authenticationToken');
  }

  login(payload: LoginRequestPayload): Observable<LoginResponsePayload> {
    return this.httpClient
      .post<LoginResponsePayload>(this.baseUrl + '/login', payload)
      .pipe(
        tap((data) => {
          this.ngLocalStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.ngLocalStorage.store('username', data.username);
          this.ngLocalStorage.store('refreshToken', data.refreshToken);
          this.ngLocalStorage.store('expiredAt', data.expiredAt);

          this.startRefreshTokenTimer();
        }),
        map((user) => {
          this.userSubject.next(user);

          return user;
        })
      );
  }

  logout(): void {
    this.httpClient
      .post(this.baseUrl + '/logout', {
        username: this.getUsername(),
        refreshToken: this.getRefreshToken(),
      })
      .subscribe((response) => {
        console.log(response);
      });

    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return Boolean(this.getJwt());
  }

  startRefreshTokenTimer() {
    // return this.loginService.login().pipe()
  }

  callRefreshToken(): Observable<LoginResponsePayload> {
    return this.httpClient
      .post<LoginResponsePayload>(`${this.baseUrl}/refreshtoken`, {
        refreshToken: this.getRefreshToken(),
        username: this.getUsername(),
      })
      .pipe(
        tap(
          (data) => {
            this.ngLocalStorage.store(
              'authenticationToken',
              data.authenticationToken
            );
          },
          (error) => {
            console.error(error);
            this.toaster.error('Session expired. Try log in again');

            throw new Error(
              'Could not fetch a new token from current refresh token'
            );
          }
        ),
        map((response) => {
          this.userSubject.next(response);

          return response;
        })
      );
  }
}
