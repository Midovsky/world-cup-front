import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams:Team[]=[];

  success = '';

  constructor(private teamService:TeamService, private router:Router) { }

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


  }

}
