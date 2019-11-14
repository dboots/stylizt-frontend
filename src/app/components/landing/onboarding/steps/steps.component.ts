import { Component, OnInit, ViewChild } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { StepService } from '../../../../services/step.service';

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
  isFormValid: boolean = false;

  constructor(private stepService: StepService) { }

  ngOnInit() {
    this.updateProgressBarValue();
    this.stepService.stepSubject.subscribe((_) => {
      this.updateProgressBarValue();
    });
  }

  formStatusChange($event) {
    this.isFormValid = ($event === 'VALID');
  }

  next() {
    this.stepService.nextActions[(this.currentStep - 1)]().then((result) => {
      console.log('result', result);
      this.stepper.next();
      this.updateProgressBarValue();
    }, (error) => {
      console.log('error encountered', error);
    });
  }

  prev() {
    this.stepper.previous();
    this.updateProgressBarValue();
  }

  updateProgressBarValue() {
    this.progressBarValue = ((this.currentStep / this.steps) * 100);
    this.filledProgressValue = (this.currentStep > 0) ? ((this.currentStep - 1) / this.steps) * 100 : 0;
    this.nextLabel = this.getNextLabel();
  }

  selectionChange($event: StepperSelectionEvent) {
    let delta = ($event.selectedIndex - $event.previouslySelectedIndex);
    this.currentStep += delta;
    this.updateProgressBarValue();
  }

  getNextLabel() {
    let label: string = 'Next';

    switch (this.currentStep) {
      case 1:
        label = 'Create Account';
        break;
      case 5:
        label = 'Finish';
        break;
    }

    return label;
  }
}
