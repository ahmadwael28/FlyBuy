import { Component, OnInit } from '@angular/core';
import { BackendLinkService } from '../../Service/backend-link.service';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../Shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private Service:BackendLinkService,private router:Router, public authService:AuthService) { }

  dataSamples;
  originalData;
  topSelling;
  ngOnInit(): void {
    window.localStorage.removeItem('refresh');
    //console.log(this.Service.getAllProducts());

    let RandomProductsObservable = this.Service.getThreeRandomProducts();
    let AllProductsdispose = RandomProductsObservable.subscribe((data) => {
    //console.log(data);

    this.dataSamples = data;
    this.originalData = data;

    this.dataSamples.forEach(element => {
        element.Image = `https://flybuyapi.herokuapp.com/static/${element.Image}`
    });
    console.log(this.dataSamples[0]._id);
    AllProductsdispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });







  let TopProductsobservable = this.Service.getTopSellingProducts();
  let TopProductsdispose = TopProductsobservable.subscribe((data) => {
    
    this.topSelling = data;
    console.log(this.topSelling.length);

    this.topSelling.forEach(element => {
      element.Image = `https://flybuyapi.herokuapp.com/static/${element.Image}`
  });
  TopProductsdispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });

  }
  
  goProductDetails(id)
  {
      if(this.authService.isLoggedIn)
      {
        this.router.navigateByUrl(`Products/${id}`);
      }
      if(!this.authService.isLoggedIn)
      {
        this.router.navigateByUrl('Login');
      }
  }
  
}
