import { Team } from './team.model';

export class Game {
    public id:number;
    public awayTeam:Team;
    public homeTeam:Team
    public date: string;
    public score: string;
    public price: number;
    public stadium: string;

  
    constructor(date: string,awayTeam: Team, homeTeam: Team, score: string, price: number, stadium: string) {
      this.date = date;
      this.awayTeam = awayTeam;
      this.homeTeam = homeTeam;
      this.score = score;
      this.price = price;
      this.stadium = stadium;
    }

  }
  