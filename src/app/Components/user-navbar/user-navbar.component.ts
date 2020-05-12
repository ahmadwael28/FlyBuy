import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.doLogout();
    this.router.navigate(['Login']);
  }

  Search() {
    var searchKey = (<HTMLInputElement>document.getElementById("searchBar")).value;
    if (searchKey != "") {

      //if (this.authService.isLoggedIn) {
        this.router.navigateByUrl(`Search/${searchKey}`);
      // }
      // else {
      //   this.router.navigateByUrl('Login');
      // }
    }

  }

}
