import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly tokenKey = 'token';
  

  constructor() { }

  set token(token: string | null) {
    if (token === null) {
      localStorage.removeItem(this.tokenKey);
    } else {
      localStorage.setItem(this.tokenKey, token);
      console.log('Token set in localStorage:', token); // Log the token being set
    }
  }

  get token(): string {
    const token = localStorage.getItem(this.tokenKey) as string;
    console.log('Retrieved token from localStorage:', token); // Log the token being retrieved
    return token;
  }

  isTokenValid(): boolean {
    const token = this.token;
    if (!token) {
      return false;
    }
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.removeItem(this.tokenKey);
      return false;
    }
    return true;
  }

  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }

  get userRoles(): string[] {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      console.log('Decoded token roles:', decodedToken.authorities); // Log the decoded roles
      return decodedToken.authorities;
    }
    return [];
  }
}
