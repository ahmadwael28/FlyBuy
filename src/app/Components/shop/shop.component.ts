import { BackendLinkService } from 'src/app/Service/backend-link.service';
import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterContentInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit,AfterViewChecked {

  constructor(private Service:BackendLinkService) { }

  SelectedCategoryId;

  AllProducts;
  AllCategories;
  SearchRes;

  SelectedProducts;
  SelectedCategoryName;
  SelectedCategory;

  NProductsPerPage = 5;
  Npages;
  CurrentPage = 1;

  ngAfterViewChecked(): void {    
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
    this.Npages = Math.ceil(this.SelectedCategory.Products.length / this.NProductsPerPage);
    
    
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
      element.Image = `http://localhost:3000/static/${element.Image}`
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

    this.Npages = Math.ceil(this.SelectedCategory.Products.length / this.NProductsPerPage);

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
          element.productId.Image = `http://localhost:3000/static/${element.productId.Image}`;
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
        element.productId.Image = `http://localhost:3000/static/${element.productId.Image}`
      }); 

      NewPageProductsdispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });

  }

}
