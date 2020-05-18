import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../models/game.model';
import { Team } from '../models/team.model';
import { GameService } from '../services/game.service';
import { TeamService } from '../services/team.service';
import { ReserveService } from '../services/reserve.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit, OnDestroy  {
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
  editMode:boolean = false;
  subscription:Subscription;



  constructor(private gameService:GameService, private teamService:TeamService,private reserveService:ReserveService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.subscription = this.gameService.startedEditing.subscribe(
      (game: Game) => {
        this.game = game;
        this.id=game.id;
        this.editMode = true;
      }
    );

  }


  onUpdateSubmit(form: NgForm) {

    const value = form.value;

    const newGame = new Game(value.date,null,null,value.score,value.price,value.stadium);

    this.gameService.updateGame(newGame,this.id)
    .subscribe(
      (response) => {
      this.router.navigate(['/games']);
      form.reset();

    },
    (error) => {
      console.log(error);
    },
  );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
