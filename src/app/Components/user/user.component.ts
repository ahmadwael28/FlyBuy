import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  currentUser;
  userOrders;
  id;
  subscriber;
  subscriber1;
  ShowModal = false;
  isDataLoaded:boolean=false;
  constructor(public authService: AuthService,private route: ActivatedRoute) {
    // this.id = this.route.snapshot.params['userId'];
    // console.log("user component id",this.route.snapshot.params['userId']);

     this.subscriber= this.authService.getUserProfile().subscribe(res => {
      console.log("response", res);
      this.currentUser = res;
      this.isDataLoaded=true;
      this.currentUser.Image = `http://localhost:3000/static/${this.currentUser.Image}`;
      console.log("currentUser", this.currentUser);


      this.subscriber1= this.authService.getUserOrders(this.currentUser._id).subscribe(res => {
        this.userOrders = res;

        this.userOrders.forEach(order => {
          order.Products.forEach(product => {
            product.Product.Image = `http://localhost:3000/static/${product.Product.Image}`;
          });
        });

        console.log("Orders", this.userOrders);

    })

  })


      
  }

  getUser(){
    //console.log("user component id",this.route.snapshot.params['id']);
    
  //   console.log("getUser in user component id",this.id);

  //   this.subscriber= this.authService.getUserProfile(this.id).subscribe(res => {
  //     console.log("response", res);
  //     this.currentUser = res;
  // })
}

  cancelOrder(id)
  {
    this.authService.cancelOrder(id);
    location.reload();
  }

  ngOnInit(): void {
    window.localStorage.removeItem('refresh');
    //this.getUser();
  }

}
