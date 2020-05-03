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
  id;
  subscriber;
  isDataLoaded:boolean=false;
  constructor(public authService: AuthService,private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['userId'];
    console.log("user component id",this.route.snapshot.params['userId']);

     this.subscriber= this.authService.getUserProfile(this.id).subscribe(res => {
      console.log("response", res);
      this.currentUser = res;
      this.isDataLoaded=true;
      console.log("currentUser", this.currentUser);

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

  ngOnInit(): void {
    window.localStorage.removeItem('refresh');
    //this.getUser();
  }

}
