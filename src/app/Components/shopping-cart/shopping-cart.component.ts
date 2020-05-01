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
  productsInShoppingCart;
  constructor(private service:ShoppingCartService,
    myActivatedRoute:ActivatedRoute,
    myRouter: Router) { 

    this.router = myRouter;
    this.id = myActivatedRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    let cartByUserIDObservable=this.service.getShoppingCartProductsByUserID(this.id);
    let cartByUserIDDispose=cartByUserIDObservable.subscribe((data)=>{
      this.productsInShoppingCart=data;
      this.productsInShoppingCart.forEach(element => {
        element.Image = `http://localhost:3000/static/${element.Image}`
      });
      cartByUserIDDispose.unsubscribe();
    },
    (err)=>{
      console.log(err);
    });

    let addToCartObservable=this.service.addToCart();
    let addToCartDispose=addToCartObservable.subscribe((data)=>{
      
    })
}
}
