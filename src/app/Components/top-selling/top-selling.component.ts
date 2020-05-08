import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { BackendLinkService } from 'src/app/Service/backend-link.service';
import { ShoppingCartService } from 'src/app/Service/shopping-cart.service';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.css']
})
export class TopSellingComponent implements OnInit {

  constructor(private Service:BackendLinkService, private shoppingCartService:ShoppingCartService,private router:Router, public authService:AuthService) { }
  @Output()
  myEvent=new EventEmitter();

  topSelling;

  ngOnInit(): void {

    let TopProductsobservable = this.Service.getTopSellingProducts();
  let TopProductsdispose = TopProductsobservable.subscribe((data) => {
    
    this.topSelling = data;
    console.log(this.topSelling.length);

    this.topSelling.forEach(element => {
      element.Image = `http://localhost:3000/static/${element.Image}`
  });
  TopProductsdispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });
  }

  goProductDetails(id)
  {
    if(this.authService.isLoggedIn)
    {
      this.router.navigateByUrl(`Products/${id}`);
    }
    else
    {
      this.router.navigateByUrl('Login');
    }
  }
  addToCart(id)
  {
    
    if(this.authService.isLoggedIn)
    {
    let addToCartObservable=this.shoppingCartService.addToCart(id);
    let addToCartDispose=addToCartObservable.subscribe((data)=>{
      //this.productsInShoppingCart.push(data);
      if(typeof(data)=="object")
      {
        console.log("Added Successfully",data);
      }
      addToCartDispose.unsubscribe();
    },
    (err)=>{
      console.log(err);
    });
    }
    else
    {
      this.router.navigateByUrl('Login');
    }
  }
}
