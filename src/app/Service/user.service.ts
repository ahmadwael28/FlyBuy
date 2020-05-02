import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private myClient:HttpClient) { 
  }

  baseURL = 'http://localhost:3000';

  getAllUsers(){    
    console.log("get all users")
    let response= this.myClient.get(`${this.baseURL}/Users`);
    return response;
  }
}
