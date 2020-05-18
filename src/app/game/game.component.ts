import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game.model';
import { NgForm } from '@angular/forms';
import { GameService } from '../services/game.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';
import { ReserveService } from '../services/reserve.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  games:Game[]=[];
  game:Game = new Game("",null,null,"",null,"");
  index:Number;
  id:Number;
  showFormUpdate:Boolean;
  showFormAdd:Boolean;
  showGames:Boolean;
  gameAdded:Boolean;
  gameDeleted:Boolean;
  gameUpdated:Boolean;
  teams:Team[];


  success = '';

  constructor(private gameService:GameService, private teamService:TeamService,private reserveService:ReserveService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

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




}
