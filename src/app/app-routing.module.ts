import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './components/home/home.component';
import { StylistPage } from './components/stylist/stylist.component';
import { StylistProfilePage } from './components/stylist/profile/profile.component';
import { OwnerPage } from './components/owner/owner.component';
import { ContactPage } from './components/contact/contact.component';

import { AuthGuardService as AuthGuard } from './services/route-guard.service';

const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'stylist', component: StylistPage },
    { path: 'stylist/profile', component: StylistProfilePage, canActivate: [AuthGuard] },
    { path: 'owner', component: OwnerPage },
    { path: 'contact', component: ContactPage }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {})],
    exports: [ RouterModule ],
})

export class AppRoutingModule { }
