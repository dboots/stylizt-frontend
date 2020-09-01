import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutOnboardingComponent } from '../../../layouts/onboarding/onboarding.component';
import { LandingOnboardingComponent } from './onboarding.component';
import { LandingStepsComponent } from './steps/steps.component';
import { CommonModule } from '@angular/common';
import { LandingVariationAComponent } from './variationA/variationA.component';
import { LandingVariationBComponent } from './variationB/variationB.component';
import { LandingPromotionComponent } from './landing-promotion/landing-promotion.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LayoutOnboardingComponent,
    children: [
      { path: '', component: LandingOnboardingComponent },
      { path: 'steps', component: LandingStepsComponent }
    ]
  }, {
    path: 'how-build-clientele-fast',
    component: LandingVariationAComponent
  }, {
    path: 'stylist-appointment-book-app',
    component: LandingVariationBComponent
  }, {
    path: 'appointment-scheduling-app',
    component: LandingVariationBComponent
  }, {
    path: 'independant-stylist-scheduling-app',
    component: LandingVariationBComponent
  }, {
    path: 'hair-stylist-promotion-marketing',
    component: LandingVariationBComponent
  }, {
    path: 'how-to-get-new-clients-fast',
    component: LandingPromotionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
