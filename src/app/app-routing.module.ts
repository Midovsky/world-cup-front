import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth-guard.service';


import { SigninComponent } from './pages/signin/signin.component';
import { GameComponent } from './pages/game/game.component';
import { HomeComponent } from './pages/home/home.component';
import { TeamComponent } from './pages/team/team.component';
import { CreateTeamComponent } from './pages/team/create-team/create-team.component';
import { TeamsListComponent } from './pages/team/teams-list/teams-list.component';
import { EditTeamComponent } from './pages/team/edit-team/edit-team.component';
import { CreateGameComponent } from './pages/game/create-game/create-game.component';
import { GamesListComponent } from './pages/game/games-list/games-list.component';
import { EditGameComponent } from './pages/game/edit-game/edit-game.component';
import { UserComponent } from './pages/user/user.component';




const appRoutes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full',  },

  { path: 'home', component: HomeComponent},

  { path: 'games', component: GameComponent, children:[
    {path: '', component: GamesListComponent},
    {path: 'create', component: CreateGameComponent},
    {path: ':id/edit', component: EditGameComponent}
  ]},

  { path: 'teams', component: TeamComponent, children:[
    {path: '', component: TeamsListComponent},
     {path: 'create', component: CreateTeamComponent},
    {path: ':id/edit', component: EditTeamComponent}
  ]}, 

  { 
    path: 'user' , component: UserComponent
  },


  { path: 'login', component: SigninComponent},

  { path: '**', redirectTo: ''}

];


@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes),RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
