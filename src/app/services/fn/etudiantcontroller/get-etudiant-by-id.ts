/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Etudiant } from '../../models/etudiant';

export interface GetEtudiantById$Params {
  id: number;
}

export function getEtudiantById(http: HttpClient, rootUrl: string, params: GetEtudiantById$Params, context?: HttpContext): Observable<StrictHttpResponse<Etudiant>> {
  const rb = new RequestBuilder(rootUrl, getEtudiantById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Etudiant>;
    })
  );
}

getEtudiantById.PATH = '/api/etudiants/{id}';
