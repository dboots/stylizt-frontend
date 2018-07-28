import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services';
import { Portfolio, User } from '../../models';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page-stylistportfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})

export class StylistPortfolioPageComponent implements OnInit {
  portfolio: Portfolio;
  stylist: User;
  params;

  constructor(
    private portfolioService: PortfolioService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => { this.params = params });
  }

  ngOnInit() {
    this.portfolioService.read({owner: this.params.id}).subscribe((data: any) => {
      console.log(data);
      this.portfolio = data.portfolio;
      this.stylist = data.stylist;

      console.log(data.stylist);
    })
  }
}
