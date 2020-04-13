import { Game } from './game.model';

export class Team {
    public id:number;

    public name: string;
    public wins: number;
    public loses: number;
    public draws: number;

  
    constructor(name: string, wins: number, loses: number, draws: number) {
      this.name = name;

      this.loses = loses;
      this.wins = wins;
      this.draws = draws;
    }
  }
  