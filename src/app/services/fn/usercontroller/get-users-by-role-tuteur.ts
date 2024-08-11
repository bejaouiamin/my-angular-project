/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { User } from '../../models/user';

export interface GetUsersByRoleTuteur$Params {
}

export function getUsersByRoleTuteur(http: HttpClient, rootUrl: string, params?: GetUsersByRoleTuteur$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
  const rb = new RequestBuilder(rootUrl, getUsersByRoleTuteur.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<User>>;
    })
  );
}

getUsersByRoleTuteur.PATH = '/api/user/role/tuteur';
