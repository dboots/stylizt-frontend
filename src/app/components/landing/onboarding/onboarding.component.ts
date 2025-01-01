import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UntypedFormGroup, UntypedFormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService, AuthService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class LandingOnboardingComponent implements OnInit {
  formGroup: UntypedFormGroup = new UntypedFormGroup({
    'name': new UntypedFormControl('', [Validators.required]),
    'email': new UntypedFormControl('', [Validators.required, Validators.email]),
    'password': new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
    'confirmPassword': new UntypedFormControl('', [Validators.required, Validators.minLength(8)])
  }, this._checkPassword);

  errorMessages: object = {
    'email': 'Please enter a valid email',
    'minlength': 'Please enter at least 8 characters',
    'required': 'This field is required',
    'passwordsNotSame': 'Passwords do not match'
  };

  fieldErrors: object = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signup() {
    const formGroup: UntypedFormGroup = this.formGroup;
    if (!formGroup.invalid) {
      this.userService.signup(formGroup.value).subscribe((result) => {
        this.authService.token = result['token'];
        this.userService.headers = AuthService.httpOptions(this.authService.token);
        this.router.navigate(['stylist/profile/edit']);
      });
    }
  }

  getErrorMessage($event: any) {
    const field = $event.target.name;
    const formGroup: UntypedFormGroup = this.formGroup;
    const fieldErrors: object = this.fieldErrors;
    const control = formGroup.controls[field];
    const errorMessages = this.errorMessages;

    if (control.errors) {
      Object.keys(control.errors).forEach((error) => {
        const message = errorMessages[error];
        fieldErrors[field] = message;
      });
    } else {
      delete fieldErrors[field];
    }

    this.fieldErrors = fieldErrors;
  }

  getFormGroupErrors() {
    const formGroup: UntypedFormGroup = this.formGroup;
    if (formGroup.errors) {
      return Object.keys(this.formGroup.errors).map((key) => key);
    }
  }

  _checkPassword(group: UntypedFormGroup) {
    let result = (group.get('password').value === group.get('confirmPassword').value) ? null : { passwordsNotSame: true };
    return result;
  }
}
