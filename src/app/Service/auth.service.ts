import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private myClient:HttpClient) { 
  }
  
  baseURL = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  login(credentials){
    console.log("Login");
   let inputData= this.myClient.post(`${this.baseURL}/Users/Login`,{
      username: credentials.username,
      password: credentials.password
    },this.httpOptions);
    return inputData;
  }
}
