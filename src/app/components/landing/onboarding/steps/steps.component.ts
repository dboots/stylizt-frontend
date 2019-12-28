import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper, MatHorizontalStepper, MatStep } from '@angular/material/stepper';
import { AuthService, StepService } from '../../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class LandingStepsComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper', { static: false }) stepper: MatStepper;
  steps: number = 5;
  currentStep: number = 1;
  nextLabel: string;
  progressBarValue: number;
  filledProgressValue: number;
  isFormValid: boolean = false;

  constructor(
    private stepService: StepService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updateProgressBarValue();
    this.stepService.stepSubject.subscribe((_) => {
      this.updateProgressBarValue();
    });
  }

  ngAfterViewInit() {
    this.stepper.selectedIndex = 2;
  }

  formStatusChange($event) {
    this.isFormValid = ($event === 'VALID');
  }

  next() {
    this.stepService.nextActions[(this.currentStep - 1)]().then((result) => {
      this.stepper.selected.completed = true;

      if (this.currentStep < 2) {
        this.isFormValid = false;
      } else {
        this.stepper.steps.map((step) => step.completed = true);
      }

      if (result && result['token']) {
        this.authService.token = result['token'];
      }

      if (this.currentStep === this.steps) {
        this.router.navigate(['stylist/home']);
      } else {
        this.stepper.next();
        this.updateProgressBarValue();
      }
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
    let currentStep = $event.previouslySelectedStep;
    let delta = ($event.selectedIndex - $event.previouslySelectedIndex);
    if (currentStep.completed) {
      this.currentStep += delta;
      this.updateProgressBarValue();
    }
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
