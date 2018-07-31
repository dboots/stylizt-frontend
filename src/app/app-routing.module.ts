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

import { AuthGuardService as AuthGuard } from './services/route-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: { navItems: [
      { name: 'Featured Looks', url: '#featured-looks', scroll: true },
      { name: 'Local Talent', url: '#local-talent', scroll: true },
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
      { name: 'Schedule', url: '#schedule', scroll: true },
      { name: 'Login' }
    ]} },
    { path: 'owner', component: OwnerPageComponent },
    {
      path: 'contact',
      component: ContactPageComponent,
      data: { navItems: [
        { name: 'Login' }
      ]}
    },
    { path: 'password/:token', component: PasswordPageComponent },
  ];
  
  @NgModule({
    imports: [ RouterModule.forRoot(routes, {})],
    exports: [ RouterModule ],
  })
  
  export class AppRoutingModule { }
  