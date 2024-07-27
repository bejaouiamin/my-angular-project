import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../services/models/authentication-request';
import { Router } from '@angular/router';
import { AuthControllerService } from '../services/services/auth-controller.service';
import { TokenService } from '../services/token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent  {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(   private router: Router,
    private authService: AuthControllerService,
    private tokenService: TokenService
  ) {

  }

    login() {
      this.errorMsg = [];
      this.authService.login({
        body: this.authRequest
      }).subscribe({
        next: (res) => {
          this.tokenService.token = res.token as string;
          
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

}
