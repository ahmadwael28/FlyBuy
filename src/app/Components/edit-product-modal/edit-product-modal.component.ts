import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Shared/auth.service';
import { BackendLinkService } from '../../Service/backend-link.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent implements OnInit {

  @ViewChild('body') body: ElementRef;

  @Input()  ShowModal;
  @Input() currentProduct;

  URL = 'https://flybuyapi.herokuapp.com/Users/upload';
  public uploader: FileUploader = new FileUploader({
    url: this.URL, itemAlias: 'photo'
  });
  emaiExits;
  userAddedSuccMess;
  isValidFormSubmitted: boolean = false;
  fileItem;
  fileValue: string = "";
  isLoggedInChecked: boolean = false;
  Categories;


  selectedCategoryId = "";
  selectedCategoryName = "";
  btnSelection;


  constructor(private Service: BackendLinkService, private router: Router, private toastr: ToastrService,
    private auth: AuthService) {
      this.GetAllCategories();

  }

  ngOnInit(): void {

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {

      ("OnComplete Upload...");
      this.fileItem = item;
      console.log('Uploaded File Details:', item);
      this.editProduct();
      
    };

    
  }

  CategorySelectionChange(event)
  {
    this.selectedCategoryName = event.target.innerText
    this.selectedCategoryId = event.target.id;
  }

  ngOnChanges(changes: SimpleChanges) {

     //this.EditProductForm.controls['Category'].setValue(this.currentProduct.Category);

     this.btnSelection = <HTMLButtonElement>document.getElementsByClassName("uniqueClass")[0];
     console.log(this.btnSelection);

    this.selectedCategoryId = this.currentProduct.Category;
    this.selectedCategoryName = this.Categories.filter(c=> c._id == this.selectedCategoryId)[0].CategoryName;


     this.EditProductForm.controls['Name'].setValue(this.currentProduct.Name);
     this.EditProductForm.controls['Description'].setValue(this.currentProduct.Description);
     this.EditProductForm.controls['Price'].setValue(this.currentProduct.Price);
     this.EditProductForm.controls['Promotion'].setValue(this.currentProduct.Promotion);     
}

EditProductForm = new FormGroup({

  // Category:new FormControl('', Validators.required),
  Name: new FormControl('', Validators.required),
  Description: new FormControl( '', [Validators.required, Validators.minLength(20),Validators.maxLength(1000)]),
  Price: new FormControl('', [Validators.required,Validators.min(0)]),
  Promotion:new FormControl('', [Validators.required,Validators.min(0),Validators.max(100)])
})

 

  GetAllCategories()
  {
    let AllCategoreisobservable = this.Service.getAllCategories();
    let AllCategoreisdispose = AllCategoreisobservable.subscribe((data) => {
      this.Categories = data;

      console.log("all categories",this.Categories);

      AllCategoreisdispose.unsubscribe();

    },
      (err) => {
        console.log(err);

      });
  }

  
   onSubmit() {
    //console.log("Inside submit..");
    this.isValidFormSubmitted = true;

    //console.log("fileValue", this.fileValue);
    //console.log(this.fileItem);

    if (this.EditProductForm.valid) {
      if (this.fileValue != "") {
        //console.log('User chose a photo to upload');
        this.uploader.uploadAll();
      }
      else {
        //console.log('No photo is Updated!');
        this.editProduct();
      }
     }

   }
   editProduct() {

    this.btnSelection = <HTMLButtonElement>document.getElementsByClassName("uniqueClass")[0];
    let { Name, Description, Price,Promotion,Category } = this.EditProductForm.value;
    let product;
    if (this.fileValue == "")
      product = {
        "Name": Name, 
        "Description": Description,
        "Price": Price,
        "Promotion": Promotion,
        "Category":this.selectedCategoryId
      }
    else
    product = {
        "Name": Name, 
        "Description": Description,
        "Price": Price,
        "Promotion": Promotion,
        "Category":this.selectedCategoryId,
        "Image": this.fileItem?.file.name
      }

      //console.log('Updated Product Info',JSON.stringify(product));
    let observable = this.Service.EditProduct(product,this.currentProduct._id);

    let dispose = observable.subscribe((data) => {
      console.log(data);
      this.userAddedSuccMess = data;
      //console.log("edittttttttttt producttttttttt", this.userAddedSuccMess);
      if (this.userAddedSuccMess) {
        this.toastr.success('product edited successfully!');
        location.reload();
      }

      dispose.unsubscribe();

    },
      (err) => {
        console.log(err);
        if(err.status == 200)
        {
          this.toastr.success('product edited successfully!');
          location.reload();
        }

      });

  }

  close()
  {
    (<HTMLBodyElement>document.getElementsByTagName("body")[0]).classList.remove('modal-open');
    (<HTMLCollection>document.getElementsByClassName('modal-backdrop'))[0].remove();
    this.ShowModal = false;
   
  }

}
