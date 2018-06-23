import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home/home.component';
import { StylistPageComponent } from './components/stylist/stylist.component';
import { StylistProfilePageComponent } from './components/stylist/profile/profile.component';
import { StylistClientsPageComponent } from './components/stylist/clients/clients.component';
import { StylistClientsDetailPageComponent } from './components/stylist/clients/detail/detail.component';
import { StylistPortfolioPageComponent } from './components/stylist/portfolio/portfolio.component';
import { OwnerPageComponent } from './components/owner/owner.component';
import { ContactPageComponent } from './components/contact/contact.component';
import { PasswordPageComponent } from './components/password/password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { AuthGuardService as AuthGuard } from './services/route-guard.service';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'stylist', component: StylistPageComponent },
    { path: 'stylist/profile', component: StylistProfilePageComponent, canActivate: [AuthGuard] },
    { path: 'stylist/clients/:id', component: StylistClientsDetailPageComponent, canActivate: [AuthGuard] },
    { path: 'stylist/clients', component: StylistClientsPageComponent, canActivate: [AuthGuard] },
    { path: 'stylist/portfolio', component: StylistPortfolioPageComponent, canActivate: [AuthGuard] },
    { path: 'owner', component: OwnerPageComponent },
    { path: 'contact', component: ContactPageComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'password/:token', component: PasswordPageComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {})],
    exports: [ RouterModule ],
})

export class AppRoutingModule { }
