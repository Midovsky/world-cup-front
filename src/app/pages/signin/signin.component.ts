import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NgForm } from '@angular/forms';

import {Router} from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  error:string = '';

  constructor(private authService: AuthService, private router:Router) { }

  onSignin(form: NgForm) {
    this.authService.signinUser(form)
    .subscribe(
      (decodedToken) => {console.log(decodedToken), this.router.navigate(['/home']);},
    
      (error) => {console.log(error['error']), this.error = "No account found with this username/password"}
  );

  }
}
