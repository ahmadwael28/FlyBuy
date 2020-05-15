import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, ActivatedRouteSnapshot, RouterLink, NavigationEnd } from '@angular/router';
import { BackendLinkService } from 'src/app/Service/backend-link.service';
import { AuthService } from './../../shared/auth.service';
import { ShoppingCartService } from 'src/app/Service/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  router;
  SearchKey;

  SearchResults;
  navigationSubscription;
  constructor(private Service:BackendLinkService,public authService:AuthService,
    myActivatedRoute:ActivatedRoute,private toaster: ToastrService, private shoppingCartService:ShoppingCartService,
    myRouter: Router) { 
    
    this.router = myRouter;
    this.SearchKey = myActivatedRoute.snapshot.params["searchKey"];
    //alert(this.SearchKey);
  }

  ngOnInit(): void {
    this.GetSearchResults()

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      location.reload();
    });
  }


  GetSearchResults()
  {
    let SearchResultsobservable = this.Service.SearchAllProducts(this.SearchKey);
  let SearchResultdispose = SearchResultsobservable.subscribe((data) => {
    
    this.SearchResults = data;

    this.SearchResults.forEach(element => {
      element.Image = `https://flybuyapi.herokuapp.com/static/${element.Image}`
  });

  SearchResultdispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });
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
      this.toaster.error('Product already Exists in your shopping cart, Do you want to change its Quantity?');
      console.log("Product already Exists in shopping cart, Do you want to add its Quantity?",err);
    });
  }
}

}
