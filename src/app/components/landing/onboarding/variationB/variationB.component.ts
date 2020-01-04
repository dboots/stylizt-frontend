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
      content: 'Hair to Chair offers affordable and easy to use appointment books and scheduling apps for independant stylists'
    });

    this.meta.updateTag({
      property: 'og:image',
      content: 'https://res.cloudinary.com/drcvakvh3/image/upload/v1537535195/assets/header-home.jpg'
    });
  }
}
