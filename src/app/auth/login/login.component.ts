import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginRequestPayload } from './login-request.payload';
import { LoginService } from './login.service';
import { ToasterService } from '../../toaster/toaster.service';
import { ToasterPosition } from 'src/app/toaster/constants/toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toaster: ToasterService
  ) {
    this.loginRequestPayload = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

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

    this.loginService.login(this.loginRequestPayload).subscribe(
      (data) => {
        if (data) {
          this.isError = false;
          this.router.navigateByUrl('/');
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
