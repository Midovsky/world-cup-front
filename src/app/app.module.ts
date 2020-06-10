import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {HttpModule} from '@angular/http';

import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './auth.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { GameService } from './services/game.service';
import { GameComponent } from './pages/game/game.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth-guard.service';
import { TeamComponent } from './pages/team/team.component';
import { TeamService } from './services/team.service';
import { ReserveService } from './services/reserve.service';
import { CreateTeamComponent } from './pages/team/create-team/create-team.component';
import { TeamsListComponent } from './pages/team/teams-list/teams-list.component';
import { EditTeamComponent } from './pages/team/edit-team/edit-team.component';
import { CreateGameComponent } from './pages/game/create-game/create-game.component';
import { GamesListComponent } from './pages/game/games-list/games-list.component';
import { EditGameComponent } from './pages/game/edit-game/edit-game.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    GameComponent,
    HomeComponent,
    TeamComponent,
    CreateTeamComponent,
    TeamsListComponent,
    EditTeamComponent,
    CreateGameComponent,
    GamesListComponent,
    EditGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [GameService,TeamService,ReserveService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
