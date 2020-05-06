import { Component, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StepService, UserService } from '../../../../../services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-step-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss'],
})
export class StepOneComponent implements OnInit {
  @Output() formStatusChange: Subject<any> = new Subject();

  formGroup: FormGroup = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, this.checkPassword);

  constructor(
    private stepService: StepService,
    private userService: UserService
  ) {
    let nextAction = () => {
      return new Promise((resolve, reject) => {
        this.userService.signup(this.formGroup.value).subscribe((result) => {
          resolve(result);
        }, (error) => {
          this.formGroup.setErrors({ error: error.error });
          reject(error);
        });
      });
    };

    this.stepService.nextActions.push(nextAction);

    this.formGroup.statusChanges.subscribe((status) => {
      this.formStatusChange.next(status);
    });
  }

  ngOnInit() {
    this.formStatusChange.next('INVALID');
  }

  checkPassword(group: FormGroup) {
    let result = (group.get('password').value === group.get('confirmPassword').value) ? null : { passwordsNotSame: true };
    return result;
  }
}
