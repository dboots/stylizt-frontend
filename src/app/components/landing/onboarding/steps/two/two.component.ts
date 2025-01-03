import { Component, OnInit, Input, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
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

  formGroup: UntypedFormGroup = new UntypedFormGroup({
    _id: new UntypedFormControl(''),
    city: new UntypedFormControl('', [Validators.required]),
    state: new UntypedFormControl('', [Validators.required]),
    zip: new UntypedFormControl('', [Validators.required])
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
