import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams:Team[]=[];

  games:Game[]=[];
  team:Team = new Team("",null,null,null);
  index:Number;
  id:Number;
  showFormUpdate:Boolean;
  showFormAdd:Boolean;
  showTeams:Boolean;
  teamAdded:Boolean;
  teamDeleted:Boolean;
  teamUpdated:Boolean;

  success = '';

  constructor(private gameService:GameService, private teamService:TeamService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.showFormUpdate = false;
    this.showFormAdd= false;
    this.showTeams = true;
    this.teamAdded=false;
    this.teamDeleted = false;
    this.teamUpdated = false;

    this.onGet();
  }

  onGet(){
    this.showTeams = true;
    this.showFormAdd = false;
    this.showFormUpdate = false;
    this.teamService.getTeams()
      .subscribe(
        (teams: any[]) => {this.teams = teams,   
          console.log(this.teams);
        },
        (error) => console.log(error)
      );

  }


  onDelete(ix,team) {


    this.teamService.deleteTeam(team.id)
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
    this.showTeams = false;
    this.showFormAdd = true;
    this.showFormUpdate = false;
    this.router.navigate(['create'],{relativeTo: this.route});
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
    this.showTeams = false;
        this.team.name=this.teams[index].name;
        this.team.draws=this.teams[index].draws;
        this.team.loses=this.teams[index].loses;
        this.team.wins=this.teams[index].wins;
        this.router.navigate([id,'edit'],{relativeTo: this.route});
  }

  onUpdateSubmit(form: NgForm) {
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

  }

}
