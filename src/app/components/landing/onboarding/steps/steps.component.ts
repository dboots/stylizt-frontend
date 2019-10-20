import { Component, OnInit, ViewChild } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-landing-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class LandingStepsComponent implements OnInit {
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  steps: number = 5;
  currentStep: number = 1;
  nextLabel: string;
  progressBarValue: number;
  filledProgressValue: number;
  formGroup: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  });

  ngOnInit() {
    this.updateProgressBarValue();
  }

  next() {
    this.stepper.next();
    this.updateProgressBarValue();
  }

  prev() {
    this.stepper.previous();
    this.updateProgressBarValue();
  }

  updateProgressBarValue() {
    this.progressBarValue = ((this.currentStep / this.steps) * 100);
    this.filledProgressValue = (this.currentStep > 0) ? ((this.currentStep - 1) / this.steps) * 100 : 0;
    this.nextLabel = (this.progressBarValue === 100) ? 'Finish' : 'Next';
  }

  selectionChange($event: StepperSelectionEvent) {
    let delta = ($event.selectedIndex - $event.previouslySelectedIndex);
    this.currentStep += delta;
    this.updateProgressBarValue();
  }
}
