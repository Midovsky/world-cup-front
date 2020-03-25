import { Injectable } from '@angular/core';
import {Headers,Http, RequestOptions, Response, Request} from '@angular/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Team} from '../models/team.model';
import {AuthService} from '../auth.service';

@Injectable()
export class TeamService {

  constructor(private http:Http,private authService:AuthService) {

  }

   storeTeam(team:Team) {
     const token= this.authService.getToken();
     const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
       return this.http.post('http://localhost:8000/api/teams',
       team,
       {headers: headers})
       .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error.json());
        }
    )
   }

   updateTeam(team:Team, id) {
     const token= this.authService.getToken();
     const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
     return this.http.put('http://localhost:8000/api/teams/'+id,
     team,
     {headers: headers})
       .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error.json());
        }
    )
   }

   deleteTeam(id) {
     const token= this.authService.getToken();
     const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
       return this.http.delete('http://localhost:8080/api/teams/'+id, {headers: headers})

  
   }

  getTeams() {
   const token= this.authService.getToken();
   console.log(token);
   const headers = new Headers({'Access-Control-Allow-Origin':'*','Authorization': 'Bearer '+token});
   return this.http.get('http://localhost:8080/api/teams', {headers: headers})
     .map(
       (response: Response) => {
         const data = response.json();
         return data;
       }
     )
 }

}
