import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'

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
import { ProductsSectionComponent } from './Components/products-section/products-section.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { UserComponent } from './Components/user/user.component';

import { AuthGuard } from "./Shared/auth.guard";
import { PaginationComponent } from './Components/pagination/pagination.component';
import { TopSellingComponent } from './Components/top-selling/top-selling.component';
import { FooterComponent } from './Components/footer/footer.component';

import { AuthInterceptor } from './Shared/authconfig.interceptor';
import { AboutComponent } from './Components/about/about.component';
import { SearchResultsComponent } from './Components/search-results/search-results.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from "ng2-file-upload";  
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { EditUserInfoModalComponent } from './Components/edit-user-info-modal/edit-user-info-modal.component';
import { UserNavbarComponent } from './Components/user-navbar/user-navbar.component';
import { AdminNavbarComponent } from './Components/admin-navbar/admin-navbar.component';
import { AdminShopComponent } from './Components/admin-shop/admin-shop.component';
import { AdminProductsSectionComponent } from './Components/admin-products-section/admin-products-section.component';
import { AdminOrdersComponent } from './Components/admin-orders/admin-orders.component';   
import { EditProductModalComponent } from './Components/edit-product-modal/edit-product-modal.component';
import { EditOrderStatusComponent } from './Components/edit-order-status/edit-order-status.component';   


import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddProductModalComponent } from './Components/add-product-modal/add-product-modal.component';



const routes:Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'Home',component:HomeComponent},
  {path:'Shop',component:ShopComponent,canActivate:[AuthGuard]},
  {path:'AdminShop',component:AdminShopComponent,canActivate:[AuthGuard]},
  {path:'AdminOrders',component:AdminOrdersComponent,canActivate:[AuthGuard]},
  {path:'Products/:id',component:ProductDetailsComponent},
  {path:'ShoppingCarts',component:ShoppingCartComponent,canActivate:[AuthGuard]},
  {path:'Users',component:UserComponent,canActivate:[AuthGuard]},
  { path: 'Login', component: LoginComponent },
  {path:'Register',component:RegisterComponent},
  {path:'About',component:AboutComponent},
  {path:'Search/:searchKey',component:SearchResultsComponent},
  {path:'Checkout',component:CheckoutComponent}

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
    ProductsSectionComponent,
    UserComponent,
    RegisterComponent,
  
    PaginationComponent,
    TopSellingComponent,
    FooterComponent,
    AboutComponent,
    SearchResultsComponent,
    CheckoutComponent,
    EditUserInfoModalComponent,
    UserNavbarComponent,
    AdminNavbarComponent,
    AdminShopComponent,
    AdminProductsSectionComponent,
    AdminOrdersComponent,
    EditProductModalComponent,
    EditOrderStatusComponent,
    AddProductModalComponent,
    //FileSelectDirective 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FileUploadModule, 
    
  
    
    
 
  ],
  providers: [
    BackendLinkService,
    ShoppingCartService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }