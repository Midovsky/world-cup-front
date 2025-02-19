import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './utils/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ) {
    console.log(this.authService.token);
     if(this.authService.isAuthenticated()){
      return true;
     }
     else{
       this.router.navigate(['']);
     }
  }
}
