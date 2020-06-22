import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 

  constructor(private router : Router) {

  }

  ngOnInit(): void {
  
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['home']);

  }
  
  isAuth (): boolean { 
    return !!localStorage.getItem('token');
  }


}
