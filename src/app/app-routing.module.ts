import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StylistComponent } from './stylist/stylist.component';

const routes: Routes = [
    { path: 'stylist', component: StylistComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})

export class AppRoutingModule { }
