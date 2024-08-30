import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { Subject } from '../../models/subject';

export interface AddSubject$Params {
  body: Subject;
  userId: number;
}

export function addSubject(http: HttpClient, rootUrl: string, params: AddSubject$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, addSubject.PATH, 'post');
  if (params) {
    rb.query('userId', params.userId);
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<string> => r instanceof HttpResponse),
    map((r: HttpResponse<string>) => {
      if (r.status === 409) {
        throw new Error('Subject already added.');
      } else if (r.ok) {
        return r as StrictHttpResponse<string>;
      } else {
        throw new Error(`Unexpected error: ${r.statusText}`);
      }
    })
  );
}

addSubject.PATH = '/api/sear/addsubjects';