import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fly-Buy';
  constructor(public authService: AuthService, private router: Router) {
    authService.InitCurrentUser();
  }

  
}