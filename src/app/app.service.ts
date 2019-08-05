import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'node_modules/rxjs';
import { HttpEvent, HttpHandler,HttpInterceptor, HttpRequest } from '@angular/common/http';

import { catchError, retry, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService{

  private url = 'https://chatapi.edwisor.com/api/v1';

  //******************************************************** */
  // private currentUserSubject: BehaviorSubject<any>;
  // public currentUser: Observable<any>;
  //********************************************************* */

  constructor(public http: HttpClient, public cookies:CookieService) { }

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

  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', this.cookies.get('authtoken'))

    return this.http.post(`${this.url}/api/v1/users/logout`, params);

  } // end logout function

  public signinFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post<any>(`${this.url}/users/login`, params);
  } // end of signinFunction function.

  public setUserInfoInLocalStorage(data){
    return localStorage.setItem('userInfo',JSON.stringify(data));
  }
  
  public getUserInfoFromLocalStorage=()=>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }
}
//----------------------------------------------------------------------------------------
//method 1
  // public signinFunction(data):Observable<any>{
  //   const params=new HttpParams()
  //   .set('email', data.email)
  //   .set('password',data.password);
  //   return this.http.post(`${this.url}/users/login`, params)
  //   .pipe(
  //     retry(1),
  //     catchError(this.errorHandler)
  //   )
  // } 

  // public errorHandler(error:HttpErrorResponse){
  //   let errorMessage = '';
  //    if(error.error instanceof ErrorEvent) {
  //      // Get client-side error
  //      errorMessage = error.error.message;
  //    } else {
  //      // Get server-side error
  //      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //    }
  //    window.alert(errorMessage);
  //    return throwError(errorMessage);
  // }

//method 2
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

  //method 3

  //-*****************************************************************

//   public get currentUserValue(): any {
//     return this.currentUserSubject.value;
// }
//   public signinFunction(data){

//     const params = new HttpParams()
//       .set('email', data.email)
//       .set('password', data.password);

//     return this.http.post<any>(`${this.url}/users/login`, params)
//     .pipe(map(user=>{
//       this.currentUserSubject.next(user);
//                 return user;
//     }))

//   }
  //******************************************************************** */


