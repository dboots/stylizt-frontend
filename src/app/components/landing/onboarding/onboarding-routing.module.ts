import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutOnboardingComponent } from '../../../layouts/onboarding/onboarding.component';
import { LandingOnboardingComponent } from './onboarding.component';
import { LandingStepsComponent } from './steps/steps.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LayoutOnboardingComponent,
    children: [
      { path: '', component: LandingOnboardingComponent },
      { path: 'steps', component: LandingStepsComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
