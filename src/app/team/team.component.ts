import { Component, OnInit, NgZone } from '@angular/core';
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';
import {Router, ActivatedRoute, Params, RouterModule} from '@angular/router';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';
import { NgForm } from '@angular/forms';
import { CreateTeamComponent } from '../create-team/create-team.component';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams:Team[]=[];

  games:Game[]=[];
  team:Team = new Team("",null,null,null);


  success = '';

  constructor(private gameService:GameService, private teamService:TeamService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

  }


}
