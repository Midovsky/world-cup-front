import { Injectable } from '@angular/core';
import {Headers,Http, RequestOptions, Response, Request} from '@angular/http';
import { map } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Team} from '../models/team.model';
import {AuthService} from '../auth.service';

@Injectable()
export class TeamService {


  public team = new BehaviorSubject<Team>(new Team(null,null,null,null));
  public startedEditing = this.team.asObservable();



  constructor(private http:Http,private authService:AuthService) {

  }

   storeTeam(team:Team) {
     const token= this.authService.getToken();
     const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
       return this.http.post('https://world-cup-back-end.herokuapp.com/api/teams/',
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
     return this.http.put('https://world-cup-back-end.herokuapp.com/api/teams/'+id,
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
       return this.http.delete('https://world-cup-back-end.herokuapp.com/api/teams/'+id, {headers: headers})

  
   }

  getTeams() {
   const token= this.authService.getToken();
   console.log(token);
   const headers = new Headers({'Access-Control-Allow-Origin':'*','Authorization': 'Bearer '+token});
   return this.http.get('https://world-cup-back-end.herokuapp.com/api/teams/', {headers: headers})
     .map(
       (response: Response) => {
         const data = response.json();
         return data;
       }
     )
 }

}
