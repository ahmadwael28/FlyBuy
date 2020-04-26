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

    dispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });
  }

}
