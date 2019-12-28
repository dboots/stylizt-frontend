import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { LandingOnboardingComponent } from './onboarding.component';
import { LandingStepsComponent } from './steps/steps.component';
import { StepsModule } from './steps/steps.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    StepsModule,
    SharedModule
  ],
  declarations: [
    LandingOnboardingComponent,
    LandingStepsComponent
  ],
  exports: [
    SharedModule
  ]
})
export class OnboardingModule { }
