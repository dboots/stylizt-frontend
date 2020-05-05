import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.addMetaTag('prerender-status-code', '404');
  }
}
