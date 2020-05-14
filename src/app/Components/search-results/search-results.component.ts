import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, ActivatedRouteSnapshot, RouterLink, NavigationEnd } from '@angular/router';
import { BackendLinkService } from 'src/app/Service/backend-link.service';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  router;
  SearchKey;

  SearchResults;
  navigationSubscription;
  constructor(private Service:BackendLinkService,public authService:AuthService,
    myActivatedRoute:ActivatedRoute,
    myRouter: Router) { 
    
    this.router = myRouter;
    this.SearchKey = myActivatedRoute.snapshot.params["searchKey"];
    //alert(this.SearchKey);
  }

  ngOnInit(): void {
    this.GetSearchResults()

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      location.reload();
    });
  }


  GetSearchResults()
  {
    let SearchResultsobservable = this.Service.SearchAllProducts(this.SearchKey);
  let SearchResultdispose = SearchResultsobservable.subscribe((data) => {
    
    this.SearchResults = data;

    this.SearchResults.forEach(element => {
      element.Image = `http://localhost:3000/static/${element.Image}`
  });

  SearchResultdispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });
  }

}
