import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';



@Injectable()
export class AuthService {
  token: string;
  connectedGuard:string;
  connectedUser:string;
  idConnectedUser:number;

  constructor(private http:Http, private router:Router) {}

/*   signupUser(form: NgForm) {
    const value = form.value;
    if (value.guard == "company") {
      const newCompany = new Company(value.username, value.password, value.telephone, value.email);
      this.companyService.storeCompany(newCompany)
      .subscribe(
          (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);

        },
      );
    }

  } */

  signinUser(form: NgForm) {
    const value = form.value;
    const headers = new Headers({'Content-Type': 'application/json'});
      const email:string = value.username;
      const password:string = value.password;
      return this.http.post('https://world-cup-back-end.herokuapp.com/auth/login/', {email, password},{headers: headers})
      .map(

        (response) => {

          console.log(response);
            const token = response.json().accessToken;
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            this.token = token;
            this.router.navigate(['']);
            return {token: token, decoded:JSON.parse(window.atob(base64))}
        }
      )
      .catch(
          (error: Response) => {
          return Observable.throw(error.json());          }
      )
      .do(
        tokenData => {
          localStorage.setItem('token', tokenData.token);
        }
      );
  }

  logout() {
  const headers = new Headers({'Content-Type': 'application/json'});
  return this.http.get('http://localhost:8000/api/users/companies/logout?token='+ this.token,{headers: headers});

  }

  getToken() {
  return localStorage.getItem('token');
  }



  getAuthenticatedGuard()
  {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get('http://localhost:8000/api/users/checkguard?token='+ this.token,{headers: headers})
    .map(
      (response: Response) => {
        const data = response.json();
        return data;
      }
    )
    .catch(
        (error: Response) => {
          return Observable.throw("Something went wrong");
        }
    );

  }

  isAuthenticated() {
    return this.token != null;

  }

  getUser(){
    const headers = new Headers({'Content-Type': 'application/json'});
   if(this.connectedGuard == 'company'){

    return this.http.get('http://localhost:8000/api/users/companies/me?token='+ this.token,{headers: headers})
    .map(
      (response: Response) => {
        const data = response.json();
        this.idConnectedUser = data['id'];

        return data;
      }
    )
    .catch(
        (error: Response) => {
          return Observable.throw("Something went wrong");
        }
    );

   }
   else if(this.connectedGuard == 'partner'){

    return this.http.get('http://localhost:8000/api/users/partners/me?token='+ this.token,{headers: headers})
    .map(
      (response: Response) => {
        const data = response.json();
        this.idConnectedUser = data['id'];

        return data;
      }
    )
    .catch(
        (error: Response) => {
          return Observable.throw("Something went wrong");
        }
    );

   }
   else if(this.connectedGuard == 'admin'){

    return this.http.get('http://localhost:8000/api/users/admins/me?token='+ this.token,{headers: headers})
    .map(
      (response: Response) => {
        const data = response.json();
        this.idConnectedUser = data['id'];

        return data;
      }
    )
    .catch(
        (error: Response) => {
          return Observable.throw("Something went wrong");
        }
    );

   }
  }

  getUserID(){
    const headers = new Headers({'Content-Type': 'application/json'});
   if(this.connectedGuard == 'company'){

    return this.http.get('http://localhost:8000/api/users/companies/me?token='+ this.token,{headers: headers})
    .map(
      (response: Response) => {
        const data = response.json();
        this.idConnectedUser = data['id'];

        return data['id'];
      }
    )
    .catch(
        (error: Response) => {
          return Observable.throw("Something went wrong");
        }
    );

   }
   else if(this.connectedGuard == 'partner'){

    return this.http.get('http://localhost:8000/api/users/partners/me?token='+ this.token,{headers: headers})
    .map(
      (response: Response) => {
        const data = response.json();
        this.idConnectedUser = data['id'];

        return data['id'];
      }
    )
    .catch(
        (error: Response) => {
          return Observable.throw("Something went wrong");
        }
    );

   }
   else if(this.connectedGuard == 'admin'){

    return this.http.get('http://localhost:8000/api/users/admins/me?token='+ this.token,{headers: headers})
    .map(
      (response: Response) => {
        const data = response.json();
        this.idConnectedUser = data['id'];

        return data['id'];
      }
    )
    .catch(
        (error: Response) => {
          return Observable.throw("Something went wrong");
        }
    );

   }
  }
}
