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
  loggedIn:boolean=false;

  constructor(
    private http: HttpClient,
    public router: Router
  ) {}

  // Login
   login(user) {
    console.log("Email",user.Email);
    console.log("Password",user.Password);
    console.log("Login");
    let result=  this.http.post(`http://localhost:3000/Users/Login`, user)
      .subscribe( (res: any) => {
        localStorage.setItem('access_token', res.tokenCreated)
        this.loggedIn=true;
        if(res){
        this.getUserProfile().subscribe((res) => {
         this.currentUser =  res;
        this.router.navigateByUrl('Users');
        })
      }
      },(err)=>{
        console.log("Invalid Password!",err);
      
      }
      )
      console.log("result",result);
      return result;
  }

  ValidateCredentials(user){
    let result=  this.http.post(`http://localhost:3000/Users/Login`, user)
    .subscribe( (res: any) => {
      localStorage.setItem('access_token', res.tokenCreated)
      this.loggedIn=true;
      

    },(err)=>{
      console.log("Invalid Password!",err);
      this.loggedIn=false;
    }
    )
    
    return this.loggedIn;
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
  getUserProfile(): Observable<any> {
    console.log('inside getUserProfile');

    //this.headers=this.headers.set('x-access-token',localStorage.getItem('access_token'));
    let api = `${this.baseURL}/Users/UserToken`;
    //console.log("this.headers",this.headers);
    return this.http.get(api,{headers: this.headers}).pipe(
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
