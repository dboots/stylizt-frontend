import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutOnboardingComponent } from './onboarding/onboarding.component';
import { LayoutDefaultComponent } from './default/default.component';
import { LayoutDefaultModule } from './default/default.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutDefaultModule,
    RouterModule.forChild([])
  ],
  exports: [
    LayoutOnboardingComponent,
    LayoutDefaultComponent
  ],
  declarations: [
    LayoutOnboardingComponent,
    LayoutDefaultComponent
  ]
})
export class LayoutModule { }
