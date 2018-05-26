import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './components/home/home.component';
import { StylistPage } from './components/stylist/stylist.component';
import { StylistProfilePage } from './components/stylist/profile/profile.component';
import { StylistClientsPage } from './components/stylist/clients/clients.component';
import { StylistClientsDetailPage } from './components/stylist/clients/detail/detail.component';
import { StylistPortfolioPage } from './components/stylist/portfolio/portfolio.component';
import { OwnerPage } from './components/owner/owner.component';
import { ContactPage } from './components/contact/contact.component';
import { PasswordPage } from './components/password/password.component';

import { AuthGuardService as AuthGuard } from './services/route-guard.service';

const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'stylist', component: StylistPage },
    { path: 'stylist/profile', component: StylistProfilePage, canActivate: [AuthGuard] },
    { path: 'stylist/clients/:id', component: StylistClientsDetailPage, canActivate: [AuthGuard] },
    { path: 'stylist/clients', component: StylistClientsPage, canActivate: [AuthGuard] },
    { path: 'stylist/portfolio', component: StylistPortfolioPage, canActivate: [AuthGuard] },
    { path: 'owner', component: OwnerPage },
    { path: 'contact', component: ContactPage },
    { path: 'password/:token', component: PasswordPage },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {})],
    exports: [ RouterModule ],
})

export class AppRoutingModule { }
