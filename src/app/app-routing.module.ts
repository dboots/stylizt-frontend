import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StylistComponent } from './stylist/stylist.component';
import { OwnerComponent } from './owner/owner.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'stylist', component: StylistComponent },
    { path: 'owner', component: OwnerComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {
useHash: true
})],
    exports: [ RouterModule ],
})

export class AppRoutingModule { }
