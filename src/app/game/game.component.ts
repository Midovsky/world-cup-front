import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game.model';
import { NgForm } from '@angular/forms';
import { GameService } from '../services/game.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';


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

  constructor(private gameService:GameService, private teamService:TeamService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.showFormUpdate = false;
    this.showFormAdd= false;
    this.showGames = true;
    this.gameAdded=false;
    this.gameDeleted = false;
    this.gameUpdated = false;
    this.onGet();
  }

  onGet(){
    this.showGames = true;
    this.showFormAdd = false;
    this.showFormUpdate = false;
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
  this.onGet();

  }

  onAdd(){

    this.teamService.getTeams()
    .subscribe(
      (teams: any[]) => {this.teams = teams
      },
      (error) => console.log(error)
    );
    this.showGames = false;
    this.showFormAdd = true;
    this.showFormUpdate = false;
    this.router.navigate(['create'],{relativeTo: this.route});
  }
  

  onSubmit(form: NgForm) {

    const value = form.value;

    const newGame = new Game(value.date,value.homeTeam,value.awayTeam,value.score,value.price,value.stadium);
      this.gameService.storeGame(newGame)
      .subscribe(
        (response) => {
        this.success = response['success'];
        this.router.navigate(['/games']);
        form.reset();
        this.onGet();
        console.log(this.success);
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
    );


  }
  onEdit(index,id) {
    this.index=index;
    this.id=id;
    this.showFormUpdate = true;
    this.showGames = false;
        this.game.date=this.games[index].date;
        this.game.stadium=this.games[index].stadium;
        this.game.price=this.games[index].price;
        this.game.score=this.games[index].score;
        this.router.navigate([id,'edit'],{relativeTo: this.route});
  }

  onUpdateSubmit(form: NgForm) {
    this.gameAdded = false;

    const value = form.value;

  

    const newGame = new Game("",null,null,value.score,value.price,value.stadium);
    console.log(newGame);

    this.gameService.updateGame(newGame,this.id)
    .subscribe(
      (response) => {
      this.success = response['success'];
      this.router.navigate(['/games']);
      this.onGet();
      this.showGames = true;
      this.showFormUpdate = false;
      this.gameDeleted = false;
      this.gameUpdated = true;
      form.reset();


    },
    (error) => {
      console.log(error);
    },
  );


  }
}
