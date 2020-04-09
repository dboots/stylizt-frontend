import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { StylistHomePageComponent } from './components/stylist/home/stylist-home.component';
import { StylistServicesPageComponent } from './components/stylist/services/services.component';
import { LayoutDefaultComponent } from './layouts/default/default.component';
import { ApplyPageComponent } from './components/apply/apply.component';
import { NotFoundComponent } from './components/notfound/notfound.component';

let landingNav = [
  { name: 'Blog', url: '#featured-looks', scroll: true },
  { name: 'Contact', url: '/contact', scroll: false },
  { name: 'Login' }
];

const routes: Routes = [{
  path: '',
  component: LayoutDefaultComponent,
  children: [{
    path: 'stylists-near-me/:state',
    component: LandingPageComponent,
    data: { navItems: landingNav }
  }, {
    path: 'stylist',
    children: [{
      path: '',
      component: StylistPageComponent
    }, {
      path: 'home',
      component: StylistHomePageComponent,
      canActivate: [AuthGuard]
    }, {
      path: 'services',
      component: StylistServicesPageComponent,
      canActivate: [AuthGuard]
    }, {
      path: 'profile',
      component: StylistProfilePageComponent,
      canActivate: [AuthGuard]
    }, {
      path: 'clients/:id',
      component: StylistClientsDetailPageComponent,
      canActivate: [AuthGuard]
    }, {
      path: 'clients',
      component: StylistClientsPageComponent,
      canActivate: [AuthGuard]
    }],
    data: {
      navItems: [
        { name: 'Features', url: '#features', scroll: true },
        { name: 'Sign Up', url: '#signup', scroll: true },
        { name: 'Contact', url: '/contact', scroll: false },
        { name: 'Login' }
      ]
    }
  }, {
    path: 'portfolio-legacy/:id',
    component: StylistPortfolioPageComponent,
    data: {
      navItems: [
        { name: 'About', url: '#about', scroll: true },
        { name: 'Portfolio', url: '#portfolio', scroll: true },
        { name: 'Login' }
      ]
    }
  }, {
    path: 'owner',
    component: OwnerPageComponent
  }, {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPageComponent
  }, {
    path: 'terms',
    component: TermsPageComponent
  }, {
    path: 'password/:token',
    component: PasswordPageComponent
  }, {
    path: 'feedback',
    component: ApplyPageComponent
  }, {
    path: '**',
    component: NotFoundComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
