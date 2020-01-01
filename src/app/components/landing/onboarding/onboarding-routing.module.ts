import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutOnboardingComponent } from '../../../layouts/onboarding/onboarding.component';
import { LandingOnboardingComponent } from './onboarding.component';
import { LandingStepsComponent } from './steps/steps.component';
import { CommonModule } from '@angular/common';
import { LandingVariationAComponent } from './variationA/variationA.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LayoutOnboardingComponent,
    children: [
      { path: '', component: LandingOnboardingComponent },
      { path: 'steps', component: LandingStepsComponent },
    ]
  }, {
    path: 'how-to-get-more-clients-2019',
    component: LandingVariationAComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
