/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addSubject } from '../fn/search-controller/add-subject';
import { AddSubject$Params } from '../fn/search-controller/add-subject';
import { deleteSubject } from '../fn/search-controller/delete-subject';
import { DeleteSubject$Params } from '../fn/search-controller/delete-subject';
import { getAllSubjects } from '../fn/search-controller/get-all-subjects';
import { GetAllSubjects$Params } from '../fn/search-controller/get-all-subjects';
import { searchTutors } from '../fn/search-controller/search-tutors';
import { SearchTutors$Params } from '../fn/search-controller/search-tutors';
import { Subject } from '../models/subject';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class SearchControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addSubject()` */
  static readonly AddSubjectPath = '/api/sear/addsubjects';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSubject()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSubject$Response(params: AddSubject$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> { // Changed to string
    return addSubject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addSubject$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSubject(params: AddSubject$Params, context?: HttpContext): Observable<string> { // Changed to string
    return this.addSubject$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body) // Changed to string
    );
  }

  /** Path part for operation `getAllSubjects()` */
  static readonly GetAllSubjectsPath = '/api/sear/subjects';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSubjects()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSubjects$Response(params?: GetAllSubjects$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Subject>>> {
    return getAllSubjects(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllSubjects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSubjects(params?: GetAllSubjects$Params, context?: HttpContext): Observable<Array<Subject>> {
    return this.getAllSubjects$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Subject>>): Array<Subject> => r.body)
    );
  }

  /** Path part for operation `searchTutors()` */
  static readonly SearchTutorsPath = '/api/sear/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchTutors()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchTutors$Response(params: SearchTutors$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return searchTutors(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchTutors$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchTutors(params: SearchTutors$Params, context?: HttpContext): Observable<Array<User>> {
    return this.searchTutors$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /** Path part for operation `deleteSubject()` */
  static readonly DeleteSubjectPath = '/api/sear/deletesubject';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSubject()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubject$Response(params: DeleteSubject$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return deleteSubject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteSubject$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubject(params: DeleteSubject$Params, context?: HttpContext): Observable<string> {
    return this.deleteSubject$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}