import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  UserService,
  ClientService,
  AuthGuardService,
  AuthService,
  PortfolioService
} from './services';

import { StylistPageComponent } from './components/stylist/stylist.component';
import { StylistClientsPageComponent } from './components/stylist/clients/clients.component';
import { StylistClientsDetailPageComponent } from './components/stylist/clients/detail/detail.component';
import { StylistProfilePageComponent } from './components/stylist/profile/profile.component';
import { StylistPortfolioPageComponent } from './components/stylist/portfolio/portfolio.component';
import { OwnerPageComponent } from './components/owner/owner.component';
import { HomePageComponent } from './components/home/home.component';
import { ContactPageComponent } from './components/contact/contact.component';
import { PasswordPageComponent } from './components/password/password.component';

import { SignupComponent } from './components/shared/signup/signup.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CloudinaryUploaderComponent } from './components/shared/cloudinary-uploader/cloudinary-uploader.component';

import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    SignupComponent,
    AppComponent,
    StylistPageComponent,
    StylistClientsPageComponent,
    StylistClientsDetailPageComponent,
    StylistProfilePageComponent,
    StylistPortfolioPageComponent,
    OwnerPageComponent,
    NavComponent,
    FooterComponent,
    CloudinaryUploaderComponent,
    HomePageComponent,
    ContactPageComponent,
    PasswordPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'your_cloud_name' } as CloudinaryConfiguration),
    FileUploadModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    ClientService,
    AuthGuardService,
    AuthService,
    PortfolioService,
    JwtHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
