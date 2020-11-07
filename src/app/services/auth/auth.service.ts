import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, finalize, map, tap } from 'rxjs/operators';

import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '@models/auth/login/login-request.payload';
import { LoginResponsePayload } from '@models/auth/login/login-response.payload';
import { Router } from '@angular/router';
import { ToasterService } from '@services/toaster/toaster.service';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  private userSubject: BehaviorSubject<LoginResponsePayload>;
  readonly user: Observable<LoginResponsePayload>;

  constructor(
    private ngLocalStorage: LocalStorageService,
    private httpClient: HttpClient,
    private router: Router,
    private toaster: ToasterService
  ) {
    this.userSubject = new BehaviorSubject<LoginResponsePayload>(
      this.getAuthUser()
    );
    this.user = this.userSubject.asObservable();
  }

  public get currentUser(): LoginResponsePayload {
    return this.userSubject.value;
  }

  private getAuthUser(): LoginResponsePayload {
    return JSON.parse(this.ngLocalStorage.retrieve('authUser'));
  }

  login(payload: LoginRequestPayload): Observable<LoginResponsePayload> {
    return this.httpClient
      .post<LoginResponsePayload>(this.baseUrl + '/login', payload)
      .pipe(
        tap((data) => {
          this.ngLocalStorage.store('authUser', JSON.stringify(data));

          this.startRefreshTokenTimer();
        }),
        map((user) => {
          this.userSubject.next(user);

          return user;
        })
      );
  }

  logout(): void {
    const { username, refreshToken } = this.getAuthUser();

    this.httpClient
      .post(this.baseUrl + '/logout', { username, refreshToken })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 200) {
            this.toaster.success('Successfully logged out');

            return of('Logged out');
          }
        }),
        finalize(() => {
          this.router.navigate(['/login']);
          this.userSubject.next(null);
          this.ngLocalStorage.clear('authUser');
        })
      )
      .subscribe();
  }

  isLoggedIn(): boolean {
    return Boolean(this.currentUser && this.currentUser.authenticationToken);
  }

  startRefreshTokenTimer() {
    // return this.loginService.login().pipe()
  }

  callRefreshToken(): Observable<LoginResponsePayload> {
    const { username, refreshToken } = this.getAuthUser();
    return this.httpClient
      .post<LoginResponsePayload>(`${this.baseUrl}/refreshtoken`, {
        username,
        refreshToken,
      })
      .pipe(
        tap(
          (data) => {
            this.ngLocalStorage.store('authUser', JSON.stringify(data));
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
