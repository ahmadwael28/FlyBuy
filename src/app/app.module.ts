import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import {RouterModule,Routes} from '@angular/router'

import { AppComponent } from './app.component';
import {BackendLinkService} from '../app/Service/backend-link.service';
import {ShoppingCartService} from '../app/Service/shopping-cart.service';
import {UserService} from './Service/user.service';


import { HomeComponent } from './Components/home/home.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';


import { ImagePipe } from './Pipes/image.pipe';
import { ShopComponent } from './Components/shop/shop.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { UserComponent } from './Components/user/user.component';

import { AuthGuard } from "./shared/auth.guard";

const routes:Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'Home',component:HomeComponent},
  {path:'Shop',component:ShopComponent},
  {path:'Products/:id',component:ProductDetailsComponent},
  {path:'ShoppingCarts/:userId',component:ShoppingCartComponent},
  {path:'Users/:userId',component:UserComponent,canActivate:[AuthGuard]},
  { path: 'Login', component: LoginComponent },
  {path:'Register',component:RegisterComponent},
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
    UserComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BackendLinkService,
    ShoppingCartService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }