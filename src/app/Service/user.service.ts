import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private myClient:HttpClient) { 
  }

  baseURL = 'https://flybuyapi.herokuapp.com/Users';

  getAllUsers(){    
    console.log("get all users")
    let response= this.myClient.get(`${this.baseURL}`);
    return response;
  }
  isEmailExists(email)
  {
    console.log("Check if email exists...")
    let response = this.myClient.get(`${this.baseURL}/ValidateEmail/${email}`);
    return response;
  }
  isUsernameExists(username)
  {
    console.log("Check if username exists...")
    let response = this.myClient.get(`${this.baseURL}/ValidateUsername/${username}`);
    return response;
  }
  isPasswordCorrect(password)
  {
    console.log("Check if password is correct...")
    let response = this.myClient.get(`${this.baseURL}/ValidatePassword/${password}`);
    return response;
  }
  AddUser(user)
  {
      console.log("Post User..");
      let response = this.myClient.post(`${this.baseURL}/`,user);
      return response;
  }


  EditUser(user)
  {
      console.log("Edit User..");
      console.log(user);
      let response = this.myClient.patch(`${this.baseURL}/UpdateUser/`,user)
      return response;
  }
}
