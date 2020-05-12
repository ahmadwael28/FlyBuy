import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { BackendLinkService } from 'src/app/Service/backend-link.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent implements OnInit {

  @ViewChild('body') body: ElementRef;

  @Input()  ShowModal;
  @Input() currentProduct;

  URL = 'http://localhost:3000/Users/upload';
  public uploader: FileUploader = new FileUploader({
    url: this.URL, itemAlias: 'photo'
  });
  emaiExits;
  usernameExists;
  userAddedSuccMess;
  isValidFormSubmitted: boolean = false;
  fileItem;
  fileValue: string = "";
  isLoggedInChecked: boolean = false;


  constructor(private Service: BackendLinkService, private router: Router, private toastr: ToastrService,
    private auth: AuthService) {
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

  ngOnChanges(changes: SimpleChanges) {

     //this.EditProductForm.controls['Category'].setValue(this.currentProduct.Category);
     this.EditProductForm.controls['Name'].setValue(this.currentProduct.Name);
     this.EditProductForm.controls['Description'].setValue(this.currentProduct.Description);
     this.EditProductForm.controls['Price'].setValue(this.currentProduct.Price);
     this.EditProductForm.controls['Promotion'].setValue(this.currentProduct.Promotion);
}

EditProductForm = new FormGroup({

  //Category:new FormControl('', Validators.required),
  Name: new FormControl('', Validators.required),
  Description: new FormControl( '', [Validators.required, Validators.minLength(20),Validators.maxLength(1000)]),
  Price: new FormControl('', [Validators.required,Validators.min(0)]),
  Promotion:new FormControl('', [Validators.required,Validators.min(0),Validators.max(100)])
})

  
   onSubmit() {
    console.log("Inside submit..");
    this.isValidFormSubmitted = true;

    console.log("fileValue", this.fileValue);
    console.log(this.fileItem);

    console.log("validationnnnnn",this.EditProductForm.valid);

    if (this.EditProductForm.valid) {
      if (this.fileValue != "") {
        console.log('User chose a photo to upload');
        this.uploader.uploadAll();
      }
      else {
        console.log('No photo is Updated!');
        this.editProduct();
      }
     }

   }
   editProduct() {
    console.log('EditProduct is Invoked...');


    console.log(this.EditProductForm.value);
    let { Name, Description, Price,Promotion } = this.EditProductForm.value;
    let product;
    console.log(this.fileValue);
    if (this.fileValue == "")
      product = {
        "Name": Name, "Description": Description,"Price": Price,"Promotion": Promotion
      };
    else
    product = {
        "Name": Name, "Description": Description,"Price": Price,"Promotion": Promotion, "Image": this.fileItem?.file.name
      };

    let observable = this.Service.EditProduct(product,this.currentProduct._id);

    let dispose = observable.subscribe((data) => {
      console.log(data);
      this.userAddedSuccMess = data;
      if (this.userAddedSuccMess) {
        console.log("Product Added Successfully!");
        this.toastr.success('product edited successfully!');
      }

      dispose.unsubscribe();

    },
      (err) => {
        console.log(err);

      });


  }

  close()
  {
    (<HTMLBodyElement>document.getElementsByTagName("body")[0]).classList.remove('modal-open');
    (<HTMLCollection>document.getElementsByClassName('modal-backdrop'))[0].remove();
    this.ShowModal = false;
    location.reload();
  }

}
