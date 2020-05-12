import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { ShoppingCartService } from 'src/app/Service/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Fly-Buy';
  cartLength;
  constructor(public authService: AuthService, private router: Router, private shoppingCartService:ShoppingCartService) { 
    
  }
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

  
}
