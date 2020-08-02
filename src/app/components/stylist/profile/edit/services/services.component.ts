import { Component, OnInit } from '@angular/core';
import { Service, User, Lengths } from 'src/app/models';
import { ServicesService, AuthService } from 'src/app/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class EditProfileServicesComponent implements OnInit {
  services: Service[] = [];
  user: User;
  form: FormGroup = new FormGroup({
    name: new FormControl('name', [Validators.required]),
    description: new FormControl('description', [Validators.required]),
    price: new FormControl('price', [Validators.required]),
    time: new FormControl('time', [Validators.required])
  });

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.servicesService.read(this.user._id).subscribe((result) => {
      this.services = result;
    });
  }

  add() {
    this.services.unshift(new Service());
  }

  save(service: Service) {
    if (service._id) {
      this.servicesService.update(service).subscribe((result) => {
        console.log('server service updated', result);
        const index = this.services.findIndex((s) => s._id === service._id);
        this.services[index] = service;
      });
    } else {
      this.servicesService.create(service).subscribe((result) => {
        console.log('client service created', result);
      });
    }
  }

  delete(service: Service) {
    this.servicesService.delete(service).subscribe((result) => {
      console.log('service deleted', result);
      const index = this.services.findIndex((s) => s._id === service._id);
      this.services.splice(index, 1);
    });
  }
}
