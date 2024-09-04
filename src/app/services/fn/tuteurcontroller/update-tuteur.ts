/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Tuteur } from '../../models/tuteur';

export interface UpdateTuteur$Params {
  id: number;
      body: Tuteur
}

export function updateTuteur(http: HttpClient, rootUrl: string, params: UpdateTuteur$Params, context?: HttpContext): Observable<StrictHttpResponse<Tuteur>> {
  const rb = new RequestBuilder(rootUrl, updateTuteur.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Tuteur>;
    })
  );
}

updateTuteur.PATH = '/api/tuteurs/updateTuteur';
