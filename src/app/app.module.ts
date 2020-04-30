import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {RouterModule,Routes} from '@angular/router'

import { AppComponent } from './app.component';
import {BackendLinkService} from '../app/Service/backend-link.service';
import { HomeComponent } from './Components/home/home.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';

import { ImagePipe } from './Pipes/image.pipe';
import { ShopComponent } from './Components/shop/shop.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component'

const routes:Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'Home',component:HomeComponent},
  {path:'Shop',component:ShopComponent},
  {path:'Products/:id',component:ProductDetailsComponent},
  {path:'ShoppingCarts/:userId',component:ShoppingCartComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailsComponent,
    ImagePipe,
    ShopComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BackendLinkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
