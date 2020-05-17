import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from '../models/team.model';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';
import { TeamService } from '../services/team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit, OnDestroy {

  subscription:Subscription;
  team:Team = new Team("",null,null,null);
  index:Number;
  id:Number;
  editMode:boolean = false;

  constructor(private gameService:GameService, private teamService:TeamService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.teamService.startedEditing.subscribe(
      (team: Team) => {
        this.team = team;
        this.id=team.id;
        this.editMode = true;
      }
    );


  }

  onUpdateSubmit(form: NgForm) {

    const value = form.value;

    const newTeam = new Team(value.name,value.wins,value.loses,value.draws);
    
    
    this.teamService.updateTeam(newTeam,this.id)
    .subscribe(
      (response) => {
      this.router.navigate(['/teams']);
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
