import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignupService } from './services/signup.service';
import { AuthGuardService } from './services/route-guard.service';
import { AuthService } from './services/auth.service';

import { StylistPage } from './components/stylist/stylist.component';
import { StylistProfilePage } from './components/stylist/profile/profile.component';
import { OwnerPage } from './components/owner/owner.component';
import { HomePage } from './components/home/home.component';
import { SignupPage } from './components/signup/signup.component';
import { ContactPage } from './components/contact/contact.component';

import { SignupComponent } from './components/shared/signup/signup.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';


@NgModule({
  declarations: [
    SignupComponent,
    AppComponent,
    StylistPage,
    StylistProfilePage,
    OwnerPage,
    NavComponent,
    FooterComponent,
    HomePage,
    SignupPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    SignupService,
    AuthGuardService,
    AuthService,
    JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
