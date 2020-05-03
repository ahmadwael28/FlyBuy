import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private myClient:HttpClient) { 
  }

  baseURL = 'http://localhost:3000/Users';

  getAllUsers(){    
    console.log("get all users")
    let response= this.myClient.get(`${this.baseURL}`);
    return response;
  }
  isEmailExists(email)
  {
    console.log("Check if email exists...")
    let response = this.myClient.get(`${this.baseURL}/ValidateEmail/${email}`);
  }
  isUsernameExists(username)
  {
    console.log("Check if username exists...")
    let response = this.myClient.get(`${this.baseURL}/ValidateUsername/${username}`);
  }
  AddUser(user)
  {
      console.log("Post User..");
      let response = this.myClient.post(`${this.baseURL}`,user);
  }
}
