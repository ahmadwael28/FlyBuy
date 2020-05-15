import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseURL = 'https://flybuyapi.herokuapp.com/Orders';

  constructor(private myClient:HttpClient) { }

  getAllOrders()
  {
    console.log("Inside Get All Order Service ");
    let response = this.myClient.get(`${this.baseURL}`);
    return response;
  }
  editOrderStatus(id,status)
  {
    let response = this.myClient.patch(`${this.baseURL}/${id}`,status);
    return response;
  }
}
