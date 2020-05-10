import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/Service/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  id;
  router;
  productsInShoppingCart:Array<any>;
  isDataLoaded:boolean = false;
  constructor(private service:ShoppingCartService, myRouter: Router) { 

    this.router = myRouter;
  }

  
  ngOnInit(): void {
    window.localStorage.removeItem('refresh');
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