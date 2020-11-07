import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequestPayload } from '@components/auth/register/register-request.payload';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  endpoint = 'http://localhost:8080/api/auth/signup';

  constructor(private httpClient: HttpClient) {}

  register(payload: RegisterRequestPayload): Observable<string> {
    return this.httpClient.post(this.endpoint, payload, {
      responseType: 'text',
    });
  }
}
