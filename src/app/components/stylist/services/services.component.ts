import { Component, OnInit } from '@angular/core';
import { Service } from '../../../models';
import { ServicesService } from '../../../services';

@Component({
  selector: 'app-page-stylist-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class StylistServicesPageComponent implements OnInit {
  services: Service[] = [];
  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.servicesService.read().subscribe((result) => {
      this.services = result['data'];
    })
  }
}
