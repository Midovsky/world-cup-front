import { Game } from './game.model';

export class Team {
    public id:number;
    public name: string;
    public wins: number;
    public loses: number;
    public draws: number;
    flag: string;

  
    constructor(name: string, wins: number, loses: number, draws: number, flag: string) {
      this.name = name;

      this.loses = loses;
      this.wins = wins;
      this.draws = draws;
      this.flag = flag;
    }
  }
  