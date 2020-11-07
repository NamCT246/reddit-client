import { AuthService } from '@services/auth/auth.service';
import { Component } from '@angular/core';
import { LoginResponsePayload } from '@models/auth/login/login-response.payload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: LoginResponsePayload;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((u) => {
      console.log(u);
      this.user = u;
    });
  }
}
