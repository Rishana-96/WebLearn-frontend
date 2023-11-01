import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let userToken = localStorage.getItem("userSecret")
    let tutorToken = localStorage.getItem("tutorSecret")
    let adminToken = localStorage.getItem("adminSecret")
   console.log('intexeo');
   
    if(userToken){
      const newRequest = request.clone({
        headers:request.headers.set('Authorization','Bearer '+userToken)
      })
      console.log(userToken,'iejeuheurhhrej');
      return next.handle(request);
    }
    if(tutorToken){
      const newRequest = request.clone({
        headers:request.headers.set('Authorization','Bearer '+tutorToken)
      })
      console.log(newRequest);
      return next.handle(newRequest)
      
    }
    if(adminToken){
      console.log('in admin'
      );
      
      const newRequest = request.clone({
        headers : request.headers.set('Authorization' , 'Bearer ' + adminToken)
      })
      console.log('neq',newRequest);
      
      return next.handle(newRequest)
    }
    return next.handle(request);
  }
  }


