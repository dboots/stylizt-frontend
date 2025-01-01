import { Component, OnInit, Output } from '@angular/core';
import { ServicesService, StepService } from '../../../../../services';
import { User } from '../../../../../models/user.model';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Service } from '../../../../../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-step-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class StepThreeComponent implements OnInit {
  @Output() formStatusChange: Subject<any> = new Subject();

  user: User;
  services: Service[] = [];
  times: string[] = ['30 mins', '1 hour', '1.5 hours', '2 hours', '2.5 hours', '3 hours'];
  formGroup: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    price: new UntypedFormControl(''),
    time: new UntypedFormControl('')
  });

  constructor(
    private serviceService: ServicesService,
    private stepService: StepService
  ) { }

  ngOnInit() {
    let nextAction = () => {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    };

    this.stepService.nextActions.push(nextAction);
  }

  addService() {
    this.serviceService.create(this.formGroup.value).subscribe((result) => {
      this.services.push(result['result']);
      this.formGroup.reset();
    });
  }
}
