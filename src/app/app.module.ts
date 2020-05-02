import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import {RouterModule,Routes} from '@angular/router'

import { AppComponent } from './app.component';
import {BackendLinkService} from '../app/Service/backend-link.service';
import {ShoppingCartService} from '../app/Service/shopping-cart.service';
import {AuthService} from './Service/auth.service';
import {TokenStorageService} from './Service/token-storage.service';
import {UserService} from './Service/user.service';

import { authInterceptorProviders } from './Helpers/auth.interceptor';

import { HomeComponent } from './Components/home/home.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { LoginComponent } from './Components/login/login.component';

import { ImagePipe } from './Pipes/image.pipe';
import { ShopComponent } from './Components/shop/shop.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { ProductsSectionComponent } from './Components/products-section/products-section.component';

 //import { AuthInterceptor } from './Helpers/auth-interceptor';
const routes:Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'Home',component:HomeComponent},
  {path:'Shop',component:ShopComponent},
  {path:'Products/:id',component:ProductDetailsComponent},
  {path:'ShoppingCarts/:userId',component:ShoppingCartComponent},
  {path:'Users/Login',component:LoginComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailsComponent,
    ImagePipe,
    ShopComponent,
    ShoppingCartComponent,
    LoginComponent,
    ProductsSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BackendLinkService,
    ShoppingCartService,
    AuthService,
    TokenStorageService,
    UserService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
