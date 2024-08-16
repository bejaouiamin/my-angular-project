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

    const formData: FormData = new FormData();
    if (params.body) {
      formData.append('file', params.body.file);
    }

    rb.body(formData);
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })  // Change responseType to 'text'
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<string>) => {
      return r as StrictHttpResponse<string>;
    })
  );
  
}


uploadUserPicture.PATH = '/api/user/{userId}/upload-picture';
