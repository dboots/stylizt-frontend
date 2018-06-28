import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-stylist',
  templateUrl: './stylist.component.html',
  styleUrls: ['./stylist.component.scss']
})
export class StylistPageComponent implements OnInit {
  plan: number;
  salon: string;
  salonOptions: string[];

  constructor() { }

  ngOnInit() {
    this.salonOptions = ['Bangs', 'Bangs1', 'Bangs2'];
    this.salon = 'Bangs';
  }

}
