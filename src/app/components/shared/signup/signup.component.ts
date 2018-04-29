import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SignupService } from '../../../services/signup.service';
import { Signup } from '../../../models/signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  @Input() type: string;
  @Input() plan: number;
  model = new Signup();
  message = '';
  showSignup = true;
  success = false;

  constructor(private _signupService: SignupService) { }

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

    console.log(this.model);
    this._signupService.signup(this.model).subscribe(
        data => {
            this.message = 'Thanks for signing up!';
            this.success = true;
            return true;
        },
        error => {
            this.message = 'Invalid email address';
            return Observable.throw(error);
        }
    );
  }

  login() {
    this._signupService.login(this.model).subscribe(
        data => {
            this.message = 'Thanks for logging in!';
            return true;
        },
        error => {
            this.message = 'Invalid email address';
            return Observable.throw(error);
        }
    );
  }
}
