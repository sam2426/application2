import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'node_modules/rxjs';


import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = 'https://chatapi.edwisor.com/api/v1';

  constructor(public http: HttpClient) { }

  public signupFunction(data):Observable<any>{
    const params=new HttpParams()
    .set('firstName', data.firstName)
    .set('lastName', data.lastName)
    .set('mobile', data.mobile)
    .set('email', data.email)
    .set('password', data.password)
    .set('apiKey',data.apiKey);

    return this.http.post(`${this.url}/users/signup`,params);
  }//end of signup function

  public signinFunction(data):Observable<any>{
    const params=new HttpParams()
    .set('email', data.email)
    .set('password',data.password);
    return this.http.post(`${this.url}/users/login`, params)
    .pipe(
      catchError(error=>{
        return throwError('error came is '+ error.message);
      })
    )
  } 

  // public errorHandler(error:HttpErrorResponse){
  //   return throwError("error came");
  // }

  // public signinFunction(data):any{
    
  //   const dataObservable=new Observable(observer=>{
  //     const params=new HttpParams()
  //     .set('email', data.email)
  //     .set('password',data.password);
  //     observer.next(this.http.post(`${this.url}/users/login`, params));
  //   });
  //   return dataObservable;
  // }

  public setUserInfoInLocalStorage(data){
    return localStorage.setItem('userInfo',JSON.stringify(data));
  }
  
  public getUserInfoFromLocalStorage=()=>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }

}
