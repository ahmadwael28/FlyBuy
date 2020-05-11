import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/Service/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productsInShoppingCart;
  TotalPrice;
  isCheckedAcceptTerms: boolean = false;
  isValidFormSubmitted: boolean = false;
  billingForm = new FormGroup({

    FirstName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z-]*$")]),
    LastName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z-]*$")]),
    City: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z-]*$")]),
    Street: new FormControl('', [Validators.required]),
    Zip: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{4}"), Validators.maxLength(4)]),
    PhoneNumber: new FormControl('', [Validators.required, Validators.pattern("(00201)[0-9]{9}")])

  });
  //make sure user check accept terms b4 proceeding checkout
  get FirstName() { return this.billingForm.get('FirstName') }
  get LastName() { return this.billingForm.get('LastName') }
  get City() { return this.billingForm.get('City') }
  get Street() { return this.billingForm.get('Street') }
  get Zip() { return this.billingForm.get('Zip') }
  get PhoneNumber() { return this.billingForm.get('PhoneNumber') }
  get isValid() { return this.billingForm.valid }
  constructor(private service: ShoppingCartService, private toaster: ToastrService,private router:Router,
    private userService: UserService) { }

  ngOnInit(): void {
    let getUserShoppingCartObservable = this.service.getUserShoppingCart();
    let getUserShoppingCartDispose = getUserShoppingCartObservable.subscribe((data: any) => {
      console.log("response Data", data);
      this.TotalPrice = data.TotalPrice;
      this.productsInShoppingCart = data.ShoppingCart.Products;
      console.log("Products", this.productsInShoppingCart);
      console.log("Products", typeof (this.productsInShoppingCart));
      console.log(this.productsInShoppingCart.length);


      getUserShoppingCartDispose.unsubscribe();
    },
      (err) => {
        console.log(err);
      });
  }
  confirmCheckout() {
    this.isValidFormSubmitted = true;
    if (this.billingForm.valid && this.isCheckedAcceptTerms) {
      console.log(this.billingForm.value);
      let { FirstName, LastName,PhoneNumber,City,Zip,Street } = this.billingForm.value;
      let user={
          "FirstName": FirstName, "LastName": LastName, "PhoneNumber": PhoneNumber,
          "City": City,"Zip": Zip,"Street": Street
        };
        let updateUserObservable = this.userService.EditUser(user);
        let updateUserDispose = updateUserObservable.subscribe((data: any) => {
          console.log("update User", data);
         console.log("User Info has been updated succesfully");
         updateUserDispose.unsubscribe();
         let checkoutObservable = this.service.checkout();
         let checkoutDispose = checkoutObservable.subscribe((data: any) => {
           console.log("checkout", data);
           this.router.navigateByUrl('/Users');
           this.toaster.success("Your Order has been placed  Successfully");
   
           checkoutDispose.unsubscribe();
         },
           (err) => {
             this.toaster.error('Failed To checkout');
             console.log("Failed To checkout", err);
           });
       },
          (err) => {
            this.toaster.error('Failed To Update User');
            console.log("Failed To Update User", err);
          });
      }
   
 


  }
}
