/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createTuteur } from '../fn/tuteurcontroller/create-tuteur';
import { CreateTuteur$Params } from '../fn/tuteurcontroller/create-tuteur';
import { deleteTuteur } from '../fn/tuteurcontroller/delete-tuteur';
import { DeleteTuteur$Params } from '../fn/tuteurcontroller/delete-tuteur';
import { getAllTuteurs } from '../fn/tuteurcontroller/get-all-tuteurs';
import { GetAllTuteurs$Params } from '../fn/tuteurcontroller/get-all-tuteurs';
import { getTuteurById } from '../fn/tuteurcontroller/get-tuteur-by-id';
import { GetTuteurById$Params } from '../fn/tuteurcontroller/get-tuteur-by-id';
import { Tuteur } from '../models/tuteur';
import { updateTuteur } from '../fn/tuteurcontroller/update-tuteur';
import { UpdateTuteur$Params } from '../fn/tuteurcontroller/update-tuteur';

@Injectable({ providedIn: 'root' })
export class TuteurcontrollerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getTuteurById()` */
  static readonly GetTuteurByIdPath = '/api/tuteurs/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTuteurById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTuteurById$Response(params: GetTuteurById$Params, context?: HttpContext): Observable<StrictHttpResponse<Tuteur>> {
    return getTuteurById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTuteurById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTuteurById(params: GetTuteurById$Params, context?: HttpContext): Observable<Tuteur> {
    return this.getTuteurById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Tuteur>): Tuteur => r.body)
    );
  }

  /** Path part for operation `updateTuteur()` */
  static readonly UpdateTuteurPath = '/api/tuteurs/updateTuteur';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTuteur()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTuteur$Response(params: UpdateTuteur$Params, context?: HttpContext): Observable<StrictHttpResponse<Tuteur>> {
    return updateTuteur(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTuteur$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTuteur(params: UpdateTuteur$Params, context?: HttpContext): Observable<Tuteur> {
    return this.updateTuteur$Response(params, context).pipe(
      map((r: StrictHttpResponse<Tuteur>): Tuteur => r.body)
    );
  }

  /** Path part for operation `deleteTuteur()` */
  static readonly DeleteTuteurPath = '/api/tuteurs/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTuteur()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTuteur$Response(params: DeleteTuteur$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteTuteur(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTuteur$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTuteur(params: DeleteTuteur$Params, context?: HttpContext): Observable<void> {
    return this.deleteTuteur$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `createTuteur()` */
  static readonly CreateTuteurPath = '/api/tuteurs/addTuteur';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTuteur()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTuteur$Response(params: CreateTuteur$Params, context?: HttpContext): Observable<StrictHttpResponse<Tuteur>> {
    return createTuteur(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTuteur$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTuteur(params: CreateTuteur$Params, context?: HttpContext): Observable<Tuteur> {
    return this.createTuteur$Response(params, context).pipe(
      map((r: StrictHttpResponse<Tuteur>): Tuteur => r.body)
    );
  }

  /** Path part for operation `getAllTuteurs()` */
  static readonly GetAllTuteursPath = '/api/tuteurs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTuteurs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTuteurs$Response(params?: GetAllTuteurs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Tuteur>>> {
    return getAllTuteurs(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTuteurs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTuteurs(params?: GetAllTuteurs$Params, context?: HttpContext): Observable<Array<Tuteur>> {
    return this.getAllTuteurs$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Tuteur>>): Array<Tuteur> => r.body)
    );
  }

}
