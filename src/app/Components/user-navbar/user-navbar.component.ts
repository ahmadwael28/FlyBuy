import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/Service/shopping-cart.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  cartLength;
  constructor(public authService: AuthService, private router: Router,private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
    let getUserShoppingCartObservable = this.shoppingCartService.getUserShoppingCart();
    let getUserShoppingCartDispose = getUserShoppingCartObservable.subscribe((data:any) => {
      this.cartLength = data.ShoppingCart.Products.length;
    getUserShoppingCartDispose.unsubscribe();
    },
    (err)=>{
      console.log(err);
    });
  }

  logout() {
    this.authService.doLogout();
    this.router.navigate(['Login']);
  }

  Search() {
    var searchKey = (<HTMLInputElement>document.getElementById("searchBar")).value;
    if (searchKey != "") {

      //if (this.authService.isLoggedIn) {
        this.router.navigateByUrl(`Search/${searchKey}`);
      // }
      // else {
      //   this.router.navigateByUrl('Login');
      // }
    }

  }

}
