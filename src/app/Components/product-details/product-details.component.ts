import { Component, OnInit } from '@angular/core';
import { BackendLinkService } from 'src/app/Service/backend-link.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCartService } from 'src/app/Service/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  count=0;
  ID;
  router;
  Product;
  isDataLoaded:boolean = false;
  navigationSubscription;
  constructor(private Service:BackendLinkService,private toaster: ToastrService, private shoppingCartService:ShoppingCartService,
    myActivatedRoute:ActivatedRoute,myRouter: Router) { 
    
    this.router = myRouter;
    this.ID = myActivatedRoute.snapshot.params["id"];

    //console.log("ctor")
    // var refresh = window.localStorage.getItem('refresh');
    // console.log(refresh);
    // if (refresh===null){
    //     window.location.reload();
    //     window.localStorage.setItem('refresh', "1");
    // }
  }

  
  ngOnInit(): void {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      location.reload();
    });
   
    let observable = this.Service.getProductById(this.ID);
  let dispose = observable.subscribe((data) => {
    console.log(data);
    this.Product = data;
    this.Product.Image = `http://localhost:3000/static/${this.Product.Image}`;
   
    this.isDataLoaded = true;
    console.log(this.Product.Image);
    console.log(this.isDataLoaded);
    dispose.unsubscribe();
   
  },
  (err)=>{
    console.log(err);
  });
  }
  addToCart(id)
  {
    let addToCartObservable=this.shoppingCartService.addToCart(id);
    let addToCartDispose=addToCartObservable.subscribe((data)=>{
      //this.productsInShoppingCart.push(data);
      if(typeof(data)=="object")
      {
        this.toaster.success('This Product is Added Successfully');

        console.log("Added Successfully",data);
      }
      addToCartDispose.unsubscribe();
    },
    (err)=>{
      this.toaster.error('Product already Exists in your shopping cart, Do you want to change its Quantity?');
      console.log("Product already Exists in shopping cart, Do you want to add its Quantity?",err);
    });
  }
  incrementQuantity(id)
  {
    let incrementObservable=this.shoppingCartService.incrementProductQuantity(id);
    let incrementDispose=incrementObservable.subscribe((data)=>{
      console.log("increment",data);
      incrementDispose.unsubscribe();
    },
    (err)=>{
      this.toaster.error('this product in out of stock!');
      console.log("this product in out of stock!",err);
    });
  }
  decrementQuantity(id)
  {
    let decrementObservable=this.shoppingCartService.decrementProductQuantity(id);
    let decrementDispose=decrementObservable.subscribe((data)=>{
      console.log("decrement",data);
      decrementDispose.unsubscribe();
    },
    (err)=>{
      this.toaster.error('cannot decrease product quantity less than 1!');
      console.log("cannot decrease product quantity less than 1!",err);
    });
  }
}
