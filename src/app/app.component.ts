import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fly-Buy';
  constructor(public authService: AuthService, private router: Router) { }

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
