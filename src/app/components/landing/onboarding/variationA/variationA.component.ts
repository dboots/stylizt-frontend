import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-variationa',
  templateUrl: './variationA.component.html',
  styleUrls: ['./variationA.component.scss']
})
export class LandingVariationAComponent {
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
    this.title.setTitle('The Tools You Need Build Your Stylist Clientele FAST');
    this.meta.updateTag({
      name: 'description',
      content: 'Online client management, client book, client organizer and hair formula app for independant hair stylists, salon owners, cosmetologist students, and barbers.'
    });

    this.meta.updateTag({
      property: 'og:image',
      content: 'https://res.cloudinary.com/drcvakvh3/image/upload/v1588696630/assets/header-home-v2.jp2'
    });
  }
}
