/// <reference types="@angular/localize" />

import 'hammerjs';
import 'zone.js';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { OnboardingModule } from './app/components/landing/onboarding/onboarding.module';
import { LayoutModule } from './app/layouts/layout.module';
import { PortfolioRoutingModule } from './app/routing/portfolio/portfolio.routing.module';
import { Version3Module } from './app/routing/v3/v3.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SeoService } from './app/services/seo.service';
import { UserService, ClientService, AuthGuardService, AuthService, PortfolioService, NotesService, TalentService, BrandService, LocationService, PostService, ContactService, ServicesService, ScheduleService, StepService } from './app/services';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule.withServerTransition({ appId: "serverApp" }), FormsModule, ReactiveFormsModule, NgbModule, Version3Module, PortfolioRoutingModule, LayoutModule, OnboardingModule, AppRoutingModule, MatSlideToggleModule, CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        })),
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
        StepService,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
    ]
})
  .catch(((err) => console.log(err)));
});
