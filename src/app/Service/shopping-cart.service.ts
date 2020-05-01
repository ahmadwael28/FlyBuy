import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private myClient:HttpClient) { 
  }
  baseURL = 'http://localhost:3000';
  getShoppingCartProductsByUserID(id){
    console.log("get shopping cart products by user id")
    let response= this.myClient.get(`${this.baseURL}/ShoppingCarts/${id}`);
    return response;
  }
  addToCart(){
    console.log("add to cart")
    let response= this.myClient.get(`${this.baseURL}/ShoppingCarts/AddProduct`);

    return response;
  }
}
