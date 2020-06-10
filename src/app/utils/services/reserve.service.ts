import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../models/game.model';
import { Headers,Http, RequestOptions, Response, Request } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class ReserveService {

  constructor(private http:Http,private authService:AuthService) {
  }

  reserveGame(idGame) {
    const token= this.authService.getToken();
    const headers = new Headers({'Access-Control-Allow-Origin':'*','Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
    console.log(headers);
    
    return this.http.post('https://world-cup-back-end.herokuapp.com/reserve/'+idGame,
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
}
