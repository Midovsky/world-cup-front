import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth-guard.service';


import { SigninComponent } from './signin/signin.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { EditTeamComponent } from './edit-team/edit-team.component';




const appRoutes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full',  },

  { path: 'home', component: HomeComponent},

  { path: 'games', component: GameComponent, children:[
    {path: 'create', component: GameComponent},
    {path: ':id/edit', component: GameComponent}
  ]},

  { path: 'teams', component: TeamComponent, children:[
    {path: '', component: TeamsListComponent},
     {path: 'create', component: CreateTeamComponent},
    {path: ':id/edit', component: EditTeamComponent}
  ]},


  { path: 'login', component: SigninComponent},

  { path: '**', redirectTo: ''}

];


@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes),RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
