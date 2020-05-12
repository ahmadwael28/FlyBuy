import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseURL = 'http://localhost:3000/Orders';

  constructor(private myClient:HttpClient) { }

  getAllOrders()
  {
    console.log("Inside Get All Order Service ");
    let response = this.myClient.get(`${this.baseURL}`);
    return response;
  }
}
