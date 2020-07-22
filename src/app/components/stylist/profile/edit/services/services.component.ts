import { Component, OnInit } from '@angular/core';
import { Service, User, Lengths } from 'src/app/models';
import { ServicesService, AuthService } from 'src/app/services';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class EditProfileServicesComponent implements OnInit {
  services: Service[] = [];
  user: User;

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.servicesService.read(this.user._id).subscribe((result) => {
      this.services = result;
    });
  }

  add() {
    this.services.unshift(new Service());
  }

  save() {
    /*
    if (id) {
      this.servicesService.update(service).subscribe((result) => {
        const index = this.services.findIndex((s) => s._id === service._id);
        this.services[index] = service;
        this.cancel();
      });
    } else {
      this.servicesService.create(service).subscribe((result) => {
        this.services.push(result['result']);
        this.cancel();
      });
    }
    */
  }

  delete(service: Service) {
    this.servicesService.delete(service).subscribe((result) => {
      const index = this.services.findIndex((s) => s._id === service._id);
      this.services.splice(index, 1);
    });
  }
}
