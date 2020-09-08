import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RegisterService } from './register.service';
import { RegisterRequestPayload } from './register-request.payload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerRequestPayload: RegisterRequestPayload;

  constructor(private registerService: RegisterService) {
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
        console.log({ data });
      },
      (error) => {
        console.log({ error });
      }
    );
  }
}
