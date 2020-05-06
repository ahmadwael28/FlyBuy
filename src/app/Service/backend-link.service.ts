import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getThreeRandomProducts(){    
    console.log("get Three Random Products")
    let response= this.myClient.get(`${this.baseURL}/Products/random/three`);
    return response;
  }


  getTopSellingProducts(){
    console.log("get top selling products")
    let response= this.myClient.get(`${this.baseURL}/Products/top/Selling`);
    return response;
  }

  getProductById(Id){
    console.log("get single products")
    let response= this.myClient.get(`${this.baseURL}/Products/${Id}`);
    return response;
  }


  getAllCategories()
  {
    console.log("get all Categories")
    let response= this.myClient.get(`${this.baseURL}/Categories/`);
    return response;
  }

  getAllCategoriesWithProducts()
  {
    console.log("get all Categories")
    let response= this.myClient.get(`${this.baseURL}/Categories/WithProducts`);
    return response;
  }


  image(image) {
    return this.myClient.request('GET', `${this.baseURL}/Products/getImage/${image}`, {responseType: 'blob'}).toPromise();;
  }

  Search(categoryId,searchKey)
  {
    return this.myClient.request('GET', `${this.baseURL}/Categories/Search/${categoryId}/${searchKey}`);
  }

  SearchAllProducts(searchKey)
  {
    return this.myClient.request('GET', `${this.baseURL}/Products/Search/${searchKey}`);
  }
  ChangePage(categoryId,NProductsPerPage,RequiredPage)
  {
    return this.myClient.request('GET', `${this.baseURL}/Categories/Page/${categoryId}/${NProductsPerPage}/${RequiredPage}`);
  }

}
