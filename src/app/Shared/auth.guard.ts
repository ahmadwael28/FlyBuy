import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn !== true) {
      window.alert("Access not allowed!");
      this.router.navigate(['Login'])
    }
    return true;
  }
  
}


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardAdmin implements CanActivate {
//   constructor(
//     public authService: AuthService,
//     public router: Router
//   ) { }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     if (this.authService.isLoggedIn !== true && this.authService.currentUser.Role == "Admin") {
//       window.alert("Access not allowed!");
//       this.router.navigate(['Login'])
//     }
//     return true;
//   }
  
// }
