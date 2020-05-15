import { BackendLinkService } from '../../Service/backend-link.service';
import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterContentInit, AfterViewChecked } from '@angular/core';
import { AuthService } from './../../Shared/auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../Service/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit,AfterViewChecked {

  constructor(private toaster: ToastrService,private Service:BackendLinkService,public authService:AuthService,private router:Router,private shoppingCartService:ShoppingCartService) { 
    // if(this.authService.currentUser.Role != "User")
    // {
    //   alert("an auth user")
    //   this.router.navigateByUrl('Home');
    // }
    
    // if(this.authService.isLoggedIn && this.authService.currentUser.Role == "User")
    //   {
    //     this.router.navigateByUrl(`Shop`);
    //   }
    //   else if(this.authService.isLoggedIn)
    //   {
    //     this.router.navigateByUrl('Home');
    //   }
    //   else
    //   {
    //     this.router.navigateByUrl('Login');
    //   }
  }

  SelectedCategoryId;

  AllProducts;
  AllCategories;
  SearchRes;

  SelectedProducts;
  SelectedCategoryName;
  SelectedCategory;

  NProductsPerPage = 5;
  Npages;
  NExistingProducts;
  CurrentPage = 1;

  ngAfterViewChecked(): void {
    if(this.authService.currentUser.Role != "User")
    {
      alert("un authorized access")
      this.router.navigateByUrl('Home');
    }

    
  }
  
  ngOnInit(): void {
    window.localStorage.removeItem('refresh');
    let AllCategoriesobservable = this.Service.getAllCategories();
    let AllCategoriesdispose = AllCategoriesobservable.subscribe((data) => {
    
    this.AllCategories = data;
    console.log(this.AllCategories.length);
    this.SelectedCategoryId = this.AllCategories[1]._id;

    this.SelectedCategoryName = this.AllCategories.find(category => category._id == this.SelectedCategoryId).CategoryName;
    this.SelectedCategory = this.AllCategories.find(category => category._id == this.SelectedCategoryId);
    //this.SelectedProducts = this.AllCategories.find(category => category._id == this.SelectedCategoryId).Products;

    this.GetPage(this.CurrentPage);

    let NExistingProductsResult = this.Service.GetNProducts(this.SelectedCategoryId);
    let NExistingProductsdispose = NExistingProductsResult.subscribe((data) => {

      this.NExistingProducts = data;
      this.Npages = Math.ceil(Number.parseInt(this.NExistingProducts.count) / this.NProductsPerPage);

      NExistingProductsdispose.unsubscribe();
    },
      (err) => {
        console.log(err);
      });

  AllCategoriesdispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });


  let AllProductsobservable = this.Service.getAllProducts();
  let AllProductsdispose = AllProductsobservable.subscribe((data) => {
    
    this.AllProducts = data;
    console.log(this.AllProducts.length);

    this.AllProducts.forEach(element => {
      element.Image = `https://flybuyapi.herokuapp.com/static/${element.Image}`
  });
  AllProductsdispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });


  

  }

  changeCategory(event) {
    this.SelectedCategoryId = event.target.value;

    this.SelectedCategoryName = this.AllCategories.find(category => category._id == this.SelectedCategoryId).CategoryName;
    this.SelectedCategory = this.AllCategories.find(category => category._id == this.SelectedCategoryId);
    //this.SelectedProducts = this.AllCategories.find(category => category._id == this.SelectedCategoryId).Products;
    this.GetPage(this.CurrentPage);

    let NExistingProductsResult = this.Service.GetNProducts(this.SelectedCategoryId);
    let NExistingProductsdispose = NExistingProductsResult.subscribe((data) => {

      this.NExistingProducts = data;
      this.Npages = Math.ceil(Number.parseInt(this.NExistingProducts.count) / this.NProductsPerPage);

      NExistingProductsdispose.unsubscribe();
    },
      (err) => {
        console.log(err);
      });

    (<HTMLInputElement>document.querySelector("#search")).value = ""
  }

  onSearchChange(searchValue: string): void {

    if (searchValue == "") {
      this.GetPage(this.CurrentPage);
    }
    else {
      let SearchResult = this.Service.Search(this.SelectedCategoryId, searchValue);
      let SearchResultdispose = SearchResult.subscribe((data) => {

        console.log(data)
        this.SearchRes = data;
        this.SearchRes.forEach(element => {
          element.productId.Image = `https://flybuyapi.herokuapp.com/static/${element.productId.Image}`;
        });

        this.SelectedProducts = this.SearchRes;

        SearchResultdispose.unsubscribe();
      },
        (err) => {
          console.log(err);
        });
    }


  }

  GetPage(event)
  {
    console.log(event);
    this.CurrentPage = event;

    let NewPageProducts = this.Service.ChangePage(this.SelectedCategoryId,this.NProductsPerPage,this.CurrentPage);
    let NewPageProductsdispose = NewPageProducts.subscribe((data) => {
    
    this.SelectedProducts = data;

    this.SelectedProducts.forEach(element => {
        element.productId.Image = `https://flybuyapi.herokuapp.com/static/${element.productId.Image}`
      }); 

      NewPageProductsdispose.unsubscribe();
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
