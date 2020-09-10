import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

import { ToasterService } from '../toaster/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:8080/api/auth';

  constructor(
    private ngLocalStorage: LocalStorageService,
    private httpClient: HttpClient,
    private toaster: ToasterService
  ) {}

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

  refreshToken(): string {
    this.httpClient
      .post(`${this.baseUrl}/refreshtoken`, {
        refreshToken: this.getRefreshToken(),
        username: this.getUsername(),
      })
      .subscribe(
        (data) => {
          console.log(data);
          // this.ngLocalStorage.store(
          //   'authenticationToken',
          //   data.authenticationToken
          // );
        },
        (error) => {
          console.error(error);
          this.toaster.error('Session expired. Try log in again');

          throw new Error(
            'Could not fetch a new token from current refresh token'
          );
        }
      );

    return;
  }
}
