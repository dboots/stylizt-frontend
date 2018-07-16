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

  slideConfig = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: false,
    nextArrow: false
  };

  constructor(
    private meta: Meta,
    private title: Title,
    public locationService: LocationService,
    private portfolioService: PortfolioService
  ) {
    title.setTitle('Hair to Chair - Stylists specializing in bangs, updos');

    meta.updateTag({ name: 'description', content: 'Search and connect with talented hair stylists that fit your hair and life!' });

    console.log('meta created');
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
