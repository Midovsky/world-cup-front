import { Injectable } from '@angular/core';
import {Headers,Http, RequestOptions, Response, Request} from '@angular/http';
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Game} from '../../models/game.model';
import {AuthService} from './auth.service';

@Injectable()
export class GameService {

  public game = new BehaviorSubject<Game>(new Game(null,null,null,null,null,null));
  public startedEditing = this.game.asObservable();

  constructor(private http:Http,private authService:AuthService) {

  }

   storeGame(game:Game) {
     const token= this.authService.getToken();
     const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
       return this.http.post('http://localhost:8080/api/games/',
       game,
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

   updateGame(game:Game, id) {
     const token= this.authService.getToken();
     const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
     return this.http.put('http://localhost:8080/api/games/'+id,
     game,
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

   deleteGame(id) {
     const token= this.authService.getToken();
     const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
       return this.http.delete('http://localhost:8080/api/games/'+id, {headers: headers})

  
   }

  getGames() {
   const token= this.authService.getToken();
   console.log(token);
   const headers = new Headers({'Access-Control-Allow-Origin':'*','Authorization': 'Bearer '+token});
   return this.http.get('http://localhost:8080/api/games/', {headers: headers})
     .map(
       (response: Response) => {
         const data = response.json();
         return data;
       }
     )
 }

}
