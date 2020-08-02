import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
  ScheduleService,
  StepService
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
import { ConfirmDialogComponent } from './components/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { NoteCardComponent } from './components/shared/note-card/note-card.component';
import { TalentTagsInputComponent } from './components/shared/talent-tags-input/talent-tags-input.component';
import { CustomDropdownComponent } from './components/shared/custom-dropdown/custom-dropdown.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { PostComponent } from './components/shared/post/post.component';
import { StylistHomePageComponent } from './components/stylist/home/stylist-home.component';
import { StylistServicesPageComponent } from './components/stylist/services/services.component';
import { LayoutModule } from './layouts/layout.module';
import { OnboardingModule } from './components/landing/onboarding/onboarding.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import * as Sentry from '@sentry/browser';
import { ApplyPageComponent } from './components/apply/apply.component';
import { Version3Module } from './routing/v3/v3.module';
import { BlogPostComponent } from './components/blog/post/post.component';
import { PortfolioRoutingModule } from './routing/portfolio/portfolio.routing.module';
import { EditProfileComponent } from './components/stylist/profile/edit/edit.component';
import { BlogTagComponent } from './components/blog/tag/tag.component';
import { BlogPostItemComponent } from './components/shared/blog/post/post.component';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { BlogHomeComponent } from './components/blog/blog.component';
import { EditProfileDetailsComponent } from './components/stylist/profile/edit/details/details.component';
import { SeoService } from './services/seo.service';
import { EditProfilePortfolioComponent } from './components/stylist/profile/edit/portfolio/portfolio.component';
import { EditProfileServicesComponent } from './components/stylist/profile/edit/services/services.component';
import { EditProfileClientsComponent } from './components/stylist/profile/edit/clients/clients.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { EditProfileClientsDetailsComponent } from './components/stylist/profile/edit/clients/details/details.component';
import { EditProfileClientsListComponent } from './components/stylist/profile/edit/clients/list/list.component';

Sentry.init({
  dsn: 'https://fc25569a8ffd4a658bab6fdb85175fbf@sentry.io/1869808'
});

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
    HomePageComponent,
    ContactPageComponent,
    PasswordPageComponent,
    ConfirmDialogComponent,
    NoteCardComponent,
    TalentTagsInputComponent,
    CustomDropdownComponent,
    LoadingComponent,
    PostComponent,
    TermsPageComponent,
    PrivacyPageComponent,
    LandingPageComponent,
    LandingVideoPageComponent,
    ApplyPageComponent,
    BlogPostComponent,
    BlogTagComponent,
    BlogHomeComponent,
    EditProfileComponent,
    EditProfileDetailsComponent,
    EditProfilePortfolioComponent,
    EditProfileServicesComponent,
    EditProfileClientsComponent,
    EditProfileClientsDetailsComponent,
    EditProfileClientsListComponent,
    BlogPostItemComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    Version3Module,
    PortfolioRoutingModule,
    LayoutModule,
    OnboardingModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MatSlideToggleModule,
    LazyLoadImageModule
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
    SeoService,
    JwtHelperService,
    StepService
  ],
  exports: [CommonModule, SharedModule, MatSlideToggleModule],
  entryComponents: [
    ConfirmDialogComponent,
    EditProfileDetailsComponent,
    EditProfilePortfolioComponent,
    EditProfileServicesComponent,
    EditProfileClientsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
