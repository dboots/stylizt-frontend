import { Component, OnInit } from '@angular/core';
import { LocationService, PortfolioService } from '../../services';
import { Portfolio } from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {
  dropdownOptions: any[];
  currentOption;
  portfolio: Portfolio[];

  constructor(
    public locationService: LocationService,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit() {
    this.dropdownOptions = ['DO IT ALL', 'BANGS', 'UPDOS', 'WEAVES'];
    this.currentOption = 'DO IT ALL';

    // TODO: Convert result to Portfolio models
    this.portfolioService.read().subscribe((result: any) => {
      this.portfolio = result.data;
      console.log(this.portfolio);

    }, (err) => {
      console.log(err);
    })
  }

  selectDropdown(option: any) {
    this.currentOption = option;
  }
}
