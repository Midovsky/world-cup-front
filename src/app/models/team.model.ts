import { Game } from './game.model';

export class Team {
    public id:number;
    public homeGames:any[];
    public awayGames:any[];
    public name: string;
    public wins: number;
    public loses: number;
    public draws: number;

  
    constructor(homeGames: any[],awayGames: any[], name: string, wins: number, loses: number, draws: number) {
      this.name = name;
      this.awayGames = awayGames;
      this.homeGames = homeGames;
      this.loses = loses;
      this.wins = wins;
      this.draws = draws;
    }
  }
  