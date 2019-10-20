import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { LandingOnboardingComponent } from './onboarding.component';
import { LandingStepsComponent } from './steps/steps.component';
import { StepsModule } from './steps/steps.module';

@NgModule({
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    StepsModule
  ],
  declarations: [
    LandingOnboardingComponent,
    LandingStepsComponent
  ]
})
export class OnboardingModule { }
