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
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../components/shared/shared.module';
import { CloudinaryUploaderComponent } from '../../../../components/shared/cloudinary-uploader/cloudinary-uploader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
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
    StepFiveComponent,
    CloudinaryUploaderComponent
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
