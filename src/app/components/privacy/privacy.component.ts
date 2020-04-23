import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html'
})
export class PrivacyPageComponent implements OnInit {
  constructor(private seoService: SeoService) { }
  ngOnInit() {
    this.seoService.createCanonicalUrl();
    this.seoService.updateMetaTags('Privacy Policy - Hair To Chair', null, 'We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.');
  }
}
