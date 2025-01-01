import { Component, OnInit, Output } from '@angular/core';
import { User, Brand } from '../../../../../models';
import { AuthService, BrandService, StepService } from '../../../../../services';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-step-four',
  templateUrl: './four.component.html',
  styleUrls: ['./four.component.scss']
})
export class StepFourComponent implements OnInit {
  @Output() formStatusChange: Subject<any> = new Subject();

  user: User;
  formGroup: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('')
  });
  brand: string;
  brands: Brand[] = [];

  constructor(
    private brandService: BrandService,
    private stepService: StepService
  ) { }

  ngOnInit() {
    let nextAction = () => {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    };

    this.stepService.nextActions.push(nextAction);
    this.formStatusChange.next('VALID');
  }

  addBrand() {
    let brand = new Brand(this.brand);
    this.brandService.create(brand).subscribe((result) => {
      this.brand = '';
      this.brands.push(result);
    });
  }
}
