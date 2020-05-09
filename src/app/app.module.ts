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

import { AuthGuard } from "./shared/auth.guard";
import { PaginationComponent } from './Components/pagination/pagination.component';
import { TopSellingComponent } from './Components/top-selling/top-selling.component';
import { FooterComponent } from './Components/footer/footer.component';

import { AuthInterceptor } from './shared/authconfig.interceptor';
import { AboutComponent } from './Components/about/about.component';
import { SearchResultsComponent } from './Components/search-results/search-results.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from "ng2-file-upload";
import { EditUserInfoModalComponent } from './Components/edit-user-info-modal/edit-user-info-modal.component';   



const routes:Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'Home',component:HomeComponent},
  {path:'Shop',component:ShopComponent},
  {path:'Products/:id',component:ProductDetailsComponent},
  {path:'ShoppingCarts/:userId',component:ShoppingCartComponent},
  {path:'Users',component:UserComponent,canActivate:[AuthGuard]},
  { path: 'Login', component: LoginComponent },
  {path:'Register',component:RegisterComponent},
  {path:'About',component:AboutComponent},
  {path:'Search/:searchKey',component:SearchResultsComponent}

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
    EditUserInfoModalComponent,
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
    FileUploadModule
 
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
  bootstrap: [AppComponent]
})
export class AppModule { }