/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Etudiant } from '../../models/etudiant';

export interface GetAllEtudiants$Params {
}

export function getAllEtudiants(http: HttpClient, rootUrl: string, params?: GetAllEtudiants$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Etudiant>>> {
  const rb = new RequestBuilder(rootUrl, getAllEtudiants.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Etudiant>>;
    })
  );
}

getAllEtudiants.PATH = '/api/etudiants';
