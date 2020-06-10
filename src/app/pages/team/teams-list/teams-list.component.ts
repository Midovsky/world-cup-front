import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { TeamService } from '../../../services/team.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Team } from '../../../models/team.model';
import { Game } from '../../../models/game.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {
  teams:Team[]=[];
  team:Team = new Team("",null,null,null);
  index:number;
  id:number;
  subscription: Subscription;

  constructor(private gameService:GameService, private teamService:TeamService, private router:Router,private route:ActivatedRoute) { }

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


  onAdd(){
    this.router.navigate(['create'],{relativeTo: this.route});
  }

  onEdit(index,id) {
    this.index=index;
    this.id=id;
    this.team.id= this.id;
    this.team.name=this.teams[index].name;
    this.team.draws=this.teams[index].draws;
    this.team.loses=this.teams[index].loses;
    this.team.wins=this.teams[index].wins;
    this.teamService.team.next(this.team);
    this.router.navigate([id,'edit'],{relativeTo: this.route});   

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
