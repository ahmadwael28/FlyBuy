import { Component, OnInit, AfterViewChecked, Output,EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Service/order.service';
//import * as moment from '../../../../node_modules/moment';// = require('moment');
//var moment = require("moment");
// if ("default" in moment) {
//     moment = moment["default"];
// }

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit,AfterViewChecked {

  orders;
  currentOrder;
  ShowModal=false
  @Output() currentOrderEdited = new EventEmitter();
 
  constructor(private authService:AuthService,private orderService:OrderService,private router:Router ) { }
  ngAfterViewChecked(): void {
    if(this.authService.currentUser.Role != "Admin")
    {
      alert("un authorized access")
      this.router.navigateByUrl('Home');
    }
  }
  ChangeCurrentStatus(order) {
    console.log("current order from admin...",order)
    //set current product
    console.log("child method invoked");
    this.currentOrder=order;
    this.ShowModal = true;
    this.currentOrderEdited.emit(this.currentOrder);
    }
  ngOnInit(): void {
    let getOrdersObservable = this.orderService.getAllOrders();
    let getOrdersDispose = getOrdersObservable.subscribe((data:any) => {
      this.orders = data;
      console.log("Orders",this.orders);//orders[i] =>{"Orders":order,"Total"}
      this.orders.forEach(element => {
        //element.Order.Date = moment(element.Order.Date).format('LLL');
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
