import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html'
})
export class TermsPageComponent implements OnInit {
  constructor(private seoService: SeoService) { }
  ngOnInit() {
    this.seoService.createCanonicalUrl();
    this.seoService.updateMetaTags('Terms of Use - Hair To Chair', null, 'Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service.');
  }
}
