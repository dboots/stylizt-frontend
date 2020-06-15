import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-promotion',
  templateUrl: './landing-promotion.component.html',
  styleUrls: ['./landing-promotion.component.scss']
})
export class LandingPromotionComponent {
  constructor(
    private meta: Meta,
    private route: ActivatedRoute,
    private title: Title
  ) {
    this.route.params.subscribe((params) => {
      this.updateMeta();
    });
  }

  updateMeta() {
    this.title.setTitle('Hair to Chair - Helping independant hair stylists, cosmetologists and barbers build clientele fast');
    this.meta.updateTag({
      name: 'description',
      content: 'Hair to Chair promotes and markets your brand and broadcasts your portfolio and talents to prospective local clients'
    });

    this.meta.updateTag({
      property: 'og:image',
      content: 'https://res.cloudinary.com/drcvakvh3/image/upload/v1588696630/assets/header-home-v2.jp2'
    });
  }
}
