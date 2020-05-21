import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { BackendLinkService } from '../../Service/backend-link.service';
import { ShoppingCartService } from '../../Service/shopping-cart.service';
import { Router } from '@angular/router';
import { AuthService } from './../../Shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.css']
})
export class TopSellingComponent implements OnInit {

  constructor(private Service:BackendLinkService,private toaster: ToastrService, private shoppingCartService:ShoppingCartService,private router:Router, public authService:AuthService) { }
  @Output()
  myEvent=new EventEmitter();

  topSelling;

  ngOnInit(): void {

    let TopProductsobservable = this.Service.getTopSellingProducts();
  let TopProductsdispose = TopProductsobservable.subscribe((data) => {
    
    this.topSelling = data;
    console.log(this.topSelling.length);
    
    this.topSelling = this.topSelling.filter(p=>p.IsDeleted==false);
    this.topSelling.forEach(element => {
      element.Image = `https://flybuyapi.herokuapp.com/static/${element.Image}`
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
        this.toaster.success('This Product is Added Successfully');

        console.log("Added Successfully",data);
      }
      addToCartDispose.unsubscribe();
    },
    (err)=>{
      this.toaster.error('Product already Exists in your shopping cart, go tour Shopping Cart if you want to add its Quantity?');
      console.log("Product already Exists in shopping cart, Do you want to add its Quantity?",err);
    });
    }
    else
    {
      this.router.navigateByUrl('Login');
    }
  }
}
