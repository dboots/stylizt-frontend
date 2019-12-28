import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService, AuthService, StepService, LocationService } from '../../../../../services';
import { Subject } from 'rxjs';
import { User } from '../../../../../models';

@Component({
  selector: 'app-step-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss']
})
export class StepTwoComponent implements OnInit {
  @Input() stepSubject: Subject<any> = new Subject<any>();
  @Output() formStatusChange: Subject<any> = new Subject();

  formGroup: FormGroup = new FormGroup({
    _id: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required])
  });

  loading: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private stepService: StepService,
    private locationService: LocationService
  ) {
    this.formGroup.statusChanges.subscribe((status) => {
      this.formStatusChange.next(status);
    });
  }

  ngOnInit() {
    let nextAction = () => {
      return new Promise((resolve, reject) => {

        let user = this.authService.decode();
        let token = this.authService.token;
        this.formGroup.patchValue(user);
        this.userService.update(this.formGroup.value).subscribe((result) => {
          this.authService.token = result['token'];
          resolve(result);
        }, (error) => {
          console.log(error);
          this.formGroup.setErrors({ error: 'An error has occurred' });
          reject(error);
        });
      });
    };

    this.stepService.nextActions.push(nextAction);
  }

  updateLocation($event: any) {
    let zip = $event.target.value;
    this.loading = true;
    this.locationService.geocode(zip).subscribe((result: any) => {
      this.loading = false;
      if (result.results.length > 0) {
        let components = result.results[0].address_components;
        console.log(components.length);
        if (components.length === 5) {
          this.formGroup.controls['city'].setValue(components[1].long_name);
          this.formGroup.controls['state'].setValue(components[3].long_name);
        }

        if (components.length === 4) {
          this.formGroup.controls['city'].setValue(components[1].long_name);
          this.formGroup.controls['state'].setValue(components[2].long_name);
        }
      }
    });
  }
}
