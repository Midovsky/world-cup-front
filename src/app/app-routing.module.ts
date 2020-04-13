import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth-guard.service';


import { SigninComponent } from './signin/signin.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';




const appRoutes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full',  },



  { path: 'home', component: HomeComponent},

  { path: 'games', component: GameComponent, children:[
    {path: 'create', component: GameComponent},
    {path: ':id/edit', component: GameComponent}
  ]},

  { path: 'teams', component: TeamComponent, children:[
    {path: 'create', component: TeamComponent},
    {path: ':id/edit', component: TeamComponent}
  ]},

  { path: 'login', component: SigninComponent},

  { path: '**', redirectTo: ''}

];


@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
