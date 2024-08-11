/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createUtilisateur } from '../fn/usercontroller/create-utilisateur';
import { CreateUtilisateur$Params } from '../fn/usercontroller/create-utilisateur';
import { deleteUser } from '../fn/usercontroller/delete-user';
import { DeleteUser$Params } from '../fn/usercontroller/delete-user';
import { deleteUserPicture } from '../fn/usercontroller/delete-user-picture';
import { DeleteUserPicture$Params } from '../fn/usercontroller/delete-user-picture';
import { getAllUser } from '../fn/usercontroller/get-all-user';
import { GetAllUser$Params } from '../fn/usercontroller/get-all-user';
import { getUserById } from '../fn/usercontroller/get-user-by-id';
import { GetUserById$Params } from '../fn/usercontroller/get-user-by-id';
import { getUsersByRoleTuteur } from '../fn/usercontroller/get-users-by-role-tuteur';
import { GetUsersByRoleTuteur$Params } from '../fn/usercontroller/get-users-by-role-tuteur';
import { updateUserAddress } from '../fn/usercontroller/update-user-address';
import { UpdateUserAddress$Params } from '../fn/usercontroller/update-user-address';
import { updateUtilisateur } from '../fn/usercontroller/update-utilisateur';
import { UpdateUtilisateur$Params } from '../fn/usercontroller/update-utilisateur';
import { uploadUserPicture } from '../fn/usercontroller/upload-user-picture';
import { UploadUserPicture$Params } from '../fn/usercontroller/upload-user-picture';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UsercontrollerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateUserAddress()` */
  static readonly UpdateUserAddressPath = '/api/user/{userId}/update-address';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserAddress$Response(params: UpdateUserAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return updateUserAddress(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserAddress(params: UpdateUserAddress$Params, context?: HttpContext): Observable<User> {
    return this.updateUserAddress$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/api/user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<User> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `updateUtilisateur()` */
  static readonly UpdateUtilisateurPath = '/api/user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUtilisateur()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUtilisateur$Response(params: UpdateUtilisateur$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return updateUtilisateur(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUtilisateur$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUtilisateur(params: UpdateUtilisateur$Params, context?: HttpContext): Observable<User> {
    return this.updateUtilisateur$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/api/user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<void> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `uploadUserPicture()` */
  static readonly UploadUserPicturePath = '/api/user/{userId}/upload-picture';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadUserPicture()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadUserPicture$Response(params: UploadUserPicture$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return uploadUserPicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadUserPicture$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadUserPicture(params: UploadUserPicture$Params, context?: HttpContext): Observable<string> {
    return this.uploadUserPicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `createUtilisateur()` */
  static readonly CreateUtilisateurPath = '/api/user/adduser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUtilisateur()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUtilisateur$Response(params: CreateUtilisateur$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return createUtilisateur(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createUtilisateur$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUtilisateur(params: CreateUtilisateur$Params, context?: HttpContext): Observable<User> {
    return this.createUtilisateur$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getAllUser()` */
  static readonly GetAllUserPath = '/api/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUser$Response(params?: GetAllUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getAllUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUser(params?: GetAllUser$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getAllUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /** Path part for operation `getUsersByRoleTuteur()` */
  static readonly GetUsersByRoleTuteurPath = '/api/user/role/tuteur';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsersByRoleTuteur()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersByRoleTuteur$Response(params?: GetUsersByRoleTuteur$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getUsersByRoleTuteur(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsersByRoleTuteur$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersByRoleTuteur(params?: GetUsersByRoleTuteur$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getUsersByRoleTuteur$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /** Path part for operation `deleteUserPicture()` */
  static readonly DeleteUserPicturePath = '/api/user/{userId}/delete-picture';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUserPicture()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserPicture$Response(params: DeleteUserPicture$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteUserPicture(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUserPicture$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserPicture(params: DeleteUserPicture$Params, context?: HttpContext): Observable<string> {
    return this.deleteUserPicture$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
