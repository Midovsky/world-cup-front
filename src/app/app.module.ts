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
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard.service';
import { TeamComponent } from './team/team.component';
import { TeamService } from './services/team.service';
import { ReserveService } from './services/reserve.service';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { EditTeamComponent } from './edit-team/edit-team.component';

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
