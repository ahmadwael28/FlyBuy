import { Component, OnInit } from '@angular/core';
import { BackendLinkService } from 'src/app/Service/backend-link.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private Service:BackendLinkService) { }

  dataSamples;
  originalData;
  topSelling;
  ngOnInit(): void {

    //console.log(this.Service.getAllProducts());

    let RandomProductsObservable = this.Service.getThreeRandomProducts();
    let AllProductsdispose = RandomProductsObservable.subscribe((data) => {
    //console.log(data);

    this.dataSamples = data;
    this.originalData = data;

    this.dataSamples.forEach(element => {
        element.Image = `http://localhost:3000/static/${element.Image}`
    });

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
      element.Image = `http://localhost:3000/static/${element.Image}`
  });
  TopProductsdispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });

  }
  

}
