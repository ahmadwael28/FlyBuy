import { Component, OnInit } from '@angular/core';
import { BackendLinkService } from 'src/app/Service/backend-link.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  ID;
  router;
  Product;
  constructor(private Service:BackendLinkService,
    myActivatedRoute:ActivatedRoute,
    myRouter: Router) { 

    this.router = myRouter;
    this.ID = myActivatedRoute.snapshot.params["id"];
  }

  
  ngOnInit(): void {

    let observable = this.Service.getProductById(this.ID);
  let dispose = observable.subscribe((data) => {
    console.log(data);
    
    this.Product = data;
    this.Product.Image = `http://localhost:3000/static/${this.Product.Image}`
    
    dispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });
  }


}
