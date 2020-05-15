import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCartService } from 'src/app/Service/shopping-cart.service';
import { AuthService } from './../../Shared/auth.service';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.css']
})
export class ProductsSectionComponent implements OnInit {

  constructor(private router:Router,private toaster: ToastrService, private shoppingCartService:ShoppingCartService, public authService:AuthService) { }

  ngOnInit(): void {

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

  goProductDetails(id)
  {
      this.router.navigateByUrl(`Products/${id}`);
  }

  @Input() ProductsInput;
  @Input() CategoryNameInput;
}
