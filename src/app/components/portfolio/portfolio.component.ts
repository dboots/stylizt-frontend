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

  instagram: string = null;
  twitter: string = null;
  facebook: string = null;

  constructor(
    private portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private meta: Meta,
    private title: Title
  ) {
    this.route.params.subscribe((params) => { this.params = params });

    this.portfolioService.read({owner: this.params.id}).subscribe((data: any) => {
      let portfolio = data.portfolio;
      let stylist = data.stylist;

      this.title.setTitle(stylist.name + ' Portfolio');
      this.meta.updateTag(
        { name: 'description', content: stylist.name + ' is a stylist from ' + stylist.zip }
      );
      
      var location = stylist.zip.replace('#', '%23');
      let url = 'https://maps.google.com/maps?width=100%&height=600&hl=en&q=' + encodeURI(location) + '&ie=UTF8&t=&z=14&iwloc=B&output=embed';
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

      this.twitter = (stylist.twitter) ? this.getUrl(stylist.twitter, 'http://www.twitter.com/') : null;
      this.facebook = (stylist.facebook) ? this.getUrl(stylist.facebook, 'http://www.facebook.com/') : null;
      this.instagram = (stylist.instagram) ? this.getUrl(stylist.instagram, 'http://www.instagram.com/') : null;

      this.portfolio = portfolio;
      this.stylist = stylist;
    })
  }

  // Process social media url/handles
  // handle could be valid url, username, @username
  // return url should be close to http://www.[social].com/[handle]
  getUrl(handle: string, url: string): string {
    let hasHttp = (handle.indexOf('http') > -1);
    let hasHttps = (handle.indexOf('https') > -1);
    let hasWww = (handle.indexOf('www') > -1);
    let isUrl = (hasHttp || hasHttps || hasWww);

    if ((!hasHttp && !hasHttps) && hasWww) {
      handle = 'https://' + handle;
    }

    if (isUrl) {
      return handle;
    }

    return url + handle.replace('@', '');
  }

  ngOnInit() {
  }
}
