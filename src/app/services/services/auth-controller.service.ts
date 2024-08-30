/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AuthenticationResponse } from '../models/authentication-response';
import { confirm } from '../fn/auth-controller/confirm';
import { Confirm$Params } from '../fn/auth-controller/confirm';
import { forgotPassword } from '../fn/auth-controller/forgot-password';
import { ForgotPassword$Params } from '../fn/auth-controller/forgot-password';
import { getCurrentUser } from '../fn/auth-controller/get-current-user';
import { GetCurrentUser$Params } from '../fn/auth-controller/get-current-user';
import { getLoginInfo } from '../fn/auth-controller/get-login-info';
import { GetLoginInfo$Params } from '../fn/auth-controller/get-login-info';
import { login } from '../fn/auth-controller/login';
import { Login$Params } from '../fn/auth-controller/login';
import { register } from '../fn/auth-controller/register';
import { Register$Params } from '../fn/auth-controller/register';
import { resetPassword } from '../fn/auth-controller/reset-password';
import { ResetPassword$Params } from '../fn/auth-controller/reset-password';
import { User } from '../models/user';
import { validateResetToken } from '../fn/auth-controller/validate-reset-token';
import { ValidateResetToken$Params } from '../fn/auth-controller/validate-reset-token';

@Injectable({ providedIn: 'root' })
export class AuthControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `validateResetToken()` */
  static readonly ValidateResetTokenPath = '/api/auth/reset-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `validateResetToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  validateResetToken$Response(params: ValidateResetToken$Params, context?: HttpContext): Observable<StrictHttpResponse<{
  }>> {
    return validateResetToken(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `validateResetToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  validateResetToken(params: ValidateResetToken$Params, context?: HttpContext): Observable<{
  }> {
    return this.validateResetToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
      }>): {
        } => r.body)
    );
  }

  /** Path part for operation `resetPassword()` */
  static readonly ResetPasswordPath = '/api/auth/reset-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPassword$Response(params: ResetPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<{
  }>> {
    return resetPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPassword(params: ResetPassword$Params, context?: HttpContext): Observable<{
  }> {
    return this.resetPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
      }>): {
        } => r.body)
    );
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/api/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<{
  }>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<{
  }> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
      }>): {
        } => r.body)
    );
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/api/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `forgotPassword()` */
  static readonly ForgotPasswordPath = '/api/auth/forgot-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgotPassword$Response(params: ForgotPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<{
  }>> {
    return forgotPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgotPassword(params: ForgotPassword$Params, context?: HttpContext): Observable<{
  }> {
    return this.forgotPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
      }>): {
        } => r.body)
    );
  }

  /** Path part for operation `getCurrentUser()` */
  static readonly GetCurrentUserPath = '/api/auth/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCurrentUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser$Response(params?: GetCurrentUser$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getCurrentUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCurrentUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser(params?: GetCurrentUser$Params, context?: HttpContext): Observable<User> {
    return this.getCurrentUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getLoginInfo()` */
  static readonly GetLoginInfoPath = '/api/auth/login/oauth2/code/google';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLoginInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoginInfo$Response(params?: GetLoginInfo$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return getLoginInfo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLoginInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoginInfo(params?: GetLoginInfo$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.getLoginInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `confirm()` */
  static readonly ConfirmPath = '/api/auth/activate-account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm$Response(params: Confirm$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return confirm(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `confirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm(params: Confirm$Params, context?: HttpContext): Observable<void> {
    return this.confirm$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
