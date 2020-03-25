export class Game {
    public id:number;
    public away_team_id:number;
    public home_team_id:number
    public date: string;
    public score: string;
    public price: number;
    public stadium: string;

  
    constructor(date: string,away_team_id: number, home_team_id: number, score: string, price: number, stadium: string) {
      this.date = date;
      this.away_team_id = away_team_id;
      this.home_team_id = home_team_id;
      this.score = score;
      this.price = price;
      this.stadium = stadium;
    }
  }
  