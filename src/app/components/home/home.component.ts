import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
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
    private meta: Meta,
    private title: Title,
    public locationService: LocationService,
    private portfolioService: PortfolioService
  ) {
    title.setTitle('Hair to Chair - Stylists specializing in bangs, updos');

    meta.addTags([
      { name: 'author',   content: 'Coursetro.com'},
      { name: 'keywords', content: 'angular seo, angular 4 universal, etc'},
      { name: 'description', content: 'This is my Angular SEO-based App, enjoy it!' }
    ]);
  }

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
