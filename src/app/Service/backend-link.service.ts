import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendLinkService {

  constructor(private myClient:HttpClient) { 
  }
  
  baseURL = 'http://localhost:3000';

  getAllProducts(){    
    console.log("get all products")
    let response= this.myClient.get(`${this.baseURL}/Products`);
    return response;
  }

  getProductById(Id){
    console.log("get single products")
    let response= this.myClient.get(`${this.baseURL}/Products/${Id}`);
    return response;
  }

  image(image) {
    return this.myClient.request('GET', `${this.baseURL}/Products/getImage/${image}`, {responseType: 'blob'}).toPromise();;
  }

}
