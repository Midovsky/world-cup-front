import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../utils/services/game.service';
import { TeamService } from '../../../utils/services/team.service';
import { ReserveService } from '../../../utils/services/reserve.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from '../../../models/game.model';
import { Team } from '../../../models/team.model';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {


  games:Game[]=[];
  game:Game = new Game("",null,null,"",null,"");
  index:number;
  id:number;

  teams:Team[];
  constructor(private gameService:GameService, private teamService:TeamService,private reserveService:ReserveService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.onGet();

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

  }

  onAdd(){

    this.router.navigate(['create'],{relativeTo: this.route});
  }
  


  onEdit(index,id) {
    this.index=index;
    this.id=id;
    this.game.id = this.id;
        this.game.date=this.games[index].date;
        this.game.stadium=this.games[index].stadium;
        this.game.price=this.games[index].price;
        this.game.score=this.games[index].score;
        this.gameService.game.next(this.game);

        this.router.navigate([id,'edit'],{relativeTo: this.route});
  }

  onBook(id){

    this.reserveService.reserveGame(id)
    .subscribe(
      (response) => {

      this.router.navigate(['/games']);
      this.onGet();
      console.log(response);
    },
    (error) => {
      console.log(error);
    },
  );
    
  }

}
