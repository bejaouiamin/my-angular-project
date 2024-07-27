/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Tuteur } from '../../models/tuteur';

export interface GetAllTuteurs$Params {
}

export function getAllTuteurs(http: HttpClient, rootUrl: string, params?: GetAllTuteurs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Tuteur>>> {
  const rb = new RequestBuilder(rootUrl, getAllTuteurs.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Tuteur>>;
    })
  );
}

getAllTuteurs.PATH = '/api/tuteurs';
