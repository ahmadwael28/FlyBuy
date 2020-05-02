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

  SelectedProducts;
  SelectedCategoryName;
  SelectedCategory;

  ngAfterViewChecked(): void {
    // var CategoryItems = document.getElementsByClassName("Items-List") as HTMLCollectionOf<HTMLElement>;;

    // for(let i = 0;i < CategoryItems.length;i++)
    // {
    //   if(CategoryItems[i].id == this.SelectedCategoryId)
    //     CategoryItems[i].style.display = "block";
    //   else
    //     CategoryItems[i].style.display = "none";
    // }

    
  }
  
  ngOnInit(): void {
    let AllCategoriesobservable = this.Service.getAllCategories();
    let AllCategoriesdispose = AllCategoriesobservable.subscribe((data) => {
    
    this.AllCategories = data;
    console.log(this.AllCategories.length);
    this.SelectedCategoryId = this.AllCategories[1]._id;

    this.SelectedCategoryName = this.AllCategories.find(category => category._id == this.SelectedCategoryId).CategoryName;
    this.SelectedCategory = this.AllCategories.find(category => category._id == this.SelectedCategoryId);
    this.SelectedProducts = this.AllCategories.find(category => category._id == this.SelectedCategoryId).Products;

    this.AllCategories.forEach(category => {
      category.Products.forEach(element => {
        element.productId.Image = `http://localhost:3000/static/${element.productId.Image}`
      }); 
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
    this.SelectedProducts = this.AllCategories.find(category => category._id == this.SelectedCategoryId).Products;

    (<HTMLInputElement> document.querySelector("#search")).value = ""
  }

  onSearchChange(searchValue: string): void {
    var result = this.SelectedCategory.Products.filter(product => product.productId.Name.toLowerCase().indexOf(searchValue.toLowerCase()) != -1);
    this.SelectedProducts = result;
  }

}
