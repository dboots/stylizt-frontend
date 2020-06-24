import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Component, Input, PLATFORM_ID, Inject } from '@angular/core';
import { UserService } from '../../../services';
import { User } from '../../../models';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

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

  urlParams: Params;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      this.urlParams = params;
    });
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
      passwordRepeat: ['', [Validators.required, confirmPassword]]
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
    let model = this.model;
    model.type = this.type;
    model.name = this.signupForm.get('name').value;
    model.email = this.signupForm.get('email').value;
    model.password = this.signupForm.get('password').value;

    if (typeof this.urlParams.bypass !== 'undefined') {
      this.userService.signup(model).subscribe((data: User) => {
        let token = data['token'];
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', token);
        }
        this.router.navigate(['stylist/home']);
      });
    } else {
      this.userService.signup(model).subscribe((data: User) => {
        let token = data['token'];
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', token);
        }
        this.router.navigate(['stylist/home']);
      });

      /*
      stripe.open(
        {
          email: model.email,
          name: 'Hair to Chair',
          description: 'Hair to Chair - Basic',
          amount: 499,
          token: (source) => {
            this.userService.signup(model).subscribe((data: User) => {
              let token = data['token'];
              localStorage.setItem('token', token);

              this.userService
                .createSubscription(token, source.id)
                .subscribe((_) => {
                  this.zone.run(() => {
                    this.router.navigate(['stylist/home']);
                  });
                });
            });
          }
        },
        (error) => {
          this.message = error.error;
          this.authService.logout();
          return Observable.throw(error);
        }
      );*/
    }
  }

  login() {
    let model = this.model;
    model.email = this.signupForm.get('email').value;
    model.password = this.signupForm.get('password').value;

    this.userService.login(model).subscribe(
      (data) => {
        this.message = 'Thanks for logging in!';
        return true;
      },
      (error) => {
        this.message = 'Invalid email address';
        return Observable.throw(error);
      }
    );
  }
}

function confirmPassword(control: AbstractControl) {
  if (!control.parent || !control) {
    return;
  }

  const password = control.parent.get('password');
  const passwordRepeat = control.parent.get('passwordRepeat');

  if (!password || !passwordRepeat) {
    return;
  }

  if (passwordRepeat.value === '') {
    return;
  }

  if (password.value !== passwordRepeat.value) {
    return {
      passwordsNotMatch: true
    };
  }
}
