import { NgModule } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StepOneComponent } from './one/one.component';
import { StepTwoComponent } from './two/two.component';
import { StepThreeComponent } from './three/three.component';
import { StepFourComponent } from './four/four.component';
import { StepFiveComponent } from './five/five.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatProgressBarModule,
    MatIconModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent
  ],
  declarations: [
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent
  ]
})
export class StepsModule { }
