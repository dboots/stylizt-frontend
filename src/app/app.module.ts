import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignupService } from './services/signup.service'

import { StylistPage } from './components/stylist/stylist.component';
import { OwnerPage } from './components/owner/owner.component';
import { HomePage } from './components/home/home.component';
import { SignupPage } from './components/signup/signup.component';

import { SignupComponent } from './components/shared/signup/signup.component';
import { NavComponent } from './components/shared/nav/nav.component';


@NgModule({
  declarations: [
    SignupComponent,
    AppComponent,
    StylistPage,
    OwnerPage,
    NavComponent,
    HomePage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
