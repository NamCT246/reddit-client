import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginRequestPayload } from './login-request.payload';
import { LoginResponsePayload } from './login-response.payload';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  endpoint: string = 'http://localhost:8080/api/auth/login';

  constructor(private httpClient: HttpClient) {}

  login(payload: LoginRequestPayload): Observable<LoginResponsePayload> {
    return this.httpClient.post<LoginResponsePayload>(this.endpoint, payload);
  }
}
