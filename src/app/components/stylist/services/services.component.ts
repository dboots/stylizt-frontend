import { Component, OnInit } from '@angular/core';
import { Service } from '../../../models';
import { ServicesService } from '../../../services';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-page-stylist-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class StylistServicesPageComponent implements OnInit {
  ADD_LABEL: string = 'Add New Service';
  UPDATE_LABEL: string = 'Update New Service';
  services: Service[] = [];
  label: string = 'Add New Service';

  formGroup: FormGroup = new FormGroup({
    _id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl()
  });

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.servicesService.read().subscribe((result) => {
      console.log(result);
      this.services = result['data'];
    });
  }

  save() {
    const service = this.formGroup.value;
    const id = this.formGroup.get('_id').value;

    if (id) {
      this.servicesService.update(service).subscribe((result) => {
        console.log(result);
        this.formGroup.reset();
        const index = this.services.findIndex((s) => s._id === service._id);
        this.services[index] = service;
        this.label = this.ADD_LABEL;
      });
    } else {
      this.servicesService.create(service).subscribe((result) => {
        console.log(result);
        this.formGroup.reset();
        this.services.push(result['result']);
        this.label = this.ADD_LABEL;
      });
    }
  }

  edit(service: Service) {
    this.label = this.UPDATE_LABEL;
    this.formGroup.patchValue(service);
  }

  delete(service: Service) {
    this.servicesService.delete(service).subscribe((result) => {
      const index = this.services.findIndex((s) => s._id === service._id);
      this.services.splice(index, 1);
    });
  }
}
