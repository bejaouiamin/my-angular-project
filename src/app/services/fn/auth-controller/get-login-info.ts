/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

export interface AuthenticationResponse {
  token?: string;
}

export interface GetLoginInfo$Params {
}

export function getLoginInfo(http: HttpClient, rootUrl: string, params?: GetLoginInfo$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
  const rb = new RequestBuilder(rootUrl, getLoginInfo.PATH, 'get');
  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<AuthenticationResponse> => r instanceof HttpResponse),
    map((r: HttpResponse<AuthenticationResponse>) => r as StrictHttpResponse<AuthenticationResponse>)
  );
}

getLoginInfo.PATH = '/login/oauth2/code/google'; // Ensure this path matches the backend mapping
