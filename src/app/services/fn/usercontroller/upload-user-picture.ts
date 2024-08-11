/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UploadUserPicture$Params {
  userId: number;
      body?: {
'file': Blob;
}
}

export function uploadUserPicture(http: HttpClient, rootUrl: string, params: UploadUserPicture$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, uploadUserPicture.PATH, 'post');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

uploadUserPicture.PATH = '/api/user/{userId}/upload-picture';
