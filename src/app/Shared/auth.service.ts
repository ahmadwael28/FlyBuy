import { Injectable, OnInit } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  

  baseURL: string='http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser ;
  loggedIn:boolean=false;

  constructor(
    private http: HttpClient,
    public router: Router
  ) 
  {
  }
  ngOnInit(): void {

    let Userobservable = this.getUserByToken();
    let Userdispose = Userobservable.subscribe((data) => {

      this.currentUser = data;
      console.log("current user role by route", this.currentUser.Role);

      Userdispose.unsubscribe();
    },
      (err) => {
        console.log(err);
      });
  }

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
      this.currentUser = null;
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

  getUserOrders(id)
  {
    return this.http.request('GET', `${this.baseURL}/Orders/user/${id}`);
  }

  getUserByToken()
  {
    return this.http.request('GET', `${this.baseURL}/Users/UserToken`,
    {headers: this.headers});
  }

  cancelOrder(id) {
    //return this.http.request('DELETE', `${this.baseURL}/Orders/${id}`)
    this.http.delete(`${this.baseURL}/Orders/${id}`)
  .subscribe(
    err => console.error(err)
  );
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
      console.log("client-side error",msg)
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log("server-side error",msg)

    }
    return throwError(msg);
  }
}
