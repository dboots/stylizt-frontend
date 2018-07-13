import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService, UserService } from '../../../services';
import { User } from '../../../models';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  @Input() type: string;
  @Input() plan: number;
  model = new User();
  message = '';
  showSignup = true;
  success = false;

  signupForm: FormGroup;
  signupFormErrors: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {
    this.signupFormErrors = {
      name: {},
      email: {},
      password: {},
      passwordRepeat: {}
    };

    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordRepeat: ['', [Validators.required, confirmPassword]],
    });

    this.formValuesChanged();
    this.signupForm.valueChanges.subscribe(() => {
      this.formValuesChanged();
    });
  }

  formValuesChanged() {
    for (const field in this.signupFormErrors) {
      if (this.signupFormErrors.hasOwnProperty(field)) {
        this.signupFormErrors[field] = {};

        const control = this.signupForm.get(field);

        if (control && control.dirty && !control.valid) {
          this.signupFormErrors[field] = control.errors;
        }
      }
    }
  }

  signup() {
    this.model.type = this.type;
    // TODO: Convert this to use FormValidators
    /*
    if (!this.plan) {
      this.message = 'Please select a plan that interests you';
      return false;
    } else {
      this.model.plan = this.plan;
    }
    */
    this.model.name = this.signupForm.get('name').value;
    this.model.email = this.signupForm.get('email').value;
    this.model.password = this.signupForm.get('password').value;

    this.userService.signup(this.model).subscribe(
      (data) => {
        localStorage.setItem('token', data['token']);
        this.router.navigate(['/stylist/profile']);
      }, (error) => {
        this.message = error.error;
        this.authService.logout();
        return Observable.throw(error);
      }
    );
  }

  login() {
    this.model.email = this.signupForm.get('email').value;
    this.model.password = this.signupForm.get('password').value;

    this.userService.login(this.model).subscribe(
      (data) => {
        this.message = 'Thanks for logging in!';
        return true;
      }, (error) => {
        this.message = 'Invalid email address';
        return Observable.throw(error);
      }
    );
  }
}

function confirmPassword(control: AbstractControl) {
  if ( !control.parent || !control ) {
    return;
  }

  const password = control.parent.get('password');
  const passwordRepeat = control.parent.get('passwordRepeat');

  if ( !password || !passwordRepeat ) {
    return;
  }

  if ( passwordRepeat.value === '' ) {
    return;
  }

  if ( password.value !== passwordRepeat.value ) {
    return {
      passwordsNotMatch: true
    };
  }
}