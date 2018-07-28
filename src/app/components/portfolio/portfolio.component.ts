import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services';
import { Portfolio } from '../../models';

@Component({
  selector: 'app-page-stylistportfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})

export class StylistPortfolioPageComponent {
  portfolio: Portfolio

  constructor(
    private portfolioService: PortfolioService
  ) {

  }

  ngOnInit() {
    this.portfolioService.read({owner: '5afbb12396a1716c4accd8cc'}).subscribe((portfolio: any) => {
      this.portfolio = portfolio;
    })
  }
}
