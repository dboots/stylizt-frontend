import { Component, OnInit } from '@angular/core';
import { Service } from '../../../models';

@Component({
  selector: 'app-page-stylist-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class StylistServicesPageComponent implements OnInit {
  services: Service[] = [];
  constructor() {}

  ngOnInit() {
    for (let i = 0; i < 12; i++) {
      let price = Math.floor(Math.random() * 99) + '.99';
      this.services.push(new Service('Demo Service ' + i, price));
    }
  }
}
