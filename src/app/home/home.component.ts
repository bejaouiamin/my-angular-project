import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../services/models/authentication-request';
import { Router } from '@angular/router';
import { AuthControllerService } from '../services/services/auth-controller.service';
import { TokenService } from '../services/token/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateOfBirthValidator, passwordMatchValidator, passwordValidator } from 'src/validators/custom-validators';
import { RegistrationRequest } from '../services/models/registration-request';
import { Subject, Subject as SubjectModel, Tuteur, User } from '../services/models';
import { SearchControllerService, TuteurcontrollerService, UsercontrollerService } from '../services/services';
import { Subject as RxSubject } from 'rxjs';
import { ForgotPassword$Params } from '../services/fn/auth-controller/forgot-password';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  forgotPasswordEmail: string = '';
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
    role: 'ETUDIANT'
  };
  errorMsg: Array<string> = [];
  isLoggedIn = false; 
  tuteurId!:number;
  tuteurs:Tuteur [] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthControllerService,
    private tokenService: TokenService,
    private userService: UsercontrollerService,
    private searchService: SearchControllerService,
    private tuteurservice: TuteurcontrollerService
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]],
      repeatPassword: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, dateOfBirthValidator()]],
      role: ['', Validators.required]
    }, { validators: passwordMatchValidator });

    // Check if user is already logged in
    this.isLoggedIn = !!this.tokenService.token;

    if (this.isLoggedIn) {
      // First, fetch the user ID, then fetch the Tuteur based on the user ID
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
          this.fetchTuteurId(); 
        } else {
          console.error('User ID is undefined'); // Handle the case where ID is undefined
        }
      },
      error: (error) => {
        console.error('Error fetching user ID:', error); // Log any error
      }
    });
  }

  fetchTuteurId(): void {
    const userId = this.userId; 
    console.log('User ID being sent to API:', userId);
    this.tuteurservice.getTuteurById({ id: userId }).subscribe({
      next: (tuteur: Tuteur) => {
        console.log('Tuteur received:', tuteur);
        if (tuteur && tuteur.id !== undefined) {
          this.tuteurId = tuteur.id;
          console.log('Tuteur ID:', this.tuteurId);
        } else {
          console.error('Tuteur not found or ID is undefined');
        }
      },
      error: (error) => {
        console.error('Error fetching Tuteur ID:', error);
      }
    });
  }
  
  
  onSubmit1(): void {
    if (!this.search.subject || !this.search.adress) {
      // Show success alert
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill in both the subject and address before searching.',
        icon: 'warning',
        timer: 2000, // Optional: auto-close the alert after 2 seconds
        showConfirmButton: false // Optional: hides the "OK" button
    });
      return;
    }

    this.searchService.searchTutors({
      subject: this.search.subject,
      adress: this.search.adress
    }).subscribe({
      next: (data: User[]) => {
        if (data.length === 0) {
          Swal.fire({
            title: 'Error',
            text: 'No tutors found for the specified criteria.',
            icon: 'error',
            timer: 2000, // Optional: auto-close the alert after 2 seconds
            showConfirmButton: false // Optional: hides the "OK" button
        });
        } else {
          console.log(data);
          this.users = data;
        }
      },
      error: (error) => {
        if (error.status === 404) {
          Swal.fire({
            title: 'Error',
            text: 'No tutors found for the specified criteria.',
            icon: 'error',
            timer: 2000, // Optional: auto-close the alert after 2 seconds
            showConfirmButton: false // Optional: hides the "OK" button
        });
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
  
        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully logged in.',
          icon: 'success',
          timer: 2000, // Auto-close the alert after 2 seconds
          showConfirmButton: false
        }).then(() => {
          // Reload the page after the alert has closed
          location.reload();
        });
  
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
  
        // Show error alert
        Swal.fire({
          title: 'Error!',
          text: 'Login failed. Please check your credentials.',
          icon: 'error',
          timer: 2000, // Auto-close the alert after 2 seconds
          showConfirmButton: false
        });
      }
    });
  }
  
  

  register() {
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: () => {
        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: 'Registration successful. Please activate your account.',
          icon: 'success',
          timer: 2000, // Optional: auto-close the alert after 2 seconds
          showConfirmButton: false // Optional: hides the "OK" button
        });
  
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
        if (err.status === 409) { // Conflict
          this.errorMsg.push('Email already in use');
        } else {
          console.log(err);
          this.errorMsg.push('An unexpected error occurred');
        }
  
        // Show error alert
        Swal.fire({
          title: 'Error!',
          text: 'Registration failed. Please try again.',
          icon: 'error',
          timer: 2000, // Optional: auto-close the alert after 2 seconds
          showConfirmButton: false // Optional: hides the "OK" button
        });
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

  forgotPassword(): void {
    if (this.forgotPasswordEmail.trim() === '') {
      alert('Please enter your email address.');
      return;
    }

    const params: ForgotPassword$Params = {
      body: {
        email: this.forgotPasswordEmail
      }
    };

    this.authService.forgotPassword(params).subscribe({
      next: () => {
        
        Swal.fire({
          title: "Good job!",
          text: "Password reset link has been sent to your email.",
          icon: "success"
        });
        this.hideForgotPassword(); // Hide the forgot password form and show login
      },
      error: (err) => {
        console.error('Error sending password reset link:', err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while sending the reset link. Please try again.",
        });
      }
    });
  }

  showForgotPassword() {
    // Hide the login/register form and show the forgot password form
    document.getElementById('authTabContent')!.style.display = 'none';
    document.getElementById('forgotPasswordForm')!.style.display = 'block';
  }
  
  hideForgotPassword() {
    // Hide the forgot password form and show the login/register form
    document.getElementById('forgotPasswordForm')!.style.display = 'none';
    document.getElementById('authTabContent')!.style.display = 'block';
  }
  
  
  
}
