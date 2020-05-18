import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { TeamService } from '../services/team.service';
import { ReserveService } from '../services/reserve.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Game } from '../models/game.model';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

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

  constructor(private gameService:GameService, private teamService:TeamService,private reserveService:ReserveService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.onGet();
  }

  onGet(){

    this.teamService.getTeams()
      .subscribe(
        (teams: any[]) => {this.teams = teams,   
          console.log(this.teams);
        },
        (error) => console.log(error)
      );

  }


  onSubmit(form: NgForm) {

    const value = form.value;

    const newGame = new Game(value.date,value.homeTeam,value.awayTeam,value.score,value.price,value.stadium);
      this.gameService.storeGame(newGame)
      .subscribe(
        (response) => {
        this.router.navigate(['/games']);
        form.reset();
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
    );


  }
}
