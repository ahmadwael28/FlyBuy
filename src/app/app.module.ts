import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {RouterModule,Routes} from '@angular/router'

import { AppComponent } from './app.component';
import {BackendLinkService} from '../app/Service/backend-link.service';
import { HomeComponent } from './Components/home/home.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';

import { ImagePipe } from './Pipes/image.pipe'

const routes:Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'Home',component:HomeComponent},
  {path:'Products/:id',component:ProductDetailsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailsComponent,
    ImagePipe
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
