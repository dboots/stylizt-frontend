import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-variationb',
  templateUrl: './variationB.component.html',
  styleUrls: ['./variationB.component.scss']
})
export class LandingVariationBComponent {
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
    this.title.setTitle('Affordable & Simple Stylist Appointment Book App');
    this.meta.updateTag({
      name: 'description',
      content: 'Appointment book, scheduling, client management app for independant hair stylists, cosmetologist students, salon owners, and barbers.'
    });

    this.meta.updateTag({
      property: 'og:image',
      content: 'https://res.cloudinary.com/drcvakvh3/image/upload/v1588696630/assets/header-home-v2.jp2'
    });
  }
}
