import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RegisterRequestPayload } from './register-request.payload';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  endpoint: string = 'http://localhost:8080/api/auth/signup';

  constructor(private httpClient: HttpClient) {}

  register(payload: RegisterRequestPayload): Observable<String> {
    return this.httpClient.post(this.endpoint, payload, {
      responseType: 'text',
    });
  }
}
