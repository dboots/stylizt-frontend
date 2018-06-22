import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {
  salon: string;
  salonOptions: string[];

  constructor() { }

  ngOnInit() {
    this.salonOptions = ['Bangs', 'Bangs1', 'Bangs2'];
    this.salon = 'Bangs';
  }
}
