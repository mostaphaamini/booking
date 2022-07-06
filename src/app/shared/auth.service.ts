import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  endpoint: string = environment.backendUrl+ 'auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user).pipe(catchError(this.handleError.bind(this)));
  }

  // Sign-in
  signIn(user: User) {
    let api = `${this.endpoint}/login`;
    return this.http.post<any>(api, user).subscribe((res: any) => {
      localStorage.setItem('access_token', res.access_token);
      this.getUserProfile().subscribe((res) => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.router.navigate(['members']);
      });
    });
  }

  get currentUser(){
    if(localStorage.getItem('currentUser') == null){
      return new User({});
    }else{
      return new User(JSON.parse(localStorage.getItem('currentUser')!));
    }
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(): Observable<any> {
    let api = `${this.endpoint}/profile`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError.bind(this))
    );
  }

  // User profile
  getMember(id: number): Observable<any> {
    let api = `${this.endpoint}/member`;
    return this.http.post(api, { headers: this.headers, params: {id: id} }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError.bind(this))
    );
  }

  // request
  getReq(api: string, params: any): Observable<any> {
    return this.http.get(api, { headers: this.headers, params: params }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError.bind(this))
    );
  }

  // request
  postReq(api: string, params: any): Observable<any> {
    return this.http.post(api, { params: params }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError.bind(this))
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(msg));
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if (error.status == 401) {
      console.log('need login' + this);
      this.doLogout();
    }
    return throwError(() => new Error(msg));
  }
}
