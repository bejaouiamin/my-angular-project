import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthControllerService } from '../services/services/auth-controller.service';
import { TokenService } from '../services/token/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {

  resetForm!: FormGroup;
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthControllerService,
    private fb: FormBuilder,
    private router: Router
  ) {}


  ngOnInit(): void {
    // Extract token from URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    this.initializeForm();
  }

  private initializeForm(): void {
    this.resetForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\d]{8,}$/)  // Only letters and numbers, min 8 characters
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.matchPasswordValidator('newPassword')
      ]]
    });
  }

  private matchPasswordValidator(password: string) {
    return (control: any) => {
      return control.value === this.resetForm?.get(password)?.value ? null : { mismatch: true };
    };
  }


  
  resetPassword(): void {
    if (this.resetForm.invalid) {
      return;
    }

    const { newPassword } = this.resetForm.value;

    const resetData = {
      token: this.token,
      password: newPassword
    };

    this.authService.resetPassword({ body: resetData }).subscribe({
      next: (data) => {
        console.log("correct !",data)
        Swal.fire({
          title: "Good job!",
          text: "Password has been reset successfully.",
          icon: "success"
        });
        this.router.navigate(['/home']); // Redirect to login after successful reset
      },
      error: (err) => {
        console.error('Error resetting password:', err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while resetting the password. Please try again",
        });
      }
    });
  }


}
