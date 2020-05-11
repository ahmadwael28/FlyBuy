import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/Service/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  id;
  router;
  productsInShoppingCart;
  checkedOut=false;
  isDataLoaded:boolean = false;
  TotalPrice;
  constructor(private service:ShoppingCartService, myRouter: Router,private toaster: ToastrService) { 

    this.router = myRouter;
  }

  
  ngOnInit(): void {
    window.localStorage.removeItem('refresh');
    let getUserShoppingCartObservable = this.service.getUserShoppingCart();
    let getUserShoppingCartDispose = getUserShoppingCartObservable.subscribe((data:any) => {
      console.log("response Data",data);
     this.TotalPrice = data.TotalPrice;
      this.productsInShoppingCart = data.ShoppingCart.Products;
      console.log("Products",this.productsInShoppingCart);
      console.log("Products",typeof(this.productsInShoppingCart));
      console.log(this.productsInShoppingCart.length);
  
      this.productsInShoppingCart.forEach(element => {
        console.log("Image",element.Product.Image);
        element.Product.Image = `http://localhost:3000/static/${element.Product.Image}`
    });
    getUserShoppingCartDispose.unsubscribe();
    },
    (err)=>{
      console.log(err);
    });
  }

  incrementQuantity(id)
  {
    let incrementObservable=this.service.incrementProductQuantity(id);
    let incrementDispose=incrementObservable.subscribe((data:any)=>{
      console.log("increment",data);
      this.productsInShoppingCart=data.Products;
      this.productsInShoppingCart.forEach(element => {
        console.log("Image",element.Product.Image);
        element.Product.Image = `http://localhost:3000/static/${element.Product.Image}`
    });
     
      incrementDispose.unsubscribe();
    },
    (err)=>{
      this.toaster.error('this product is out of stock!');
      console.log("this product is out of stock!",err);
    });
  }
  decrementQuantity(id)
  {
    let decrementObservable=this.service.decrementProductQuantity(id);
    let decrementDispose=decrementObservable.subscribe((data:any)=>{
      console.log("decrement",data);
      this.productsInShoppingCart=data.Products;
      this.productsInShoppingCart.forEach(element => {
        console.log("Image",element.Product.Image);
        element.Product.Image = `http://localhost:3000/static/${element.Product.Image}`
    });
      decrementDispose.unsubscribe();
    },
    (err)=>{
      this.toaster.error('cannot decrease product quantity less than 1!');
      console.log("cannot decrease product quantity less than 1!",err);
    });
  }
  

  // getUserShoppingCart(){
  //   let cartByUserIDObservable=this.service.getUserShoppingCart();
  //   let cartByUserIDDispose=cartByUserIDObservable.subscribe((data)=>{
  //     //this.productsInShoppingCart=data;
  //     this.productsInShoppingCart.forEach(element => {
  //       element.Image = `http://localhost:3000/static/${element.Image}`;
  //       this.isDataLoaded = true;
  //     });
  //     cartByUserIDDispose.unsubscribe();
  //   },
  //   (err)=>{
  //     console.log(err);
  //   });
  // }
  // addToCart(productId){
  //   let addToCartObservable=this.service.addToCart(productId);
  //   let addToCartDispose=addToCartObservable.subscribe((data)=>{
  //     //this.productsInShoppingCart.push(data);
  //     console.log(typeof(data));
  //     if(typeof(data)=="object")
  //     {
  //     }
  //     addToCartDispose.unsubscribe();
  //   },
  //   (err)=>{
  //     console.log(err);
  //   });
  // }

}