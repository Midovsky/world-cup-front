import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import {UserService} from "../../utils/services/user.service";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  
  rule : string = "" ; 
  firstName = "" ;
  lastName = ""; 
  email ="";
  password= "";

  message = ""; 

  disabled = false ;

  isAdd = false;
  display = true; 

  users : User[] ;




  constructor(private router : Router , private userService: UserService) { 
      
  }

  ngOnInit() {
    if (localStorage.getItem('ROLE')==='ROLE_CONSULTANT')
    this.router.navigate(['/home'])

    this.userService.getAllUsers().subscribe( (res )=> {
      this.users = res;
    });
  }

  register() {
    
    if(this.firstName == "" || this.lastName == "" ||  this.email == "" || this.password == ""||this.rule==""){
      this.message = "all fields are required"; 
      return 1;
    }

    this.disabled = true;

    const user = new User();
    user.email = this.email ; 
    user.firstName = this.firstName;
    user.lastName = this.lastName; 
    user.password =  this.password;
    
    console.log(user); 

    this.userService.AddUser(user).subscribe((res) => {
      
      
       
      this.disabled = false ;
      this.firstName = "" ;
      this.lastName = ""; 
      this.email ="";
      this.password= "";
      this.users = res;
      this.isAdd = false;
      this.display=true; 


    });

    

  }

  addClick(){
     this.isAdd = !this.isAdd; 
     this.display=!this.display;
  }

  delete(id){
    
   this.userService.DeleteUser(id).subscribe(res => {
    console.log(res);
    this.users = res;
    
   });

   console.log('delete ' + id);
  }

  change($events){
    console.log(this.rule);
  }
}
