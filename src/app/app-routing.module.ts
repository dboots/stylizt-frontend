import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home/home.component';
import { StylistPageComponent } from './components/stylist/stylist.component';
import { StylistProfilePageComponent } from './components/stylist/profile/profile.component';
import { StylistClientsPageComponent } from './components/stylist/clients/clients.component';
import { StylistClientsDetailPageComponent } from './components/stylist/clients/detail/detail.component';
import { StylistPortfolioPageComponent } from './components/portfolio/portfolio.component';
import { OwnerPageComponent } from './components/owner/owner.component';
import { ContactPageComponent } from './components/contact/contact.component';
import { PasswordPageComponent } from './components/password/password.component';
import { PrivacyPageComponent } from './components/privacy/privacy.component';
import { TermsPageComponent } from './components/terms/terms.component';
import { LandingPageComponent } from './components/landing/landing.component';

import { AuthGuardService as AuthGuard } from './services/route-guard.service';

let defaultNav = [
  { name: 'Contact', url: '/contact', scroll: false },
  { name: 'Login' }
];

let landingNav = [
  { name: 'Blog', url: '#featured-looks', scroll: true },
  { name: 'Contact', url: '/contact', scroll: false },
  { name: 'Login' }
];

const routes: Routes = [
  {
    path: 'stylists-near-me/:state',
    component: LandingPageComponent,
    data: { navItems: landingNav }
  },
  {
    path: '',
    component: HomePageComponent,
    data: { navItems: [
      { name: 'Blog', url: '#featured-looks', scroll: true },
      { name: 'Featured Talent', url: '#local-talent', scroll: true },
      { name: 'H2C Network', url: '#network', scroll: true },
      { name: 'Contact', url: '/contact', scroll: false },
      { name: 'Login' }
    ]}
  },
  {
    path: 'stylist',
    component: StylistPageComponent,
    data: { navItems: [
      { name: 'How It Works', url: '#how-it-works', scroll: true },
      { name: 'Sign Up', url: '#sign-up', scroll: true },
      { name: 'Contact', url: '/contact', scroll: false },
      { name: 'Login' }
    ]}
  },
  { path: 'stylist/profile', component: StylistProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'stylist/clients/:id', component: StylistClientsDetailPageComponent, canActivate: [AuthGuard] },
  { path: 'stylist/clients', component: StylistClientsPageComponent, canActivate: [AuthGuard] },
  {
    path: 'portfolio/:id', component: StylistPortfolioPageComponent,
    data: { navItems: [
      { name: 'About', url: '#about', scroll: true },
      { name: 'Portfolio', url: '#portfolio', scroll: true },
      { name: 'Login' }
    ]} },
    {
      path: 'owner',
      component: OwnerPageComponent,
      data: { navItems: defaultNav }
    }, {
      path: 'contact',
      component: ContactPageComponent,
      data: { navItems: defaultNav }
    }, {
      path: 'privacy-policy',
      component: PrivacyPageComponent,
      data: { navItems: defaultNav }
    }, {
      path: 'terms',
      component: TermsPageComponent,
      data: { navItems: defaultNav }
    }, { path: 'password/:token', component: PasswordPageComponent },
  ];
  
  @NgModule({
    imports: [ RouterModule.forRoot(routes, {})],
    exports: [ RouterModule ],
  })
  
  export class AppRoutingModule { }
  