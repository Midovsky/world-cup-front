import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth : AuthService) { }
 
  ngOnInit(): void {
    console.log(this.auth.getUser())
    
  }

}
