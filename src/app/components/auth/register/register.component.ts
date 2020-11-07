import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RegisterRequestPayload } from './register-request.payload';
import { RegisterService } from '@services/auth/register.service';
import { Router } from '@angular/router';
import { ToasterService } from '@services/toaster/toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerRequestPayload: RegisterRequestPayload;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToasterService
  ) {
    this.registerRequestPayload = {
      username: '',
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.registerRequestPayload.email = this.registerForm.get('email').value;
    this.registerRequestPayload.username = this.registerForm.get(
      'username'
    ).value;
    this.registerRequestPayload.password = this.registerForm.get(
      'password'
    ).value;

    this.registerService.register(this.registerRequestPayload).subscribe(
      (data) => {
        this.toastr.info(data);
        this.router.navigate(['/login'], {
          queryParams: { registered: 'true' },
        });
      },
      (error) => {
        console.log({ error });
        this.toastr.error('Registration failed!');
      }
    );
  }
}
