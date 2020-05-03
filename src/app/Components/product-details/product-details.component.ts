import { Component, OnInit } from '@angular/core';
import { BackendLinkService } from 'src/app/Service/backend-link.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  count=0;
  ID;
  router;
  Product;
  isDataLoaded:boolean = false;
  constructor(private Service:BackendLinkService,
    myActivatedRoute:ActivatedRoute,
    myRouter: Router) { 
    
    this.router = myRouter;
    this.ID = myActivatedRoute.snapshot.params["id"];
    var refresh = window.localStorage.getItem('refresh');
    console.log(refresh);
    if (refresh===null){
        window.location.reload();
        window.localStorage.setItem('refresh', "1");
    }
  }

  
  ngOnInit(): void {
   
    let observable = this.Service.getProductById(this.ID);
  let dispose = observable.subscribe((data) => {
    console.log(data);
    this.Product = data;
    this.Product.Image = `http://localhost:3000/static/${this.Product.Image}`;
   
    this.isDataLoaded = true;
    console.log(this.Product.Image);
    console.log(this.isDataLoaded);
    dispose.unsubscribe();
   
  },
  (err)=>{
    console.log(err);
  });
  }

}
