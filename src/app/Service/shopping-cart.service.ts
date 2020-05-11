import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { AuthService } from './../../app/Shared/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private myClient:HttpClient,public authService:AuthService) { 
  }
  baseURL = 'http://localhost:3000';
  getUserShoppingCart(){
    console.log("get User Shopping Cart by token")
      let response= this.myClient.get(`${this.baseURL}/ShoppingCarts/UserShoppingCart`);
      return response;
  }
  addToCart(productId){
    console.log("add to cart")
    console.log("productId",productId);
    let response= this.myClient.get(`${this.baseURL}/ShoppingCarts/AddProduct/${productId}`,
    {headers:{'x-access-token':this.authService.getToken()}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.authService.handleError)
    )
    console.log("response",response);
    return response;
  }
  incrementProductQuantity(productId){
    console.log("increment Product Quantity")
    console.log("productId",productId);
    let response= this.myClient.patch(`${this.baseURL}/ShoppingCarts/UpdateProduct/${productId}/inc`,
    {headers:{'x-access-token':this.authService.getToken()}})
    // .pipe(
    //   map((res: Response) => {
    //     console.log("res",res);
    //     return res || {}
    //   }),
    //   catchError(this.authService.handleError)
    // )
    if(response)
    {
      console.log("response",response);
      return response;
    }
    else
    {
      console.log("false",false);
     // return response._subscribe;
    }
  }
  decrementProductQuantity(productId){
    console.log("decrement Product Quantity")
    console.log("productId",productId);
    let response= this.myClient.patch(`${this.baseURL}/ShoppingCarts/UpdateProduct/${productId}/dec`,
    {headers:{'x-access-token':this.authService.getToken()}}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.authService.handleError)
    )
    console.log("response",response);
    return response;
  }
  checkout()
  {
    
    let response= this.myClient.get(`${this.baseURL}/ShoppingCarts/Products/ByUserToken/Checkout`,
      {headers:{'x-access-token':this.authService.getToken()}}).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.authService.handleError)
      )
      console.log("response",response);
      return response;
  }
  removeProduct(id)
  {
     console.log("deleting product request..");
    let response= this.myClient.delete(`${this.baseURL}/ShoppingCarts/RemoveProduct/${id}`,
      {headers:{'x-access-token':this.authService.getToken()}}).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.authService.handleError)
      )
      console.log("response",response);
      return response;
  }
}
