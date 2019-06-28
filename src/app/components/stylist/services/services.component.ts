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
  label: string;

  formGroup: FormGroup = new FormGroup({
    _id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl()
  });

  constructor(private servicesService: ServicesService) {
    this.label = this.ADD_LABEL;
  }

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
        const index = this.services.findIndex((s) => s._id === service._id);
        this.services[index] = service;
        this.cancel();
      });
    } else {
      this.servicesService.create(service).subscribe((result) => {
        console.log(result['result']);
        this.services.push(result['result']);
        this.cancel();
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
      console.log(service, index, this.services);
      this.services.splice(index, 1);
      console.log(this.services);
      this.cancel();
    });
  }

  cancel() {
    this.formGroup.reset();
    this.label = this.ADD_LABEL;
  }

  isUpdating() {
    return this.formGroup.get('_id').value;
  }
}
