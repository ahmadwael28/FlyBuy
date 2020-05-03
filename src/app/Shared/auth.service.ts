import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string='http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser ;

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Login
   login(user) {
    console.log("Username",user.Username);
    console.log("Password",user.Password);
    console.log("Login");
    let result=  this.http.post(`http://localhost:3000/Users/Login`, user)
      .subscribe( (res: any) => {
        console.log("res",res);
        localStorage.setItem('access_token', res.tokenCreated)
        console.log('access_token', res.tokenCreated);
        if(res){
        this.getUserProfile(res._id).subscribe((res) => {
        console.log('getUserProfile response', res);
         this.currentUser =  res;
        console.log('currentUser', this.currentUser);
        this.router.navigateByUrl('Users/' + this.currentUser._id);
        })
      }
      })
     // console.log(result);
      return result;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['Login']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.baseURL}/Users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
