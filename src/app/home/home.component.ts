import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../services/models/authentication-request';
import { Router } from '@angular/router';
import { AuthControllerService } from '../services/services/auth-controller.service';
import { TokenService } from '../services/token/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateOfBirthValidator, passwordMatchValidator, passwordValidator } from 'src/validators/custom-validators';
import { RegistrationRequest } from '../services/models/registration-request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  registrationForm!: FormGroup;
  authRequest: AuthenticationRequest = { email: '', password: '' };
  registerRequest: RegistrationRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    adress: '',
    phone: '',
    role: undefined // initialize as undefined or one of the valid values
  };
  errorMsg: Array<string> = [];
  isLoggedIn = false; // Add this property to track the login state

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthControllerService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]],
      repeatPassword: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, dateOfBirthValidator()]],
      adress: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required]
    }, { validators: passwordMatchValidator });

    // Check if user is already logged in
    this.isLoggedIn = !!this.tokenService.token;
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.registerRequest = this.registrationForm.value;
      console.log('Register Request:', this.registerRequest); // Debugging: Log the request payload
    } else {
      console.log('Form is invalid');
    }
  }

  login() {
    this.errorMsg = [];
    this.authService.login({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.isLoggedIn = true; // Update login state on successful login
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  }

  register() {
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: () => {
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
        if (err.status === 409) { // Conflict
          this.errorMsg.push('Email already in use');
        } else {
          console.log(err);
          this.errorMsg.push('An unexpected error occurred');
        }
      }
    });
  }

  logout() {
    this.tokenService.token = null; // Clear the token
    this.isLoggedIn = false; // Update login state on logout
  }


}
