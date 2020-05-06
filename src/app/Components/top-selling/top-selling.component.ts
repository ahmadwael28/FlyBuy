import { Component, OnInit } from '@angular/core';
import { BackendLinkService } from 'src/app/Service/backend-link.service';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.css']
})
export class TopSellingComponent implements OnInit {

  constructor(private Service:BackendLinkService,private router:Router, public authService:AuthService) { }


  topSelling;

  ngOnInit(): void {

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

  goProductDetails(id)
  {
    if(this.authService.isLoggedIn)
    {
      this.router.navigateByUrl(`Products/${id}`);
    }
    else
    {
      this.router.navigateByUrl('Login');
    }
  }

}
