import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services';
import { Portfolio, User } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-stylistportfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})

export class StylistPortfolioPageComponent implements OnInit {
  portfolio: Portfolio;
  stylist: User;
  params;
  mapUrl: SafeResourceUrl;

  constructor(
    private portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title
  ) {
    this.route.params.subscribe((params) => { this.params = params });

    this.portfolioService.read({owner: this.params.id}).subscribe((data: any) => {
      this.portfolio = data.portfolio;
      this.stylist = data.stylist;

      this.title.setTitle(this.stylist.name + ' Portfolio');
      
      var location = this.stylist.zip.replace('#', '%23');
      let url = 'https://maps.google.com/maps?width=100%&height=600&hl=en&q=' + encodeURI(location) + '&ie=UTF8&t=&z=14&iwloc=B&output=embed';
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    })
  }

  ngOnInit() {
  }
}
