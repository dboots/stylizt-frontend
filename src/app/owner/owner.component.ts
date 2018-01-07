import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup/signup.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

  public signupService;

  constructor(private _signupService: SignupService) { }

  ngOnInit() {
  }

  signup() {
    this._signupService.signup({
      email: 'test@test.com',
      type: 'stylist'
    }).subscribe(
        data => {
            console.log(data);
            return true;
        },
        error => {
            console.log(error);
            return Observable.throw(error);
        }
    );
  }

}
