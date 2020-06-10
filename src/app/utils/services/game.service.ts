import { Injectable } from '@angular/core';
import {Headers,Http, RequestOptions, Response, Request} from '@angular/http';
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Game} from '../../models/game.model';
import {AuthService} from '../../auth.service';

@Injectable()
export class GameService {

  public game = new BehaviorSubject<Game>(new Game(null,null,null,null,null,null));
  public startedEditing = this.game.asObservable();

  constructor(private http:Http,private authService:AuthService) {

  }

   storeGame(game:Game) {
     const token= this.authService.getToken();
     const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
       return this.http.post('https://world-cup-back-end.herokuapp.com/api/games/',
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
     return this.http.put('https://world-cup-back-end.herokuapp.com/api/games/'+id,
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
       return this.http.delete('https://world-cup-back-end.herokuapp.com/api/games/'+id, {headers: headers})

  
   }

  getGames() {
   const token= this.authService.getToken();
   console.log(token);
   const headers = new Headers({'Access-Control-Allow-Origin':'*','Authorization': 'Bearer '+token});
   return this.http.get('https://world-cup-back-end.herokuapp.com/api/games/', {headers: headers})
     .map(
       (response: Response) => {
         const data = response.json();
         return data;
       }
     )
 }

}
