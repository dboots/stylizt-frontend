import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { SlickModule } from 'ngx-slick';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  UserService,
  ClientService,
  AuthGuardService,
  AuthService,
  PortfolioService,
  NotesService,
  TalentService,
  ServicesService,
  BrandService,
  LocationService,
  PostService,
  ContactService,
  ScheduleService
} from './services';

import { StylistPageComponent } from './components/stylist/stylist.component';
import { StylistClientsPageComponent } from './components/stylist/clients/clients.component';
import { StylistClientsDetailPageComponent } from './components/stylist/clients/detail/detail.component';
import { StylistProfilePageComponent } from './components/stylist/profile/profile.component';
import { StylistPortfolioPageComponent } from './components/portfolio/portfolio.component';
import { OwnerPageComponent } from './components/owner/owner.component';
import { HomePageComponent } from './components/home/home.component';
import { ContactPageComponent } from './components/contact/contact.component';
import { PasswordPageComponent } from './components/password/password.component';
import { TermsPageComponent } from './components/terms/terms.component';
import { PrivacyPageComponent } from './components/privacy/privacy.component';
import { LandingPageComponent } from './components/landing/landing.component';
import { LandingVideoPageComponent } from './components/landing/video.component';
import { SignupComponent } from './components/shared/signup/signup.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CloudinaryUploaderComponent } from './components/shared/cloudinary-uploader/cloudinary-uploader.component';
import { ConfirmDialogComponent } from './components/shared/dialogs/confirm-dialog/confirm-dialog.component';

import {
  CloudinaryModule,
  CloudinaryConfiguration
} from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { FileUploadModule } from 'ng2-file-upload';
import { NoteCardComponent } from './components/shared/note-card/note-card.component';
import { TalentTagsInputComponent } from './components/shared/talent-tags-input/talent-tags-input.component';
import { CustomDropdownComponent } from './components/shared/custom-dropdown/custom-dropdown.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { PostComponent } from './components/shared/post/post.component';
import { StylistHomePageComponent } from './components/stylist/home/stylist-home.component';
import { BrandagsInputComponent } from './components/shared/brand-tags-input/brand-tags-input.component';
import { StylistServicesPageComponent } from './components/stylist/services/services.component';
import { LandingOnboardingComponent } from './components/landing/onboarding/onboarding.component';

@NgModule({
  declarations: [
    SignupComponent,
    AppComponent,
    StylistPageComponent,
    StylistClientsPageComponent,
    StylistClientsDetailPageComponent,
    StylistProfilePageComponent,
    StylistHomePageComponent,
    StylistServicesPageComponent,
    StylistPortfolioPageComponent,
    OwnerPageComponent,
    NavComponent,
    FooterComponent,
    CloudinaryUploaderComponent,
    HomePageComponent,
    ContactPageComponent,
    PasswordPageComponent,
    ConfirmDialogComponent,
    NoteCardComponent,
    TalentTagsInputComponent,
    BrandagsInputComponent,
    CustomDropdownComponent,
    LoadingComponent,
    PostComponent,
    TermsPageComponent,
    PrivacyPageComponent,
    LandingPageComponent,
    LandingOnboardingComponent,
    LandingVideoPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: 'your_cloud_name'
    } as CloudinaryConfiguration),
    FileUploadModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    ScrollToModule.forRoot(),
    SlickModule.forRoot()
  ],
  providers: [
    UserService,
    ClientService,
    AuthGuardService,
    AuthService,
    PortfolioService,
    NotesService,
    TalentService,
    BrandService,
    LocationService,
    PostService,
    ContactService,
    ServicesService,
    ScheduleService,
    JwtHelperService
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
