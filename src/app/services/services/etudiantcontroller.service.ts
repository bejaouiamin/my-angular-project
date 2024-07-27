/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createEtudiant } from '../fn/etudiantcontroller/create-etudiant';
import { CreateEtudiant$Params } from '../fn/etudiantcontroller/create-etudiant';
import { deleteEtudiant } from '../fn/etudiantcontroller/delete-etudiant';
import { DeleteEtudiant$Params } from '../fn/etudiantcontroller/delete-etudiant';
import { Etudiant } from '../models/etudiant';
import { getAllEtudiants } from '../fn/etudiantcontroller/get-all-etudiants';
import { GetAllEtudiants$Params } from '../fn/etudiantcontroller/get-all-etudiants';
import { getEtudiantById } from '../fn/etudiantcontroller/get-etudiant-by-id';
import { GetEtudiantById$Params } from '../fn/etudiantcontroller/get-etudiant-by-id';
import { updateEtudiant } from '../fn/etudiantcontroller/update-etudiant';
import { UpdateEtudiant$Params } from '../fn/etudiantcontroller/update-etudiant';

@Injectable({ providedIn: 'root' })
export class EtudiantcontrollerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getEtudiantById()` */
  static readonly GetEtudiantByIdPath = '/api/etudiants/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEtudiantById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEtudiantById$Response(params: GetEtudiantById$Params, context?: HttpContext): Observable<StrictHttpResponse<Etudiant>> {
    return getEtudiantById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getEtudiantById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEtudiantById(params: GetEtudiantById$Params, context?: HttpContext): Observable<Etudiant> {
    return this.getEtudiantById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Etudiant>): Etudiant => r.body)
    );
  }

  /** Path part for operation `updateEtudiant()` */
  static readonly UpdateEtudiantPath = '/api/etudiants/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateEtudiant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateEtudiant$Response(params: UpdateEtudiant$Params, context?: HttpContext): Observable<StrictHttpResponse<Etudiant>> {
    return updateEtudiant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateEtudiant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateEtudiant(params: UpdateEtudiant$Params, context?: HttpContext): Observable<Etudiant> {
    return this.updateEtudiant$Response(params, context).pipe(
      map((r: StrictHttpResponse<Etudiant>): Etudiant => r.body)
    );
  }

  /** Path part for operation `deleteEtudiant()` */
  static readonly DeleteEtudiantPath = '/api/etudiants/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEtudiant()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEtudiant$Response(params: DeleteEtudiant$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteEtudiant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteEtudiant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEtudiant(params: DeleteEtudiant$Params, context?: HttpContext): Observable<void> {
    return this.deleteEtudiant$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllEtudiants()` */
  static readonly GetAllEtudiantsPath = '/api/etudiants';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllEtudiants()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEtudiants$Response(params?: GetAllEtudiants$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Etudiant>>> {
    return getAllEtudiants(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllEtudiants$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEtudiants(params?: GetAllEtudiants$Params, context?: HttpContext): Observable<Array<Etudiant>> {
    return this.getAllEtudiants$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Etudiant>>): Array<Etudiant> => r.body)
    );
  }

  /** Path part for operation `createEtudiant()` */
  static readonly CreateEtudiantPath = '/api/etudiants';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createEtudiant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createEtudiant$Response(params: CreateEtudiant$Params, context?: HttpContext): Observable<StrictHttpResponse<Etudiant>> {
    return createEtudiant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createEtudiant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createEtudiant(params: CreateEtudiant$Params, context?: HttpContext): Observable<Etudiant> {
    return this.createEtudiant$Response(params, context).pipe(
      map((r: StrictHttpResponse<Etudiant>): Etudiant => r.body)
    );
  }

}
