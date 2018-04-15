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
  model = new Signup();
  message = '';
  showSignup = true;

  constructor(private _signupService: SignupService) { }

  signup() {
    this.model.type = this.type;
    this._signupService.signup(this.model).subscribe(
        data => {
            this.message = 'Thanks for signing up!';
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
