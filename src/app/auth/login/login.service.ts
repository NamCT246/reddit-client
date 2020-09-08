import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { LoginRequestPayload } from './login-request.payload';
import { LoginResponsePayload } from './login-response.payload';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  endpoint: string = 'http://localhost:8080/api/auth/login';

  constructor(
    private httpClient: HttpClient,
    private ngLocalStorage: LocalStorageService
  ) {}

  login(payload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponsePayload>(this.endpoint, payload)
      .pipe(
        map((data) => {
          this.ngLocalStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.ngLocalStorage.store('username', data.username);
          this.ngLocalStorage.store('refreshToken', data.refreshToken);
          this.ngLocalStorage.store('expiredAt', data.expiredAt);

          return true;
        })
      );
  }
}
