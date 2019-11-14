import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService, AuthService, StepService } from '../../../../../../app/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-step-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss']
})
export class StepTwoComponent implements OnInit {
  @Input() stepSubject: Subject<any> = new Subject<any>();

  formGroup: FormGroup = new FormGroup({
    city: new FormControl('', []),
    state: new FormControl('', []),
    zip: new FormControl('', [])
  });

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private stepService: StepService
  ) { }

  ngOnInit() {
    let nextAction = () => {
      return new Promise((resolve, reject) => {
        let token = this.authService.token;
        console.log('token', token);
        this.userService.update(token, this.formGroup.value).subscribe((user) => {
          resolve(user);
        }, (error) => {
          console.log(error);
          this.formGroup.setErrors({ error: 'An error has occurred' });
          reject(error);
        });
      });
    };

    this.stepService.nextActions.push(nextAction);
  }
}
