import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LocationService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {
  dropdownOptions: any[];
  currentOption;

  constructor(
    public locationService: LocationService
  ) {}

  ngOnInit() {
    this.dropdownOptions = ['DO IT ALL', 'BANGS', 'UPDOS', 'WEAVES'];
    this.currentOption = 'DO IT ALL';
  }

  selectDropdown(option: any) {
    this.currentOption = option;
  }
}
