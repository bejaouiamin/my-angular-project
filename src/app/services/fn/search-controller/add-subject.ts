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

export function addSubject(http: HttpClient, rootUrl: string, params: AddSubject$Params, context?: HttpContext): Observable<StrictHttpResponse<Subject>> {
  const rb = new RequestBuilder(rootUrl, addSubject.PATH, 'post');
  if (params) {
    rb.query('userId', params.userId);
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      if (r.status === 409) {
        // Handle conflict response
        throw new Error('Subject already added.');
      }
      return r as StrictHttpResponse<Subject>;
    })
  );
}

addSubject.PATH = '/api/sear/addsubjects';