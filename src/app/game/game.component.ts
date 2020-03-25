import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  games:Game[]=[];

  success = '';

  constructor(private gameService:GameService, private router:Router) { }

  ngOnInit(): void {

    this.onGet();
  }

  onGet(){

    this.gameService.getGames()
      .subscribe(
        (games: any[]) => {this.games = games,   
          console.log(this.games);
        },
        (error) => console.log(error)
      );

  }
  onDelete(ix,game) {


    this.gameService.deleteGame(game.id)
    .subscribe(
      () => {
          this.onGet();
    },
    (error) => {
      console.log(error);
    },
  );


  }

}
