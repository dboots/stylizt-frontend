import { Component, OnInit } from '@angular/core';
import { User, Brand } from '../../../../../models';
import { AuthService, BrandService, StepService } from '../../../../../services';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-step-four',
  templateUrl: './four.component.html',
  styleUrls: ['./four.component.scss']
})
export class StepFourComponent implements OnInit {
  user: User;
  formGroup: FormGroup = new FormGroup({
    name: new FormControl('')
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
        resolve();
      });
    };

    this.stepService.nextActions.push(nextAction);
  }

  addBrand() {
    let brand = new Brand(this.brand);
    this.brandService.create(brand).subscribe((result) => {
      this.brand = '';
      this.brands.push(result['result']);
    });
  }
}
