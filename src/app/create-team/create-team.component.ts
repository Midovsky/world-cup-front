import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  teams:Team[]=[];

  games:Game[]=[];
  team:Team = new Team("",null,null,null);
  index:Number;
  id:Number;
  showFormUpdate:Boolean;
  showTeams:Boolean;
  teamAdded:Boolean;
  teamDeleted:Boolean;
  teamUpdated:Boolean;

  success = '';

  constructor(private gameService:GameService, private teamService:TeamService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {


  }


  onSubmit(form: NgForm) {

    const value = form.value;

    const newTeam = new Team(value.name,value.wins,value.loses,value.draws);
      this.teamService.storeTeam(newTeam)
      .subscribe(
        (response) => {
        this.success = response['success'];
        this.router.navigate(['/teams']);
        form.reset();

      },
      (error) => {
        console.log(error);
      },
    );

  }

/*   onEdit(index,id) {
    this.index=index;
    this.id=id;
    this.showFormUpdate = true;
    this.showTeams = false;
        this.team.name=this.teams[index].name;
        this.team.draws=this.teams[index].draws;
        this.team.loses=this.teams[index].loses;
        this.team.wins=this.teams[index].wins;
        this.router.navigate([id,'edit'],{relativeTo: this.route});
  } */

/*   onUpdateSubmit(form: NgForm) {
    this.teamAdded = false;

    const value = form.value;

    const newTeam = new Team(value.name,value.wins,value.loses,value.draws);
    console.log(newTeam);

    this.teamService.updateTeam(newTeam,this.id)
    .subscribe(
      (response) => {
      this.success = response['success'];
      this.router.navigate(['/teams']);
      this.onGet();
      this.showTeams = true;
      this.showFormUpdate = false;
      this.teamDeleted = false;
      this.teamUpdated = true;
      form.reset();


    },
    (error) => {
      console.log(error);
    },
  );

  } */


}
