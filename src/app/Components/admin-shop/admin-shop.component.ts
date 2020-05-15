import { BackendLinkService } from 'src/app/Service/backend-link.service';
import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterContentInit, AfterViewChecked } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/Service/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrls: ['./admin-shop.component.css']
})
export class AdminShopComponent implements OnInit,AfterViewChecked {

  constructor(private toaster: ToastrService,private Service:BackendLinkService,public authService:AuthService,private router:Router,private shoppingCartService:ShoppingCartService) { 
    
    // if(this.authService.currentUser.Role != "Admin")
    // {
    //   alert("an auth admin")
    //   this.router.navigateByUrl('Home');
    // }
    // if(this.authService.isLoggedIn && this.authService.currentUser.Role == "Admin")
    //   {
    //     alert("admin auth")
    //     this.router.navigateByUrl(`AdminShop`);
    //   }
    //   else if(this.authService.isLoggedIn)
    //   {
    //     alert("admin unauth")

    //     this.router.navigateByUrl('Home');

    //   }
    //   else
    //   {
    //     alert("logged out")

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

  currentProduct = {
  "Category": "",
  "Description": "",
  "Image": "",
  "IsDeleted": false,
  "NSales": 0,
  "Name": "",
  "Price": 0,
  "Promotion": 0,
  "UnitsInStock": 0,
  "_id": ""
};
  ShowModal=false;
  ShowAddModal = false;

  ChangeCurrentProduct(event)
  {
    console.log("parent method invoked");
    this.currentProduct = event;
    this.ShowModal = true;
    console.log(this.currentProduct)
  }
  
  ngAfterViewChecked(): void {
    if(this.authService.currentUser.Role != "Admin")
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

}
