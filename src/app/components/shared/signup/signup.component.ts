import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService, UserService } from '../../../services';
import { User } from '../../../models';
import { Router } from '@angular/router';

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
  passwordConfirm: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  signup() {
    this.model.type = this.type;

    // TODO: Convert this to use FormValidators
    if (!this.plan) {
      this.message = 'Please select a plan that interests you';
      return false;
    } else {
      this.model.plan = this.plan;
    }

    // TODO: Convert this to use FormValidators
    if (!this.model.email) {
      this.message = 'Please enter an email address';
      return false;
    }

    if (this.model.password.length < 8) {
      this.message = 'Password must be larger than 8 characters';
      return false;
    }

    if (this.model.password !== this.passwordConfirm) {
      this.message = 'Passwords must match';
      return false;
    }

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
