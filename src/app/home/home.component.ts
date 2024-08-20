import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../services/models/authentication-request';
import { Router } from '@angular/router';
import { AuthControllerService } from '../services/services/auth-controller.service';
import { TokenService } from '../services/token/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateOfBirthValidator, passwordMatchValidator, passwordValidator } from 'src/validators/custom-validators';
import { RegistrationRequest } from '../services/models/registration-request';
import { Subject, Subject as SubjectModel, User } from '../services/models';
import { SearchControllerService, UsercontrollerService } from '../services/services';
import { Subject as RxSubject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  userId!: number;
  users: User[] = [];

  search = {
    subject: '',
    adress: ''
  };

  subjects: SubjectModel[] = [];

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
    private tokenService: TokenService,
    private userService: UsercontrollerService,
    private searchService: SearchControllerService
  ) { }

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

    if (this.isLoggedIn) {
      this.fetchUserId();
    }

    this.loadTeachers();
    this.loadSubjects();
  }

  loadSubjects() {
    this.searchService.getAllSubjects().subscribe({
      next: (data: Subject[]) => {
        console.log('subject successfully fetched', data);
        this.subjects = data;
      },
      error: (error) => {
        console.error('Error fetching subjects:', error);
      }
    });
  }


  fetchUserId(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user: User) => {
        if (user.id !== undefined) {  // Type guard to ensure id is not undefined
          this.userId = user.id;
          console.log('User ID:', this.userId); // Log the user ID
        } else {
          console.error('User ID is undefined'); // Handle the case where ID is undefined
        }
      },
      error: (error) => {
        console.error('Error fetching user ID:', error); // Log any error
      }
    });
  }

  onSubmit1(): void {
    if (!this.search.subject || !this.search.adress) {
      alert('Please fill in both the subject and address before searching.');
      return;
    }

    this.searchService.searchTutors({
      subject: this.search.subject,
      adress: this.search.adress
    }).subscribe({
      next: (data: User[]) => {
        if (data.length === 0) {
          alert("No tutors found for the specified criteria.");
        } else {
          console.log(data);
          this.users = data;
        }
      },
      error: (error) => {
        if (error.status === 404) {
          alert("No tutors found with the specified criteria.");
        } else {
          console.error('Error fetching tutors:', error);
        }
      }
    });
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
        console.log('Login Response:', res); // Log the response to check the token
        this.tokenService.token = res.token as string;
        console.log('Set Token:', res.token); // Log the token being set
        this.isLoggedIn = true; // Update login state on successful login
        location.reload(); // Refresh the page to trigger `ngOnInit`
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

  loadTeachers(): void {
    this.userService.getUsersByRoleTuteur().subscribe({
      next: (data: User[]) => {
        console.log('Fetched users:', data); // Log the fetched data
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error); // Log any error
      }
    });
  }

  getPictureUrl(base64String?: string): string {
    if (base64String) {
      return `data:image/jpeg;base64,${base64String}`;
    }
    return './assets/images/Profile_avatar.png'; // Fallback image
  }
}
