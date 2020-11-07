import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@services/auth/auth.service';
import { LoginRequestPayload } from '@models/auth/login/login-request.payload';
import { ToasterPosition } from '@app/constants/toaster/toaster';
import { ToasterService } from '@services/toaster/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toaster: ToasterService
  ) {
    this.loginRequestPayload = {
      username: '',
      password: '',
    };

    if (this.authService.currentUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toaster.info(
          'Please check your inbox for activation email to activate your account!',
          ToasterPosition.bottomRight,
          'Activate account'
        );
        this.toaster.success('Signup successfully');
      }
    });
  }

  onSubmit(): void {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(
      (data) => {
        if (data) {
          this.isError = false;
          this.router.navigate([this.returnUrl]);
          this.toaster.success('Login successfully');
        }
      },
      (error) => {
        this.isError = true;
        console.log({ error });
        this.toaster.error('Wrong credentials. Please recheck entered fields');
      }
    );
  }
}
