import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './components/home/home.component';
import { StylistPage } from './components/stylist/stylist.component';
import { OwnerPage } from './components/owner/owner.component';
import { SignupPage } from './components/signup/signup.component';
import { ContactPage } from './components/contact/contact.component';

const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'stylist', component: StylistPage },
    { path: 'owner', component: OwnerPage },
    { path: 'signup', component: SignupPage },
    { path: 'contact', component: ContactPage }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {})],
    exports: [ RouterModule ],
})

export class AppRoutingModule { }
