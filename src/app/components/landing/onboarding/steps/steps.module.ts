import { NgModule } from "@angular/core";
import { MatStepperModule } from "@angular/material/stepper";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatProgressBarModule,
    MatIconModule
  ],
})
export class StepsModule {}
