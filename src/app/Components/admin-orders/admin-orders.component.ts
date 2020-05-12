import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Service/order.service';
var moment = require('moment');
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit,AfterViewChecked {

  orders;
  constructor(private authService:AuthService,private orderService:OrderService,private router:Router ) { }
  ngAfterViewChecked(): void {
    if(this.authService.currentUser.Role != "Admin")
    {
      alert("un authorized access")
      this.router.navigateByUrl('Home');
    }
  }

  ngOnInit(): void {
    let getOrdersObservable = this.orderService.getAllOrders();
    let getOrdersDispose = getOrdersObservable.subscribe((data:any) => {
      this.orders = data;
      console.log("Orders",this.orders);//orders[i] =>{"Orders":order,"Total"}
      this.orders.forEach(element => {
        element.Order.Date = moment(element.Order.Date).format('LLL');
        element.Order.Products.forEach(element => {
        console.log("Image",element.Product.Image);
        element.Product.Image = `http://localhost:3000/static/${element.Product.Image}`
    });
  });
      getOrdersDispose.unsubscribe();
    },
    (err)=>{
      console.log(err);
    });
  }

}
