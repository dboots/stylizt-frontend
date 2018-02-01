import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignupService } from './services/signup.service'

import { StylistComponent } from './components/stylist/stylist.component';
import { OwnerComponent } from './components/owner/owner.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { SignupComponent } from './components/shared/signup/signup.component';


@NgModule({
  declarations: [
    SignupComponent,
    AppComponent,
    StylistComponent,
    OwnerComponent,
    NavComponent,
    HomeComponent,
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
